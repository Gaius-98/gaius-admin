import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorator/public/public.decorator';
import { Skip } from 'src/common/decorator/skip/skip.decorator';
import { Request } from 'express';
import { Operation } from 'src/common/decorator/operation/operation.decorator';
import { AuthEnum } from 'src/common/enum';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto, @Req() req: Request) {
    return this.authService.login(loginAuthDto, req);
  }

  @Get('userInfo')
  getUserInfo(@Req() req: Request) {
    return this.authService.getDetail(req);
  }

  @Public()
  @Get('captcha')
  @Skip()
  getCaptcha(@Res() res) {
    const { text, data } = this.authService.createCaptcha();
    res.cookie(AuthEnum.AUTH_REQUEST_COOKIE_CAPTCHA, text);
    res.send(data);
    return;
  }
}
