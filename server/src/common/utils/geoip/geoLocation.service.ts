import { Injectable } from '@nestjs/common';
import IP2Region from 'ip2region';

/**
 * 地理位置服务。
 */
@Injectable()
export class GeoLocationService {
  constructor(private ip2region: IP2Region) {}
  /**
   * 获取IP地址的地理位置。
   * @param ip - 要查询的IP地址。
   * @returns 返回IP地址对应的省市信息，如果未找到则返回null。
   */
  getLocationByIp(ip: string): string | null {
    const ipinfo = this.ip2region.search(ip);
    if (ipinfo) {
      return ipinfo.province + ipinfo.city;
    } else {
      return null;
    }
  }
}
