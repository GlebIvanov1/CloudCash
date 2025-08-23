import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  verifyCooldown: number;
}

const initialState: initialStateType = {
  verifyCooldown: 0,
};

const Verify = createSlice({
  name: "Verify",
  initialState,
  reducers: {
    setVerifyCooldown: (state, action) => {
      state.verifyCooldown = action.payload;
    },
    decrementVerifyCooldown: (state) => {
      state.verifyCooldown = state.verifyCooldown - 1;
    },
  },
});

export const { setVerifyCooldown, decrementVerifyCooldown } = Verify.actions;
export default Verify.reducer;
