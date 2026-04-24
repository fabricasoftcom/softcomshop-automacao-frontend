// RelatoriosGeraisLocators.js
// Locators para o fluxo /relatorios-gerais (busca/modal e seleção do relatório)
// Criado para suportar o acesso via catálogo de relatórios gerais (ADR-0016 / Fase 2).

const RelatoriosGeraisLocators = {
  paginaRelatoriosGerais: '/softcomtecnologia/relatorios-gerais',

  // Campo de busca principal na página (abre/aciona o modal de busca)
  campoBuscaPagina: 'input[placeholder*="Buscar relatório por nome"]',

  // Container do modal/drawer de busca (varia por implementação)
  // Mantemos fallback por segurança, mas sempre usamos o input como âncora.
  // Modal de busca observado no stage (Bootstrap / softcom)
  containerBuscaModal: '#content-plus.modal, div[role="dialog"], .modal.inmodal.in, .ReactModal__Content, .v-dialog__content',

  // Campo de busca dentro do modal (placeholder observado na UI)
  campoBuscaModal: 'input[placeholder*="Digite para buscar"]',

  // Botão fechar do modal (X) - pode ser <button> ou <a> dependendo do componente
  botaoFecharModal: 'button:contains("×"), button[aria-label*="Fechar"], button.close, .modal button.close',

  // Resultado "Caixa" (Financeiro) dentro do modal
  // Preferimos âncora por texto, escopada ao container do modal quando disponível.
  resultadoCaixa: 'a:contains("Caixa")',
};

export default RelatoriosGeraisLocators;

