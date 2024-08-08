import { IPropertyOption } from "@/app/api/product/product.output";
import Button from "@/components/Button";
import { useState } from "react";

type Props = {
  id: number;
  name: string;
  attributes: IPropertyOption[];
  onValue?: Function;
};

export default function AttributeList({
  id,
  name,
  attributes,
  onValue,
}: Props) {
  const [propertyValueId, setPropertyValueId] = useState<number>(0);

  const handleSetValue = (valueId: number) => {
    setPropertyValueId(valueId);
    if (onValue) {
      onValue(id, valueId);
    }
  };

  return (
    <div>
      <p className="font-medium">{name}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {attributes.map((p) => {
          return (
            <Button
              key={p.id}
              theme={propertyValueId === p.id ? "black" : "white"}
              shadow="none"
              borderWidth="1"
              style={{ minWidth: 70 }}
              className="text-gray-500 font-normal"
              onClick={() => {
                handleSetValue(p.id);
              }}
            >
              {p.value}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
