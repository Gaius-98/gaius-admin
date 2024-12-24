import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
export interface Response<T> {
  data: T;
}

/**
 * 转换拦截器，用于统一返回数据格式。
 *
 * @export
 * @class TransformInterceptor
 * @implements {NestInterceptor}
 * @template T
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const skipInterceptor = this.reflector.get<boolean>(
      'skip',
      context.getHandler(),
    );
    if (skipInterceptor) {
      // 跳过全局拦截器的处理
      return next.handle();
    }
    return next
      .handle()
      .pipe(map((data) => ({ code: 200, data, msg: '请求成功' })));
  }
}
