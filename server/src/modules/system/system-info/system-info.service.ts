import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';
@Injectable()
export class SystemInfoService {
  async findAll() {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const time = await si.time();
    const system = await si.system();
    const osInfo = await si.osInfo();
    const load = await si.currentLoad();
    const dis = await si.blockDevices();
    const fsSiz = await si.fsSize();
    return {
      cpu,
      mem,
      time,
      system,
      osInfo,
      load,
      dis,
      fsSiz,
    };
  }
}
