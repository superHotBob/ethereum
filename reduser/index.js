import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


// import { fetchCount } from './counterAPI'


const initialState = {
  value: false,
  status: 'idle',
  hash: '',
  balance: 0
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    decrement: (state) => {
      state.value = false
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.hash = action.payload
    },
    changeBalance: (state,action) => {
      state.balance = action.payload
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

export const { increment, decrement, incrementByAmount, changeBalance } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;
export const hash = (state) => state.counter.hash;
export const balance = (state) => state.counter.balance;


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