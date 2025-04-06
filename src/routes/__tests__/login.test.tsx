import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../login";

describe("Login Component", () => {
  
  it("deve renderizar o texto 'Dashboard Operacional'", () => {
    render(<Login />);
    expect(screen.getByText("Dashboard Operacional")).toBeInTheDocument();
  });

  it("deve renderizar o logo da polícia", () => {
    render(<Login />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("deve aplicar a opacidade correta no background", () => {
    render(<Login />);
    const backgroundImage = screen.getByTestId("backgroundImage");
    expect(backgroundImage).toHaveStyle("opacity: 0.09");
  });

  it("deve renderizar o container principal com altura de 100vh", () => {
    render(<Login />);
    const mainContainer = screen.getByTestId("backgroundImage").parentElement;
    expect(mainContainer).toHaveStyle("height: 100vh");
  });

  it("deve renderizar o logo com tamanhos responsivos", () => {
    render(<Login />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("logoPolicia.png")
    );
    expect(logo).toHaveStyle({
      width: expect.stringContaining("18rem"),
    });
  });
});
