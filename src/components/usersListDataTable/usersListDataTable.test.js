import { render, screen } from "@testing-library/react";
import UsersListDataTable from "./usersListDataTable";

describe("UserListDataTable", () => {
  const MOCK_DATA = [
    {
      id: 1,
      first_name: "paco",
      last_name: "martinez",
      email: "a@a.com",
      avatar: "",
    },
  ];

  it("should render headers correctly", () => {
    render(<UsersListDataTable usersListData={MOCK_DATA} />);

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
    render(<UsersListDataTable usersListData={MOCK_DATA} />);

    const expectedValue = screen.getByTestId(
      `user-list-data-${MOCK_DATA[0].id}`
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();

    expect(expectedValue).toBeInTheDocument();
  });
});
