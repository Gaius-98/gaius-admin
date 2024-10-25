import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_dict_type')
export class DictType {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true, comment: '备注' })
  remark: string;
  @Column({ name: 'dict_type', unique: true, comment: '字典类型值' })
  dictType: string;
  @Column({ name: 'dict_type_desc', comment: '字典类型翻译' })
  dictTypeDesc: string;
  @Column({ default: '1', name: 'status', comment: '状态', type: 'char' })
  status: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
}
@Entity('sys_dict_data')
export class DictData {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: '字典翻译' })
  label: string;
  @Column({ comment: '字典值' })
  value: string;
  @Column({ name: 'sort_num', comment: '排序号' })
  sortNum: number;
  @Column({ default: '1', name: 'status', comment: '状态', type: 'char' })
  status: string;

  @Column({ name: 'dict_type_id', comment: '所属字典类型id' })
  dictTypeId: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
}
