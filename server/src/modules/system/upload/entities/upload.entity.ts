import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('sys_upload')
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'file_name', comment: '文件名' })
  filename: string;
  @Column({ name: 'original_name', comment: '文件原始名称' })
  originalname: string;
  @Column({ name: 'path', comment: '上传文件地址' })
  path: string;
  @Column({ name: 'size', comment: '文件大小' })
  size: number;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
