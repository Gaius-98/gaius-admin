import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_login_log')
export class LoginLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: 'ip地址' })
  ip: string;
  @Column({ comment: '地址' })
  address: string;
  @Column({ comment: '用户名' })
  username: string;
  @Column({ comment: '系统' })
  os: string;
  @Column({ comment: '浏览器' })
  browser: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
}
