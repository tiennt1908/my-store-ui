import Button from '@/components/Button';
import Checkbox from '@/components/CheckBox';
import React, { useState } from 'react';
import { CLONE_DEEP_UTILS } from '../lib/utils/clone.utils';

interface ICheckBoxOption {
  id: number | string;
  name: string;
}
type Props = {
  title: string;
  options: ICheckBoxOption[];
};

export default function FilterBox({ title, options }: Props) {
  const [ids, setIds] = useState<unknown[]>([]);
  const handleSelect = (id: number | string) => {
    const cloneIds = CLONE_DEEP_UTILS(ids);
    const index = cloneIds.indexOf(id);
    const newIds = cloneIds;

    if (index === -1) {
      newIds.push(id);
    } else {
      newIds.splice(index, 1);
    }
    setIds(newIds);
  };

  return (
    <div>
      <p className="px-3 font-medium">{title}</p>
      <div>
        {options.map((e) => {
          return (
            <Button
              key={e.id}
              left={{
                icon: () => {
                  return <Checkbox checked={ids.indexOf(e.id) > -1} />;
                },
              }}
              shadow="none"
              width="100%"
              align="left"
              theme="white"
              rounded="none"
              onClick={() => {
                handleSelect(e.id);
              }}
            >
              {e.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
