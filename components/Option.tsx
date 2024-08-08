import { IOption } from '@/app/lib/interface/component.interface';
import { DarkThemeOption, ModeSelectedOption, SizeOption, ThemeOption } from '@/app/lib/type/decoration.type';
import { CheckIcon } from '@heroicons/react/24/outline';
import IconCustom from './IconCustom';
import WrappedLink from './Wrapped/WrappedLink';

export interface OptionProps extends IOption {
  isRounded?: boolean;
  size?: SizeOption;
  darkTheme?: DarkThemeOption;
  theme?: ThemeOption;
  isSelected?: boolean;
  modeSelected?: ModeSelectedOption;
  [key: string]: unknown;
}

export default function Option({
  id,
  icon,
  content,
  href,
  action,

  isRounded,
  size = 'lg',
  theme = 'white',
  darkTheme = 'slate',
  isSelected = false,
  modeSelected = 'icon',
  children,
  ...restProps
}: OptionProps) {
  const themeMap = {
    none: '',
    primary: `hover:bg-indigo-400 text-white`,
    white: `hover:bg-slate-100 text-gray-700`,
    slate: `hover:bg-slate-200 text-gray-700`,
    black: '',
  };
  const darkThemeMap = {
    none: '',
    slate: 'dark:hover:bg-slate-100/10 dark:text-white dark:disabled:text-white/50',
    transparent: 'dark:bg-transparent',
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
  const sizeMap = {
    xs: 'h-6 text-xs py-1 px-2',
    sm: 'h-7 text-sm py-1 px-2',
    md: 'h-8 text-sm py-1.5 px-2.5',
    lg: 'h-9 text-sm py-2 px-3',
    xl: 'h-10 text-md py-2.5 px-3.5',
  };
  const gapMap = {
    xs: 'gap-2',
    sm: 'gap-2',
    md: 'gap-2.5',
    lg: 'gap-3',
    xl: 'gap-3.5',
  };

  const boxClass = `
    flex items-center justify-between font-medium cursor-pointer  
    ${sizeMap[size]} 
    ${themeMap[theme]} 
    ${darkThemeMap[darkTheme]} 
    ${gapMap[size]} 
    ${isSelected && modeSelected === 'background' ? selectThemeMap[theme] : ''}
    ${isSelected && modeSelected === 'background' ? selectDarkThemeMap[darkTheme] : ''}
`;

  return (
    <WrappedLink href={href}>
      <div className={boxClass} {...restProps}>
        <div className={`flex items-center ${gapMap[size]}`}>
          <IconCustom icon={icon} isRounded={isRounded} />
          {content}
        </div>
        {isSelected && modeSelected === 'icon' && <IconCustom size={size} icon={CheckIcon} />}
      </div>
    </WrappedLink>
  );
}
