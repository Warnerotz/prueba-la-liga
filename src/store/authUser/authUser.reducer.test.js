import GetAuthTokenTypes from "./authUser.types";
import authUserReducer from "./authUser.reducer";

const INITIAL_STATE = {
  authToken: null,
  isLoading: false,
  error: null,
};

const USER_AUTH_TOKEN_MOCK = "ASDASD";
const ERROR_MOCK = { message: "error" };

describe("get user auth token reducer", () => {
  it("should return initial state", () => {
    expect(authUserReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should set isLoading to true when get user auth token starts", () => {
    const state = authUserReducer(INITIAL_STATE, {
      type: GetAuthTokenTypes.GET_AUTH_TOKEN_START,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
      error: null,
    });
  });

  it("should set authToken when user auth token starts", () => {
    const state = authUserReducer(INITIAL_STATE, {
      type: GetAuthTokenTypes.GET_AUTH_TOKEN_SUCCESS,
      payload: USER_AUTH_TOKEN_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: null,
      isLoading: false,
      authToken: USER_AUTH_TOKEN_MOCK,
    });
  });

  it("should set error when get user auth token failure", () => {
    const state = authUserReducer(INITIAL_STATE, {
      type: GetAuthTokenTypes.GET_AUTH_TOKEN_FAILURE,
      payload: ERROR_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: ERROR_MOCK,
      isLoading: false,
    });
  });
});
