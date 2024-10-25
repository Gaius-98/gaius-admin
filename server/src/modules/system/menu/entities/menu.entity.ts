import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid', { comment: '菜单id、权限点id' })
  id: string;
  @Column({ length: 32, comment: '名称' })
  label: string;
  @Column({ name: 'parent_id', nullable: true, comment: '上级id' })
  pid: string;
  @Column({
    name: 'menu_type',
    comment: '类型：directory-目录，app-菜单，permission-权限点',
  })
  menuType: string;
  @Column({ name: 'route_address', nullable: true, comment: '路由地址' })
  address: string;
  @Column({ nullable: true, comment: '备注' })
  remark: string;
  @Column({ nullable: true, comment: '图标' })
  icon: string;
  @Column({
    name: 'permission_id',
    comment: '权限标识',
    nullable: true,
  })
  permissionId: string;
  @Column({ name: 'sort_num', comment: '排序号', type: 'int' })
  sortNum: number;
  @Column({
    comment:
      '页面类型：table-表格，front-普通页面，page-仪表板页面，form-表单页面,iframe-嵌入页 ',
  })
  type: string;
  @Column({ comment: '菜单打开方式: _blank-新页面，_self-本页面' })
  openType: string;
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
