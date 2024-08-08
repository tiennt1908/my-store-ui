import { DarkThemeOption, RadiusOption, ThemeOption } from '@/app/lib/type/decoration.type';
import { ReactNode } from 'react';

type Props = {
  darkTheme?: DarkThemeOption;
  theme?: ThemeOption;
  rounded?: RadiusOption;
  children: ReactNode;
  [key: string]: unknown;
};

export default function WrappedTheme({
  darkTheme = 'slate',
  theme = 'white',
  rounded = 'default',
  children,
  className,
  ...restProps
}: Props) {
  const themeMap = {
    none: '',
    primary: `bg-indigo-600 text-white`,
    white: `bg-white text-gray-700`,
    slate: `bg-slate-100 text-gray-700`,
    black: '',
  };
  const darkThemeMap = {
    none: '',
    slate: 'dark:bg-slate-800 dark:text-white dark:disabled:text-white/50',
    transparent: 'dark:bg-transparent',
  };
  const borderRadiusMap = {
    none: 'rounded-none',
    default: 'rounded',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const themeClass = `
    ${themeMap[theme]} 
    ${darkThemeMap[darkTheme]} 
    ${borderRadiusMap[rounded]} 
    ${className}
  `;

  return (
    <div className={themeClass} {...restProps}>
      {children}
    </div>
  );
}
