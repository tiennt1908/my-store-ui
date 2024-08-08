import { PagingInput } from '../general/input.general';

export interface GetCategoryListInput extends PagingInput {
  parentCategoryId?: number;
}
