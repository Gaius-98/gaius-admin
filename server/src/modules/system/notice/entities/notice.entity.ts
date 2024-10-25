import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_notice')
export class Notice {
  @PrimaryGeneratedColumn('increment', { comment: '通知id' })
  id: number;
  @Column({ comment: '通知标题', length: 32 })
  title: string;
  @Column({ type: 'text', comment: '通知内容' })
  content: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
  @Column({ comment: '创建人', name: 'create_by' })
  createBy: string;
}

@Entity('sys_notice_user')
export class NoticeUser {
  @PrimaryGeneratedColumn('increment', { comment: '根据通知和用户生成的id' })
  id: number;
  @Column({ type: 'int', comment: '通知id', name: 'notice_id' })
  noticeId: number;
  @Column({ comment: '接收通知的用户id', name: 'receive_id' })
  receiveId: string;
  @Column({ type: 'char', default: '0', comment: '通知状态：0-未读，1-已读' })
  status: string;
  @Column({
    type: 'timestamp',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
  @Column({
    type: 'timestamp',
    name: 'read_time',
    comment: '通知阅读时间',
    nullable: true,
  })
  readTime: Date;
}
