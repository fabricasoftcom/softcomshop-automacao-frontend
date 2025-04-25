import ContaCorrenteCadastroLocator from "../../locators/ContaCorrenteCadastroLocator";

class ContaCorrenteEdicaoPage {
    validarCamposPreenchidos() {
        const campos = [
            ContaCorrenteCadastroLocator.descricao,
            ContaCorrenteCadastroLocator.agencia,
            ContaCorrenteCadastroLocator.agenciaDV,
            ContaCorrenteCadastroLocator.contaCorrente,
            ContaCorrenteCadastroLocator.contaDV,
            ContaCorrenteCadastroLocator.saldoInicial,
            ContaCorrenteCadastroLocator.dataSaldoInicial,
            ContaCorrenteCadastroLocator.limiteCredito,
            ContaCorrenteCadastroLocator.recipientCode,
            ContaCorrenteCadastroLocator.lastOurNumber,
            ContaCorrenteCadastroLocator.lastDispatch,
            ContaCorrenteCadastroLocator.walletVariation,
            ContaCorrenteCadastroLocator.companyCode,
            ContaCorrenteCadastroLocator.posto,
        ];

        campos.forEach((campo) => {
            this.validarCampo(campo);
        });
    }

    /**
     * Valida um único campo, verificando se está visível e preenchido (se aplicável).
     * @param {string} campo - O seletor do campo a ser validado.
     */
    validarCampo(campo) {
        cy.get(campo)
            .should('exist') // Garante que o elemento existe
            .and('be.visible') // Garante que o elemento está visível
            .then(($el) => {
                if (!$el.prop('disabled')) {
                    cy.wrap($el)
                        .invoke('val')
                        .should('not.be.empty'); // Valida que o campo está preenchido
                    cy.log(`Validação concluída com sucesso para o campo: ${campo}`);
                } else {
                    cy.log(`Campo desabilitado, não será validado: ${campo}`);
                }
            });
    }
    desativarConta() {
        cy.get('#loading').should('not.exist');
        cy.get('#div_active > .switchery').should('be.visible').then(($switch) => {
            if ($switch.attr('style').includes('border-color: rgb(255, 192, 103)')) {
                cy.wrap($switch).click(); // Clica no switch apenas se ele estiver ativado
            }
        });
    }
    ativarConta() {
        // Localiza e clica no switch para ativar a conta
        cy.get('#div_active > .switchery').then(($switch) => {
          const style = $switch.attr('style');
          // Verifica se o switch já está ativado
          if (style.includes('border-color: rgb(223, 223, 223)')) {
            cy.wrap($switch).click(); // Clica apenas se estiver desativado
          } else {
            cy.log('A conta já está ativada.');
          }
        });
      }
    salvar() {
        cy.get('.btn:contains("Salvar")').click();
    }
    validarSucesso(){
        cy.get('.Toastify__toast--success').should('be.visible');
    }
    alterarUltimoNumeroRemessa(novoNumero) {
        cy.get(ContaCorrenteCadastroLocator.lastDispatch)
          .should('exist')
          .and('be.visible')
          .clear()
          .type(novoNumero);
      }
      validarUltimoNumeroRemessa(numeroEsperado) {
        cy.get(ContaCorrenteCadastroLocator.lastDispatch)
          .invoke('val')
          .should('equal', numeroEsperado);
      }
}

export default new ContaCorrenteEdicaoPage();
