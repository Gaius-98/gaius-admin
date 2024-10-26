import { Controller, Get, Req, Query } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { Request } from 'express';
import { AuthEnum } from 'src/common/enum';
import { SearchLoginLogDto, UpdateAccessLogDto } from './dto/login-log.dto';
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
@ApiTags('登录日志')
@Controller('loginlog')
export class LoginLogController {
  constructor(private readonly accessLogService: LoginLogService) {}

  @ApiOperation({ summary: '登录日志列表' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '请求成功',
    type: ResListDto<UpdateAccessLogDto>,
  })
  @Permission('system:loginlog:list')
  @Get('list')
  findAll(@Query() params: SearchLoginLogDto) {
    return this.accessLogService.findAll(params);
  }
}
