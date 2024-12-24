import { SetMetadata } from '@nestjs/common';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
/**
 * 操作类型。
 */
export interface OperationType {
  module: string;
  action: OptTypeEnum;
}
/**
 * 操作装饰器，用于设置操作元数据。
 *
 * @param arg - 操作元数据。
 * @returns 返回一个装饰器函数，用于设置操作元数据。
 */
export const Operation = (arg: OperationType) => SetMetadata('operation', arg);
