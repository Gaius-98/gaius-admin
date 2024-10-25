import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
@Module({
  controllers: [SettingController],
  providers: [SettingService],
  imports: [TypeOrmModule.forFeature([Setting])],
})
export class SettingModule {}
