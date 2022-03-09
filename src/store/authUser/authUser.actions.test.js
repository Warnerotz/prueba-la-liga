import thunk from "redux-thunk";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import GetAuthTokenTypes, { UserLogOutTypes } from "./authUser.types";
import {
  getAuthTokenStart,
  getAuthTokenSuccess,
  getAuthTokenFailure,
  getAuthToken,
  userLogOutStart,
  userLogOut,
} from "./authUser.actions";

jest.mock("axios");
const mockStore = configureMockStore([thunk]);

const AUTH_TOKEN_MOCK = "asdfg";
const MOCK_ERROR = { message: "mock error message" };

const INITIAL_STATE = {
  isLoading: false,
  authToken: null,
  error: null,
};

let mockedAxios;
let store;

beforeEach(() => {
  mockedAxios = axios;
  store = mockStore(INITIAL_STATE);
});

describe("getAuthTokenStart  action", () => {
  it("should be created", () => {
    const action = getAuthTokenStart();
    expect(action).toEqual({
      type: GetAuthTokenTypes.GET_AUTH_TOKEN_START,
    });
  });
});

describe("getAuthTokenSuccess  action", () => {
  it("should be created", () => {
    const action = getAuthTokenSuccess(AUTH_TOKEN_MOCK);
    expect(action).toEqual({
      type: GetAuthTokenTypes.GET_AUTH_TOKEN_SUCCESS,
      payload: AUTH_TOKEN_MOCK,
    });
  });
});

describe("getAuthTokenFailure  action", () => {
  it("should be created", () => {
    const action = getAuthTokenFailure(MOCK_ERROR);
    expect(action).toEqual({
      type: GetAuthTokenTypes.GET_AUTH_TOKEN_FAILURE,
      payload: MOCK_ERROR,
    });
  });
});

describe("get user auth token action", () => {
  it("should dispatch suitable actions on get user auth token", async () => {
    const EXPECTED_ACTIONS = [
      { type: GetAuthTokenTypes.GET_AUTH_TOKEN_START },
      {
        type: GetAuthTokenTypes.GET_AUTH_TOKEN_SUCCESS,
        payload: AUTH_TOKEN_MOCK,
      },
    ];

    const USER_EMAIL_MOCK = "a@a.com";
    const USER_PASSWORD_MOCK = "ASDASDA";

    mockedAxios.post.mockResolvedValueOnce({
      data: { token: AUTH_TOKEN_MOCK },
    });

    await store.dispatch(getAuthToken(USER_EMAIL_MOCK, USER_PASSWORD_MOCK));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });

  it("should dispatch suitable actions on get user auth token fail", async () => {
    const EXPECTED_ACTIONS = [
      { type: GetAuthTokenTypes.GET_AUTH_TOKEN_START },
      {
        type: GetAuthTokenTypes.GET_AUTH_TOKEN_FAILURE,
        payload: MOCK_ERROR,
      },
    ];

    const USER_EMAIL_MOCK = "a@a.com";
    const USER_PASSWORD_MOCK = "ASDASDA";

    mockedAxios.post.mockRejectedValueOnce(MOCK_ERROR);

    await store.dispatch(getAuthToken(USER_EMAIL_MOCK, USER_PASSWORD_MOCK));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});

describe("user log out  action", () => {
  it("should be created", () => {
    const action = userLogOutStart();
    expect(action).toEqual({
      type: UserLogOutTypes.USER_LOG_OUT,
    });
  });
});

describe("log out user action", () => {
  it("should dispatch suitable actions on log out", async () => {
    const EXPECTED_ACTIONS = [{ type: UserLogOutTypes.USER_LOG_OUT }];

    await store.dispatch(userLogOut());

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});
