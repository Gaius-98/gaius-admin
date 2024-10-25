export class CreateMenuDto {
  label: string;
  pid?: string;
  menuType: 'app' | 'directory';
  desc?: string;
  icon?: string;
  sortNum: number;
  // table 预置列表页 page 预置设计页面 front 前端代码页面 form 表单页面
  type: 'table' | 'page' | 'front' | 'form';
  openType: '_blank' | '_self';
  address?: string;
}
