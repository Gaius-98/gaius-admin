import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateAccessLogDto {
  @ApiProperty()
  ip: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  os: string;
  @ApiProperty()
  browser: string;
}
export class UpdateAccessLogDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createTime: string;
}
export class SearchLoginLogDto extends PaginationDto {
  @ApiPropertyOptional()
  startTime?: Date;
  @ApiPropertyOptional()
  endTime?: Date;
}
