import { render, screen } from "@testing-library/react";
import Header from "../layout/header";
import { describe, vi, it } from "vitest";

// Mock do console.log para capturar a saída do clique
global.console.log = vi.fn();

describe("Header Component", () => {
  it("Deve localizar o botão na tela", () => {
    render(<Header inputValue={""} setInputValue={() => {}} />);

    // Localiza o botão pelo texto
    screen.getByRole("button", { name: /exportar/i });
  });
});
