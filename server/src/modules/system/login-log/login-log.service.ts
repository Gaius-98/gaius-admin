import { Injectable } from '@nestjs/common';
import * as useragent from 'useragent';
import { LoginLog } from './entities/login-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { geoLocationService } from 'src/common/utils/geoip/geoLocation.service';
import { Like, Repository, In, QueryBuilder, Between } from 'typeorm';
import { Request } from 'express';
import { AuthEnum } from 'src/common/enum';
import { User } from '../user/entities/user.entity';
import { SearchLoginLogDto } from './dto/login-log.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { getIp } from 'src/common/utils/utils';
@Injectable()
export class LoginLogService {
  constructor(
    private locationSrv: geoLocationService,
    @InjectRepository(LoginLog)
    private LogRepository: Repository<LoginLog>,
  ) {}
  async create(req: Request, userInfo: User) {
    const ip = getIp(req);

    const address = this.locationSrv.getLocationByIp(ip);
    const userAgent = useragent.parse(req.headers['user-agent']);

    const logData = await this.LogRepository.create({
      ip,
      address,
      browser: userAgent.toAgent(),
      os: userAgent.os.toJSON().family,
      username: userInfo.username,
    });
    try {
      await this.LogRepository.save(logData);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(params: SearchLoginLogDto) {
    const { pageNumber, pageSize, startTime, endTime, keyword } = params;
    try {
      const where = {
        ip: Like(`%${keyword}%`),
      };
      if (startTime && endTime) {
        where['createTime'] = Between(startTime, endTime);
      }
      const list = await this.LogRepository.findAndCount({
        where,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
          createTime: 'DESC',
        },
      });

      return {
        data: list[0],
        total: list[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findLastLogin(username: string) {
    try {
      const data = await this.LogRepository.findOne({
        where: {
          username,
        },
        order: {
          createTime: 'DESC',
        },
      });
      return data.ip;
    } catch (error) {}
  }
}
