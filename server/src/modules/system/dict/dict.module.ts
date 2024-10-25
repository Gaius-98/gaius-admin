import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictType, DictData } from './entities/dict.entity';
@Module({
  controllers: [DictController],
  providers: [DictService],
  imports: [TypeOrmModule.forFeature([DictType, DictData])],
})
export class DictModule {}
