import React from 'react';

type Props = {
  properties: {
    id: number;
    name: string;
    optionSelected: {
      id: number;
      name: string;
    };
  }[];
};

export default function Properties({ properties }: Props) {
  const propLength = properties.length;

  if (propLength === 0) {
    return <></>;
  }

  return (
    <div className="flex gap-2">
      {properties.map((e, i) => {
        return (
          <div key={e.id} className="flex gap-2">
            <p>
              {e.name}: {e.optionSelected.name}
            </p>
            {propLength > i + 1 ? '|' : ''}
          </div>
        );
      })}
    </div>
  );
}
