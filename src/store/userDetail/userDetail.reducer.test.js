import UserDetailTypes from "./userDetail.types";
import userDetailReducer from "./userDetail.reducer";

const INITIAL_STATE = {
  userDetail: null,
  isLoading: false,
  error: null,
};

const USER_DETAIL_MOCK = {
  id: 1,
  email: "george.bluth@reqres.in",
  first_name: "George",
  last_name: "Bluth",
  avatar: "",
};

const ERROR_MOCK = { message: "error" };

describe("userDetailReducer", () => {
  it("should return initial state", () => {
    expect(userDetailReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should set isLoading to true when users detail starts", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.GET_USER_DETAIL_START,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
      error: null,
    });
  });
  it("should set usersList when user detail success", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.GET_USER_DETAIL_SUCCESS,
      payload: USER_DETAIL_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: null,
      isLoading: false,
      userDetail: USER_DETAIL_MOCK,
    });
  });
  it("should set error when user detail failure", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.GET_USER_DETAIL_FAILURE,
      payload: ERROR_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: ERROR_MOCK,
      isLoading: false,
    });
  });
});
