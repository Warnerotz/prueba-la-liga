import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const initialState = {
  users: {
    isLoading: false,
    error: null,
    usersList: {
      data: [
        {
          id: 1,
          first_name: "adrian",
          last_name: "martinez",
          email: "adrian@adrian.com",
        },
      ],
    },
  },
  userDetail: {
    userDetail: null,
    isLoading: false,
    error: null,
  },
  authToken: {
    authToken: "QpwL5tke4Pnpja7X1",
    isLoading: false,
    error: null,
  },
};

const mockStore = configureStore([thunk]);

describe("App", () => {
  beforeEach(() => {
    window.localStorage.setItem("token", "aisodjbasdiu");
  });

  it("should go to user list page when token exists", () => {
    window.history.pushState({}, "Test page", "/");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(window.location.pathname).toBe("/");
  });

  it("should go to login page when does not exist token", () => {
    window.history.pushState({}, "Test page", "/");
    window.localStorage.removeItem("token");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(window.location.pathname).toBe("/login");
  });
});
