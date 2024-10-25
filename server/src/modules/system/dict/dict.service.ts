import { Injectable } from '@nestjs/common';
import { CreateDictDto, CreateDictDataDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DictType, DictData } from './entities/dict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, In, QueryBuilder } from 'typeorm';
import { ApiErrorCode } from 'src/common/model/IHttp';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { SearchDictDto } from './dto/search-dict.dto';
@Injectable()
export class DictService {
  constructor(
    @InjectRepository(DictType)
    private dictTypeRepository: Repository<DictType>,
    @InjectRepository(DictData)
    private dictDataRepository: Repository<DictData>,
  ) {}
  async create(createDictDto: CreateDictDto) {
    const dict = await this.dictTypeRepository.create(createDictDto);
    try {
      await this.dictTypeRepository.save(dict);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async createDictData(createDictData: CreateDictDataDto) {
    const dictType = await this.dictTypeRepository.findOne({
      where: {
        dictType: createDictData.dictType,
      },
    });
    const dictData = await this.dictDataRepository.create({
      ...createDictData,
      dictTypeId: dictType.id,
    });
    try {
      await this.dictDataRepository.save(dictData);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: SearchDictDto) {
    try {
      const { keyword, dictType, pageNumber, pageSize } = params;
      const ids = await this.dictTypeRepository.findAndCount({
        select: ['id'],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      const entity = this.dictTypeRepository
        .createQueryBuilder('entity')
        .where(`entity.id IN (:...ids)`, { ids: ids[0].map((e) => e.id) });
      if (keyword) {
        entity.andWhere(`entity.dictTypeDesc LIKE " %${keyword}%"`);
      }
      if (dictType) {
        entity.andWhere(`entity.dictType = :dictType`, {
          dictType,
        });
      }
      entity.orderBy('entity.createTime', 'ASC');
      entity.leftJoinAndMapMany(
        'entity.dictDataList',
        DictData,
        'dictData',
        'dictData.dictTypeId = entity.id',
      );
      entity.addOrderBy('dictData.sortNum', 'ASC');
      const dictList = await entity.getMany();

      return {
        data: dictList,
        total: ids[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const dict = await this.dictTypeRepository.findOne({
      where: {
        id,
      },
    });
    if (!dict)
      throw new ApiException('未找到此字典类型', ApiErrorCode.ERROR_OTHER);
    return dict;
  }
  async findDataOne(id: string) {
    const dict = await this.dictDataRepository.findOne({
      where: {
        id,
      },
    });
    if (!dict) throw new ApiException('未找到此字典', ApiErrorCode.ERROR_OTHER);
    const dictTypeData = await this.dictTypeRepository.findOne({
      where: {
        id: dict.dictTypeId,
      },
    });
    return {
      ...dict,
      dictType: dictTypeData.dictType,
    };
  }

  async update(updateDictDto: UpdateDictDto) {
    try {
      return await this.dictTypeRepository.save(updateDictDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async updateData(updateDictDto: UpdateDictDto) {
    try {
      return await this.dictDataRepository.save(updateDictDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async remove(id: string) {
    const dict = await this.dictTypeRepository.findOne({
      where: { id },
    });
    const dicts = await this.dictDataRepository.find({
      where: {
        dictTypeId: dict.id,
      },
    });
    if (!dict)
      throw new ApiException(
        `字典类型不存在,删除失败`,
        ApiErrorCode.ERROR_OTHER,
      );
    try {
      await this.dictTypeRepository.remove(dict);
      await this.dictDataRepository.remove(dicts);
    } catch (error) {
      throw new ApiException(`删除失败:${error}`, ApiErrorCode.ERROR_OTHER);
    }
    return `删除字典类型及字典成功`;
  }
  async removeData(id: string) {
    const dict = await this.dictDataRepository.findOne({
      where: { id },
    });
    if (!dict)
      throw new ApiException(`字典不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.dictDataRepository.remove(dict);
    return `删除字典成功`;
  }
  async findAllDirectory() {
    try {
      const dictList = await this.dictTypeRepository
        .createQueryBuilder('dict')
        .select('dict.dictType')
        .addSelect('dict.dictTypeDesc')
        .andWhere('dict.status = :status', { status: '1' })
        .getMany();
      return dictList;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findByTypes(dictTypes: string[]) {
    try {
      const dictTypelist = await this.dictTypeRepository.find({
        where: {
          dictType: In(dictTypes),
          status: '1',
        },
      });
      const dictTypeMap = new Map<string, string>();
      const dictTypeIds = dictTypelist.map((e) => {
        dictTypeMap.set(e.dictType, e.id);
        return e.id;
      });
      const dictList = await this.dictDataRepository.find({
        select: ['label', 'value', 'dictTypeId'],
        where: {
          dictTypeId: In(dictTypeIds),
          status: '1',
        },
        order: {
          sortNum: 'ASC',
        },
      });
      const dictObj = {};
      dictTypes.map((dictType) => {
        dictObj[dictType] = dictList.filter(
          (e) => e.dictTypeId == dictTypeMap.get(dictType),
        );
      });
      return dictObj;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
