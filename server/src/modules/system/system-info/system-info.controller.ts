import { Controller, Get } from '@nestjs/common';
import { SystemInfoService } from './system-info.service';
import { Public } from 'src/common/decorator/public/public.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('系统信息')
@Controller('systemInfo')
export class SystemInfoController {
  constructor(private readonly systemInfoService: SystemInfoService) {}
  @ApiOperation({ summary: '获取服务器信息' })
  @Public()
  @Get('all')
  findAll() {
    return this.systemInfoService.findAll();
  }
}
