import { ORDER_API } from '@/app/api/order';
import { CreateOrderInput, GetItemByOrderIdsInput, GetOrderListInput } from '@/app/api/order/order.input';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { actPushMessages } from './notify.slice';
import { actClearProductCart } from './cart.slice';
import { IOrder, IOrderDetail } from '@/app/api/order/order.output';
import { ARRAY_UTILS } from '@/app/lib/utils/array.utils';

interface OrderSliceState {
  mapItem: {
    [key: number]: IOrderDetail;
    isLoading: boolean;
  };
  list: IOrder[];
  total: number;
  filter: {
    statusId?: number;
  };
  paging: {
    index: number;
    limit: number;
  };
  sort: {
    sortCol: string;
    sortType: string;
  };
  isLoading: boolean;
}
const initialState: OrderSliceState = {
  mapItem: {
    isLoading: false,
  },
  list: [],
  total: 0,

  filter: {
    // statusId: 1,
  },
  paging: {
    index: 0,
    limit: 20,
  },
  sort: {
    sortCol: 'id',
    sortType: 'DESC',
  },
  isLoading: false,
};

export const actionAsyncCreateOrder = createAsyncThunk('order/create', async (input: CreateOrderInput, { rejectWithValue, dispatch }) => {
  try {
    const { data, success } = await ORDER_API.create(input);
    if (success) {
      dispatch(actClearProductCart());
      dispatch(actPushMessages([{ message: 'Tạo đơn hàng thành công', status: true }]));
    }
    return data;
  } catch (err: any) {
    if (err?.response?.data) {
      dispatch(actPushMessages([{ message: err?.response?.data?.data, status: false }]));
    }
    return rejectWithValue(err);
  }
});
export const actionAsyncGetOrderList = createAsyncThunk('order/list', async (input: GetOrderListInput, { rejectWithValue }) => {
  try {
    const { data, success } = await ORDER_API.getList(input);

    return data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});
export const actionAsyncGetItemByOrderIds = createAsyncThunk('order/items', async (input: GetItemByOrderIdsInput, { rejectWithValue }) => {
  try {
    const { data, success } = await ORDER_API.getItemByOrderIds(input);

    return data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actionAsyncGetOrderList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actionAsyncGetOrderList.fulfilled, (state, { payload }) => {
      state.list = payload.list;
      state.total = payload.total;
      state.isLoading = false;
    });
    builder.addCase(actionAsyncGetOrderList.rejected, (state) => {
      state.list = [];
      state.total = 0;
      state.isLoading = false;
    });

    builder.addCase(actionAsyncGetItemByOrderIds.pending, (state) => {
      state.mapItem.isLoading = true;
    });
    builder.addCase(actionAsyncGetItemByOrderIds.fulfilled, (state, { payload }) => {
      state.mapItem = {
        ...state.mapItem,
        ...ARRAY_UTILS.toMap<IOrderDetail>(payload, 'id'),
      };
      state.mapItem.isLoading = false;
    });
    builder.addCase(actionAsyncGetItemByOrderIds.rejected, (state) => {
      state.mapItem = { ...state.mapItem };
      state.mapItem.isLoading = false;
    });
  },
});

export default orderSlice.reducer;
