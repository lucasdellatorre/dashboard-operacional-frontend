import { render, screen, fireEvent } from "@testing-library/react";
import ContainerLogin from "../login/ContainerLogin/ContainerLogin";
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Helper para renderizar com o Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe("ContainerLogin Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Deve renderizar o campo cpf + o botão de entrar", () => {
    renderWithRouter(<ContainerLogin />);
    expect(screen.getByPlaceholderText("000.000.000-00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("Deve formatar o cpf do usuário corretamente", () => {
    renderWithRouter(<ContainerLogin />);
    const cpfInput = screen.getByPlaceholderText("000.000.000-00");

    fireEvent.change(cpfInput, { target: { value: "12345678901" } });
    expect(cpfInput).toHaveValue("123.456.789-01");
  });

  it("Deve salvar o cpf do usuário no localStorage corretamente", () => {
    renderWithRouter(<ContainerLogin />);
    const cpfInput = screen.getByPlaceholderText("000.000.000-00");
    const button = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(cpfInput, { target: { value: "123.456.789-01" } });
    fireEvent.click(button);

    expect(localStorage.getItem("cpf")).toBe("123.456.789-01");
  });

  it("Deve aplicar o efeito de escala do botão entrar", () => {
    renderWithRouter(<ContainerLogin />);
    const button = screen.getByRole("button", { name: /entrar/i });

    fireEvent.mouseDown(button);
    expect(button).toHaveStyle("transform: scale(0.95)");

    fireEvent.mouseUp(button);
    expect(button).toHaveStyle("transform: scale(1)");
  });
});
