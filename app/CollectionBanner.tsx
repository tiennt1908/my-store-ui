import { GET_IMAGE_URL_HELPER } from '@/app/lib/helper/get-image-url.helper';
import WrappedLink from '../components/Wrapped/WrappedLink';

type Props = {
  img: string;
  slug: string;
  name: string;
  desc: string;
};

export default function CollectionBanner({ img, slug, name, desc }: Props) {
  return (
    <WrappedLink href={`products`}>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          height: 600,
          backgroundImage: `url("${GET_IMAGE_URL_HELPER('collection', img)}")`,
        }}
      >
        <div className="w-full h-full relative">
          <div className="w-full h-full bg-black opacity-20 absolute"></div>
          <div className="w-full h-full flex justify-center items-center relative z-1">
            <div className="text-center text-white flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="font-medium" style={{ width: 850, minWidth: '30%' }}>
                {desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </WrappedLink>
  );
}
