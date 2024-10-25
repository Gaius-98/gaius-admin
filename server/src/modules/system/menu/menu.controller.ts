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
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Request } from 'express';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Operation({
    module: '菜单管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:menu:add')
  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Permission('system:menu:list')
  @Get('list')
  findAll(@Query('keyword') keyword: string) {
    return this.menuService.findAll(keyword);
  }

  @Get('user/list')
  findMenuByUser(@Req() req: Request) {
    return this.menuService.findAllByUser(req['username']);
  }

  @Permission('system:menu:detail')
  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.menuService.findOne(id);
  }
  @Operation({
    module: '菜单管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:menu:update')
  @Post('update')
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }
  @Operation({
    module: '菜单管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:menu:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.menuService.remove(id);
  }
  @Get('directory')
  getAllDirectory() {
    return this.menuService.findAllDirectory();
  }

  @Get('all')
  getAllMenu() {
    return this.menuService.findAllMenu();
  }

  @Get()
  getMent(@Req() req: Request) {
    return this.menuService.findSysMenuByUser(req);
  }
}
