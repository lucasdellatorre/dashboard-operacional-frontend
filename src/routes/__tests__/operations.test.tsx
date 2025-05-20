// import { ThemeProvider } from "@emotion/react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { AppContext } from "../../context/AppContext";
// import { BrowserRouter } from "react-router-dom";
// import { theme } from "../../theme";
// import Operations from "../Operations";
// import { Operation } from "../../hooks/useOperations";

// // Mocks dos hooks personalizados
// vi.mock("../../hooks/useHeaderInput", () => ({
//   useHeaderInput: () => ({ headerInputValue: "" }),
// }));

// const mockOperations: Operation[] = [
//   { id: 1, operationName: "Operação Alfa", operationDate: "2024-01-01", numberOfSuspects: 3 },
//   { id: 2, operationName: "Operação Beta", operationDate: "2024-01-02", numberOfSuspects: 5 },
// ];

// const mockSetOperations = vi.fn();

// vi.mock("../../hooks/useOperations", () => ({
//   useOperations: () => ({
//     filteredOperations: mockOperations,
//     loading: false,
//     error: false,
//     createOperation: vi.fn(),
//   }),
// }));

// interface TableProps {
//   onSelectionChange: (selectedIds: number[], selectedItems: Operation[]) => void;
// }

// vi.mock("../../components/operationSuspectTable/table", () => ({
//   default: ({ onSelectionChange }: TableProps) => (
//     <div data-testid="mock-table">
//       Mocked Table
//       <button onClick={() => onSelectionChange([1], [mockOperations[0]])}>Selecionar Operação</button>
//     </div>
//   ),
// }));

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// vi.mock("../../components/modal/createOperationModal", () => ({
//   default: ({ isOpen, onClose }: ModalProps) =>
//     isOpen ? (
//       <div data-testid="mock-modal">
//         Modal Aberto
//         <button onClick={onClose}>Fechar</button>
//       </div>
//     ) : null,
// }));

// const renderWithProviders = () =>
//   render(
//     <ThemeProvider theme={theme}>
//       <AppContext.Provider value={{ operations: [], setOperations: mockSetOperations }}>
//         <BrowserRouter>
//           <Operations />
//         </BrowserRouter>
//       </AppContext.Provider>
//     </ThemeProvider>
//   );

// describe("Operation Component", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("deve renderizar o título e o botão de criar operação", () => {
//     renderWithProviders();
//     expect(screen.getByText("Selecione uma operação para iniciar a investigação")).toBeInTheDocument();
//     expect(screen.getByText("Criar nova operação")).toBeInTheDocument();
//   });

//   it("deve exibir a tabela com operações", () => {
//     renderWithProviders();
//     expect(screen.getByTestId("mock-table")).toBeInTheDocument();
//   });

//   it("deve chamar setOperations ao selecionar uma operação", async () => {
//     renderWithProviders();
//     fireEvent.click(screen.getByText("Selecionar Operação"));
//     await waitFor(() => {
//       expect(mockSetOperations).toHaveBeenCalledWith([mockOperations[0]]);
//     });
//   });

//   it("deve desabilitar botão de confirmação quando nada estiver selecionado", () => {
//     renderWithProviders();
//     const confirmBtn = screen.getByText("Confirmar Seleção") as HTMLButtonElement;
//     expect(confirmBtn.disabled).toBe(true);
//   });

//   it("deve abrir o modal ao clicar em Criar nova operação", () => {
//     renderWithProviders();
//     fireEvent.click(screen.getByText("Criar nova operação"));
//     expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
//   });
// });
