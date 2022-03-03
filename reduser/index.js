import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  status: "idle",
  hash: "",
  balance: 0,
  token: "",
  tokenId: 0,
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    increment: (state) => {
      state.value = true;
    },
    decrement: (state) => {
      state.value = false;
    },
    addAccount: (state, action) => {
      state.hash = action.payload;
    },
    changeBalance: (state, action) => {
      state.balance = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTokenId: (state, action) => {
      state.tokenId = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  addAccount,
  changeBalance,
  setToken,
  setTokenId,
} = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const hash = (state) => state.counter.hash;
export const balance = (state) => state.counter.balance;
export const token = (state) => state.counter.token;
export const tokenId = (state) => state.counter.tokenId;

export default counterSlice.reducer;
