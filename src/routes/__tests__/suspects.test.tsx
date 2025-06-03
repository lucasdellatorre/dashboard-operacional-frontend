import { ThemeProvider } from "@mui/material/styles";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { AppContext } from "../../context/AppContext";
import { BrowserRouter } from "react-router-dom";
import theme from "../../utils/theme";
import { Suspect, Numbers } from "../../hooks/useSuspects";
import { FilterType } from "../../enum/ViewSelectionFilterEnum";
import Suspects from "../Suspects";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock dos hooks personalizados
vi.mock("../../hooks/useHeaderInput", () => ({
  useHeaderInput: () => ({ headerInputValue: "" }),
}));

const mockSuspects: Suspect[] = [
  {
    id: 1,
    apelido: "Jorge",
    numeros: "51 99999-9999",
    data_criacao: "2024-01-01",
    relevante: "Sim",
    operacoes: "Operação A",
  },
  {
    id: 2,
    apelido: "Maria",
    numeros: "51 88888-8888",
    data_criacao: "2024-01-02",
    relevante: "Não",
    operacoes: "Operação B",
  },
];

const mockNumbers: Numbers[] = [
  {
    id: 1,
    numero: "51 99999-9999",
    operacoes: "Operação A",
  },
  {
    id: 2,
    numero: "51 88888-8888",
    operacoes: "Operação B",
  },
];

const mockSetSuspects = vi.fn();
const mockSetNumbers = vi.fn();

vi.mock("../../hooks/useSuspects", () => ({
  useSuspects: () => ({
    suspects: mockSuspects,
    numbers: mockNumbers,
    loading: false,
    error: null,
  }),
  Suspect: {},
  Numbers: {},
}));

interface TableProps {
  onSelectionChange: (selectedIds: number[], selectedItems: Suspect[]) => void;
}

vi.mock("../../components/Table/Table", () => ({
  default: ({ onSelectionChange }: TableProps) => (
    <div data-testid="mock-table">
      Mocked Table
      <button onClick={() => onSelectionChange([1], [mockSuspects[0]])}>
        Selecionar Alvo
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
      <AppContext.Provider
        value={{
          suspects: mockSuspects,
          setSuspects: mockSetSuspects,
          numbers: mockNumbers,
          setNumbers: mockSetNumbers,
          cpf: "",
          setCpf: vi.fn(),
          operations: [],
          setOperations: vi.fn(),
          worksheets: [],
          setWorksheets: vi.fn(),
          dashboardFilters: {
            filterType: FilterType.UNION,
            chart: FilterType.ALL,
            type: "Texto",
            group: "Ambos",
            options: [] as string[],
            symmetry: "Ambos",
          },
          setDashboardFilters: vi.fn(),
          webChartFilters: {
            type: "Texto",
            group: "Ambos",
            options: [] as string[],
          },
          setWebChartFilters: vi.fn(),
        }}
      >
        <BrowserRouter>
          <Suspects />
        </BrowserRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );

describe("Suspects Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o título e o botão de criar suspeito", () => {
    renderWithProviders();
    expect(
      screen.getByText("Selecione os alvos para exibição do dashboard")
    ).toBeInTheDocument();
    expect(screen.getByText("Criar novo alvo")).toBeInTheDocument();
  });

  it("deve exibir a tabela com suspeitos", async () => {
    renderWithProviders();
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  it("deve desabilitar o botão de confirmação quando nenhum suspeito estiver selecionado", async () => {
    renderWithProviders();
    const confirmBtn = screen.getByLabelText("Confirmar Seleção");
    expect(confirmBtn).toBeDisabled();
  });

  it("deve habilitar o botão de confirmação ao selecionar um suspeito", async () => {
    renderWithProviders();
    await waitFor(() => {
      const confirmBtn = screen.getByLabelText("Confirmar Seleção");
      expect(confirmBtn).not.toBeDisabled();
    });
  });

  it("deve abrir o modal ao clicar em Criar novo alvo", async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Criar novo alvo"));
    await waitFor(() => {
      expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    });
  });

  it("deve fechar o modal ao clicar no botão Fechar", async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Criar novo alvo"));
    fireEvent.click(screen.getByText("Fechar"));
    await waitFor(() => {
      expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
    });
  });

  it("deve navegar para o dashboard ao confirmar a seleção", async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText("Selecionar Alvo"));
    const confirmBtn = screen.getByLabelText("Confirmar Seleção");
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("deve exibir os dados corretos dos suspeitos na tabela", async () => {
    renderWithProviders();
    await waitFor(() => {
      const columnHeader = screen.getByText("Nome/Apelido");
      expect(columnHeader).toBeInTheDocument();
    });
  });

  it("deve exibir os dados corretos dos números interceptados na tabela", async () => {
    renderWithProviders();
    await waitFor(() => {
      expect(screen.getByText("51 99999-9999")).toBeInTheDocument();
      expect(screen.getByText("51 88888-8888")).toBeInTheDocument();
    });
  });
});
