import { USER_API } from '@/app/api/user';
import { ACCESS_TOKEN } from '@/app/lib/static/storage.static';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserSliceState {
  info: {
    id: number;
    fullName: string;
    phoneNumber: string;
    roleId: number;
    isLoading: boolean;
    isLoaded: boolean;
  };
}
const initialState: UserSliceState = {
  info: {
    id: 0,
    fullName: '',
    phoneNumber: '',
    roleId: 0,
    isLoading: false,
    isLoaded: false,
  },
};

export const actionAsyncGetUserInfo = createAsyncThunk('auth/register', async (input, { rejectWithValue }) => {
  try {
    const { data, success } = await USER_API.get();
    return data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actLogout: (state) => {
      state.info = {
        ...state.info,
        id: 0,
        fullName: '',
        phoneNumber: '',
        roleId: 0,
      };
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
  extraReducers(builder) {
    builder.addCase(actionAsyncGetUserInfo.pending, (state) => {
      state.info.isLoading = true;
    });
    builder.addCase(actionAsyncGetUserInfo.fulfilled, (state, { payload }) => {
      state.info = {
        ...state.info,
        ...payload,
      };
      state.info.isLoading = false;
      state.info.isLoaded = true;
    });
    builder.addCase(actionAsyncGetUserInfo.rejected, (state) => {
      state.info.isLoading = false;
      state.info.isLoaded = true;
    });
  },
});

export const { actLogout } = userSlice.actions;
export default userSlice.reducer;
