import { RootState } from "../core";

export const authTokenSelector = (state: RootState) => state.user.authToken;
