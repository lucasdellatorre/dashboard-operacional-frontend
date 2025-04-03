import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../layout/header";
import { describe, expect, vi, it } from "vitest";

// Mock do console.log para capturar a saída do clique
global.console.log = vi.fn();

describe("Header Component", () => {
  it("Deve chamar a função handleExport ao clicar no botão Exportar", () => {
    render(<Header />);

    // Localiza o botão pelo texto
    const exportButton = screen.getByRole("button", { name: /exportar/i });

    // Simula o clique no botão
    fireEvent.click(exportButton);

    // Verifica se a função foi chamada corretamente
    expect(console.log).toHaveBeenCalledWith("Exportando...");
  });
});
