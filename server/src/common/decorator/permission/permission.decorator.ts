import { SetMetadata } from '@nestjs/common';

/**
 * 权限装饰器，用于设置权限元数据。
 *
 * @param args - 权限字符串数组。
 * @returns 返回一个装饰器函数，用于设置权限元数据。
 */
export const Permission = (...args: string[]) =>
  SetMetadata('permission', args);
