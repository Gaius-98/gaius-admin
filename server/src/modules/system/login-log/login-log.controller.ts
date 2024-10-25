import { Controller, Get, Req, Query } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { Request } from 'express';
import { AuthEnum } from 'src/common/enum';
import { SearchLoginLogDto } from './dto/create-login-log.dto';
import { Permission } from 'src/common/decorator/permission/permission.decorator';

@Controller('loginlog')
export class LoginLogController {
  constructor(private readonly accessLogService: LoginLogService) {}

  @Permission('system:loginlog:list')
  @Get('list')
  findAll(@Query() params: SearchLoginLogDto) {
    return this.accessLogService.findAll(params);
  }
}
