import { Module } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { LoginLogController } from './login-log.controller';
import { LoginLog } from './entities/login-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoLocationService } from 'src/common/utils/geoip/geoLocation.service';
import IP2Region from 'ip2region';
@Module({
  controllers: [LoginLogController],
  providers: [LoginLogService, GeoLocationService, IP2Region],
  imports: [TypeOrmModule.forFeature([LoginLog])],
  exports: [LoginLogService],
})
export class LoginLogModule {}
