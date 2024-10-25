export enum DataPermEnum {
  /**
   * 全部数据权限
   */
  DATA_PERM_ALL = '1',

  /**
   * 本机构及下属机构数据权限
   */
  DATA_PERM_SELF_AND_CHILD = '2',

  /**
   * 仅限本机构数据权限
   */
  DATA_PERM_SELF = '3',

  /**
   * 仅限本人权限
   */
  DATA_NULL = '4',
}
