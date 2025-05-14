describe("Rota Inicial (/)", () => {
  beforeEach(() => {
    // Visita a rota raiz da aplicação
    cy.visit("/");
  });
  it("Deve carregar a página inicial corretamente", () => {
    // Verifica se a URL é realmente a rota raiz
    cy.url().should("include", "/");

    // Verifica se a página carregou (não tem erros de 404 ou 500)
    cy.get("body").should("be.visible");

    // Se você souber de algum elemento específico que deve estar presente na página inicial
    // você pode verificar por ele, por exemplo:
    // cy.get('header').should('exist');
    // cy.get('nav').should('exist');
    // cy.contains('Bem-vindo').should('exist');
  });
});
