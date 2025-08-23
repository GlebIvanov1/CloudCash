import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  host: string;
  language: string;
}

const initialState: initialStateType = {
  host: "http://localhost:5173",
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
