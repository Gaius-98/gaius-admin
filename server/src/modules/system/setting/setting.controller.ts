import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SearchSettingDto } from './dto/create-setting.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Public } from 'src/common/decorator/public/public.decorator';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
  @Operation({
    module: '配置管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:setting:add')
  @Post('add')
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }
  @Permission('system:setting:list')
  @Get('list')
  findAll(@Query() params: SearchSettingDto) {
    return this.settingService.findAll(params);
  }
  @Permission('system:setting:detail')
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.settingService.findOne(id);
  }
  @Operation({
    module: '配置管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:setting:update')
  @Post('update')
  update(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(updateSettingDto);
  }
  @Operation({
    module: '配置管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:setting:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.settingService.remove(+id);
  }

  @Public()
  @Get('byType')
  getSetting(@Query('type') type: string) {
    return this.settingService.findAllByType(type);
  }
}
