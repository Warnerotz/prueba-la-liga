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

  it("should set isLoading to true when delete user starts", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.DELETE_USER_START,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
      error: null,
    });
  });

  it("should set isLoading a false when delete user success", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.DELETE_USER_SUCCESS,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: null,
      isLoading: false,
    });
  });

  it("should set error when delte user fail", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.DELETE_USER_FAILURE,
      payload: ERROR_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: ERROR_MOCK,
      isLoading: false,
    });
  });

  it("should set isLoading to true when update user starts", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.UPDATE_USER_START,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
      error: null,
    });
  });

  it("should set isLoading a false when update user success", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.UPDATE_USER_SUCCESS,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: null,
      isLoading: false,
    });
  });

  it("should set error when update user fail", () => {
    const state = userDetailReducer(INITIAL_STATE, {
      type: UserDetailTypes.UPDATE_USER_FAILURE,
      payload: ERROR_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: ERROR_MOCK,
      isLoading: false,
    });
  });
});
