import { setAccessToken } from "../user.actions";
import { setAccessTokenReducer } from "../user.reducer";
import { UserState } from "../user.slice";

const baseUserState: UserState = {
  authToken: null,
};

describe("Given setAccessTokenReducer function", () => {
  it("Should assign the access token in action payload to user state", () => {
    const accessToken = "accessToken";
    const action = setAccessToken(accessToken);
    const state: UserState = { ...baseUserState };
    setAccessTokenReducer(state, action);
    expect(state.authToken).toBe(accessToken);
  });
});
