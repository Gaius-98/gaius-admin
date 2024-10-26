import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SearchUserDto, UpdateUserDto, CreateUserDto } from './dto/user.dto';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
import { ResListDto } from 'src/common/dto/pagination.dto';
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Operation({
    module: '用户管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:user:add')
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '用户详情' })
  @ApiQuery({ name: 'userId', required: true, description: '用户id' })
  @ApiResponse({ status: 200, description: '请求成功', type: UpdateUserDto })
  @Permission('system:user:detail')
  @Get('detail')
  getDetail(@Query('userId') userId: string) {
    return this.userService.getDetail(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '编辑用户' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Operation({
    module: '用户管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:user:update')
  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除用户' })
  @ApiQuery({ name: 'userId', required: true, description: '用户id' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Operation({
    module: '用户管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:user:remove')
  @Get('remove')
  remove(@Query('userId') userId: string) {
    return this.userService.remove(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '用户列表' })
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateUserDto>,
  })
  @Permission('system:user:list')
  @Get('list')
  getUserList(@Query() params: SearchUserDto) {
    return this.userService.findAll(params);
  }
}
