import { IOption } from '@/app/lib/interface/component.interface';
import { useState } from 'react';

interface UseSelectInput {
  initOptionList: IOption[];
  initVal?: unknown;
}
export const useSelect = ({ initOptionList, initVal }: UseSelectInput) => {
  const [isOpen, setOpen] = useState(false);
  const [optionList, setOptionList] = useState<IOption[]>(initOptionList);
  const [value, setValue] = useState<unknown>(initVal);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onToggle = () => {
    setOpen(!isOpen);
  };
  const onSelect = async (val: unknown) => {
    setValue(val);
    onClose();

    const option = optionList.find((e) => e.id === val);
    if (option?.action) {
      const status = await option.action(val);
      if (!status) {
        setValue(value);
      }
    }
  };

  return {
    onOpen,
    onClose,
    onToggle,
    isOpen,
    value,
    optionList,
    setOptionList,
    onSelect,
  };
};
