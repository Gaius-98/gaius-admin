import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { NoticeService } from './notice.service';
import {
  CreateNoticeDto,
  CreateNoticeUserDto,
  SearchNoticeDto,
  UpdateNoticeDto,
  UpdateNoticeUserDto,
} from './dto/notice.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Request } from 'express';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { ResListDto } from 'src/common/dto/pagination.dto';
@ApiTags('通知管理')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建通知' })
  @ApiBody({ type: CreateNoticeDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '通知管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:notice:add')
  @Post('add')
  create(@Body() createNoticeDto: CreateNoticeDto, @Req() req: Request) {
    return this.noticeService.create(createNoticeDto, req);
  }

  @ApiOperation({ summary: '创建的通知列表' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<CreateNoticeDto>,
  })
  @Permission('system:notice:list')
  @Get('list')
  findAll(@Query() params: SearchNoticeDto) {
    return this.noticeService.findAll(params);
  }

  @ApiOperation({ summary: '通知详情' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '请求成功', type: CreateNoticeDto })
  @Permission('system:notice:detail')
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.noticeService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑通知' })
  @ApiBody({ type: UpdateNoticeDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '通知管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:notice:update')
  @Post('update')
  update(@Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(updateNoticeDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除通知' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '通知管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:notice:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.noticeService.remove(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '消息通知列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<CreateNoticeUserDto>,
  })
  @Permission('private:notice:list')
  @Get('list/byUser')
  findAllByUser(@Query() params: SearchNoticeDto, @Req() req: Request) {
    return this.noticeService.findAllByUser(params, req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '消息通知列表，数量限制为3条' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<CreateNoticeUserDto>,
  })
  @Permission('private:notice:limit')
  @Get('list/ByUser/limit')
  findLimitByUser(@Req() req: Request) {
    return this.noticeService.findLimitByUser(req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取消息详情' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: UpdateNoticeUserDto,
  })
  @Permission('private:notice:detail')
  @Get('detail/byUser')
  findOneByUser(@Query('id') id: number) {
    return this.noticeService.findOneByUser(id);
  }
}
