import menulateralfiscalpage from "../../support/pages/menulateral/menulateralfiscalpage";

describe.skip('Acessar opções do menu lateral do Fiscal', () => {

    beforeEach(function () {
        cy.login();
    })

    it('T001- Sped Contador', () => {
        menulateralfiscalpage.acessarSpedContador();
    })
    it('T002- Sped Configuracoes', () => {
        menulateralfiscalpage.acessarSpedConfiguracoes();
    })
    it('T003- Sped Gerar Arquivo', () => {
        menulateralfiscalpage.acessarSpedGerarArquivo();
    })
    it('T004- Sped Valores Declaratorios', () => {
        menulateralfiscalpage.acessarSpedValoresDeclaratorios();
    })
    it('T005- Sped Inventario base', () => {
        menulateralfiscalpage.acessarSpedInventarioBase();
    })
    it('T006- Sped ICMS Ajuste', () => {
        menulateralfiscalpage.acessarSpedIcmsAjuste();
    })
    it('T007- Sped IPI Ajuste', () => {
        menulateralfiscalpage.acessarSpedIpiAjuste();
    })
    it('T008- Sintegra Gerar arquivo', () => {
        menulateralfiscalpage.acessarSintegraGerarArquivo();
    })
    it('T009- Importador NFCe', () => {
        menulateralfiscalpage.acessarImportadorNFce();
    })
})
