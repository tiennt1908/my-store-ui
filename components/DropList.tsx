import { IOption } from '@/app/lib/interface/component.interface';
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
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Button from './Button';
import OptionList from './OptionList';
import WrappedLink from './Wrapped/WrappedLink';
import WrappedTheme from './Wrapped/WrappedTheme';

interface DropListProps extends IOption {
  optionList?: IOption[];

  isShow?: boolean;

  darkTheme?: DarkThemeOption;
  theme?: ThemeOption;
  size?: SizeOption;

  rounded?: RadiusOption;
  shadow?: ShadowOption;
  borderColor?: BorderColorOption;
  borderWidth?: BorderWidthOption;

  isIconRounded?: boolean;
  modeSelected?: ModeSelectedOption;
}

export default function DropList({
  icon,
  content,
  href,
  optionList = [],

  isShow = false,

  darkTheme = 'slate',
  theme = 'white',
  size = 'lg',

  rounded = 'none',
  shadow = 'none',
  borderColor = 'none',
  borderWidth = 'none',

  isIconRounded = false,
  modeSelected = 'background',
}: DropListProps) {
  const [isOpen, setOpen] = useState(isShow);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  const themeMap = {
    none: '',
    primary: `hover:bg-indigo-400`,
    white: `hover:bg-slate-100`,
    slate: `hover:bg-slate-200`,
    black: '',
  };
  const darkThemeMap = {
    none: '',
    slate: 'dark:hover:bg-slate-100/10',
    transparent: '',
  };

  const selectThemeMap = {
    none: '',
    primary: `bg-indigo-500`,
    white: `bg-slate-50`,
    slate: `bg-slate-50`,
    black: '',
  };
  const selectDarkThemeMap = {
    none: '',
    slate: 'dark:bg-slate-100/10',
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

  const heightMap = {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40,
  };
  const heightList = heightMap[size] * (optionList?.length || 0);

  const parentClass = `
    overflow-hidden 
    ${shadowMap[shadow]} 
    ${borderWidthMap[borderWidth]} 
    ${borderColorMap[borderColor]} 
    ${borderRadiusMap[rounded]} 
  `;

  const isSelected = window.location.pathname + window.location.search === href;
  const buttonClass = `
    ${isSelected && modeSelected === 'background' ? selectThemeMap[theme] : ''}
    ${isSelected && modeSelected === 'background' ? selectDarkThemeMap[darkTheme] : ''} 
    ${themeMap[theme]} 
    ${darkThemeMap[darkTheme]}
  `;

  return (
    <WrappedTheme theme={theme} darkTheme={darkTheme} className={parentClass}>
      <WrappedLink href={href}>
        <Button
          className={buttonClass}
          width="100%"
          shadow="none"
          theme="none"
          darkTheme="none"
          rounded="none"
          size={size}
          left={{
            isRounded: isIconRounded,
            icon: icon,
          }}
          right={
            heightList > 0
              ? {
                  icon: ChevronDownIcon,
                  className: 'transaction-all duration-300',
                  style: { rotate: isOpen ? '-180deg' : '0deg' },
                }
              : {}
          }
          align="between"
          onClick={onToggle}
        >
          {content}
        </Button>
      </WrappedLink>
      <div className="transaction-all duration-300 overflow-hidden" style={{ height: isOpen ? heightList : 0 }}>
        <OptionList
          rounded="none"
          shadow="none"
          theme={theme}
          darkTheme={darkTheme}
          size={size}
          isIconRounded={isIconRounded}
          selectValue={window.location.pathname + window.location.search}
          optionList={optionList || []}
          modeSelected={modeSelected}
        />
      </div>
    </WrappedTheme>
  );
}
