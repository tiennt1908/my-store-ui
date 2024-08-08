import { CATEGORY_API } from '@/app/api/category';
import { GetCategoryListInput } from '@/app/api/category/category.input';
import { ICategory } from '@/app/api/category/category.output';
import { ARRAY_UTILS } from '@/app/lib/utils/array.utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CategorySliceState {
  list: ICategory[];
  paging: {
    index: number;
    limit: number;
  };
  filter: {
    parentCategoryId?: number;
  };
  isLoading: boolean;
}
const initialState: CategorySliceState = {
  list: [],
  paging: {
    index: 0,
    limit: 100,
  },
  filter: {},
  isLoading: false,
};

export const actionAsyncGetCategoryList = createAsyncThunk(
  'category/list',
  async ({ index, limit, parentCategoryId }: GetCategoryListInput, { rejectWithValue }) => {
    try {
      const { data, success } = await CATEGORY_API.getList({
        index,
        limit,
        parentCategoryId,
      });

      const parseCategories = data.list.map((e) => {
        return {
          ...e,
          child: [] as ICategory[],
        };
      });

      const mapCategories = ARRAY_UTILS.toMap(parseCategories, 'id');

      const categories: ICategory[] = [];
      data.list.forEach(({ id, parentCategoryId }) => {
        if (!parentCategoryId) {
          categories.push(mapCategories[id]);
        } else {
          mapCategories[parentCategoryId].child.push(mapCategories[id]);
        }
      });

      return categories;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actionAsyncGetCategoryList.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(actionAsyncGetCategoryList.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(actionAsyncGetCategoryList.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
