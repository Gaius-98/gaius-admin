import { Injectable } from '@nestjs/common';
import { CreateOperationLogDto } from './dto/create-operation-log.dto';
import { UpdateOperationLogDto } from './dto/update-operation-log.dto';
import { OperationLog } from './entities/operation-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { SearchOperationDto } from './dto/create-operation-log.dto';
@Injectable()
export class OperationLogService {
  constructor(
    @InjectRepository(OperationLog)
    private optLogRepository: Repository<OperationLog>,
  ) {}
  async create(createOperationLogDto: CreateOperationLogDto) {
    try {
      const optLog = await this.optLogRepository.create(createOperationLogDto);
      await this.optLogRepository.save(optLog);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: SearchOperationDto) {
    try {
      const { keyword, startTime, endTime, pageNumber, pageSize } = params;
      const where = {
        username: Like(`%${keyword}%`),
      };
      if (startTime && endTime) {
        where['createTime'] = Between(startTime, endTime);
      }
      const list = await this.optLogRepository.findAndCount({
        where,
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
}
