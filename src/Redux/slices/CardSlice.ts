import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  deactivate: boolean;
}

const initialState: initialStateType = {
  deactivate: false,
};

const Card = createSlice({
  name: "Card",
  initialState,
  reducers: {
    SetDeactivateCard: (state, action) => {
      state.deactivate = action.payload;
    },
  },
});

export default Card.reducer;
export const { SetDeactivateCard } = Card.actions;
