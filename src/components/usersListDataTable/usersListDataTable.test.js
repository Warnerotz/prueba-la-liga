import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import UsersListDataTable from "./usersListDataTable";

describe("UserListDataTable", () => {
  const MOCK_DATA = {
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        id: 1,
        first_name: "paco",
        last_name: "martinez",
        email: "a@a.com",
        avatar: "",
      },
    ],
  };

  it("should render headers correctly", () => {
    render(
      <BrowserRouter>
        <UsersListDataTable usersListData={MOCK_DATA} />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("user-list-headers-first-name")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("user-list-headers-last-name")
    ).toBeInTheDocument();

    expect(screen.getByTestId("user-list-headers-email")).toBeInTheDocument();

    expect(screen.getByTestId("user-list-headers-actions")).toBeInTheDocument();
  });

  it("should render table body data correctly", () => {
    render(
      <BrowserRouter>
        <UsersListDataTable usersListData={MOCK_DATA} />
      </BrowserRouter>
    );

    const expectedValue = screen.getByTestId(
      `user-list-data-${MOCK_DATA.data[0].id}`
    );

    const button = screen.getByRole("button", { name: "Desloguearse" });

    expect(button).toBeInTheDocument();

    expect(expectedValue).toBeInTheDocument();
  });

  it("should dispatch handleLogOut when user click in the log out button", () => {
    const logOut = jest.fn();
    window.history.pushState({}, "Test page", "/");
    render(
      <BrowserRouter>
        <UsersListDataTable usersListData={MOCK_DATA} logOut={logOut} />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Desloguearse" });

    userEvent.click(button);

    expect(logOut).toHaveBeenCalled();
    expect(window.location.pathname).toMatch("/login");
  });

  it("should redirect to user detail page when click on modificar button", () => {
    window.history.pushState({}, "Test page", "/");
    render(
      <BrowserRouter>
        <UsersListDataTable usersListData={MOCK_DATA} />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Modificar" });
    userEvent.click(button);
    expect(window.location.pathname).toMatch("users/1");
  });

  it("should dispatch the get users list when you change the page", () => {
    const getUsersDataList = jest.fn();
    render(
      <BrowserRouter>
        <UsersListDataTable
          usersListData={MOCK_DATA}
          getUsersList={getUsersDataList}
        />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Go to next page" });

    userEvent.click(button);

    expect(getUsersDataList).toHaveBeenCalled();
  });
});
