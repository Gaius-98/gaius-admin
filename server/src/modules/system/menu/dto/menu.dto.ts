import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateMenuDto {
  @ApiProperty()
  label: string;
  @ApiPropertyOptional()
  pid?: string;
  @ApiProperty()
  menuType: 'app' | 'directory';
  @ApiPropertyOptional()
  desc?: string;
  @ApiPropertyOptional()
  icon?: string;
  @ApiProperty()
  sortNum: number;
  @ApiProperty()
  type: 'table' | 'page' | 'front' | 'form';
  @ApiProperty()
  openType: '_blank' | '_self';
  @ApiPropertyOptional()
  address?: string;
  @ApiPropertyOptional()
  permissionId?: string;
}
export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createTime: string;
}
export class MenuTreeDto {}
export class MenuDirDto {
  label: string;
  id: string;
  pid?: string;
  children?: MenuDirDto[];
}
