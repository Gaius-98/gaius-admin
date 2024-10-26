import { Injectable } from '@nestjs/common';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
  OrgTreeDto,
} from './dto/organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from 'src/common/enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { buildTree } from 'src/common/utils/utils';
import { AuthEnum } from 'src/common/enum';
import { Role } from '../role/entities/role.entity';
import { DataPermEnum } from 'src/common/enum';
import { Request } from 'express';
@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    const org = await this.orgRepository.create(createOrganizationDto);
    try {
      const parent = await this.orgRepository.findOne({
        where: {
          id: org.pid,
        },
      });
      if (org.pid && parent) {
        org.ancestors = parent.ancestors
          ? `${parent.ancestors},${org.pid}`
          : `${org.pid}`;
      } else {
        org.ancestors = '';
      }

      await this.orgRepository.save(org);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(keyword?: string) {
    try {
      const orgList = await this.orgRepository.find({
        where: {
          name: Like(`%${keyword}%`),
          status: '1',
        },
        order: {
          sortNum: 'ASC',
        },
      });
      return buildTree(orgList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    const org = await this.orgRepository.findOne({
      where: {
        id,
      },
    });
    if (!org) throw new ApiException('未找到此机构', ApiErrorCode.ERROR_OTHER);
    return org;
  }

  async update(updateOrganizationDto: UpdateOrganizationDto) {
    try {
      return await this.orgRepository.save(updateOrganizationDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const org = await this.orgRepository.findOne({
      where: { id },
    });
    if (!org)
      throw new ApiException(`机构不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.orgRepository.remove(org);
    return `删除机构成功`;
  }
  async findPartOrg(orgId: number, keyword = '') {
    try {
      const orgList = await this.orgRepository.find({
        where: {
          ancestors: Like(`%${orgId}%`),
          name: Like(`%${keyword}%`),
          status: '1',
        },
        order: {
          sortNum: 'ASC',
        },
      });

      return orgList;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAllByUser(req: Request, keyword = ''): Promise<OrgTreeDto[]> {
    const roles = req[AuthEnum.AUTH_REQUEST_USER_KEY].roles as Role[];
    const org = req[AuthEnum.AUTH_REQUEST_USER_KEY].org as Organization;
    const dataPerms = roles.map((e) => e.dataPerm);
    if (dataPerms.includes(DataPermEnum.DATA_PERM_ALL)) {
      return await this.findAll(keyword);
    } else if (dataPerms.includes(DataPermEnum.DATA_PERM_SELF_AND_CHILD)) {
      const orgList = await this.findPartOrg(org.id, keyword);

      return buildTree([...orgList, org]);
    } else if (dataPerms.includes(DataPermEnum.DATA_PERM_SELF)) {
      return [org];
    } else if (dataPerms.includes(DataPermEnum.DATA_NULL)) {
      return [];
    }
  }
}
