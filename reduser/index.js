import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractAddress: "0x746180D2C15c82Bcd6AB893eb81a9EA534336720", 
  walletAddress: "",
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
    
    addAccount: (state, action) => {
      state.walletAddress = action.payload;
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
  addAccount,
  changeBalance,
  setToken,
  setTokenId,
} = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const myContract = (state) => state.counter.contractAddress;
export const walletAddress = (state) => state.counter.walletAddress;
export const balance = (state) => state.counter.balance;
export const token = (state) => state.counter.token;
export const tokenId = (state) => state.counter.tokenId;

export default counterSlice.reducer;
