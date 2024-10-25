import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enum';

import { UserRole } from './entities/user.entity';
import { RoleService } from '../role/role.service';
import { OrganizationService } from '../organization/organization.service';
import { Organization } from '../organization/entities/organization.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private roleSrv: RoleService,
    private orgSrv: OrganizationService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { roleIds } = createUserDto;
      const user = await this.userRepository.create(createUserDto);
      const { userId } = await this.userRepository.save(user);
      await this.createUserRole(userId, roleIds);
      return '新增成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async createUserRole(userId: string, roleIds: string[]) {
    await this.userRoleRepository.remove(
      await this.userRoleRepository.find({
        where: {
          userId,
        },
      }),
    );

    await this.userRoleRepository
      .createQueryBuilder()
      .insert()
      .values(
        roleIds.map((roleId) => ({
          roleId,
          userId,
        })),
      )
      .execute();
  }
  async findAll(params: SearchUserDto) {
    const { pageNumber, pageSize, keyword, orgId } = params;
    try {
      const where = {
        username: Like(`%${keyword}%`),
      };
      if (orgId) {
        const orgIds = await this.orgSrv.findPartOrg(orgId);
        where['orgId'] = In([...orgIds.map((e) => e.id), orgId]);
      }
      const entity = this.userRepository.createQueryBuilder('entity');

      if (keyword) {
        entity.where('entity.username Like :keyword', {
          keyword: `%${keyword}%`,
        });
      }
      if (orgId) {
        const orgIds = await this.orgSrv.findPartOrg(orgId);
        entity.andWhere('entity.orgId IN (:...orgIds) ', {
          orgIds: [...orgIds.map((e) => e.id), orgId],
        });
      }
      entity.orderBy('entity.createTime', 'DESC');
      entity.skip((pageNumber - 1) * pageSize).take(pageSize);
      entity
        .leftJoinAndMapOne(
          'entity.orgInfo',
          Organization,
          'org',
          'org.id = entity.orgId',
        )
        .select([
          'entity.avatar',
          'entity.email',
          'entity.username',
          'entity.name',
          'entity.createTime',
          'entity.userId',
          'entity.status',
          'entity.orgId',
          'org.name',
          'org.id',
        ]);
      const userList = await entity.getManyAndCount();

      return {
        data: userList[0],
        total: userList[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOne({
      select: [
        'avatar',
        'email',
        'username',
        'name',
        'salt',
        'createTime',
        'password',
        'userId',
        'status',
        'orgId',
      ],
      where: { userId },
    });
    const roleIds = await this.getRoleIdByUserId(userId);
    if (!user) throw new ApiException('用户不存在', ApiErrorCode.ERROR_OTHER);
    return { ...user, roleIds };
  }
  async findOneByUserName(username: string) {
    const user = await this.userRepository.findOne({
      select: [
        'avatar',
        'email',
        'username',
        'name',
        'salt',
        'createTime',
        'password',
        'userId',
        'orgId',
      ],
      where: { username, status: '1' },
    });
    if (!user) throw new ApiException('用户不存在', ApiErrorCode.ERROR_OTHER);
    return user;
  }
  async getDetail(userId: string) {
    const user = await this.findOne(userId);
    if (!user) throw new ApiException('用户不存在', ApiErrorCode.ERROR_OTHER);
    delete user.password;
    delete user.salt;
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const { roleIds, userId } = updateUserDto;
      await this.userRepository.save(updateUserDto);
      await this.createUserRole(userId, roleIds);
      return '更新成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user)
      throw new ApiException(
        `用户[${userId}]不存在,删除失败`,
        ApiErrorCode.ERROR_OTHER,
      );
    await this.userRepository.remove(user);
    await this.userRoleRepository.remove(
      await this.userRoleRepository.find({
        where: {
          userId,
        },
      }),
    );
    return `删除用户[${user.username}]成功`;
  }
  async getRoleIdByUserId(userId: string) {
    const roleIds = await this.userRoleRepository.find({
      select: ['roleId'],
      where: {
        userId,
      },
    });
    const validIds = await this.roleSrv.findValidIds(
      roleIds.map((e) => e.roleId),
    );
    return validIds.map((e) => e.roleId);
  }
}
