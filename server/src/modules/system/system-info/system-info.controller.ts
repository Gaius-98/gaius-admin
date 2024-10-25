import { Controller, Get } from '@nestjs/common';
import { SystemInfoService } from './system-info.service';
import { Public } from 'src/common/decorator/public/public.decorator';
@Controller('systemInfo')
export class SystemInfoController {
  constructor(private readonly systemInfoService: SystemInfoService) {}
  @Public()
  @Get('all')
  findAll() {
    return this.systemInfoService.findAll();
  }
}
