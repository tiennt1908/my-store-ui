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
import Button from './Button';
import SpinIcon from './Icons/SpinIcon';
import OptionList from './OptionList';

type SelectProps = {
  label: string;
  defaultIcon?: Function | string | undefined;

  optionList: IOption[];
  isOpen: boolean;
  value: string;
  onSelect: Function;
  onToggle: Function;
  onClose: Function;

  darkTheme?: DarkThemeOption;
  theme?: ThemeOption;

  rounded?: RadiusOption;
  shadow?: ShadowOption;
  borderColor?: BorderColorOption;
  borderWidth?: BorderWidthOption;

  size?: SizeOption;
  width?: number | string;
  height?: number | string;

  box?: {
    position?: 'left' | 'right';
    width?: number | string;
    [key: string]: unknown;
  };

  modeSelected?: ModeSelectedOption;

  isIconRounded?: boolean;
  isLoading?: boolean;

  [key: string]: unknown;
};

export default function Select({
  label,
  defaultIcon,

  optionList,
  isOpen,
  value,
  onSelect,
  onToggle,
  onClose,

  darkTheme = 'slate',
  theme = 'white',

  rounded,
  shadow,
  borderColor,
  borderWidth,

  size,
  width,
  height,

  box = {
    position: 'left',
    width: 'fit-content',
  },

  modeSelected,

  isIconRounded,
  isLoading = false,

  ...restProps
}: SelectProps) {
  const optionSelected = optionList.find((op) => op.id === value);

  const positionMap = {
    left: 'left-0',
    right: 'right-0',
  };

  const boxClass = `mt-2 
    absolute 
    ${positionMap[box?.position || 'left']} 
    ${box?.className}
  `;

  return (
    <div>
      {isOpen && (
        <div
          className="fixed w-full h-full top-0 left-0"
          onClick={() => {
            onClose();
          }}
          style={{ zIndex: 999 }}
        />
      )}

      <div className="relative" style={{ width, height, ...(isOpen ? { zIndex: 1000 } : {}) }}>
        <Button
          width="100%"
          theme={theme}
          darkTheme={darkTheme}
          rounded={rounded}
          shadow={shadow}
          borderColor={borderColor}
          borderWidth={borderWidth}
          size={size}
          left={{
            isRounded: isIconRounded,
            icon: optionSelected ? optionSelected.icon : defaultIcon,
          }}
          right={{
            icon: !isLoading ? ChevronDownIcon : SpinIcon,
            className: 'transaction-all duration-300',
            style: { rotate: isOpen ? '-180deg' : '0deg' },
          }}
          align="between"
          onClick={() => {
            if (!isLoading) onToggle();
          }}
          {...restProps}
        >
          {optionSelected ? optionSelected.content : label}
        </Button>
        {isOpen && (
          <OptionList
            theme={theme}
            darkTheme={darkTheme}
            rounded={rounded}
            shadow={shadow}
            borderColor={borderColor}
            borderWidth={borderWidth}
            size={size}
            onSelect={onSelect}
            modeSelected={modeSelected}
            className={boxClass}
            style={{
              ...(box?.style ? box.style : {}),
              ...(box?.width ? { width: box.width } : {}),
            }}
            isIconRounded={isIconRounded}
            value={value}
            optionList={optionList}
          />
        )}
      </div>
    </div>
  );
}
