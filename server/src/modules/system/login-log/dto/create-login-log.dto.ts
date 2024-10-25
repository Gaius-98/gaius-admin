import PaginationDto from 'src/common/dto/pagination.dto';
export class CreateAccessLogDto {
  ip: string;
  location: string;
  createTime: string;
  username: string;
}

export class SearchLoginLogDto extends PaginationDto {
  startTime: Date;
  endTime: Date;
}
