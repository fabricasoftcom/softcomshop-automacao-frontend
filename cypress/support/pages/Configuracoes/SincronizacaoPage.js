import SincronizacaoLocators from '../../locators/Configuracoes/SincronizacaoLocators';
import MenulateralConfiguracoesPage from '../menulateral/MenulateralConfiguracoesPage';

class SincronizacaoPage {

    // Navegação
    acessarTelaSincronizacao() {
        MenulateralConfiguracoesPage.acessarSincronizacao();
        cy.url().should('include', '/configuracao/sincronizacao');
        this.validarTelaCarregada();
    }

    // Validações
    validarTelaCarregada() {
        cy.get(SincronizacaoLocators.contentLayout).should('be.visible');
        cy.get(SincronizacaoLocators.titulo).should('be.visible');
        cy.get(SincronizacaoLocators.titulo).should('contain.text', 'Sincronização - Responsável Técnico');
    }

    validarPerguntaExibida() {
        cy.get(SincronizacaoLocators.pergunta).should('be.visible');
        cy.get(SincronizacaoLocators.pergunta).should('contain.text', 'Deseja sincronizar os dados do responsável técnico?');
    }

    validarInformacoesSincronizacao() {
        // Valida que as informações de sincronização estão visíveis
        cy.get(SincronizacaoLocators.contentLayout).within(() => {
            cy.contains('h5', 'Última sincronização foi em:').should('be.visible');
            cy.contains('h5', 'Próxima sincronização ocorrerá em:').should('be.visible');
        });
    }

    validarFormatoDatasSincronizacao() {
        // Valida formato da data/hora na última sincronização
        cy.get(SincronizacaoLocators.contentLayout).within(() => {
            cy.contains('h5', 'Última sincronização foi em:').then(($el) => {
                const texto = $el.text();
                expect(texto).to.match(/Última sincronização foi em: \d{2}\/\d{2}\/\d{4} às \d{2}:\d{2}:\d{2}/);
            });

            // Valida formato da data/hora na próxima sincronização
            cy.contains('h5', 'Próxima sincronização ocorrerá em:').then(($el) => {
                const texto = $el.text();
                expect(texto).to.match(/Próxima sincronização ocorrerá em: \d{2}\/\d{2}\/\d{4} às \d{2}:\d{2}:\d{2}/);
            });
        });
    }

    validarBotaoSincronizar() {
        cy.get(SincronizacaoLocators.btnSincronizar).should('be.visible');
        cy.get(SincronizacaoLocators.btnSincronizar).should('contain.text', 'Sincronizar dados');
        cy.get(SincronizacaoLocators.btnSincronizar).should('be.enabled');
    }

    // Ações
    clicarSincronizar() {
        cy.get(SincronizacaoLocators.btnSincronizar).should('be.visible');
        cy.get(SincronizacaoLocators.btnSincronizar).click();
    }

    // Validações após ações
    validarSincronizacaoIniciada() {
        // Aguarda o loading desaparecer se existir
        cy.get('#loading', { timeout: 10000 }).should('not.exist');
        // Valida que a página ainda está visível (não houve erro)
        cy.get(SincronizacaoLocators.contentLayout).should('be.visible');
    }
}

export default new SincronizacaoPage();

