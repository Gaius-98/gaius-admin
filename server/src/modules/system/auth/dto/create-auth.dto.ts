import { ApiProperty } from '@nestjs/swagger';
export class LoginAuthDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  captcha: string;
}
