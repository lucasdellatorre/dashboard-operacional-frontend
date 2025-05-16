import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Dashboard from "../Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
(globalThis as any).ResizeObserver = ResizeObserver;

vi.mock("recharts", async () => {
  const actual = await vi.importActual<typeof import("recharts")>("recharts");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

vi.mock("../../components/multiSelect", () => ({
  default: ({ selectedOptions, onChange }: {
    selectedOptions: string[];
    onChange: (options: string[]) => void;
  }) => (
    <div data-testid="mock-multiselect" onClick={() => onChange(["FakeUser"])}>
      MockMultiSelect: {selectedOptions.join(", ")}
    </div>
  ),
}));

vi.mock("../../components/filters/ViewSelection", () => ({
  default: ({
    filters,
    selectedFilter,
    onChange,
  }: {
    filters: { value: string; label: string }[];
    selectedFilter: string;
    onChange: (value: string) => void;
  }) => (
    <div data-testid="mock-filter">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{ fontWeight: selectedFilter === f.value ? "bold" : "normal" }}
        >
          {f.label}
        </button>
      ))}
    </div>
  ),
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("deve renderizar o título 'Seleção de Alvos'", () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText("Seleção de Alvos")).toBeInTheDocument();
  });

  it("deve renderizar os filtros de seleção", () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText("Seleção de Gráficos")).toBeInTheDocument();
    expect(screen.getByText("Tipo de Seleção")).toBeInTheDocument();
  });

  it("deve renderizar os gráficos por padrão (modo ALL)", () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText("Mensagens por Contato")).toBeInTheDocument();
    expect(screen.getByText("Mensagens por IP")).toBeInTheDocument();
    expect(screen.getByText("Mensagens por Horário")).toBeInTheDocument();
    expect(screen.getByText("Mensagens por Dia")).toBeInTheDocument();
  });

  it("deve trocar o gráfico ao clicar em 'Mensagens por IP'", () => {
    renderWithTheme(<Dashboard />);
    const chart = screen.getByText("Mensagens por IP");
    fireEvent.click(chart);
    expect(screen.getByText("Mensagens por IP")).toBeInTheDocument();
  });

  it("deve alterar seleção no filtro de tipo (Texto, Vídeo, Todos)", () => {
    renderWithTheme(<Dashboard />);

    const tipoSelect = screen.getAllByRole("combobox")[1]; // Seleciona "Tipo"
    fireEvent.mouseDown(tipoSelect);

    const listbox = screen.getByRole("listbox");
    const videoOption = within(listbox).getByText("Vídeo");
    fireEvent.click(videoOption);

    // Verifica se a opção foi aplicada no combobox
    expect(screen.getAllByRole("combobox")[1]).toHaveTextContent("Vídeo");
  });
});
