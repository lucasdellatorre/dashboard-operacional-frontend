import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Suspects from "../Suspects";
import theme from "../../utils/theme";

// Mock dos hooks personalizados
vi.mock("../../hooks/useHeaderInput", () => ({
  useHeaderInput: () => ({
    headerInputValue: "",
  }),
}));

vi.mock("../../hooks/useSuspects", () => ({
  useSuspects: () => ({
    filteredSuspects: [
      {
        id: 1,
        suspectName: "Jorge",
        number: "51 99999-9999",
        date: "2024-01-01",
        relevance: "Relevante",
        operationName: ["Operação A"],
        type: "Alvo",
      },
    ],
  }),
}));

interface TableProps {
  onSelectionChange: (selectedIds: number[], selectedItems: unknown[]) => void;
}

vi.mock("../../components/Table/Table", () => ({
  default: ({ onSelectionChange }: TableProps) => (
    <div data-testid="mock-table">
      Mocked Table
      <button onClick={() => onSelectionChange([1], [{ id: 1, suspectName: "Jorge" }])}>
        Selecionar Suspeito
      </button>
    </div>
  ),
}));

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

vi.mock("../../components/modal/createSuspectModal", () => ({
  default: ({ isOpen, onClose }: ModalProps) =>
    isOpen ? (
      <div data-testid="mock-modal">
        Modal Aberto
        <button onClick={onClose}>Fechar</button>
      </div>
    ) : null,
}));

const renderWithProviders = () =>
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspects />
      </BrowserRouter>
    </ThemeProvider>
  );

describe("Suspects Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o título e o botão de criar suspeito", () => {
    renderWithProviders();
    expect(screen.getByText("Selecione os alvos para exibição do dashboard")).toBeInTheDocument();
    expect(screen.getByText("Criar novo alvo")).toBeInTheDocument();
  });

  it("deve exibir a tabela com suspeitos", () => {
    renderWithProviders();
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  it("deve desabilitar o botão de confirmação quando nenhum suspeito estiver selecionado", () => {
    renderWithProviders();
    const confirmBtn = screen.getByText("Confirmar Seleção") as HTMLButtonElement;
    expect(confirmBtn.disabled).toBe(true);
  });

  it("deve habilitar o botão de confirmação ao selecionar um suspeito", async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Selecionar Suspeito"));
    const confirmBtn = screen.getByText("Confirmar Seleção") as HTMLButtonElement;
    await waitFor(() => {
      expect(confirmBtn.disabled).toBe(false);
    });
  });

  it("deve abrir o modal ao clicar no botão 'Criar novo alvo'", () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Criar novo alvo"));
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });

  it("deve fechar o modal ao clicar no botão de fechar", async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Criar novo alvo"));
    const closeButton = screen.getByText("Fechar");
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
    });
  });
});