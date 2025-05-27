import axios from 'axios';

export class AxiosUploader {
  constructor(file, options = {}) {
    this.file = file;  // 上传的文件对象
    this.chunkSize = options.chunkSize || 5 * 1024 * 1024;  // 分片大小，默认为5MB
    this.maxConcurrent = options.maxConcurrent || 4;  // 最大并发上传数，默认为4
    this.fileHash = '';  // 文件的哈希值，用于唯一标识文件
    this.fileChunks = [];  // 文件分片数组，存储文件的分片信息
    this.uploadedList = [];  // 已上传分片的索引数组
  }

  // 计算文件的SHA-256哈希值
  async computeHash() {
    // 将文件转换为ArrayBuffer
    const buffer = await this.file.arrayBuffer();
    // 使用Web Crypto API计算文件的SHA-256哈希值
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    // 将哈希值转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // 初始化上传器，包括计算文件哈希值和获取已上传分片信息
  async init() {
    this.fileHash = await this.computeHash();  // 计算文件哈希值
    this.fileChunks = this.createChunks();  // 创建文件分片
    // 向服务器发送POST请求，获取已上传的分片索引
    const { data } = await axios.post('/upload/chunk/check', {
      fileHash: this.fileHash,
    });
    this.uploadedList = data.uploaded || [];  // 保存已上传的分片索引
  }

  // 创建文件分片
  createChunks() {
    const chunks = [];  // 初始化分片数组
    let index = 0;
    // 遍历文件，按分片大小切分文件
    for (let start = 0; start < this.file.size; start += this.chunkSize) {
      const chunk = this.file.slice(start, start + this.chunkSize);  // 切分文件，获取分片
      chunks.push({ index, chunk });  // 将分片信息存储到chunks数组中
      index++;
    }
    return chunks;
  }

  // 上传单个分片
  async uploadChunk({ index, chunk }) {
    // 创建FormData对象，用于封装分片数据
    const formData = new FormData();
    formData.append('fileHash', this.fileHash); // 文件哈希值
    formData.append('index', index); // 分片索引
    formData.append('chunk', chunk); // 分片数据

    // 使用axios发送POST请求，上传分片
    return axios.post('/upload/chunk', formData);
  }

  // 上传所有需要上传的分片
  async uploadAll() {
    // 筛选出需要上传的分片
    const toUpload = this.fileChunks.filter(
      ({ index }) => !this.uploadedList.includes(index)
    );

    // 初始化当前索引和并发池
    let current = 0;
    let active = [];

    // 定义上传下一个分片的函数
    const uploadNext = () => {
      // 根据最大并发数和需要上传的分片数量，控制并发上传
      while (current < toUpload.length && active.length < this.maxConcurrent) {
        // 获取当前分片任务
        const task = this.uploadChunk(toUpload[current++]);
        // 将任务添加到并发池
        active.push(task);

        // 在任务完成或失败后，从并发池中移除该任务，并触发下一个分片的上传
        task.finally(() => {
          active.splice(active.indexOf(task), 1);
          uploadNext(); // 触发下一个分片的上传
        });
      }

      // 返回所有并发任务的Promise.all
      return Promise.all(active);
    };

    // 开始上传所有分片
    await uploadNext();

    // 合并所有分片
    await axios.post('/upload/merge', {
      fileHash: this.fileHash, // 文件哈希值
      filename: this.file.name, // 文件名
      total: this.fileChunks.length, // 分片总数
    });
  }

  // 开始上传流程
  async start() {
    // 初始化上传器
    await this.init();
    // 上传所有分片
    await this.uploadAll();
  }
}