import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("Not found page", () => {
  it("should redirect to home page when click on button", () => {
    window.history.pushState({}, "Test page", "/123408952");
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Volver" });

    userEvent.click(button);

    expect(window.location.pathname).toBe("/");
  });
});
