import { createSlice } from "@reduxjs/toolkit";
import { setAccessTokenReducer } from "./user.reducer";

export interface UserState {
  authToken: string | null;
}

export const initialUserState: UserState = {
  authToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setAccessToken: setAccessTokenReducer,
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
