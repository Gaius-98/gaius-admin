import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUploadDto, UpdateUploadDto } from './dto/upload.dto';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    private configSrv: ConfigService,
  ) {}
  async create(createFileDto: CreateUploadDto) {
    const uploadBasePath =
      this.configSrv.get('static.base_path') +
      this.configSrv.get('upload.request_path');
    createFileDto.path = `${uploadBasePath}/${createFileDto.filename}`;
    createFileDto.originalname = decodeURIComponent(createFileDto.originalname);
    const file = this.uploadRepository.create(createFileDto);
    try {
      return await this.uploadRepository.save(file);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: PaginationDto) {
    try {
      const { keyword, pageNumber, pageSize } = params;
      const list = await this.uploadRepository.findAndCount({
        select: [
          'id',
          'createTime',
          'filename',
          'originalname',
          'size',
          'path',
        ],
        where: {
          originalname: Like(`%${keyword}%`),
        },
        order: {
          createTime: 'DESC',
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      const serverPath = `${this.configSrv.get('serve.protocol')}://${this.configSrv.get('serve.host')}:${this.configSrv.get('serve.port')}`;
      return {
        data: list[0].map((e) => {
          e.path = `${serverPath}${e.path}`;
          return e;
        }),
        total: list[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const file = await this.uploadRepository.findOne({
      where: { id },
    });
    if (!file)
      throw new ApiException(`资源不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.uploadRepository.remove(file);
    try {
      await this.deleteFile(
        path.join(__dirname, '../../../', `./uploads/${file.filename}`),
      );
    } catch (error) {}
    return `删除资源成功`;
  }
  deleteFile(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }
}
