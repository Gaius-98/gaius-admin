import { Module } from '@nestjs/common';
import { SystemInfoService } from './system-info.service';
import { SystemInfoController } from './system-info.controller';

@Module({
  controllers: [SystemInfoController],
  providers: [SystemInfoService],
})
export class SystemInfoModule {}
