import React, { useState } from 'react';
import Button from './Button';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import RenderIf from './RenderIf';
import { ThemeOption } from '@/app/lib/type/decoration.type';

type Props = {
  index: number;
  limit: number;
  total: number;
  theme?: ThemeOption;
  selectTheme?: ThemeOption;
  onValue?: Function;
  [key: string]: unknown;
};

export default function Paging({ onValue, index, limit, total, theme, selectTheme, ...restProps }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(total / limit);

  let i = 0;
  let pageNumbers = [];

  if (totalPage >= 7) {
    if (currentPage < 3 || currentPage > totalPage - 2) {
      pageNumbers = [1, 2, 3, 0, totalPage - 2, totalPage - 1, totalPage];
    } else if (currentPage === totalPage - 2) {
      pageNumbers = [1, 2, 0, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    } else if (currentPage === 3) {
      pageNumbers = [1, 2, 3, 4, 0, totalPage - 1, totalPage];
    } else {
      pageNumbers = [1, 0, currentPage - 1, currentPage, currentPage + 1, 0, totalPage];
    }
  } else {
    for (i = 0; i < totalPage; i++) {
      pageNumbers.push(i + 1);
    }
  }

  const handleUpdatePage = (newPage: number) => {
    if (onValue) {
      onValue(newPage);
    }
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      handleUpdatePage(currentPage + 1);
    }
  };

  const handleBackPage = () => {
    if (currentPage > 1) {
      handleUpdatePage(currentPage - 1);
    }
  };

  return (
    <div className="flex gap-2 select-none">
      <RenderIf isRender={totalPage >= 7}>
        <Button onClick={handleBackPage} {...restProps}>
          <ChevronLeftIcon className="w-4" />
        </Button>
      </RenderIf>
      <RenderIf isRender={totalPage > 1}>
        {pageNumbers.map((e, k) => {
          return (
            <Button
              key={k}
              {...restProps}
              onClick={() => {
                if (e) {
                  handleUpdatePage(e);
                }
              }}
              theme={e === currentPage ? selectTheme : theme}
            >
              <RenderIf isRender={e > 0}>{e}</RenderIf>
              <RenderIf isRender={e === 0}>...</RenderIf>
            </Button>
          );
        })}
      </RenderIf>
      <RenderIf isRender={totalPage >= 7}>
        <Button onClick={handleNextPage} {...restProps}>
          <ChevronRightIcon className="w-4" />
        </Button>
      </RenderIf>
    </div>
  );
}

// 1 -> 123...567  [1,2,3,0,5,6,7]
// 2 -> 123...567 [1,2,3,0,5,6,7]
// 3 -> 1234...67 [1,2,3,4,0,6,7]
// 4 -> 1...345...7 [1,0,3,4,5,0,7]
// 5 -> 12...4567 [1,2,0,4,5,6,7]
// 6 -> 123...567 [1,2,3,0,5,6,7]
// 7 -> 123...567 [1,2,3,0,5,6,7]
