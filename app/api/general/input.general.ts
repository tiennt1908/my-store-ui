export interface PagingInput {
  index: number;
  limit: number;
}
export interface SortInput {
  sortCol: string;
  sortType: string;
}

export interface MultiSortInput {
  col: string;
  type: string;
}
export interface IdInput {
  id: number | string;
}
