import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthEnum } from 'src/common/enum';
import { extractTokenFromHeader } from 'src/common/utils/utils';
import { RedisService } from 'src/modules/redis/redis.service';

/**
 * 认证守卫。
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtSrv: JwtService,
    private configSrv: ConfigService,
    private reflector: Reflector,
    private redisSrv: RedisService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      //即将调用的方法
      context.getHandler(),
      //controller类型
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token)
      throw new HttpException('请登录后,再进行操作。', HttpStatus.FORBIDDEN);
    try {
      await this.jwtSrv.verifyAsync(token, {
        secret: this.configSrv.get('jwt.secret'),
      });
    } catch (error) {
      throw new HttpException(
        `token验证失败,原因:${error}`,
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.redisSrv.get(
      AuthEnum.AUTH_REDIS_USER_PREFIX + token,
    );
    request[AuthEnum.AUTH_REQUEST_USER_KEY] = JSON.parse(user);
    if (!user) {
      throw new HttpException('登录过期,请重新登录。', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
