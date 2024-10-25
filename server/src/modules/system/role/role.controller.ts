import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Operation({
    module: '角色管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:role:add')
  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @Permission('system:role:list')
  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.roleService.findAll(params);
  }
  @Permission('system:role:detail')
  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.roleService.findOne(id);
  }
  @Operation({
    module: '角色管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:role:update')
  @Post('update')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }
  @Operation({
    module: '角色管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:role:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.roleService.remove(id);
  }
  @Get('dict')
  get() {
    return this.roleService.findRoleDict();
  }
}
