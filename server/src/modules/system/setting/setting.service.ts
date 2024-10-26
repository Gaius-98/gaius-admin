import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateSettingDto,
  UpdateSettingDto,
  SearchSettingDto,
} from './dto/setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Like, Repository } from 'typeorm';
import { ApiErrorCode } from 'src/common/enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}
  async create(createSettingDto: CreateSettingDto) {
    const setting = await this.settingRepository.create(createSettingDto);
    try {
      return await this.settingRepository.save(setting);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: SearchSettingDto) {
    try {
      const { keyword, pageNumber, pageSize, settingType } = params;

      const list = await this.settingRepository.findAndCount({
        where: {
          settingKey: Like(`%${keyword}%`),
          settingValue: Like(`%${keyword}%`),
          remark: Like(`%${keyword}%`),
          settingType,
        },
        order: {
          createTime: 'DESC',
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return {
        data: list[0],
        total: list[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    const setting = await this.settingRepository.findOne({
      where: { id },
    });

    if (!setting)
      throw new ApiException('配置不存在', ApiErrorCode.ERROR_OTHER);
    return setting;
  }

  async update(updateSettingDto: UpdateSettingDto) {
    try {
      return await this.settingRepository.save(updateSettingDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const setting = await this.settingRepository.findOne({
      where: { id },
    });
    if (!setting)
      throw new ApiException(`配置不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    return await this.settingRepository.remove(setting);
  }

  async findAllByType(type: string) {
    try {
      const settingList = await this.settingRepository.find({
        where: {
          settingType: type,
          status: '1',
        },
      });
      if (!settingList.length) return {};
      const setting = settingList.reduce((p, c) => {
        p[c.settingKey] = c.settingValue;
        return p;
      }, {});
      return setting;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
