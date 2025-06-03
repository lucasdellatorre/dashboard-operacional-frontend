import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SuspectsDetails from "../suspectDetails";
import { ApplicationProvider } from "../../context/AppContext";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../hooks/useSuspectInfo", () => ({
  useSuspectInfo: (id: number) => ({
    suspect: {
      id,
      apelido: "Apelido Mockado",
      nome: "Nome Mockado",
      cpf: "12345678901",
      relevante: true,
      anotacoes: "Anotações Mockadas",
      ips: [
        { ip: "192.168.0.1", ocorrencias: 5 },
        { ip: "192.168.0.2", ocorrencias: 3 },
      ],
      celulares: [
        { numero: "51 99999-9999", lastUpdateDate: "2024-01-01", lastUpdateCpf: "123.456.789-00" },
      ],
      emails: [
        { email: "mockado@email.com", lastUpdateDate: "2024-01-01", lastUpdateCpf: "123.456.789-00" },
      ],
    },
    loading: false,
    error: null,
  }),
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ApplicationProvider>{ui}</ApplicationProvider>
    </MemoryRouter>
  );
};

describe("SuspectsDetails Component", () => {
  it("Deve renderizar as informações do suspeito corretamente", async () => {
    renderWithProvider(<SuspectsDetails />);

    expect(screen.getByText("Informações do Suspeito")).toBeInTheDocument();
    expect(screen.getByText("Apelido Mockado")).toBeInTheDocument();
    expect(screen.getByText("Nome Mockado")).toBeInTheDocument();
    expect(screen.getByText("123.456.789-01")).toBeInTheDocument();
    expect(screen.getByText("Anotações Mockadas")).toBeInTheDocument();
  });

  it("Deve exibir o estado de carregamento corretamente", async () => {
    vi.mock("../../hooks/useSuspectInfo", () => ({
      useSuspectInfo: () => ({
        suspect: null,
        loading: true,
        error: null,
      }),
    }));

    renderWithProvider(<SuspectsDetails />);

    expect(screen.getAllByRole("progressbar")).toHaveLength(4); // Skeletons
  });

  it("Deve exibir uma mensagem de erro quando ocorrer um erro", async () => {
    vi.mock("../../hooks/useSuspectInfo", () => ({
      useSuspectInfo: () => ({
        suspect: null,
        loading: false,
        error: "Erro ao carregar informações do suspeito",
      }),
    }));

    renderWithProvider(<SuspectsDetails />);

    expect(screen.getByText("Erro ao carregar informações do suspeito")).toBeInTheDocument();
  });

  it("Deve permitir a edição do apelido, nome e CPF", async () => {
    renderWithProvider(<SuspectsDetails />);

    const nicknameField = screen.getByLabelText("Apelido");
    const nameField = screen.getByLabelText("Nome");
    const cpfField = screen.getByLabelText("CPF");

    fireEvent.change(nicknameField, { target: { value: "Novo Apelido" } });
    fireEvent.change(nameField, { target: { value: "Novo Nome" } });
    fireEvent.change(cpfField, { target: { value: "98765432100" } });

    expect(nicknameField).toHaveValue("Novo Apelido");
    expect(nameField).toHaveValue("Novo Nome");
    expect(cpfField).toHaveValue("987.654.321-00");
  });

  it("Deve permitir a edição do campo de anotações", async () => {
    renderWithProvider(<SuspectsDetails />);

    const notesField = screen.getByLabelText("Anotações");
    fireEvent.change(notesField, { target: { value: "Novas Anotações" } });

    expect(notesField).toHaveValue("Novas Anotações");
  });

  it("Deve permitir a seleção no dropdown 'Relevante'", async () => {
    renderWithProvider(<SuspectsDetails />);

    const relevanteDropdown = screen.getByLabelText("Relevante");
    fireEvent.mouseDown(relevanteDropdown);
    const naoOption = screen.getByText("Não");
    fireEvent.click(naoOption);

    expect(relevanteDropdown).toHaveValue("nao");
  });

  it("Deve renderizar as tabelas de IPs, celulares e emails corretamente", async () => {
    renderWithProvider(<SuspectsDetails />);

    expect(screen.getByText("IPs")).toBeInTheDocument();
    expect(screen.getByText("192.168.0.1")).toBeInTheDocument();
    expect(screen.getByText("192.168.0.2")).toBeInTheDocument();

    expect(screen.getByText("Celulares")).toBeInTheDocument();
    expect(screen.getByText("51 99999-9999")).toBeInTheDocument();

    expect(screen.getByText("Emails")).toBeInTheDocument();
    expect(screen.getByText("mockado@email.com")).toBeInTheDocument();
  });
});