import { SetMetadata } from '@nestjs/common';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
export interface OperationType {
  module: string;
  action: OptTypeEnum;
}
export const Operation = (arg: OperationType) => SetMetadata('operation', arg);
