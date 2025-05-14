import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import { describe, expect, it } from "vitest";

describe("Login Component", () => {
  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  it("deve renderizar o texto 'Dashboard Operacional'", () => {
    renderLogin();
    const title = screen.getByText("Dashboard Operacional");
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar o logo da polícia", () => {
    renderLogin();
    const logo = screen.getByAltText("logo da policia");
    expect(logo).toBeInTheDocument();
  });

  it("deve aplicar a opacidade correta no background", () => {
    renderLogin();
    const background = screen.getByTestId("background-image");
    expect(background).toHaveStyle({ opacity: 0.09 });
  });

  it("deve renderizar o container principal com altura de 100vh", () => {
    renderLogin();
    const container = screen.getByTestId("login-container");
    expect(container).toHaveStyle({ height: "100vh" });
  });

  it("deve renderizar o logo com tamanhos responsivos", () => {
    renderLogin();
    const logo = screen.getByAltText("logo da policia");
    expect(logo).toHaveStyle({
      width: {
        sm: "18rem",
        md: "21rem",
        lg: "25rem",
      },
      height: "auto",
    });
  });
});
