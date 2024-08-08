import { ThemeOption } from '@/app/lib/type/decoration.type';
import { BoltIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';

type Props = {
  theme?: ThemeOption;
  onValue?: Function;
  checked?: boolean;
  disabled?: boolean;
};

export default function Checkbox({ theme = 'primary', disabled = false, onValue, checked }: Props) {
  const [isCheck, setCheck] = useState(checked);

  const handleCheck = () => {
    if (disabled) {
      return;
    }

    if (onValue) {
      onValue(!isCheck);
    }
    setCheck(!isCheck);
  };

  useEffect(() => {
    if (typeof checked === 'boolean' && !disabled) {
      setCheck(checked);
    }
  }, [checked]);

  const boxThemes = {
    none: '',
    white: '',
    slate: '',
    black: '',
    primary: 'border-slate-300 dark:border-slate-600',
  };
  const boxActiveThemes = {
    none: '',
    white: '',
    slate: '',
    black: '',
    primary: `bg-indigo-500 border-indigo-500 cursor-pointer`,
  };
  const boxDisabledThemes = {
    none: '',
    white: '',
    slate: '',
    black: '',
    primary: `bg-slate-300 border-slate-300 cursor-not-allowed dark:bg-slate-600 dark:border-slate-600`,
  };

  const checkIconActiveColors = {
    none: '',
    white: '',
    slate: '',
    black: '',
    primary: 'white',
  };

  const boxClass = `border-2 rounded box-content 
    ${isCheck && !disabled ? boxActiveThemes[theme] : boxThemes[theme]} 
    ${disabled ? boxDisabledThemes[theme] : ''}
  `;

  return (
    <div onClick={handleCheck}>
      <div className={boxClass} style={{ width: 12, height: 12, padding: '0.1rem' }}>
        {(isCheck || disabled) && (
          <BoltIcon
            className="w-3 font-bold"
            style={{
              color: isCheck || disabled ? checkIconActiveColors[theme] : '',
            }}
          />
        )}
      </div>
    </div>
  );
}
