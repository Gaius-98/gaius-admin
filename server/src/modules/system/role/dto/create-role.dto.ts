export class CreateRoleDto {
  roleKey: string;
  roleName: string;
  roleMenus: string[];
  desc?: string;
  status: string;
  isSuper: number;
  dataPerm: string;
}
