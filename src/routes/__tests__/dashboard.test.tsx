import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import "@testing-library/jest-dom/vitest";

describe("Dashboard Component", () => {
  it("renderiza o texto do dashboard", () => {
    render(<Dashboard />);
    expect(screen.getByText("Aqui é dashboard")).toBeInTheDocument();
  });
});
