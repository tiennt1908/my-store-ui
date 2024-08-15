import { PagingInput } from '../general/input.general';

export interface GetProductListInput extends PagingInput {
  sortCol: string;
  sortType: string;
  isSaleOff?: 0 | 1;
  searchValue?: string;
  categoryId?: number;
  collectionId?: number;
}

export interface GetProductInput {
  slug: string;
}

export interface GetProductImagesInput {
  productId: number;
}
export interface GetProductCartByPropertyGroupIdsInput {
  ids: number[] | string[];
}
