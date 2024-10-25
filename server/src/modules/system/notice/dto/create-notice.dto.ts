import PaginationDto from 'src/common/dto/pagination.dto';
export class CreateNoticeDto {
  title: string;
  content: string;
  createBy: string;
  createTime: Date;
}

export class CreateNoticeUserDto {
  noticeId: number;
  receiveId: string;
  status: string;
  createTime: Date;
}

export class SearchNoticeDto extends PaginationDto {
  startTime: Date;
  endTime: Date;
}
