import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDictDto {
  @ApiPropertyOptional()
  remark?: string;
  @ApiProperty()
  dictType: string;
  @ApiProperty()
  dictTypeDesc: string;
  @ApiProperty()
  status: string;
}

export class CreateDictDataDto {
  @ApiProperty()
  label: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  sortNum: number;
  @ApiProperty()
  dictType: string;
  @ApiProperty()
  status: string;
}

export class SearchDictDto extends PaginationDto {
  @ApiPropertyOptional()
  dictType?: string;
}
export class UpdateDictDto extends CreateDictDto {
  @ApiProperty()
  id: string;
}
export class DictDataDto extends UpdateDictDto {
  @ApiPropertyOptional()
  dictDataList?: UpdateDictDataDto[];
}
export class UpdateDictDataDto extends CreateDictDataDto {
  @ApiProperty()
  id: string;
}
