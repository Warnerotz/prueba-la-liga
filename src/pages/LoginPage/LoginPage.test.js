import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import LoginPage from "./LoginPage";

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

beforeEach(() => {
  window.localStorage.setItem("token", "QpwL5tke4Pnpja7X1");
});

afterEach(() => {
  window.localStorage.removeItem("token");
});

describe("LoginPage", () => {
  it("should redirect to home if user is logged", () => {
    window.history.pushState({}, "Test page", "/login");

    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(window.location.pathname).toMatch("/");
  });

  it("should not redirect to home if localstorage is not setted", () => {
    window.history.pushState({}, "Test page", "/login");
    window.localStorage.removeItem("token");
    render(
      <Provider
        store={mockStore({
          ...initialState,
          authToken: {
            authToken: null,
            isLoading: false,
            error: null,
          },
        })}
      >
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(window.location.pathname).toEqual("/login");
  });

  it("should redirect to home if user logged correctly", () => {
    window.history.pushState({}, "Test page", "/login");
    render(
      <Provider
        store={mockStore({
          ...initialState,
          authToken: { authToken: null },
        })}
      >
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const emailTextBox = screen.getByLabelText("Email");
    const passTextBox = screen.getByLabelText("Password");

    userEvent.type(emailTextBox, "a@a.com");
    userEvent.type(passTextBox, "12345");

    const loginButton = screen.getByRole("button", { name: "Entrar" });
    userEvent.click(loginButton);

    expect(window.location.pathname).toEqual("/");
  });

  it("should render the error modal if the login fail", async () => {
    window.history.pushState({}, "Test page", "/login");
    render(
      <Provider
        store={mockStore({
          ...initialState,
          authToken: {
            authToken: null,
            isLoading: false,
            error: { message: "error" },
          },
        })}
      >
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      await screen.findByText("Email o contraseña incorrecta")
    ).toBeInTheDocument();
  });

  it("should return to login page after confirm error modal", async () => {
    window.history.pushState({}, "Test page", "/login");
    window.localStorage.removeItem("token");
    render(
      <Provider
        store={mockStore({
          ...initialState,
          authToken: {
            authToken: null,
            isLoading: false,
            error: { message: "error" },
          },
        })}
      >
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const modalButton = await screen.findByText("Aceptar");
    userEvent.click(modalButton);
    expect(window.location.pathname).toBe("/login");
  });
});
