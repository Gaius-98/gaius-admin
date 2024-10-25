import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_setting')
export class Setting {
  @PrimaryGeneratedColumn('increment', { comment: '标识' })
  id: number;
  @Column({ name: 'setting_key', comment: '设置项键名', unique: true })
  settingKey: string;
  @Column({ name: 'setting_value', comment: '设置项值', type: 'text' })
  settingValue: string;
  @Column({
    name: 'setting_type',
    comment: '设置项所属类型,如:system-系统配置',
  })
  settingType: string;
  @Column({ name: 'remark', comment: '备注', type: 'text', nullable: true })
  remark: string;
  @Column({ default: '1', name: 'status', comment: '状态', type: 'char' })
  status: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
