import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/modules/redis/redis.service';
import { RoleModule } from '../role/role.module';
import { MenuModule } from '../menu/menu.module';
import { LoginLogModule } from '../login-log/login-log.module';
import { OrganizationModule } from '../organization/organization.module';
import { NoticeModule } from '../notice/notice.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService, RedisService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
        };
      },
    }),
    RoleModule,
    MenuModule,
    LoginLogModule,
    OrganizationModule,
    NoticeModule,
  ],
})
export class AuthModule {}
