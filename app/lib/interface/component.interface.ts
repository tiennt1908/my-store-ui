import { ReactNode } from 'react';

export interface IOption {
  id: number | string;
  icon?: Function | string | undefined;
  content: string | number;
  href?: string;
  action?: (val: unknown) => boolean | Promise<boolean>;
  child?: IOption[];
}
