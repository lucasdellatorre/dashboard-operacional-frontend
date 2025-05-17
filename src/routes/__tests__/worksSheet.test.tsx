import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Worksheet from "../Worksheet";

describe("Worksheet Component - Testes Unitários", () => {
  it("deve renderizar o título 'Histórico de Planilhas'", () => {
    render(<Worksheet />, { wrapper: MemoryRouter });
    const title = screen.getByTestId("Histórico de Planilhas");
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar o botão 'Upload de arquivos'", () => {
    render(<Worksheet />, { wrapper: MemoryRouter });
    const uploadButton = screen.getByRole("button", { name: /upload de arquivos/i });
    expect(uploadButton).toBeInTheDocument();
  });

  it("deve abrir o modal ao clicar no botão 'Upload de arquivos'", () => {
    render(<Worksheet />, { wrapper: MemoryRouter });
    const uploadButton = screen.getByRole("button", { name: /upload de arquivos/i });
    fireEvent.click(uploadButton);

    const modal = screen.getByTestId("close-modal-button");
    expect(modal).toBeInTheDocument();
  });

  it("deve fechar o modal ao clicar no botão de fechar", () => {
    render(<Worksheet />, { wrapper: MemoryRouter });
    const uploadButton = screen.getByRole("button", { name: /upload de arquivos/i });
    fireEvent.click(uploadButton);

    const closeButton = screen.getByTestId("close-modal-button");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("close-modal-button")).not.toBeInTheDocument();
  });
});