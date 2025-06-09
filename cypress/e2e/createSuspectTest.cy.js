describe("CreateSuspectModal", () => {
  beforeEach(() => {
    cy.visit("/alvos"); // Replace with the actual route that renders the modal or the button that opens it
  });

  it("should fill and submit the Create Suspect form", () => {
    // Open modal if necessary
    cy.get(".css-h9yv4t > .MuiButtonBase-root").click();

    // Fill "Apelido do Alvo"
    cy.get('input[placeholder="Digite o apelido do suspeito"]').type(
      "Suspeito Teste"
    );

    cy.get('input[placeholder="Digite o nome do suspeito"]').type(
      "Suspeito Teste"
    );
    // Select numbers (assumes MultiSelect renders selectable checkboxes or tags)
    cy.get(
      ".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.contains("(54) 997088840").click();
    cy.contains("(51) 98394938").click();

    cy.get('input[placeholder="Digite o CPF do suspeito"]')
      .clear()
      .type("12345678901");

    cy.get('input[placeholder="Digite o CPF do suspeito"]')
      .clear()
      .type("05102625039");

    // Click "Criar suspeito" button
    cy.contains("Criar alvo").click();
    // Click outside to close dropdown

    // Expect modal to close (or assert something on submit)
    cy.contains("Criação Alvos").should("not.exist");
  });
});
