import thunk from "redux-thunk";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import UserDetailTypes from "./userDetail.types";

import {
  getUserDetailStart,
  getUserDetailSuccess,
  getUserDetailFailure,
  getUserDetail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUser,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updateUser,
} from "./userDetail.actions";

jest.mock("axios");
const mockStore = configureMockStore([thunk]);

const MOCK_ID = 1;

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

    mockedAxios.get.mockResolvedValueOnce({ data: { data: USER_DETAIL_MOCK } });

    await store.dispatch(getUserDetail(MOCK_ID));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });

  it("should dispatch suitable actions on get users detail fail", async () => {
    const EXPECTED_ACTIONS = [
      { type: UserDetailTypes.GET_USER_DETAIL_START },
      {
        type: UserDetailTypes.GET_USER_DETAIL_FAILURE,
        payload: MOCK_ERROR,
      },
    ];

    mockedAxios.get.mockRejectedValueOnce(MOCK_ERROR);

    await store.dispatch(getUserDetail(MOCK_ID));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});

describe("deleteUserStart  action", () => {
  it("should be created", () => {
    const action = deleteUserStart();
    expect(action).toEqual({
      type: UserDetailTypes.DELETE_USER_START,
    });
  });
});

describe("deleteUserSuccess action", () => {
  it("should be created", () => {
    const action = deleteUserSuccess();
    expect(action).toEqual({
      type: UserDetailTypes.DELETE_USER_SUCCESS,
    });
  });
});

describe("deleteUserFailure action", () => {
  it("should be created", () => {
    const action = deleteUserFailure(MOCK_ERROR);
    expect(action).toEqual({
      type: UserDetailTypes.DELETE_USER_FAILURE,
      payload: MOCK_ERROR,
    });
  });
});

describe("delete user action", () => {
  it("should dispatch suitable actions on delete user", async () => {
    const EXPECTED_ACTIONS = [
      { type: UserDetailTypes.DELETE_USER_START },
      {
        type: UserDetailTypes.DELETE_USER_SUCCESS,
      },
    ];

    mockedAxios.delete.mockResolvedValueOnce();

    await store.dispatch(deleteUser(MOCK_ID));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });

  it("should dispatch suitable actions on delete user fail", async () => {
    const EXPECTED_ACTIONS = [
      { type: UserDetailTypes.DELETE_USER_START },
      {
        type: UserDetailTypes.DELETE_USER_FAILURE,
        payload: MOCK_ERROR,
      },
    ];

    mockedAxios.delete.mockRejectedValueOnce(MOCK_ERROR);

    await store.dispatch(deleteUser(MOCK_ID));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});

describe("updateUserStart  action", () => {
  it("should be created", () => {
    const action = updateUserStart();
    expect(action).toEqual({
      type: UserDetailTypes.UPDATE_USER_START,
    });
  });
});

describe("updateUserSuccess action", () => {
  it("should be created", () => {
    const action = updateUserSuccess();
    expect(action).toEqual({
      type: UserDetailTypes.UPDATE_USER_SUCCESS,
    });
  });
});

describe("updateUserFailure action", () => {
  it("should be created", () => {
    const action = updateUserFailure(MOCK_ERROR);
    expect(action).toEqual({
      type: UserDetailTypes.UPDATE_USER_FAILURE,
      payload: MOCK_ERROR,
    });
  });
});

describe("update user action", () => {
  it("should dispatch suitable actions on update user", async () => {
    const EXPECTED_ACTIONS = [
      { type: UserDetailTypes.UPDATE_USER_START },
      {
        type: UserDetailTypes.UPDATE_USER_SUCCESS,
      },
    ];

    const USER_DATA_MOCK = {
      first_name: "adrian",
      last_name: "martinez",
      email: "ad@hotmail.com",
    };

    mockedAxios.patch.mockResolvedValueOnce();

    await store.dispatch(updateUser(MOCK_ID, USER_DATA_MOCK));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });

  it("should dispatch suitable actions on update user fail", async () => {
    const EXPECTED_ACTIONS = [
      { type: UserDetailTypes.UPDATE_USER_START },
      {
        type: UserDetailTypes.UPDATE_USER_FAILURE,
        payload: MOCK_ERROR,
      },
    ];

    const USER_DATA_MOCK = {
      first_name: "adrian",
      last_name: "martinez",
      email: "ad@hotmail.com",
    };

    mockedAxios.patch.mockRejectedValueOnce(MOCK_ERROR);

    await store.dispatch(updateUser(MOCK_ID, USER_DATA_MOCK));

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});
