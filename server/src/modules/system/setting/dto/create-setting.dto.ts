import PaginationDto from 'src/common/dto/pagination.dto';
export class CreateSettingDto {
  settingKey: string;
  settingValue: string;
  settingType: string;
  remark?: string;
  status: string;
}
export class SearchSettingDto extends PaginationDto {
  settingType: string;
}
