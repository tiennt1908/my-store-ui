import React from 'react';
import AttributeList from './AttributeList';
import { GetProductPropertyListOutput } from '@/app/api/product/product.output';

type Props = {
  productProperty?: GetProductPropertyListOutput;
  handleSetPropertyGroupId: Function;
};

export default function AttributeBox({ productProperty, handleSetPropertyGroupId }: Props) {
  const isProp = productProperty?.properties && productProperty.properties.length > 0;
  return (
    <>
      {isProp && (
        <div className="flex flex-col gap-1">
          {productProperty.properties.map((p) => {
            return <AttributeList onValue={handleSetPropertyGroupId} key={p.id} id={p.id} name={p.name} attributes={p.options} />;
          })}
        </div>
      )}
    </>
  );
}
