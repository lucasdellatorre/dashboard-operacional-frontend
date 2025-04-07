import { render, screen } from "@testing-library/react";
import Header from "../layout/Header/Header";
import { describe, vi, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock do console.log para capturar a saída do clique
global.console.log = vi.fn();

describe("Header Component", () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header inputValue={""} setInputValue={() => {}} />
      </BrowserRouter>
    );
  };

  it("Deve localizar o botão na tela", () => {
    renderHeader();

    // Localiza o botão pelo texto
    const button = screen.getByRole("button", { name: /exportar/i });
    expect(button).toBeInTheDocument();
  });

  it("Deve renderizar o título do dashboard", () => {
    renderHeader();

    const title = screen.getByText("Dashboard Operacional");
    expect(title).toBeInTheDocument();
  });

  it("Deve renderizar a mensagem de boas-vindas", () => {
    renderHeader();

    const welcomeMessage = screen.getByText("Olá, seja bem vindo!");
    expect(welcomeMessage).toBeInTheDocument();
  });
});
