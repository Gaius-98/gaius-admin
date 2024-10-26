import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, MenuDirDto, UpdateMenuDto } from './dto/menu.dto';
import { Request } from 'express';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
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
@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建菜单' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '菜单管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:menu:add')
  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '菜单列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateMenuDto>,
  })
  @Permission('system:menu:list')
  @Get('list')
  findAll(@Query('keyword') keyword: string) {
    return this.menuService.findAll(keyword);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '菜单详情' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '请求成功', type: UpdateMenuDto })
  @Permission('system:menu:detail')
  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.menuService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑菜单' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '菜单管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:menu:update')
  @Post('update')
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除菜单' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '菜单管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:menu:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.menuService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有菜单目录' })
  @ApiResponse({ status: 200, type: MenuDirDto, isArray: true })
  @Get('directory')
  getAllDirectory() {
    return this.menuService.findAllDirectory();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有菜单' })
  @ApiResponse({ status: 200, type: MenuDirDto, isArray: true })
  @Get('all')
  getAllMenu() {
    return this.menuService.findAllMenu();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '通过用户获取菜单' })
  @ApiResponse({ status: 200, type: MenuDirDto, isArray: true })
  @Get()
  getMenu(@Req() req: Request) {
    return this.menuService.findSysMenuByUser(req);
  }
}
