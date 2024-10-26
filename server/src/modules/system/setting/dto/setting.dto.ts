import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateSettingDto {
  @ApiProperty()
  settingKey: string;
  @ApiProperty()
  settingValue: string;
  @ApiProperty()
  settingType: string;
  @ApiPropertyOptional()
  remark?: string;
  @ApiProperty()
  status: string;
}
export class SearchSettingDto extends PaginationDto {
  @ApiPropertyOptional()
  settingType?: string;
}
export class UpdateSettingDto extends CreateSettingDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createTime: Date;
}
