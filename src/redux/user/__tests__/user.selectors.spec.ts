import { RootState } from "../../core";
import { authTokenSelector } from "../user.selectors";

describe("Given authTokenSelector function", () => {
  const accessToken = "accessToken";

  const rootState: RootState = {
    user: {
      authToken: accessToken,
    },
  };

  it("Should return the auth token in the state", () => {
    const token = authTokenSelector(rootState);
    expect(token).toBe(accessToken);
  });
});
