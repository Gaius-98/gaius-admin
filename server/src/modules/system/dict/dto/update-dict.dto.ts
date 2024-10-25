import { PartialType } from '@nestjs/mapped-types';
import { CreateDictDto, CreateDictDataDto } from './create-dict.dto';

export class UpdateDictDto extends PartialType(CreateDictDto) {
  id: string;
}
export class UpdateDictDataDto extends PartialType(CreateDictDataDto) {
  id: string;
}
