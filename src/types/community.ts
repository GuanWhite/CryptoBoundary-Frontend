// 数据库中的社区表字段
// f_id SERIAL PRIMARY KEY,
// f_name VARCHAR(100) NOT NULL comment '社区名',
// f_uuid  varchar(64) not null default '' comment '社区唯一标识',
// f_owner_id INT REFERENCES t_user_info(f_id) ON DELETE CASCADE,
// f_background_url varchar(256) not null default '' comment '社区背景图地址',
// f_description TEXT default '' comment '社区简介',
// f_max_members int default 1000 comment '社区最大人数上限',
// f_visibility int not null default 0 comment '可见（0-公开 1-私有）',
// f_create_time datetime not null default current_timestamp comment '创建时间',
// f_modify_time datetime not null default current_timestamp on update current_timestamp comment '修改时间',
// f_delete_time datetime comment '删除时间'

