export class CreateUserDto {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  name: string;
  avatar?: string;
  status: string;
  roleIds?: string[];
}
