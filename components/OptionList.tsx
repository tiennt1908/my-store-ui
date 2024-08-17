import React from 'react';
import Option from './Option';
import {
  BorderColorOption,
  BorderWidthOption,
  DarkThemeOption,
  ModeSelectedOption,
  RadiusOption,
  ShadowOption,
  SizeOption,
  ThemeOption,
} from '@/app/lib/type/decoration.type';
import { IOption } from '@/app/lib/interface/component.interface';

export type OptionListProps = {
  size?: SizeOption;
  optionList: IOption[];
  darkTheme?: DarkThemeOption;
  theme?: ThemeOption;
  rounded?: RadiusOption;
  shadow?: ShadowOption;
  borderColor?: BorderColorOption;
  borderWidth?: BorderWidthOption;
  className?: string;

  modeSelected?: ModeSelectedOption;
  isIconRounded?: boolean;
  onSelect?: Function;
  selectValue?: unknown;

  [key: string]: unknown;
};

export default function OptionList({
  size,
  className,
  isIconRounded,
  optionList,
  darkTheme = 'slate',
  theme = 'white',
  rounded = 'default',
  shadow = 'default',
  borderColor = 'none',
  borderWidth = 'none',
  icon,
  onSelect,
  selectValue,
  modeSelected,
  ...restProps
}: OptionListProps) {
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
  const shadowMap = {
    none: 'shadow-none',
    default: 'shadow',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  const borderWidthMap = {
    none: '',
    '0': 'border-0',
    '1': 'border',
    '2': 'border-2',
    '4': 'border-4',
    '8': 'border-8',
  };
  const borderColorMap = {
    none: '',
    transparent: 'border-transparent',
    slate: 'border-slate-100 dark:border-slate-400/10',
    black: '',
  };

  const optionListClass = `
        overflow-hidden 
        ${darkThemeMap[darkTheme]} 
        ${themeMap[theme]} 
        ${borderRadiusMap[rounded]} 
        ${shadowMap[shadow]} 
        ${borderWidthMap[borderWidth]} 
        ${borderColorMap[borderColor]} 
        ${className}
    `;

  return (
    <div className={optionListClass} {...restProps}>
      {optionList.map((option) => {
        return (
          <Option
            onClick={() => {
              if (onSelect) {
                onSelect(option.id);
              }
            }}
            key={option.id}
            isSelected={option.href ? selectValue === option.href : selectValue === option.id}
            theme={theme}
            isRounded={isIconRounded}
            size={size}
            modeSelected={modeSelected}
            {...option}
          ></Option>
        );
      })}
    </div>
  );
}
