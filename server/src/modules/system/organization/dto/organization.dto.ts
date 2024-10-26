import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateOrganizationDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  pid: number;
  @ApiProperty()
  ancestors: string;
  @ApiProperty()
  status: string;
  @ApiPropertyOptional()
  remark?: string;
  @ApiProperty()
  sortNum: number;
}
export class UpdateOrganizationDto extends CreateOrganizationDto {
  @ApiProperty()
  id: number;
}
export class OrgTreeDto extends UpdateOrganizationDto {
  @ApiPropertyOptional({ isArray: true })
  children?: UpdateOrganizationDto[];
}
