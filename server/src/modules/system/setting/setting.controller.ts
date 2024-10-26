import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { SettingService } from './setting.service';
import {
  CreateSettingDto,
  UpdateSettingDto,
  SearchSettingDto,
} from './dto/setting.dto';
import { ResListDto } from 'src/common/dto/pagination.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Public } from 'src/common/decorator/public/public.decorator';
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
@ApiTags('配置管理')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建配置' })
  @ApiBody({ type: CreateSettingDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '配置管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:setting:add')
  @Post('add')
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '配置列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateSettingDto>,
  })
  @Permission('system:setting:list')
  @Get('list')
  findAll(@Query() params: SearchSettingDto) {
    return this.settingService.findAll(params);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '配置详情' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '请求成功', type: UpdateSettingDto })
  @Permission('system:setting:detail')
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.settingService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑配置' })
  @ApiBody({ type: UpdateSettingDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '配置管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:setting:update')
  @Post('update')
  update(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(updateSettingDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除配置' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '配置管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:setting:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.settingService.remove(+id);
  }

  @ApiOperation({ summary: '根据配置类型获取所有配置' })
  @Public()
  @Get('byType')
  getSetting(@Query('type') type: string) {
    return this.settingService.findAllByType(type);
  }
}
