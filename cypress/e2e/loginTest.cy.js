describe("Login com CPF válido", () => {
  it("deve redirecionar para /operacoes após inputar um CPF válido", () => {
    // Acessa a página de login
    cy.visit("/login");

    // Digita um CPF válido
    cy.get('input[placeholder="000.000.000-00"]').type("03401973070");

    // Clica no botão de entrar
    cy.contains("Entrar").click();

    // Verifica se foi redirecionado para /operacoes
    cy.url().should("include", "/operacoes");

    // Verifica se o CPF foi salvo no localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem("cpf")).to.equal("034.019.730-70");
    });
  });
});