import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  outcome: number;
}

const initialState: initialStateType = {
  outcome: 350.55,
};

const Balance = createSlice({
  name: "Balance",
  initialState,
  reducers: {
    setOutcome: (state, action) => {
      state.outcome = action.payload;
    },
  },
});

export const { setOutcome } = Balance.actions;
export default Balance.reducer;
