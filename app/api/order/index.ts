import { axiosCustom, axiosWithKey } from '../axios';
import { IResponse, List } from '../general/output.general';
import { CreateOrderInput, GetItemByOrderIdsInput, GetOrderListInput } from './order.input';
import { IOrder, IOrderDetail } from './order.output';

export const ORDER_API = {
  async create(input: CreateOrderInput) {
    const { data } = await axiosWithKey().post('orders', input);

    return data;
  },

  async getList(input: GetOrderListInput): Promise<IResponse<List<IOrder[]>>> {
    const { data } = await axiosWithKey().get('orders', {
      params: input,
    });

    return data;
  },

  async getItemByOrderIds(input: GetItemByOrderIdsInput): Promise<IResponse<IOrderDetail[]>> {
    const { data } = await axiosWithKey().post('orders/items', input);

    return data;
  },
};
