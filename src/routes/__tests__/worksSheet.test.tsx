import { ThemeProvider } from "@emotion/react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { theme } from "../../theme";
import Worksheet from "../Worksheet";
import { WorkSheet } from "../../hooks/useWorksheets";

// Mock dos hooks personalizados
vi.mock("../../hooks/useHeaderInput", () => ({
  useHeaderInput: () => ({ headerInputValue: "" }),
}));

const mockWorksheets: WorkSheet[] = [
  { id: 1, worksheet: "Planilha A", size: "2MB", insertedBy: "João", operationName: ["Operação X"], date: "2024-01-01" },
  { id: 2, worksheet: "Planilha B", size: "3MB", insertedBy: "Maria", operationName: ["Operação Y"], date: "2024-01-02" },
];

const mockAddWorksheet = vi.fn();

vi.mock("../../hooks/useWorksheets", () => ({
  useWorksheets: () => ({
    filteredWorksheets: mockWorksheets,
    addWorksheet: mockAddWorksheet,
  }),
}));

vi.mock("../../hooks/useOperations", () => ({
  useOperations: () => ({
    filteredOperations: [
      { id: 1, operationName: "Operação X" },
      { id: 2, operationName: "Operação Y" },
    ],
  }),
}));

interface TableProps {
  onSelectionChange: (selectedIds: number[], selectedItems: WorkSheet[]) => void;
}

vi.mock("../../components/Table/Table", () => ({
  default: ({ onSelectionChange }: TableProps) => (
    <div data-testid="mock-table">
      Mocked Table
      <button onClick={() => onSelectionChange([1], [mockWorksheets[0]])}>Selecionar Planilha</button>
    </div>
  ),
}));

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (file: File) => void;
}

vi.mock("../../components/modal/uploadWorksheetModal", () => ({
  default: ({ isOpen, onClose, onUploadSuccess }: ModalProps) =>
    isOpen ? (
      <div data-testid="mock-modal">
        Modal Aberto
        <button onClick={() => onUploadSuccess(new File(["content"], "Planilha C.xlsx"))}>Upload Planilha</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    ) : null,
}));

const renderWithProviders = () =>
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Worksheet />
      </BrowserRouter>
    </ThemeProvider>
  );

describe("Worksheet Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o título e o botão de upload", () => {
    renderWithProviders();
    expect(screen.getByText("Histórico de Planilhas")).toBeInTheDocument();
    expect(screen.getByText("Upload de arquivos")).toBeInTheDocument();
  });

  it("deve exibir a tabela com planilhas", () => {
    renderWithProviders();
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  it("deve abrir o modal ao clicar no botão 'Upload de arquivos'", () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Upload de arquivos"));
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });

  it("deve fechar o modal ao clicar no botão de fechar", async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Upload de arquivos"));
    const closeButton = screen.getByText("Fechar");
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
    });
  });

  it("deve chamar a função de upload ao fazer upload de uma planilha", async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Upload de arquivos"));
    const uploadButton = screen.getByText("Upload Planilha");
    fireEvent.click(uploadButton);
    await waitFor(() => {
      expect(mockAddWorksheet).toHaveBeenCalledWith(
        "Planilha C.xlsx",
        expect.any(String),
        expect.any(String),
        expect.any(String)
      );
    });
  });
});