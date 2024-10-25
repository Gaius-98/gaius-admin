import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_org')
export class Organization {
  @PrimaryGeneratedColumn('increment', { comment: '机构id' })
  id: number;
  @Column({ length: 32, comment: '机构名称', name: 'org_name' })
  name: string;
  @Column({
    type: 'int',
    name: 'parent_id',
    comment: '父级机构id',
    nullable: true,
  })
  pid: number;
  @Column({ comment: '祖级列表', nullable: true })
  ancestors: string;
  @Column({ comment: '状态', default: '1', type: 'char' })
  status: string;
  @Column({ comment: '备注', nullable: true })
  remark: string;
  @Column({ comment: '排序', type: 'int', name: 'sort_num' })
  sortNum: number;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
}
