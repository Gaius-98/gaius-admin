import PaginationDto from 'src/common/dto/pagination.dto';
export class CreateOperationLogDto {}
export class SearchOperationDto extends PaginationDto {
  startTime?: Date;
  endTime?: Date;
}
