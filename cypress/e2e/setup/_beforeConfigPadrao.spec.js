describe("_beforeAll", () => {
    describe("cypress setup", { tags: ['@before', '@regressivo'] }, () => {
        before(function(){
            cy.setupSistemaPadrao();
        })

      // Note: It is important to have at least one test to trigger the before block
      it("Configurar sistema Padrao com NFSe", () => {
        cy.log("Modulos configurados com sucesso.");
      });
    });
  });
