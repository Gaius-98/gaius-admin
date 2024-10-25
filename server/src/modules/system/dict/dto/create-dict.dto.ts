export class CreateDictDto {
  remark?: string;
  dictType: string;
  dictTypeDesc: string;
  status: string;
}
export class CreateDictDataDto {
  label: string;
  value: string;
  sortNum: number;
  dictType: string;
  status: string;
}
