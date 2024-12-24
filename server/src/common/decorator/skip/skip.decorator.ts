import { SetMetadata } from '@nestjs/common';

/**
 * 跳过装饰器，用于设置跳过元数据。
 *
 * @param args - 跳过字符串数组。
 * @returns 返回一个装饰器函数，用于设置跳过元数据。
 */
export const Skip = (...args: string[]) => SetMetadata('skip', args);
