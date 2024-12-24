import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorator/public/public.decorator';
import { Skip } from 'src/common/decorator/skip/skip.decorator';
import { Request } from 'express';
import { AuthEnum } from 'src/common/enum';
import { ApiBearerAuth, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('鉴权模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginAuthDto })
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto, @Req() req: Request) {
    return this.authService.login(loginAuthDto, req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户信息' })
  @Get('userInfo')
  getUserInfo(@Req() req: Request) {
    return this.authService.getDetail(req);
  }

  @Public()
  @ApiOperation({ summary: '获取验证码' })
  @Get('captcha')
  @Skip()
  getCaptcha(@Res() res) {
    const { text, data } = this.authService.createCaptcha();
    res.cookie(AuthEnum.AUTH_REQUEST_COOKIE_CAPTCHA, text);
    res.send(data);
    return;
  }
}
