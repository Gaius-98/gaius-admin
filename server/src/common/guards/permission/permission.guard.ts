import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import { AuthEnum } from 'src/common/enum';
import { RedisService } from 'src/modules/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private redisSrv: RedisService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.getAllAndOverride<boolean>('permission', [
      //即将调用的方法
      context.getHandler(),
      //controller类型
      context.getClass(),
    ]);
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const permissions = request[AuthEnum.AUTH_REQUEST_USER_KEY]?.permissions;
    if (permissions.some((perm) => perm == permission || perm === '*')) {
      return true;
    } else {
      throw new HttpException(`无权限访问`, HttpStatus.FORBIDDEN);
    }
  }
}
