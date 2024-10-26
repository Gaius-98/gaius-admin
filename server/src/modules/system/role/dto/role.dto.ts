import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty()
  roleKey: string;
  @ApiProperty()
  roleName: string;
  @ApiProperty({ type: [String] })
  roleMenus: string[];
  @ApiPropertyOptional()
  desc?: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  isSuper: number;
  @ApiProperty()
  dataPerm: string;
}
export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty()
  roleId: string;
}
export class RoleDictDto {
  @ApiProperty()
  roleId: string;
  @ApiProperty()
  roleName: string;
  @ApiProperty()
  roleKey: string;
}
