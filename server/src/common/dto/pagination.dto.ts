import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class PaginationDto {
  @ApiProperty({ default: 1 })
  pageNumber: number;
  @ApiProperty({ default: 10 })
  pageSize: number;
  @ApiPropertyOptional()
  keyword?: string;
}
export class ResListDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];
  @ApiProperty()
  total: number;
}
