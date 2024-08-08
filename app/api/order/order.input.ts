import { PagingInput } from '../general/input.general';

export interface OrderItemInput {
  productPropertyGroupId: number;
  amount: number;
}
export interface CreateOrderInput {
  address: string;
  phoneNumber: string;
  userId: number;
  orderItems: OrderItemInput[];
}
export interface GetOrderListInput extends PagingInput {
  sortCol: string;
  sortType: string;
  statusId?: number;
}

export interface GetItemByOrderIdsInput {
  ids: number[];
}
