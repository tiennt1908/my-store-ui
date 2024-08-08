import { AUTH_API } from '@/app/api/auth';
import { LoginInput, RegisterInput } from '@/app/api/auth/auth.input';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { actPushMessages } from './notify.slice';

export const actionAsyncRegister = createAsyncThunk('auth/register', async (input: RegisterInput, { rejectWithValue, dispatch }) => {
  try {
    const { data, success } = await AUTH_API.register(input);
    if (success) {
      dispatch(actPushMessages([{ message: 'Đăng ký thành công', status: true }]));
    }
    return data;
  } catch (err: any) {
    if (err?.response?.data) {
      dispatch(actPushMessages([{ message: err?.response?.data?.data, status: false }]));
    }
    return rejectWithValue(err);
  }
});

export const actionAsyncLogin = createAsyncThunk('auth/login', async (input: LoginInput, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await AUTH_API.login(input);

    localStorage.setItem('ACCESS_TOKEN', data.accessToken);

    return data;
  } catch (err: any) {
    if (err?.response?.data) {
      dispatch(actPushMessages([{ message: err?.response?.data?.data, status: false }]));
    }
    return rejectWithValue(err);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers(builder) {},
});

export default authSlice.reducer;
