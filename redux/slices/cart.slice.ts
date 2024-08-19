import { PRODUCT_API } from '@/app/api/product';
import { GetProductCartByPropertyGroupIdsInput } from '@/app/api/product/product.input';
import { IProductCart } from '@/app/api/product/product.output';
import { CART_STORAGE } from '@/app/lib/static/storage.static';
import { CLONE_DEEP_UTILS } from '@/app/lib/utils/clone.utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IOrderItem {
  productPropertyGroupId: number;
  amount: number;
}

interface CartSliceState {
  mapItems: {
    [key: string]: IOrderItem;
  };
  detail: {
    list: IProductCart[];
    isLoading: boolean;
  };
}
const initialState: CartSliceState = {
  mapItems: {},
  detail: {
    list: [],
    isLoading: true,
  },
};

export const actionAsyncGetCartProductDetail = createAsyncThunk(
  'cart/products',
  async ({ ids }: GetProductCartByPropertyGroupIdsInput, { rejectWithValue }) => {
    try {
      if (ids.length === 0) {
        return rejectWithValue('Không có sản phẩm trong giỏ hàng');
      }

      const { data } = await PRODUCT_API.getProductCartByPropertyGroupIds({
        ids,
      });

      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    actAddToCart: (state, { payload }: { payload: IOrderItem }) => {
      let mapItems = JSON.parse(localStorage.getItem(CART_STORAGE) || '{}');

      if (!mapItems[payload.productPropertyGroupId]?.productPropertyGroupId) {
        mapItems = {
          ...mapItems,
          [payload.productPropertyGroupId]: payload,
        };
      } else {
        mapItems[payload.productPropertyGroupId].amount += payload.amount * 1;
      }

      state.mapItems = mapItems;
      localStorage.setItem(CART_STORAGE, JSON.stringify(mapItems));
    },
    actGetProductInCart: (state) => {
      const mapItems = JSON.parse(localStorage.getItem(CART_STORAGE) || '{}');
      state.mapItems = mapItems;
    },
    actUpdateProductAmount: (state, { payload }: { payload: { productPropertyGroupId: number; amount: number } }) => {
      let mapItems = CLONE_DEEP_UTILS(state.mapItems);

      if (mapItems[payload.productPropertyGroupId]?.productPropertyGroupId) {
        mapItems[payload.productPropertyGroupId].amount = payload.amount * 1;
      }

      state.mapItems = mapItems;
      localStorage.setItem(CART_STORAGE, JSON.stringify(mapItems));
    },
    actRemoveProduct: (state, { payload }) => {
      let mapItems = CLONE_DEEP_UTILS(state.mapItems);

      const detailList = state.detail.list;
      const detailIndex = detailList.findIndex((e) => e.id === payload);

      detailList.splice(detailIndex, 1);

      delete mapItems[payload];

      state.mapItems = mapItems;
      state.detail.list = detailList;
      localStorage.setItem(CART_STORAGE, JSON.stringify(mapItems));
    },
    actClearProductCart: (state) => {
      localStorage.setItem(CART_STORAGE, '{}');
      state.detail.list = [];
      state.mapItems = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(actionAsyncGetCartProductDetail.pending, (state) => {
      state.detail.isLoading = true;
    });
    builder.addCase(actionAsyncGetCartProductDetail.fulfilled, (state, { payload }) => {
      state.detail.list = payload;
      state.detail.isLoading = false;
    });
    builder.addCase(actionAsyncGetCartProductDetail.rejected, (state) => {
      state.detail.isLoading = false;
    });
  },
});

export const { actAddToCart, actGetProductInCart, actUpdateProductAmount, actRemoveProduct, actClearProductCart } = cartSlice.actions;
export default cartSlice.reducer;
