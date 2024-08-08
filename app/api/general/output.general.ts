export interface IResponse<T> {
  data: T;
  success: boolean;
}
export interface List<T> {
  total: number;
  list: T;
}
