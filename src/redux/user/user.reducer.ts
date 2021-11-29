import { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./user.slice";

export const setAccessTokenReducer = (
  state: UserState,
  action: PayloadAction<string>
) => {
  state.authToken = action.payload;
};
