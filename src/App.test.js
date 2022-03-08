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
test("renders learn react link", () => {
  render(
    <Provider store={mockStore(initialState)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
