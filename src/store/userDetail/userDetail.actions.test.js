import thunk from "redux-thunk";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import UserDetailTypes from "./userDetail.types";

import {
  getUserDetailStart,
  getUserDetailSuccess,
  getUserDetailFailure,
  getUserDetail,
} from "./userDetail.actions";

jest.mock("axios");
const mockStore = configureMockStore([thunk]);

const USER_DETAIL_MOCK = {
  id: 1,
  email: "george.bluth@reqres.in",
  first_name: "George",
  last_name: "Bluth",
  avatar: "",
};

const MOCK_ERROR = { message: "mock error message" };

const INITIAL_STATE = {
  userDetail: null,
  isLoading: false,
  error: null,
};

let mockedAxios;
let store;

beforeEach(() => {
  mockedAxios = axios;
  store = mockStore(INITIAL_STATE);
});

describe("getUserDetailStart  action", () => {
  it("should be created", () => {
    const action = getUserDetailStart();
    expect(action).toEqual({
      type: UserDetailTypes.GET_USER_DETAIL_START,
    });
  });
});

describe("getUserDetailSuccess action", () => {
  it("should be created", () => {
    const action = getUserDetailSuccess(USER_DETAIL_MOCK);
    expect(action).toEqual({
      type: UserDetailTypes.GET_USER_DETAIL_SUCCESS,
      payload: USER_DETAIL_MOCK,
    });
  });
});

describe("getUserDetailFailure action", () => {
  it("should be created", () => {
    const action = getUserDetailFailure(MOCK_ERROR);

    expect(action).toEqual({
      type: UserDetailTypes.GET_USER_DETAIL_FAILURE,
      payload: MOCK_ERROR,
    });
  });
});

describe("get user detail action", () => {
  it("should dispatch suitable actions on get users detail", async () => {
    const EXPECTED_ACTIONS = [
      { type: UserDetailTypes.GET_USER_DETAIL_START },
      {
        type: UserDetailTypes.GET_USER_DETAIL_SUCCESS,
        payload: USER_DETAIL_MOCK,
      },
    ];

    const MOCK_ID = 1;

    mockedAxios.get.mockResolvedValueOnce({ data: { data: USER_DETAIL_MOCK } });

    await store.dispatch(getUserDetail(MOCK_ID));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});
