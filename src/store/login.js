import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    logined: false,
  },
  reducers: {
    login: (state) => {
      state.logined = true;
    },
    logout: (state) => {
      state.logined = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const selectLogin = (state) => state.login.logined;

export default loginSlice.reducer;
