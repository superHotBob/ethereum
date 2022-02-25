import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


// import { fetchCount } from './counterAPI'


const initialState = {
  value: false,
  status: 'idle',
  hash: '',
  balance: 0,
  token: '',
  tokenId: 0
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {      
      state.value = true
    },
    decrement: (state) => {
      state.value = false
    },   
    addAccount: (state, action) => {
      state.hash = action.payload
    },
    changeBalance: (state,action) => {
      state.balance = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setTokenId: (state, action) => {
      state.tokenId = action.payload
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle'
//         state.value += action.payload
//       })
//   },
})

export const { increment, decrement, addAccount, changeBalance, setToken, setTokenId } = counterSlice.actions


export const selectCount = (state) => state.counter.value;
export const hash = (state) => state.counter.hash;
export const balance = (state) => state.counter.balance;
export const token = (state) => state.counter.token;
export const tokenId = (state) => state.counter.tokenId;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount) =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }

export default counterSlice.reducer