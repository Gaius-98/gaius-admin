import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_opt_log')
export class OperationLog {
  @PrimaryGeneratedColumn('increment', { type: 'int', comment: '日志唯一标识' })
  id: number;

  @Column({ name: 'username', comment: '操作用户名' })
  username: string;
  @Column({ comment: '操作客户端ip' })
  ip: string;
  @Column({ comment: '操作地址' })
  location: string;
  @Column({ name: 'request_type', comment: '请求类型:GET,POST' })
  reqType: string;
  @Column({ name: 'request_url', comment: '请求地址' })
  reqUrl: string;
  @Column({ name: 'request_param', comment: '请求参数', type: 'text' })
  reqParam: string;
  @Column({ name: 'module_name', comment: '模块名称' })
  moduleName: string;
  @Column({ name: 'func_name', comment: '方法名称' })
  funcName: string;
  @Column({ name: 'opt_module', comment: '操作模块', nullable: true })
  optModule: string;
  @Column({ name: 'opt_type', comment: '操作类型', nullable: true })
  optType: string;
  @Column({
    name: 'response_status',
    type: 'char',
    comment: '操作状态:1-成功，0-失败',
  })
  resStatus: string;
  @Column({ name: 'response_time', comment: '响应时间' })
  resTime: string;
  @Column({
    name: 'response_result',
    comment: '请求结果',
    type: 'text',
    nullable: true,
  })
  res: string;
  @Column({
    name: 'err_msg',
    comment: '错误的异常信息',
    type: 'text',
    nullable: true,
  })
  errMsg: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
