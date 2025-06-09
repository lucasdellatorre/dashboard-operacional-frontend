describe("operations", () => {
  beforeEach(() => {
    cy.visit("/operacoes");
  });

  it("deve criar uma nova operação com sucesso", () => {
    cy.get(".css-h9yv4t > .MuiButtonBase-root").click();
    const nomeOperacao = `Operação Cypress ${Date.now()}`;

    cy.get('input[placeholder="Digite o nome da operação"]').type(nomeOperacao);

    cy.contains("Criar operação").click();

    cy.contains("Criação Alvos").should("not.exist");

    cy.contains("Operação criada com sucesso").should("be.visible");
  });

  it("deve selecionar a operação criada e avançar para a próxima página", () => {
    cy.get('tbody input[type="checkbox"]').check().uncheck();
    cy.get("tbody tr").first().find('input[type="checkbox"]').check();

    cy.contains("Confirmar Seleção").click();
    cy.url().should("include", "/alvos");
  });
});
