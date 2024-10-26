import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, RoleDictDto, UpdateRoleDto } from './dto/role.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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
@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建角色' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '角色管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:role:add')
  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '角色列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateRoleDto>,
  })
  @Permission('system:role:list')
  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.roleService.findAll(params);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '角色详情' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '请求成功', type: UpdateRoleDto })
  @Permission('system:role:detail')
  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.roleService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑角色' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '角色管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:role:update')
  @Post('update')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除角色' })
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '角色管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:role:remove')
  @Get('remove')
  remove(@Query('id') id: string) {
    return this.roleService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有角色' })
  @ApiResponse({
    status: 200,
    description: '获取角色字典',
    type: RoleDictDto,
    isArray: true,
  })
  @Get('dict')
  get() {
    return this.roleService.findRoleDict();
  }
}
