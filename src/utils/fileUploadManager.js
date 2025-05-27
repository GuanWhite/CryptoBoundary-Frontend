// UploadManager.js
import axios from 'axios';

const CHUNK_SIZE = 5 * 1024 * 1024;  // 定义分片大小，默认为5MB
const MAX_CONCURRENT = 4;  // 定义最大并发上传数，默认为4

export class UploadManager {
  // 构造函数，初始化上传管理器
  constructor(file, options = {}) {
    this.file = file;  // 上传的文件对象
    this.chunkSize = options.chunkSize || CHUNK_SIZE;  // 分片大小，可由options指定，否则使用默认值
    this.maxConcurrent = options.maxConcurrent || MAX_CONCURRENT;  // 最大并发上传数，可由options指定，否则使用默认值
    this.onProgress = options.onProgress || (() => {});  // 上传进度回调函数，默认为空函数
    this.onComplete = options.onComplete || (() => {});  // 上传完成回调函数，默认为空函数
    this.fileHash = '';  // 文件的哈希值，用于唯一标识文件
    this.fileChunks = [];   // 文件分片数组，存储文件的分片信息
    this.uploadedList = [];  // 已上传分片的索引数组
    this.paused = false;  // 是否暂停上传
    this.controller = new AbortController();  // AbortController实例，用于取消上传
  }

  // 【秒传】计算文件的SHA-256哈希值
  async computeHash() {
    const chunks = []; // 创建分片数组
    let cur = 0;
    while (cur < this.file.size) {
      // 将文件按分片大小切分，存储到chunks数组中
      chunks.push(this.file.slice(cur, cur + this.chunkSize));
      cur += this.chunkSize;
    }

    const buffer = await this.file.arrayBuffer();  // 将文件转换为ArrayBuffer
    // 使用Web Crypto API计算文件的SHA-256哈希值
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    // 将哈希值转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    this.fileHash = hashHex;  // 保存文件哈希值
    return hashHex;
  }

  // 【秒传】检查文件是否已存在
  async checkFileExists() {
    // 向服务器发送POST请求，检查文件是否存在
    const { data } = await axios.post('/upload/check', {
      fileHash: this.fileHash, // 文件哈希值
      filename: this.file.name, // 文件名
    });
    return data; // 返回服务器响应的数据
  }

  // 获取已上传的分片索引
  async getUploadedChunks() {
    // 向服务器发送POST请求，获取已上传的分片索引
    const { data } = await axios.post('/upload/chunk/check', {
      fileHash: this.fileHash, // 文件哈希值
    });
    // 保存已上传的分片索引
    this.uploadedList = data.uploaded || [];
    return this.uploadedList;
  }

  // 创建文件分片
  createChunks() {
    // 清空分片数组
    this.fileChunks = [];
    let cur = 0;
    let index = 0;
    while (cur < this.file.size) {
      // 将文件按分片大小切分，存储到fileChunks数组中
      const chunk = this.file.slice(cur, cur + this.chunkSize);
      this.fileChunks.push({ chunk, index });
      cur += this.chunkSize;
      index++;
    }
  }

  // 上传单个分片
  async uploadChunk({ chunk, index }) {
    // 创建FormData对象，用于封装分片数据
    const formData = new FormData();
    formData.append('fileHash', this.fileHash); // 文件哈希值
    formData.append('filename', this.file.name); // 文件名
    formData.append('index', index); // 分片索引
    formData.append('chunk', chunk); // 分片数据

    // 使用axios发送POST请求，上传分片
    await axios.post('/upload/chunk', formData, {
      signal: this.controller.signal, // 使用AbortController控制请求取消
    });
  }

  // 合并分片
  async mergeChunks() {
    // 向服务器发送POST请求，请求合并分片
    await axios.post('/upload/merge', {
      fileHash: this.fileHash, // 文件哈希值
      filename: this.file.name, // 文件名
      total: this.fileChunks.length, // 分片总数
    });
  }

  // 开始上传
  async start() {
    // 设置暂停状态为false
    this.paused = false;
    // 重新创建AbortController实例
    this.controller = new AbortController();

    // 计算文件哈希值
    this.fileHash = await this.computeHash();
    // 检查文件是否已存在
    const status = await this.checkFileExists();
    if (status.uploaded) {
      // 如果文件已存在，直接调用onProgress和onComplete回调
      this.onProgress(100);
      this.onComplete();
      return;
    }

    // 创建文件分片
    this.createChunks();
    // 获取已上传的分片索引
    await this.getUploadedChunks();

    // 计算已上传分片的进度
    let uploaded = this.uploadedList.length;
    this.onProgress((uploaded / this.fileChunks.length) * 100);

    // 筛选出需要上传的分片
    const needUpload = this.fileChunks.filter(
      ({ index }) => !this.uploadedList.includes(index)
    );

    // 初始化并发池和当前索引
    let pool = [];
    let current = 0;

    // 定义上传下一个分片的函数
    const uploadNext = async () => {
      // 如果已暂停，直接返回
      if (this.paused) return;

      // 根据最大并发数和需要上传的分片数量，控制并发上传
      while (pool.length < this.maxConcurrent && current < needUpload.length) {
        const { chunk, index } = needUpload[current++];
        // 上传分片，并在上传完成后更新进度和并发池
        const task = this.uploadChunk({ chunk, index }).then(() => {
          uploaded++;
          this.onProgress((uploaded / this.fileChunks.length) * 100);
          pool.splice(pool.indexOf(task), 1);
          uploadNext();
        });
        pool.push(task);
      }

      // 如果所有分片都已上传完成，调用mergeChunks合并分片，并触发onComplete回调
      if (uploaded === this.fileChunks.length) {
        await this.mergeChunks();
        this.onComplete();
      }
    };

    // 开始上传
    uploadNext();
  }

  // 【暂停上传】
  pause() {
    // 设置暂停状态为true
    this.paused = true;
    // 使用AbortController取消所有正在进行的上传请求
    this.controller.abort();
  }

  // 【恢复上传】
  resume() {
    // 如果未暂停，直接返回
    if (!this.paused) return;
    // 调用start方法重新开始上传
    this.start();
  }
}