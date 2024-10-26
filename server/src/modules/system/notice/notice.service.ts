import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateNoticeDto,
  SearchNoticeDto,
  UpdateNoticeDto,
} from './dto/notice.dto';
import { Notice, NoticeUser } from './entities/notice.entity';
import { Like, Repository, Between, MoreThanOrEqual } from 'typeorm';
import { ApiErrorCode } from 'src/common/enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEnum } from 'src/common/enum';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
    @InjectRepository(NoticeUser)
    private noticeUserRepository: Repository<NoticeUser>,
  ) {}
  async create(createNoticeDto: CreateNoticeDto, req: Request) {
    const userId = req[AuthEnum.AUTH_REQUEST_USER_KEY].user.userId;
    const notice = await this.noticeRepository.create({
      ...createNoticeDto,
      createBy: userId,
    });
    try {
      return await this.noticeRepository.save(notice);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: SearchNoticeDto) {
    try {
      const { keyword, pageNumber, pageSize, startTime, endTime } = params;
      const where = {
        content: Like(`%${keyword}%`),
        title: Like(`%${keyword}%`),
      };
      if (startTime && endTime) {
        where['createTime'] = Between(startTime, endTime);
      }
      const list = await this.noticeRepository.findAndCount({
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
  async createNoticeByUser({ userId, createTime: registerTime }: User) {
    try {
      const lastNotice = await this.noticeUserRepository.find({
        order: {
          createTime: 'DESC',
        },
        where: {
          receiveId: userId,
        },
        take: 1,
      });

      const time = lastNotice.length ? lastNotice[0].createTime : registerTime;
      const entity = this.noticeRepository.createQueryBuilder('entity');

      entity.where('entity.createTime > :time', { time: time });
      const noticeList = await entity.getMany();

      const noticeListByUser = noticeList.map((e) => {
        return {
          noticeId: e.id,
          receiveId: userId,
          createTime: e.createTime,
        };
      });

      const list = await this.noticeUserRepository.create(noticeListByUser);

      await this.noticeUserRepository.save(list);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAllByUser(params: SearchNoticeDto, req: Request) {
    const userId = req[AuthEnum.AUTH_REQUEST_USER_KEY].user.userId;
    try {
      const { pageNumber, pageSize, startTime, endTime, keyword } = params;

      const entity = this.noticeUserRepository.createQueryBuilder('entity');
      entity.andWhere(`entity.receiveId = :userId`, { userId });

      if (startTime && endTime) {
        entity.andWhere(`entity.createTime BETWEEN :startTime AND :endTime`, {
          startTime,
          endTime,
        });
      }
      entity.orderBy('entity.status', 'ASC');
      entity.addOrderBy('entity.createTime', 'DESC');
      entity.skip((pageNumber - 1) * pageSize).take(pageSize);
      entity
        .leftJoinAndMapOne(
          'entity.notice',
          Notice,
          'notice',
          'notice.id = entity.noticeId',
        )
        .andWhere(`notice.title Like :keyword`, { keyword: `%${keyword}%` });
      const list = await entity.getManyAndCount();
      return {
        data: list[0],
        total: list[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findLimitByUser(req: Request) {
    const userId = req[AuthEnum.AUTH_REQUEST_USER_KEY].user.userId;
    try {
      const entity = this.noticeUserRepository.createQueryBuilder('entity');
      entity.andWhere(`entity.receiveId = :userId`, { userId });
      entity.andWhere(`entity.status = :status`, { status: '0' });
      entity.addOrderBy('entity.createTime', 'DESC');
      entity.limit(3);
      entity.leftJoinAndMapOne(
        'entity.notice',
        Notice,
        'notice',
        'notice.id = entity.noticeId',
      );
      const list = await entity.getMany();
      const [, total] = await this.noticeUserRepository.findAndCount({
        where: {
          receiveId: userId,
          status: '0',
        },
      });
      return {
        data: list,
        total,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOne(id: number) {
    const notice = await this.noticeRepository.findOne({
      where: { id },
    });

    if (!notice) throw new ApiException('通知不存在', ApiErrorCode.ERROR_OTHER);
    return notice;
  }
  async findOneByUser(id: number) {
    const entity = this.noticeUserRepository.createQueryBuilder('entity');
    entity.where('entity.id = :id', { id });
    entity.leftJoinAndMapOne(
      'entity.notice',
      Notice,
      'notice',
      'notice.id = entity.noticeId',
    );

    entity.leftJoinAndMapOne(
      'entity.userInfo',
      User,
      'user',
      'user.userId = entity.receiveId',
    );
    entity.select(['user.username', 'user.userId', 'notice', 'entity']);
    const notice = await entity.getOne();
    const isReadNotice = {
      ...notice,
    };
    isReadNotice.status = '1';
    if (!isReadNotice.readTime) {
      isReadNotice.readTime = new Date();
    }
    this.noticeUserRepository.save(isReadNotice);

    if (!notice) throw new ApiException('通知不存在', ApiErrorCode.ERROR_OTHER);
    return notice;
  }
  async update(updateNoticeDto: UpdateNoticeDto) {
    try {
      return await this.noticeRepository.save(updateNoticeDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const notice = await this.noticeRepository.findOne({
      where: { id },
    });
    if (!notice)
      throw new ApiException(`通知不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    const userNoticeList = await this.noticeUserRepository.find({
      where: {
        noticeId: id,
      },
    });
    await this.noticeUserRepository.remove(userNoticeList);
    await this.noticeRepository.remove(notice);
    return `删除信息成功`;
  }
}
