import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateNoticeDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createBy: string;
}

export class CreateNoticeUserDto {
  @ApiProperty()
  noticeId: number;
  @ApiProperty()
  receiveId: string;
  @ApiProperty()
  status: string;
}

export class SearchNoticeDto extends PaginationDto {
  @ApiPropertyOptional()
  startTime?: Date;
  @ApiPropertyOptional()
  endTime?: Date;
}
export class UpdateNoticeDto extends CreateNoticeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createTime: Date;
}
export class UpdateNoticeUserDto extends CreateNoticeUserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  readTime: Date;
  @ApiProperty()
  createTime: Date;
}
