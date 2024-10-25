import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto, SearchNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Request } from 'express';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Operation({
    module: '通知管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:notice:add')
  @Post('add')
  create(@Body() createNoticeDto: CreateNoticeDto, @Req() req: Request) {
    return this.noticeService.create(createNoticeDto, req);
  }
  @Permission('system:notice:list')
  @Get('list')
  findAll(@Query() params: SearchNoticeDto) {
    return this.noticeService.findAll(params);
  }
  @Permission('system:notice:detail')
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.noticeService.findOne(id);
  }
  @Operation({
    module: '通知管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:notice:update')
  @Post('update')
  update(@Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(updateNoticeDto);
  }
  @Operation({
    module: '通知管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:notice:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.noticeService.remove(+id);
  }

  @Permission('private:notice:list')
  @Get('list/byUser')
  findAllByUser(@Query() params: SearchNoticeDto, @Req() req: Request) {
    return this.noticeService.findAllByUser(params, req);
  }

  @Permission('private:notice:limit')
  @Get('list/ByUser/limit')
  findLimitByUser(@Req() req: Request) {
    return this.noticeService.findLimitByUser(req);
  }

  @Permission('private:notice:detail')
  @Get('detail/byUser')
  findOneByUser(@Query('id') id: number) {
    return this.noticeService.findOneByUser(id);
  }
}
