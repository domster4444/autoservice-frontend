import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const loggedUserSlice = createSlice({
  name: "loggedUserSlice",
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.user = action.payload;
    },
    removeLoggedUser: (state) => {
      state.user = null;
    },
  },
});

export const { setLoggedUser, removeLoggedUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
