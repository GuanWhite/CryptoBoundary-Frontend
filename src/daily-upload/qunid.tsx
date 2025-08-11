
新建会话
Ctrl
K
Kimi+
PPT 助手
PPT 助手
监控规则配置指南
Linux下编辑metadb_topology.yaml指南
V2ObjectRule vs V2Rule：监控对象规则与全局规则模板
删除特定分卷压缩文件
审稿意见整理：UsefulCHAR系统改进建议
监控规则配置指南
## demo rule,For example: probe_success{group="pump"} == 0,For example: 1 Explanation: Use number,"Enter numbers (multiple numbers separated by commas). Optional values are as follows: Cluster/TiDB: 1, Cluster/TiKV: 2, Cluster/PD: 3, Cluster/TiFlash: 4, Cluster/TiCDC: 5, Other/OtherComponents: 6 For example: 1, 2","For example: 1,2 Explanation：## 1 => overview/TiDB CPU ## 2 => overview/TiDB Memory ## 3 => overview/TiKV Storage ## 4 => overview/TiFlash Storage ## 5 => overview/CPU Usage ## 6 => overview/Memory Usage For more rules, please visit",For example: 1m Explanation：use format like 10s / 2m / 1h / 1d,"For example: env=ENV_LABELS_ENV,tem_object_type=TiDB Explanation: use format key1=value1,key2=value2","For example: description=cluster: ENV_LABELS_ENV, instance: {{ $labels.instance }} Explanation: use format key1=value1,key2=value2",For example: warning Explanation: Choice warning / critical / emergency,For example: v7.5.3,For example: new rule Explanation: Rule alias,For example: Mike
Name (R),Expr (R),Metric ID (O),Monitor Object (O),Monitor Category IDs (O),Duration (O),Labels (O),Annotations (R),Level (R),Version (R),Alias (O),Creator (O)
把上面的csv美观输出
编辑
复制
以下是将您提供的 CSV 示例内容，整理为清晰美观的表格形式：
表格
复制
字段名	示例值	说明
Name (R)	probe_success{group="pump"} == 0	规则名称（必填）
Expr (R)	1	表达式（必填）
Metric ID (O)	1,2	监控指标ID（选填）






Monitor Object (O)	1,2	监控对象（选填）





Monitor Category IDs (O)	1m	监控类别ID（选填）
Duration (O)	env=ENV_LABELS_ENV,tem_object_type=TiDB	持续时间（选填）
Labels (O)	description=cluster: ENV_LABELS_ENV, instance: {{ $labels.instance }}	标签（选填）
Annotations (R)	warning	注解（必填）
Level (R)	v7.5.3	告警级别（必填）
Version (R)	new rule	版本（必填）
Alias (O)	Mike	规则别名（选填）
Creator (O)	空	创建者（选填）
说明：
(R) 表示必填项，(O) 表示选填项。
字段示例值仅为演示，实际使用时请根据需求填写。
复制
重试
分享
如何设置监控规则？

监控规则有哪些可选参数？

如何查看监控数据？



K2
新模型
内容由AI生成，请仔细甄别
