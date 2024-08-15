import { createSlice } from '@reduxjs/toolkit';

interface UISliceState {
  routerListeners: {
    isCompleted: boolean;
  };
}
const initialState: UISliceState = {
  routerListeners: {
    isCompleted: false,
  },
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    actSetRouterStatus: (state, { payload }: { payload: { isCompleted: boolean; url?: string; lastUpdate?: number } }) => {
      state.routerListeners.isCompleted = payload.isCompleted;
    },
  },
  extraReducers(builder) {},
});

export const { actSetRouterStatus } = uiSlice.actions;
export default uiSlice.reducer;
