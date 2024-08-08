import SliderCustom from "@/components/Slider";
import React from "react";
import { ICollection } from "./api/collection/collection.output";
import CollectionBanner from "@/components/CollectionBanner";

type Props = {
  collectionList: ICollection[];
};

export default function Banner({ collectionList }: Props) {
  return (
    <div className="bg-white p-2 rounded shadow-sm">
      <SliderCustom autoplay={true}>
        {collectionList.map((e) => {
          return (
            <CollectionBanner
              img={e.img}
              name={e.name}
              slug={e.slug}
              desc={e.desc}
            />
          );
        })}
      </SliderCustom>
    </div>
  );
}
