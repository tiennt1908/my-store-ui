import { createSlice } from '@reduxjs/toolkit';
import { Bounce, toast } from 'react-toastify';

export const notifySlice = createSlice({
  name: 'notify',
  initialState: {},
  reducers: {
    actPushMessages(
      state,
      {
        payload,
      }: {
        payload: {
          message: string;
          status: boolean;
        }[];
      }
    ) {
      const config: any = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      };

      payload.forEach((e) => {
        if (e.status) {
          toast.success(e.message, config);
        } else {
          toast.error(e.message, config);
        }
      });
    },
  },
  extraReducers(builder) {},
});

export const { actPushMessages } = notifySlice.actions;
export default notifySlice.reducer;
