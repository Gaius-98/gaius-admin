import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enum';
import encrypt from 'src/common/utils/encrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as svgCaptcha from 'svg-captcha';
import { RedisService } from 'src/modules/redis/redis.service';
import { AuthEnum } from 'src/common/enum';
import { Request } from 'express';
import { RoleService } from '../role/role.service';
import { MenuService } from '../menu/menu.service';
import { extractTokenFromHeader } from 'src/common/utils/utils';
import { isSuper } from 'src/common/utils/utils';
import { LoginLogService } from '../login-log/login-log.service';
import { OrganizationService } from '../organization/organization.service';
import { NoticeService } from '../notice/notice.service';
import { getIp } from 'src/common/utils/utils';
@Injectable()
export class AuthService {
  constructor(
    private userSrv: UserService,
    private jwtSrv: JwtService,
    private configSrv: ConfigService,
    private redisSrv: RedisService,
    private roleSrv: RoleService,
    private menuSrv: MenuService,
    private loginLogSrv: LoginLogService,
    private orgSrv: OrganizationService,
    private noticeSrv: NoticeService,
  ) {}
  async login(loginAuthDto: LoginAuthDto, req: Request) {
    const { username, password, captcha } = loginAuthDto;
    const user = await this.userSrv.findOneByUserName(username);
    const captchaCode = req.cookies[AuthEnum.AUTH_REQUEST_COOKIE_CAPTCHA];
    if (captchaCode == captcha) {
      if (user) {
        const { salt, password: realPassword } = user;
        if (realPassword == encrypt(password, salt)) {
          try {
            const token = await this.jwtSrv.signAsync(
              { username },
              {
                secret: this.configSrv.get('jwt.secret'),
              },
            );
            const roleIds = await this.userSrv.getRoleIdByUserId(user.userId);
            let org;
            if (user.orgId) {
              org = await this.orgSrv.findOne(user.orgId);
            }
            const roles = await this.roleSrv.findByRoleId(roleIds);
            let menuIds = [];
            let permissions = [];
            if (isSuper(roles)) {
              menuIds = ['*'];
              permissions = ['*'];
            } else {
              menuIds = await this.roleSrv.findPermissionByRoleId(roleIds);
              permissions = await this.menuSrv.findPermissionByMenuIds(menuIds);
            }

            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            user['loginIp'] = getIp(req);
            user['lastLoginIp'] =
              await this.loginLogSrv.findLastLogin(username);
            this.redisSrv.set(
              AuthEnum.AUTH_REDIS_USER_PREFIX + token,
              { user, permissions, roles, menuIds, org },
              1000 * 60 * 60,
            );
            this.noticeSrv.createNoticeByUser(user);
            this.loginLogSrv.create(req, user);
            return token;
          } catch (error) {
            throw new ApiException(error, ApiErrorCode.ERROR_OTHER);
          }
        } else {
          throw new ApiException('密码错误', ApiErrorCode.ERROR_OTHER);
        }
      } else {
        throw new ApiException('此用户不存在', ApiErrorCode.ERROR_OTHER);
      }
    } else {
      throw new ApiException('验证码错误', ApiErrorCode.ERROR_OTHER);
    }
  }
  createCaptcha() {
    return svgCaptcha.createMathExpr({
      size: 4,
      noise: 0,
      width: 80,
      height: 28,
      fontSize: 35,
    });
  }
  async getDetail(req: Request) {
    const token = extractTokenFromHeader(req);
    const data = await this.redisSrv.get(
      AuthEnum.AUTH_REDIS_USER_PREFIX + token,
    );
    return JSON.parse(data);
  }
}
