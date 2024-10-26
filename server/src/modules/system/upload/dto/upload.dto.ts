import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export class CreateUploadDto {
  @ApiProperty()
  path: string;
  @ApiProperty()
  filename: string;
  @ApiProperty()
  originalname: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  createTime: Date;
}
export class UpdateUploadDto extends CreateUploadDto {
  @ApiProperty()
  id: string;
}

export class SearchUploadDto extends PaginationDto {}
