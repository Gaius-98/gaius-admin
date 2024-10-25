import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import encrypt from 'src/common/utils/encrypt';
@Entity('sys_user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id', comment: '用户Id' })
  userId: string;
  @Column({ length: 32, comment: '用户名', unique: true })
  username: string;
  @Column({ comment: '密码' })
  password: string;
  @Column({ nullable: true, comment: '联系邮箱' })
  email: string;
  @Column({ nullable: true, comment: '联系电话' })
  phone: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;
  @Column({
    comment: '所属机构id',
    name: 'org_id',
    type: 'int',
    nullable: true,
  })
  orgId: number;
  @Column({ comment: '昵称' })
  name: string;
  @Column({ nullable: true, comment: '头像' })
  avatar: string;
  @Column({ comment: '盐' })
  salt: string;
  @Column({ default: '1', name: 'status', comment: '状态', type: 'char' })
  status: string;
  @BeforeInsert()
  beforeInsert() {
    this.salt = (Math.random() * 10000).toFixed(0);
    this.password = encrypt(this.password, this.salt);
  }
}
@Entity('sys_user_role')
export class UserRole {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ name: 'user_id', comment: '' })
  userId: string;
  @Column({ name: 'role_id', comment: '' })
  roleId: string;
}
