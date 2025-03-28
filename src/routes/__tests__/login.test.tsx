import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../login";

describe("Login Page", () => {
  it("renderiza o texto correto na página de login", () => {
    render(<Login />);
    expect(screen.getByText("Aqui é o login")).toBeInTheDocument();
  });
});
