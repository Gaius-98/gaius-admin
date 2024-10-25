import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeDto, CreateNoticeUserDto } from './create-notice.dto';

export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
  id: number;
}
export class UpdateNoticeUserDto extends PartialType(CreateNoticeUserDto) {
  id: number;
  readTime: Date;
}
