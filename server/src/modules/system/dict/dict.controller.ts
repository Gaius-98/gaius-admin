import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DictService } from './dict.service';
import { CreateDictDto, CreateDictDataDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { SearchDictDto } from './dto/search-dict.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}
  @Operation({
    module: '字典类型管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:dict:add')
  @Post('add/type')
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }
  @Operation({
    module: '字典管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:dict:add')
  @Post('add/data')
  createData(@Body() createDictDataDto: CreateDictDataDto) {
    return this.dictService.createDictData(createDictDataDto);
  }
  @Permission('system:dict:list')
  @Get('list/type')
  findAll(@Query() params: SearchDictDto) {
    return this.dictService.findAll(params);
  }
  @Permission('system:dict:detail')
  @Get('detail/type')
  findOne(@Query('id') id: string) {
    return this.dictService.findOne(id);
  }
  @Permission('system:dict:detail')
  @Get('detail/data')
  findDataOne(@Query('id') id: string) {
    return this.dictService.findDataOne(id);
  }
  @Operation({
    module: '字典类型管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:dict:update')
  @Post('update/type')
  update(@Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(updateDictDto);
  }
  @Operation({
    module: '字典管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:dict:update')
  @Post('update/data')
  updateData(@Body() updateDictDto: UpdateDictDto) {
    return this.dictService.updateData(updateDictDto);
  }
  @Operation({
    module: '字典类型管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:dict:remove')
  @Get('remove/type')
  remove(@Query('id') id: string) {
    return this.dictService.remove(id);
  }
  @Operation({
    module: '字典管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:dict:remove')
  @Get('remove/data')
  removeData(@Query('id') id: string) {
    return this.dictService.removeData(id);
  }
  @Get('dictByType')
  findByType(@Query('dictType') dictTypes: string[]) {
    return this.dictService.findByTypes(dictTypes);
  }
  @Get('dictTypeList')
  findDictTypeList() {
    return this.dictService.findAllDirectory();
  }
}
