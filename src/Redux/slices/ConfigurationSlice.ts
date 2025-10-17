import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  language: string;
}

const initialState: initialStateType = {
  language: "English",
};

const configuration = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = configuration.actions;
export default configuration.reducer;
