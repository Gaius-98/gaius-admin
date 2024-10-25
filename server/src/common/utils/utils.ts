import { Request } from 'express';
import { Role } from 'src/modules/system/role/entities/role.entity';

/**
 * 判断当前角色是否为超级管理员
 * @param roles
 * @returns
 */
export const isSuper = (roles: Role[]): boolean => {
  return roles.some((role) => role.isSuper) || false;
};
/**
 * 获取当前请求头中的token
 * @param req
 * @returns
 */
export const extractTokenFromHeader = (req: Request) => {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : '';
};
/**
 * 将数组转换为树
 * @param list 需要转换的数组树
 * @param getPid 获取item的pid
 * @param getSort 获取item的排序号
 * @param parentId 初始pid 一般不传
 * @returns
 */
export const buildTree = (
  list: any[],
  getId: (any) => string | number = (item) => item.id,
  getPid: (any) => string | number = (item) => item.pid,
  getSort: (any) => number = (item) => item.sortNum,
) => {
  const map = {};
  const tree = [];

  // 将每个节点放入一个映射中
  list.forEach((item) => {
    map[getId(item)] = { ...item }; // 初始化每个节点并添加 children 属性
  });

  // 构建树
  list.forEach((item) => {
    const node = map[getId(item)];
    if (getPid(item)) {
      // 如果有父节点，则将当前节点添加到父节点的 children 数组中
      const parent = map[getPid(item)];
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
        parent.children.sort((a, b) => getSort(a) - getSort(b));
      } else {
        // 如果找不到父节点，则将节点放入第一层
        tree.push(node);
      }
    } else {
      // 如果没有父节点，则将其放入第一层
      tree.push(node);
    }
  });

  return tree;
};
/**
 * 获取当前的实际ip
 * @param req
 * @returns
 */
export const getIp = (req) => {
  const ipStr = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
  if (ipStr) {
    const ipArray = ipStr.split(',');
    if (ipArray || ipArray.length > 0) {
      //如果获取到的为ip数组
      return ipArray[0];
    }
  } else {
    //获取不到时
    return req.ip.substring(req.ip.lastIndexOf(':') + 1);
  }
};
