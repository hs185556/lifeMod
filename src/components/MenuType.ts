export interface MenuType {
  label: string;
  desc?: string;
  duration?: number;
  callback?: string;
  params?: any;
  commonFactor?: number; // 能被公因数整除时触发固定事件
  children?: MenuType[];
}
