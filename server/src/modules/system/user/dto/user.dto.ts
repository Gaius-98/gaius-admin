import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email?: string;
  @ApiPropertyOptional()
  phone?: string;
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  avatar?: string;
  @ApiProperty()
  status: string;
  @ApiPropertyOptional({
    type: [String],
  })
  roleIds?: string[];
  @ApiPropertyOptional({
    type: Number,
  })
  orgId?: number;
}

export class SearchUserDto extends PaginationDto {
  @ApiPropertyOptional({
    type: Number,
  })
  orgId?: number;
}
export class UpdateUserDto extends CreateUserDto {
  @ApiProperty()
  userId: string;
}
