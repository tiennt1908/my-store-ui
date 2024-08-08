import { PagingInput } from "../general/input.general";

export interface GetCollectionListInput extends PagingInput {
  isActive: 0 | 1;
}
