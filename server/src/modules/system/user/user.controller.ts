import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Request } from 'express';
import { AuthEnum } from 'src/common/enum';
import { Permission } from 'src/common/decorator/permission/permission.decorator';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { OptTypeEnum } from 'src/common/enum/opt.enum';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Operation({
    module: '用户管理',
    action: OptTypeEnum.INSERT,
  })
  @Permission('system:user:add')
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Permission('system:user:detail')
  @Get('detail')
  getDetail(@Query('userId') userId: string) {
    return this.userService.getDetail(userId);
  }
  @Operation({
    module: '用户管理',
    action: OptTypeEnum.UPDATE,
  })
  @Permission('system:user:update')
  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
  @Operation({
    module: '用户管理',
    action: OptTypeEnum.DELETE,
  })
  @Permission('system:user:remove')
  @Get('remove')
  remove(@Query('userId') userId: string) {
    return this.userService.remove(userId);
  }
  @Permission('system:user:list')
  @Get('list')
  getUserList(@Query() params: SearchUserDto) {
    return this.userService.findAll(params);
  }
}
