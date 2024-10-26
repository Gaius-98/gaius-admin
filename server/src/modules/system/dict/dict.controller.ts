import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DictService } from './dict.service';
import {
  CreateDictDto,
  CreateDictDataDto,
  UpdateDictDto,
  SearchDictDto,
  DictDataDto,
  UpdateDictDataDto,
} from './dto/dict.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { ResListDto } from 'src/common/dto/pagination.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@ApiTags('字典管理')
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建字典类型' })
  @ApiBody({ type: CreateDictDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '字典类型管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:dict:add')
  @Post('add/type')
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建字典' })
  @ApiBody({ type: CreateDictDataDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '字典管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:dict:add')
  @Post('add/data')
  createData(@Body() createDictDataDto: CreateDictDataDto) {
    return this.dictService.createDictData(createDictDataDto);
  }

  @ApiOperation({ summary: '字典列表' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<DictDataDto>,
  })
  @Permission('system:dict:list')
  @Get('list/type')
  findAll(@Query() params: SearchDictDto) {
    return this.dictService.findAll(params);
  }

  @ApiOperation({ summary: '字典类型详情' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '请求成功', type: UpdateDictDto })
  @Permission('system:dict:detail')
  @Get('detail/type')
  findOne(@Query('id') id: string) {
    return this.dictService.findOne(id);
  }

  @ApiOperation({ summary: '字典详情' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: UpdateDictDataDto,
  })
  @Permission('system:dict:detail')
  @Get('detail/data')
  findDataOne(@Query('id') id: string) {
    return this.dictService.findDataOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑字典类型' })
  @ApiBody({ type: UpdateDictDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '字典类型管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:dict:update')
  @Post('update/type')
  update(@Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(updateDictDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑字典' })
  @ApiBody({ type: UpdateDictDataDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '字典管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:dict:update')
  @Post('update/data')
  updateData(@Body() updateDictDto: UpdateDictDto) {
    return this.dictService.updateData(updateDictDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除字典类型' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '字典类型管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:dict:remove')
  @Get('remove/type')
  remove(@Query('id') id: string) {
    return this.dictService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除字典' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '字典管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:dict:remove')
  @Get('remove/data')
  removeData(@Query('id') id: string) {
    return this.dictService.removeData(id);
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'dictType', required: true })
  @ApiOperation({ summary: '根绝字典类型获取字典' })
  @Get('dictByType')
  findByType(@Query('dictType') dictTypes: string[]) {
    return this.dictService.findByTypes(dictTypes);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有字典类型' })
  @Get('dictTypeList')
  findDictTypeList() {
    return this.dictService.findAllDirectory();
  }
}
