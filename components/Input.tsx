'use client';
import { BorderWidthOption, DarkThemeOption, RadiusOption, ShadowOption, SizeOption, ThemeOption } from '@/app/lib/type/decoration.type';
import IconCustom from './IconCustom';

type InputProps = {
  darkTheme?: DarkThemeOption;
  theme?: ThemeOption;
  rounded?: RadiusOption;
  borderWidth?: BorderWidthOption;
  shadow?: ShadowOption;
  size?: SizeOption;

  left?: {
    isRounded?: boolean;
    icon?: Function | string;
    [key: string]: unknown;
  };
  right?: {
    isRounded?: boolean;
    icon?: Function | string;
    [key: string]: unknown;
  };

  onValue: (...agrs: any) => void;

  [key: string]: unknown;
};

export default function Input({
  darkTheme = 'slate',
  theme = 'white',
  rounded = 'default',
  size = 'lg',
  borderWidth = '1',
  shadow = 'none',
  left,
  right,
  className,
  onValue,
  ...restProps
}: InputProps) {
  const themeMap = {
    none: '',
    primary: `border-indigo-300 hover:border-indigo-500 text-gray-700`,
    white: `border-slate-100 hover:border-slate-200 text-gray-700`,
    slate: `bg-slate-100 hover:bg-slate-50 text-gray-700`,
    black: '',
  };
  const darkThemeMap = {
    none: '',
    slate: 'dark:border-slate-400/10 dark:bg-slate-400/10 dark:text-white dark:disabled:text-white/50',
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
  const borderWidthMap = {
    none: '',
    '0': 'border-0',
    '1': 'border',
    '2': 'border-2',
    '4': 'border-4',
    '8': 'border-8',
  };
  const sizeMap = {
    xs: 'h-6 text-xs py-1 px-2',
    sm: 'h-7 text-sm py-1 px-2',
    md: 'h-8 text-sm py-1.5 px-2.5',
    lg: 'h-9 text-sm py-2 px-3',
    xl: 'h-10 text-sm py-2.5 px-3.5',
  };
  const shadowMap = {
    none: 'shadow-none',
    default: 'shadow',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const gapMap = {
    xs: 'gap-2',
    sm: 'gap-2',
    md: 'gap-2.5',
    lg: 'gap-3',
    xl: 'gap-3.5',
  };

  const inputClass = `
        flex items-center 
        ${gapMap[size]} 
        ${sizeMap[size]} 
        ${borderRadiusMap[rounded]} 
        ${borderWidthMap[borderWidth]} 
        ${themeMap[theme]} 
        ${darkThemeMap[darkTheme]} 
        ${shadowMap[shadow]} 
        ${className ? className : ''}
    `;

  return (
    <div className={inputClass}>
      <IconCustom size={size} icon={left?.icon} {...left} />
      <input
        className="outline-none bg-transparent disabled:cursor-no-drop w-full"
        {...restProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onValue) {
            onValue(e.target.value);
          }
        }}
      />
      <IconCustom size={size} icon={right?.icon} {...right} />
    </div>
  );
}
