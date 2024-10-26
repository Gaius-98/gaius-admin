import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enum';
import { buildTree } from 'src/common/utils/utils';
import { Request } from 'express';
import { AuthEnum } from 'src/common/enum';
interface MenuItem {
  id: string;
  label: string;
  pid?: string;
  desc?: string;
  icon?: string;
  sortNum: number;
  type: 'table' | 'page' | 'front' | 'form';
  openType: '_blank' | '_self';
  children?: MenuItem[];
  address?: string;
  menuType: 'app' | 'directory';
}
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepository.create(createMenuDto);
    try {
      await this.menuRepository.save(menu);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * 管理端菜单接口 返回全部的配置菜单
   * @param keyword 关键字
   * @returns
   */
  async findAll(keyword: string) {
    try {
      const menuList = await this.menuRepository.find({
        where: {
          label: Like(`%${keyword}%`),
        },
        order: {
          sortNum: 'ASC',
        },
      });
      return buildTree(menuList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const menu = await this.menuRepository.findOne({
      where: {
        id,
      },
    });
    if (!menu) throw new ApiException('未找到此菜单', ApiErrorCode.ERROR_OTHER);
    return menu;
  }

  async update(updateMenuDto: UpdateMenuDto) {
    try {
      return await this.menuRepository.save(updateMenuDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const menu = await this.menuRepository.findOne({
      where: { id },
    });
    if (!menu)
      throw new ApiException(`菜单不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.menuRepository.remove(menu);
    return `删除菜单成功`;
  }
  async findAllDirectory() {
    try {
      const menuList = await this.menuRepository.find({
        select: ['label', 'id', 'pid'],
        where: {
          menuType: 'directory',
          status: '1',
        },
        order: {
          sortNum: 'ASC',
        },
      });
      return this.buildMenuTree(menuList as MenuItem[], null) as Menu[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAllMenu() {
    try {
      const menuList = await this.menuRepository.find({
        select: ['label', 'id', 'pid'],
        where: {
          status: '1',
        },
        order: {
          sortNum: 'ASC',
        },
      });
      return this.buildMenuTree(menuList as MenuItem[], null) as Menu[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findSysMenuByUser(req: Request) {
    const menuIds: string[] = req[AuthEnum.AUTH_REQUEST_USER_KEY].menuIds;
    const options = {
      status: '1',
      menuType: Not('permission'),
      id: In(menuIds),
    };
    if (menuIds.some((e) => e === '*')) {
      Reflect.deleteProperty(options, 'id');
    }
    try {
      const menuList = await this.menuRepository.find({
        where: options,
        order: {
          sortNum: 'ASC',
        },
      });
      return this.buildMenuTree(menuList as MenuItem[], null) as Menu[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findPermissionByMenuIds(menuIds: string[]) {
    const menuList = await this.menuRepository.find({
      where: {
        status: '1',
        menuType: 'permission',
        id: In(menuIds),
      },
    });

    return menuList.map((e) => e.permissionId);
  }
  buildMenuTree(menuList: MenuItem[], parentId: string | null) {
    const tree: MenuItem[] = [];
    menuList
      .filter((menu) => {
        if (!parentId) {
          return !menu.pid;
        } else {
          return menu.pid === parentId;
        }
      })
      .forEach((menu) => {
        const children = this.buildMenuTree(menuList, menu.id);
        if (children.length > 0) {
          menu.children = children;
        }
        tree.push(menu);
      });
    tree.sort((a, b) => a.sortNum - b.sortNum);
    return tree;
  }
}
