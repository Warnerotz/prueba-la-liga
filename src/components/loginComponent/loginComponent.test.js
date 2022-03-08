import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginComponent from "./loginComponent";

describe("Login componente", () => {
  it("should render the correct elements", () => {
    render(<LoginComponent />);

    const emailTextBox = screen.getByLabelText("Email");
    const passTextBox = screen.getByLabelText("Password");

    expect(emailTextBox).toBeInTheDocument();
    expect(passTextBox).toBeInTheDocument();
  });

  it("should call the sumit function", () => {
    const handleSumitData = jest.fn();
    render(
      <LoginComponent
        handleInputChange={jest.fn()}
        handleSumitData={handleSumitData}
      />
    );

    const emailTextBox = screen.getByLabelText("Email");
    const passTextBox = screen.getByLabelText("Password");

    userEvent.type(emailTextBox, "adrian@adrian.com");
    userEvent.type(passTextBox, "12345");

    const loginButton = screen.getByRole("button", { name: "Entrar" });
    userEvent.click(loginButton);

    expect(handleSumitData).toHaveBeenCalled();
  });
});
