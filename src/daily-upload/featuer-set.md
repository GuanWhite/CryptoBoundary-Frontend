

1. 【】==Alert_ID==：告警的唯一标识符，由源地址、目的地址、源端口、目的端口和协议号组成。
2. 【】==Alert_Sign==：警报签名属性。（是否特定于某种攻击或服务，或者它是否只是攻击的通用指标。此步骤允许建立警报分析的初始优先级(例如，特定指标可能优先于通用指标)，以及确定在未来步骤中要调查的内容。一般来说，确定这里的签名是具体的，增加了对事件有趣的信心。识别签名是通用的可能会降低置信度，这取决于通用的程度。）
3. 【】==Alert_Timestamp==：时间戳。告警的创建日期 
4. 【】==Alert_Duration==：告警的持续时间。
5. 【】==Device_Brand==：设备品牌。
6. ￥System_Name：设备的系统名称。
7. 【】==Alert_source_country==：警报攻击源国家。
8. 【】==alert_source_province==：警报攻击源省市。
9. 【】==alert_destination_country==：警报攻击目的国家。
10. 【】==alert_destination_province==：警报攻击目的省市。
11. ￥deployment_domain_type：部署领域类型。（财务管理、营销管理、安全生产、协同办公、人力资源、物资管理、项目管理、综合管理、规划计划、保障体系、一体化平台、公共基础应用、其他）
12. 【】==warning_level==：告警级别（低中高危）
13. 【】==event_source_type==：事件源类型，是什么事件导致了这个告警。（漏洞、配置不合规、策略有效性、弱口令、设备告警、场景告警、终端告警、微应用、告警分析、暴露面、人工生成、安全基线系统、数据保护系统、防火墙基线系统、弱口令扫描工具、漏洞补丁系统、防病毒系统、邮件阻断系统、信息网隔离装置、安全接入平台、数据库审计系统、邮件系统、流量威胁监测、移动终端、泛终端、未知威胁检测设备、攻击溯源设备）
14. 【】==alert_classification==：IDS告警警报分类，告警类型，IDS将该事件判断为什么样的告警。（邮件类场景、外网网站类场景、安全内控类场景、内容泄密类场景、安全设备告警、事件类情报、动态类情报、漏洞类情报、首发漏洞、主机配置合规、防火墙配置合规、临时开放端口、IPS/IDS策略有效性、内网防病毒策略有效性、外网防病毒策略有效性、终端弱口令、主机弱口令、终端其他告警）
15. ￥asset_name：被攻击的资产名称
16. ￥asset_type：被攻击的资产类型
17. 【】==if_logged_in==：攻击源登录是否成功？（1表示成功，0表示失败）
18. 【】==num_failed_logins==：攻击源登录失败的次数
19. 【】==if_root_shell==：攻击源是否获得root shell？（1表示获得，0表示没有）
20. ￥is_host_login：是否是“host”登录（1表示是，0表示不是）
21. ￥is_guest_login：是否是“guest”登录（1表示是，0表示不是）
22. 【】==if_su_attempted==：攻击源是否尝试使用“su”命令？（1表示尝试，0表示没有）使用su命令时，用户可以切换到其他用户的账户，并获得该账户的权限。
23. 【】==num_root_cmds==：攻击源以root身份执行的命令数量
24. 【】==num_file_creations==：攻击源创建文件的数量
25. 【】==num_file_deletes==：攻击源删除文件的数量
26. ￥num_user_creations：攻击源创建用户的数量
27. ￥num_shells：攻击源获得shell的数量
28. 【】==num_access_files==：攻击源访问系统敏感文件的次数
29. 【】==num_outbound_cmds==：攻击源向主机外部发送的命令数量
30. 【】==freq_alert_sIP==：当前警报的攻击源在历史警报中触发警报的频率
31. 【】==freq_alert_dIP==：当前警报的目的地IP在历史警报中触发警报的频率
32. 【】==freq_alert_sport==：当前警告的源端口号在历史警报中触发警报的频率
33. 【】==freq_alert_dport==：当前警告的目的端口号在历史警报中触发警报的频率，目的端口号可以看出来目标服务类型，因此19号不选。
34. ￥freq_alert_service：当前警告连接的服务在历史警报中触发警报的频率
35. 【】==num_same_alert_name==：在历史警报中与当前警告的事件源类型一致的警报数量
36. ￥dst_host_error_rate：目标主机连接错误的比例
37. ￥dst_host_serror_rate：目标主机服务连接错误的比例
38. 【】==object_entity_type==：客体实体类型。类型有网络，文件和进程（process、file、network）。
39. ￥subject_entity_type：事件源实体类型（process、file、network）。注意区别于事件源类型，这个特征是描述导致该告警的源实体的类型；注意区别于攻击源，攻击源是通过对事件源溯源得到的，事件源一般是告警条目中直接给出的。
40. 【】==source_IPv4==：源IPv4地址。
41. 【】==source_port==：源端口号。
42. 【】==destination_IPv4==：目的IPv4地址。
43. 【】==destination_port==：目的端口号。
44. 【】==service_type==：服务类型（例如：http、ftp、smtp）。
45. 【】==protocol_type==：网络流协议（如TCP、UDP）。 
46. 【】==file_ID==：文件标识符。 
47. 【】==file_name==：文件名。
48. 【】==file_directory==：文件目录。
49. 【】==file_owner==：文件所有者。
50. 【】==process_ID==：进程PID。
51. 【】==process_name==：进程名。
52. 【】==process_user==：进程使用者。
53. 【】==event_opration_type==：事件操作类型。事件主体对事件客体进行了什么样的操作。
54. ￥attack_stage：当前告警所处的攻击阶段。
55. 【】==network_partition==：攻击所属网络。（内网，外网，安全区，专属网络和其他网络）
56. 【】==process_cmd==：进程命令行。这个特征是启动一个进程时使用的完整命令行字符串。Shon et al.\cite{shon2023semi};
57. ￥cmd_parameters：进程命令行参数。这个特征是从进程命令行中分离出来的参数。
58. 【】==payload==：攻击载荷。



```
删除掉的特征
1. ==anomaly_score==：异常分数。模型计算得到的异常分数，后续用于警报排序。该特征没有参与特征工程的过滤。 Wang and Yang\cite{wang2024combating}
2. ==cluster_group==：聚类簇。用于判断模型将警报聚类到哪个簇中。该特征没有参与特征工程的过滤。
```



```
\#54 & \multirow{5}{*}{\begin{tabular}[c]{@{}c@{}}Attack\\ evidence\end{tabular}} & \textcolor{red}{attack\_stage} & The current attack stage of the alert. & \scalebox{0.85}[1]{$\times$} \\
  \#55 &  & network\_partition & Perform network partitioning on the attacked network. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#56 &  & process\_cmd & This feature is the complete command-line string used when starting a process. & \scalebox{0.85}[1]{$\times$} \\
  \#57 &  & \textcolor{red}{cmd\_parameters} & This feature is a parameter separated from the process command line. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#58 &  & payload & Attack payload. & \scalebox{0.85}[1]{$\times$} \\ \hline
```





## 1_相关性指标 Relevance indicators



1. ==Alert_ID==：告警的唯一标识符，由源地址、目的地址、源端口、目的端口和协议号组成。
2. ==Alert_Sign==：警报签名属性。（是否特定于某种攻击或服务，或者它是否只是攻击的通用指标。此步骤允许建立警报分析的初始优先级(例如，特定指标可能优先于通用指标)，以及确定在未来步骤中要调查的内容。一般来说，确定这里的签名是具体的，增加了对事件有趣的信心。识别签名是通用的可能会降低置信度，这取决于通用的程度。）
3. ==Alert_Timestamp==：时间戳。告警的创建日期 
4. ==Alert_Duration==：告警的持续时间。
5. ==Device_Brand==：设备品牌。
6. System_Name：设备的系统名称。
7. ==Alert_source_country==：警报攻击源国家。
8. ==alert_source_province==：警报攻击源省市。
9. ==alert_destination_country==：警报攻击目的国家。
10. ==alert_destination_province==：警报攻击目的省市。
11. deployment_domain_type：部署领域类型。（财务管理、营销管理、安全生产、协同办公、人力资源、物资管理、项目管理、综合管理、规划计划、保障体系、一体化平台、公共基础应用、其他）
12. ==warning_level==：告警级别（低中高危）
13. ==event_source_type==：事件源类型，是什么事件导致了这个告警。（漏洞、配置不合规、策略有效性、弱口令、设备告警、场景告警、终端告警、微应用、告警分析、暴露面、人工生成、安全基线系统、数据保护系统、防火墙基线系统、弱口令扫描工具、漏洞补丁系统、防病毒系统、邮件阻断系统、信息网隔离装置、安全接入平台、数据库审计系统、邮件系统、流量威胁监测、移动终端、泛终端、未知威胁检测设备、攻击溯源设备）
14. ==alert_classification==：IDS告警警报分类，告警类型，IDS将该事件判断为什么样的告警。（邮件类场景、外网网站类场景、安全内控类场景、内容泄密类场景、安全设备告警、事件类情报、动态类情报、漏洞类情报、首发漏洞、主机配置合规、防火墙配置合规、临时开放端口、IPS/IDS策略有效性、内网防病毒策略有效性、外网防病毒策略有效性、终端弱口令、主机弱口令、终端其他告警）
15. asset_name：被攻击的资产名称
16. asset_type：被攻击的资产类型







## 2_附加警报 Additional alerts



1. ==if_logged_in==：攻击源登录是否成功？（1表示成功，0表示失败）
2. ==num_failed_logins==：攻击源登录失败的次数
3. ==if_root_shell==：攻击源是否获得root shell？（1表示获得，0表示没有）
4. is_host_login：是否是“host”登录（1表示是，0表示不是）
5. is_guest_login：是否是“guest”登录（1表示是，0表示不是）
6. ==if_su_attempted==：攻击源是否尝试使用“su”命令？（1表示尝试，0表示没有）使用su命令时，用户可以切换到其他用户的账户，并获得该账户的权限。
7. ==num_root_cmds==：攻击源以root身份执行的命令数量
8. ==num_file_creations==：攻击源创建文件的数量
9. ==num_file_deletes==：攻击源删除文件的数量
10. num_user_creations：攻击源创建用户的数量
11. num_shells：攻击源获得shell的数量
12. ==num_access_files==：攻击源访问系统敏感文件的次数
13. ==num_outbound_cmds==：攻击源向主机外部发送的命令数量
14. ==freq_alert_sIP==：当前警报的攻击源在历史警报中触发警报的频率
15. ==freq_alert_dIP==：当前警报的目的地IP在历史警报中触发警报的频率
16. ==freq_alert_sport==：当前警告的源端口号在历史警报中触发警报的频率
17. ==freq_alert_dport==：当前警告的目的端口号在历史警报中触发警报的频率，目的端口号可以看出来目标服务类型，因此19号不选。
18. freq_alert_service：当前警告连接的服务在历史警报中触发警报的频率
19. ==num_same_alert_name==：在历史警报中与当前警告的事件源类型一致的警报数量
20. dst_host_error_rate：目标主机连接错误的比例
21. dst_host_serror_rate：目标主机服务连接错误的比例



## 3_上下文信息 Contextual information

1. subject_entity_type：事件源实体类型（process、file、network）。注意区别于事件源类型，这个特征是描述导致该告警的源实体的类型；注意区别于攻击源，攻击源是通过对事件源溯源得到的，事件源一般是告警条目中直接给出的。

   > 话说回来，一个告警不会单纯的只涉及一个事件源实体，正如事件关系图，实体间是可以溯源的，因此一条告警可以同时具有这些所有特征。（不建议这样说）
   >
   > 事件源实体、事件目的实体和事件操作都是具体的，是直接导致告警的那一对实体和其之间的操作（实体就是进程、文件或套接字三选二；操作就是事件关系图中的边），因此可以通过代码去做区分，并根据类型去填充其具有的特征。
   >
   > 【】有些实体是好像是不能做源实体的，比如文件能去调用进程吗？或许可以，执行文件后，文件调用进程。那操作都有哪些？

2. ==object_entity_type==：客体实体类型。类型有网络，文件和进程（process、file、network）。

3. ==source_IPv4==：源IPv4地址。

4. ==source_port==：源端口号。

5. ==destination_IPv4==：目的IPv4地址。

6. ==destination_port==：目的端口号。

7. ==service_type==：服务类型（例如：http、ftp、smtp）。

8. ==protocol_type==：网络流协议（如TCP、UDP）。 

9. ==file_ID==：文件标识符。 

10. ==file_name==：文件名。

11. ==file_directory==：文件目录。

12. ==file_owner==：文件所有者。

13. ==process_ID==：进程PID。

14. ==process_name==：进程名。

15. ==process_user==：进程使用者。

16. ==event_opration_type==：事件操作类型。事件主体对事件客体进行了什么样的操作。

    2. 对网络：Connect/Listen/Send data/Receive data
    3. 对文件：Create/Modify/Delete/Move/Rename/Change permission
    4. 对其他进程：Start/Exit/Monitor







## 4_攻击证据 Attack evidence

1. ==anomaly_score==：异常分数。模型计算得到的异常分数，后续用于警报排序。该特征没有参与特征工程的过滤。 Wang and Yang\cite{wang2024combating}
2. ==cluster_group==：聚类簇。用于判断模型将警报聚类到哪个簇中。该特征没有参与特征工程的过滤。
3. attack_stage：当前告警所处的攻击阶段。
4. ==network_partition==：攻击所属网络。（内网，外网，安全区，专属网络和其他网络）
5. ==process_cmd==：进程命令行。这个特征是启动一个进程时使用的完整命令行字符串。Shon et al.\cite{shon2023semi};
6. ==cmd_parameters==：进程命令行参数。这个特征是从进程命令行中分离出来的参数。
7. payload：攻击载荷。





```
% 暂用这版，还需要添加字体颜色，并在caption中解释字体颜色和对号叉号。
\begin{table*}[]
  \centering
  \fontsize{7pt}{7pt}\selectfont
  \renewcommand{\arraystretch}{1.5} % Row spacing of the table
  \caption{Summary of feature set.}
  \label{tab:best feature set}
  \resizebox{\textwidth}{!}{%
  \begin{tabular}{m{1cm}<{\centering}m{1.1cm}<{\centering}cp{10cm}m{1cm}<{\centering}}
  \hline
  \textbf{Number} & \textbf{Information category} & \textbf{Feature name} & \multicolumn{1}{c}{\textbf{Feature descriptions}} & \textbf{First proposed} \\ \hline
  \#1 & \multirow{16}{*}{\begin{tabular}[c]{@{}c@{}}Relevance\\ indicators\end{tabular}} & alert\_ID & The unique identifier for an alert. Usually generated by the system. & \scalebox{0.85}[1]{$\times$} \\
  \#2 &  & alert\_sign & Alert signature attribute. Used to determine whether it is a specific attack or service or some general indicators. & \scalebox{0.85}[1]{$\times$} \\
  \#3 &  & alert\_timestamp & The timestamp of the alert. The creation date of the alert. & \scalebox{0.85}[1]{$\times$} \\
  \#4 &  & alert\_duration & Duration of the alert. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#5 &  & device\_brand & Brand or manufacturer of the alarm device. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#6 &  & System\_Name & The system name of the device. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#7 &  & alert\_source\_country & Alert the source country of the attack. What country is the attack source of this alert from. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#8 &  & alert\_source\_province & Alert the source province of the attack. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#9 &  & alert\_destination\_country & Alert the target country of the attack. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#10 &  & alert\_destination\_province & Alert the target province of the attack. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#11 &  & deployment\_domain\_type & The type of domain in which the device is deployed. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#12 &  & warning\_level & Cybersecurity risk level (critical, high, medium and low). & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#13 &  & event\_source\_type & Event source type, what event caused this alert. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#14 &  & alert\_classification & Classification of this alarm by IDS. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#15 &  & asset\_name & Name of the attacked asset. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#16 &  & asset\_type & The type of asset being attacked. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\ \hline
  \#17 & \multirow{20}{*}{\begin{tabular}[c]{@{}c@{}}Additional\\ alerts\end{tabular}} & if\_logged\_in & Is the login of the attack source successful? (1 indicates success, 0 indicates failure) & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#18 &  & num\_failed\_logins & The number of failed attempts to log in to the attack source. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#19 &  & if\_root\_shell & Has the attack source obtained the root shell? (1 indicates obtained, 0 indicates not obtained) & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#20 &  & if\_host\_login & Is it a 'host' login. (1 indicates yes, 0 indicates no) & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#21 &  & if\_su\_attempted & Did the attack source attempt to use the 'su' command? (1 represents an attempt, 0 represents none) & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#22 &  & num\_root\_cmds & The number of commands executed by the attack source as root. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#23 &  & num\_file\_creations & The number of files created by the attack source. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#24 &  & num\_file\_deletes & The number of files deleted by the attack source. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#25 &  & num\_user\_creations & The number of users created by the attack source. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#26 &  & num\_shells & The number of shells obtained by the attack source. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#27 &  & num\_access\_files & The number of times the attack source accesses sensitive files in the system. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#28 &  & num\_outbound\_cmds & The number of commands sent by the attack source to the outside of the host. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#29 &  & freq\_alert\_sIP & The frequency at which the attack source of the current alert triggers alerts in historical alerts. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#30 &  & freq\_alert\_dIP & The frequency at which the destination IP of the current alert triggers alerts in historical alerts. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#31 &  & freq\_alert\_sport & The frequency at which the current warning's source port number triggers alerts in historical alerts. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#32 &  & freq\_alert\_dport & The frequency at which the destination port number of the current warning triggers alerts in historical alerts. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#33 &  & freq\_alert\_service & The frequency at which the current warning connection service triggers alerts in historical alerts. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#34 &  & num\_same\_alert\_name & The number of alerts in the historical alerts that match the current alert's event source type. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#35 &  & dst\_host\_error\_rate & The proportion of target host connection errors. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#36 &  & dst\_host\_serror\_rate & The proportion of target host service connection errors. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\ \hline
  \#37 & \multirow{16}{*}{\begin{tabular}[c]{@{}c@{}}Contextual\\ information\end{tabular}} & object\_entity\_type & Object entity type. Types include network, file, and process. & \scalebox{0.85}[1]{$\times$} \\
  \#38 &  & subject\_entity\_type & Event source entity type. & \scalebox{0.85}[1]{$\times$} \\
  \#39 &  & source\_IPv4 & Source IPv4 address. & \scalebox{0.85}[1]{$\times$} \\
  \#40 &  & source\_port & Source port number. & \scalebox{0.85}[1]{$\times$} \\
  \#41 &  & destination\_IPv4 & Destination IPv4 address. & \scalebox{0.85}[1]{$\times$} \\
  \#42 &  & destination\_port & Destination port number. & \scalebox{0.85}[1]{$\times$} \\
  \#43 &  & service\_type & Network service type. (e.g. http, ftp, smtp) & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#44 &  & protocol\_type & Network flow protocol. (e.g. TCP, UDP) & \scalebox{0.85}[1]{$\times$} \\
  \#45 &  & file\_ID & File identifier. & \scalebox{0.85}[1]{$\times$} \\
  \#46 &  & file\_name & File name. & \scalebox{0.85}[1]{$\times$} \\
  \#47 &  & file\_directory & File directory. & \scalebox{0.85}[1]{$\times$} \\
  \#48 &  & file\_owner & File owner. & \scalebox{0.85}[1]{$\times$} \\
  \#49 &  & process\_ID & Process identifier. Used to uniquely identify each process running on the operating system. & \scalebox{0.85}[1]{$\times$} \\
  \#50 &  & process\_name & Process name. & \scalebox{0.85}[1]{$\times$} \\
  \#51 &  & process\_user & Process users. & \scalebox{0.85}[1]{$\times$} \\
  \#52 &  & event\_operation\_type & Event operation type. What kind of operation did the event subject perform on the event object. & \scalebox{0.85}[1]{$\times$} \\ \hline
  \#53 & \multirow{7}{*}[-4ex]{\begin{tabular}[c]{@{}c@{}}Attack\\ evidence\end{tabular}} & anomaly\_score & Anomaly score. The abnormal score calculated by the model is used for alarm sorting. & \scalebox{0.85}[1]{$\times$} \\
  \#54 &  & cluster\_group & Cluster clustering. Used to determine which cluster the model will cluster alerts into. & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#55 &  & attack\_stage & The current attack stage of the alert. & \scalebox{0.85}[1]{$\times$} \\
  \#56 &  & network\_partition & Perform network partitioning on the attacked network. (e.g. internal network, external network, secure zone, dedicated network, and other networks.) & \raisebox{0.6ex}{\scalebox{0.7}{$\sqrt{}$}} \\
  \#57 &  & process\_cmd & Process command line. This feature is the complete command-line string used when starting a process. & \scalebox{0.85}[1]{$\times$} \\
  \#58 &  & cmd\_parameters & Process command line parameters. This feature is a parameter separated from the process command line. & \scalebox{0.85}[1]{$\times$} \\
  \#59 &  & payload & Attack payload. & \scalebox{0.85}[1]{$\times$} \\ \hline
  \end{tabular}%
  }
  \end{table*}
```





