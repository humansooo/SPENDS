import { createSlice } from "@reduxjs/toolkit";

const appInitialState = {
  token: "" as string,
  fcmToken: "" as string,
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setRemoveToken: (state) => {
      state.token = "";
    },
  },
});

export const { setFcmToken, setRemoveToken } = appSlice.actions;

export default appSlice.reducer;
