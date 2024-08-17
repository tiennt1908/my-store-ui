import DropList from '@/components/DropList';
import { useSearchParams } from 'next/navigation';
import { ICategory } from '../api/category/category.output';

type Props = {
  categoryList: ICategory[];
};

export default function CategoryBox({ categoryList }: Props) {
  const searchParams = useSearchParams();

  const parentId = searchParams.get('parentId');

  return (
    <div className="bg-white rounded shadow-sm">
      <p className="px-3 font-medium py-3 text-base border-b">Danh mục sản phẩm</p>
      <div className="py-3">
        {categoryList.map((e) => {
          return (
            <DropList
              key={e.id}
              id={e.id}
              content={e.name}
              optionList={e.child?.map((c) => {
                return {
                  id: c.id,
                  content: c.name,
                  href: `/products?parentId=${c.parentCategoryId}&categoryId=${c.id}`,
                };
              })}
              isShow={(parentId ? parseInt(parentId) || categoryList[0].id : categoryList[0].id) === e.id}
            />
          );
        })}
      </div>
    </div>
  );
}
