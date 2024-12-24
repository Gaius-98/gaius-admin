import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 分页 DTO。
 */
export class PaginationDto {
  @ApiProperty({ default: 1 })
  pageNumber: number;
  @ApiProperty({ default: 10 })
  pageSize: number;
  @ApiPropertyOptional()
  keyword?: string;
}

/**
 * 分页响应 DTO。
 */
export class ResListDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];
  @ApiProperty()
  total: number;
}
