import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import Suspects from "../suspects";
import { useHeaderInput } from "../../hooks/useHeaderInput";
import { MemoryRouter } from "react-router-dom";

// Mock do hook useHeaderInput
vi.mock("../../hooks/useHeaderInput", () => ({
  useHeaderInput: vi.fn(),
}));

// Helper para renderizar com o Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe("Suspects Component", () => {
  // Configuração padrão do mock para todos os testes
  beforeEach(() => {
    vi.mocked(useHeaderInput).mockReturnValue({
      headerInputValue: "",
      setHeaderInputValue: vi.fn(),
    });
  });

  it("Deve renderizar os textos da página corretamente", () => {
    renderWithRouter(<Suspects />);

    expect(screen.getByText("Seleção de visualização")).toBeInTheDocument();
    expect(
      screen.getByText("Selecione um alvo para iniciar investigação")
    ).toBeInTheDocument();
  });

  it("Deve exibir mensagem quando nenhum suspeito corresponder ao filtro", () => {
    // Sobrescreve a configuração para este teste específico
    vi.mocked(useHeaderInput).mockReturnValue({
      headerInputValue: "xyz", // Um texto que não corresponde a nenhum nome
      setHeaderInputValue: vi.fn(),
    });

    renderWithRouter(<Suspects />);

    expect(
      screen.getByText("Nenhum alvo encontrado com o filtro atual")
    ).toBeInTheDocument();
  });
});
