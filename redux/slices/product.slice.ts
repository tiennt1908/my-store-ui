import { PRODUCT_API } from '@/app/api/product';
import { GetProductListInput } from '@/app/api/product/product.input';
import { IProduct } from '@/app/api/product/product.output';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ProductSliceState {
  list: IProduct[];
  total: number;
  maxLimit: number;
  isLoading: boolean;
}
const initialState: ProductSliceState = {
  list: [],
  total: 0,
  maxLimit: 100,
  isLoading: false,
};

export const actionAsyncGetProductList = createAsyncThunk('product/list', async (input: GetProductListInput, { rejectWithValue }) => {
  try {
    const { data, success } = await PRODUCT_API.getList(input);

    return data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actionAsyncGetProductList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actionAsyncGetProductList.fulfilled, (state, { payload }) => {
      state.list = payload.list;
      state.total = payload.total;
      state.isLoading = false;
    });
    builder.addCase(actionAsyncGetProductList.rejected, (state) => {
      state.list = [];
      state.total = 0;
      state.isLoading = false;
    });
  },
});

export default productSlice.reducer;
