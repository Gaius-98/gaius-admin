import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/system/user/user.module';
import { RoleModule } from './modules/system/role/role.module';
import { DictModule } from './modules/system/dict/dict.module';
import { LoginLogModule } from './modules/system/login-log/login-log.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { UploadModule } from './modules/system/upload/upload.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { PermissionGuard } from './common/guards/permission/permission.guard';
import * as path from 'path';
import { SettingModule } from './modules/system/setting/setting.module';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { OrganizationModule } from './modules/system/organization/organization.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NoticeModule } from './modules/system/notice/notice.module';
import configuration from './config/index';
import { RedisModule as llRedisModule } from '@liaoliaots/nestjs-redis';
import { RedisModule } from './modules/redis/redie.module';
import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { SystemInfoModule } from './modules/system/system-info/system-info.module';
import { OperationInterceptor } from './common/interceptor/operation/operation.interceptor';
import { GeoLocationService } from './common/utils/geoip/geoLocation.service';
import IP2Region from 'ip2region';
import { OperationLogModule } from './modules/system/operation-log/operation-log.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          timezone: '+08:00',
          autoLoadEntities: true, //自动加载实体
          ...config.get('db.mysql'),
        } as TypeOrmModuleOptions;
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          global: true,
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
    llRedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            closeClient: true,
            readyLog: true,
            errorLog: true,
            config: config.get<RedisClientOptions>('redis'),
          };
        },
      },
      true,
    ),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return [
          {
            rootPath: path.join(__dirname, '..', './static'),
            serveRoot: config.get('static.base_path'),
          },
        ];
      },
    }),
    SystemInfoModule,
    RedisModule,
    UserModule,
    AuthModule,
    MenuModule,
    DictModule,
    RoleModule,
    UploadModule,
    LoginLogModule,
    SettingModule,
    OrganizationModule,
    NoticeModule,
    OperationLogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IP2Region,
    GeoLocationService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: OperationInterceptor,
    },
  ],
})
export class AppModule {}
