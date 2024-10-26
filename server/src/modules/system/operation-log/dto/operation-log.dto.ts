import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OptTypeEnum } from 'src/common/enum';
export class CreateOperationLogDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  ip: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  reqType: string;
  @ApiProperty()
  reqUrl: string;
  @ApiProperty()
  reqParam: string;
  @ApiProperty()
  moduleName: string;
  @ApiProperty()
  funcName: string;
  @ApiProperty()
  optModule: string;
  @ApiProperty()
  optType: string;
  @ApiProperty()
  resStatus: string;
  @ApiProperty()
  resTime: string;
  @ApiProperty()
  res: string;
  @ApiPropertyOptional()
  errMsg: string;
}
export class UpdateOperationLogDto extends CreateOperationLogDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createTime: Date;
}
export class SearchOperationDto extends PaginationDto {
  @ApiPropertyOptional()
  startTime?: Date;
  @ApiPropertyOptional()
  endTime?: Date;
}
