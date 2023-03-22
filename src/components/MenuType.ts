export interface MenuType {
  label: string;
  desc?: string;
  duration?: number;
  energy?: number;
  callback?: string;
  params?: any;
  commonFactor?: number;
  prompt?: boolean;
  confirm?: boolean;
  children?: MenuType[];
}
