import { SetMetadata } from '@nestjs/common';
/**
 * 一个装饰器，用于标记一个路由或控制器为公共的，意味着它不需要身份验证。
 *
 * @param {...string[]} args - 可以传递给装饰器的可选参数。
 * @returns {CustomDecorator<string>} - 设置 'public' 元数据键的自定义装饰器。
 */
export const Public = (...args: string[]) => SetMetadata('public', args);
