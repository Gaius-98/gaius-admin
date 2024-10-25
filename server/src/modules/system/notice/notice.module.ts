import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice, NoticeUser } from './entities/notice.entity';
@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
  imports: [TypeOrmModule.forFeature([Notice, NoticeUser])],
  exports: [NoticeService],
})
export class NoticeModule {}
