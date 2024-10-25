export class CreateOrganizationDto {
  name: string;
  pid: number;
  ancestors: string;
  status: string;
  remark?: string;
  sortNum: number;
}
