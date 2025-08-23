import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  email: string;
  token: string;
  id: string;
  name: string;
  lastName: string;
}

const initialState: initialStateType = {
  email: "",
  token: "",
  id: "",
  name: '',
  lastName: '',
};

const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.email = actions.payload.email;
      state.token = actions.payload.token;
      state.id = actions.payload.id;
    },
    setName: (state, actions) => {
      state.name = actions.payload.name;
      state.lastName = actions.payload.lastName;
    } 
  },
});

export const { setUser, setName } = User.actions;
export default User.reducer;
