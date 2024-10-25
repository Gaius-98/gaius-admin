import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleMenu } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enum';
import PaginationDto from 'src/common/dto/pagination.dto';
import { In } from 'typeorm';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { roleMenus } = createRoleDto;
    const role = await this.roleRepository.create(createRoleDto);
    try {
      const { roleId } = await this.roleRepository.save(role);
      await this.createRoleMenus(roleId, roleMenus);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async createRoleMenus(roleId: string, menuIds: string[]) {
    await this.roleMenuRepository.remove(
      await this.roleMenuRepository.find({
        where: {
          roleId,
        },
      }),
    );

    await this.roleMenuRepository
      .createQueryBuilder()
      .insert()
      .values(
        menuIds.map((menuId) => ({
          roleId,
          menuId,
        })),
      )
      .execute();
  }
  async findAll(params: PaginationDto) {
    try {
      const { keyword, pageNumber, pageSize } = params;
      const list = await this.roleRepository.findAndCount({
        where: {
          roleName: Like(`%${keyword}%`),
          isSuper: 0,
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

  async findOne(id: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          roleId: id,
        },
      });
      const roleMenus = await this.getMenuIdByRoleId(id);
      return {
        ...role,
        roleMenus,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOneByRoleId(roleId: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          roleId,
        },
      });

      return await role;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findByRoleId(roleIds: string[]) {
    try {
      return await this.roleRepository.find({
        where: {
          roleId: In(roleIds),
          status: '1',
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(updateRoleDto: UpdateRoleDto) {
    try {
      const { roleId, roleMenus } = updateRoleDto;
      await this.roleRepository.save(updateRoleDto);
      await this.createRoleMenus(roleId, roleMenus);
      return '更新成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const role = await this.roleRepository.findOne({
      where: { roleId: id },
    });
    if (!role)
      throw new ApiException(`角色不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    const { roleId } = role;
    await this.roleRepository.remove(role);
    await this.roleMenuRepository.remove(
      await this.roleMenuRepository.find({
        where: {
          roleId,
        },
      }),
    );
    return `删除角色成功`;
  }
  async findRoleDict() {
    try {
      const list = await this.roleRepository.find({
        select: ['roleId', 'roleName', 'roleKey'],
        order: {
          createTime: 'DESC',
        },
        where: {
          status: '1',
        },
      });
      return list;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getMenuIdByRoleId(roleId: string) {
    const menuIds = await this.roleMenuRepository.find({
      select: ['menuId'],
      where: {
        roleId,
      },
    });
    return menuIds.map((e) => e.menuId);
  }

  async findPermissionByRoleId(roleIds: string[]) {
    const data = await this.roleMenuRepository.find({
      select: ['menuId'],
      where: {
        roleId: In(roleIds),
      },
    });
    return data.map((e) => e.menuId);
  }
  async findValidIds(ids: string[]) {
    const data = await this.roleRepository.find({
      where: {
        roleId: In(ids),
        status: '1',
      },
    });
    return data;
  }
}
