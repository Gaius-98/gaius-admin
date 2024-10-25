import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_role')
export class Role {
  @PrimaryGeneratedColumn('uuid', { name: 'role_id', comment: '权限id' })
  roleId: string;
  @Column({ name: 'role_key', comment: '权限标识', unique: true })
  roleKey: string;
  @Column({ name: 'role_name', comment: '权限名称' })
  roleName: string;
  @Column({ nullable: true, comment: '备注' })
  remark: string;
  @Column({ default: '1', name: 'status', comment: '状态', type: 'char' })
  status: string;
  @Column({ default: 0, name: 'is_super', comment: '是否超级管理员' })
  isSuper: number;
  @Column({
    default: '4',
    type: 'char',
    name: 'data_perm',
    comment:
      '数据权限:  1-所有机构数据权限,2-本机构及下属机构数据权限,3-仅限本机构数据权限,4-仅限本人权限',
  })
  dataPerm: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
}
@Entity('sys_role_menu')
export class RoleMenu {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ name: 'role_id' })
  roleId: string;
  @Column({ name: 'menu_id' })
  menuId: string;
}
