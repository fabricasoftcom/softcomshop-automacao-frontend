# Arquitetura do caso de teste: `venda-nfcenfe/cadastro-nfe-devolucao.spec.js`

## Objetivo
- Exercitar o fluxo completo de todas as finalidades de NFe Devolução no módulo de vendas, desde a tela inicial até a confirmação de emissão.
- **Tipo Avulsa**: fluxo completo sem necessidade de pesquisa prévia.
- **Tipo Compra**: pesquisa de compras disponíveis, seleção de compra, modal de seleção de itens, geração de nota de devolução e fluxo completo.
- **Tipo Movimentação**: pesquisa de movimentações disponíveis, seleção e fluxo completo.
- **Tipo Nota Fiscal Saída**: pesquisa de notas fiscais de saída disponíveis, seleção e fluxo completo.
- **Tipo Trocas**: pesquisa de trocas disponíveis, seleção e fluxo completo.
- Garantir que todos os tipos de devolução estejam configurados e navegáveis.
- Validar o preenchimento dos dados principais (natureza CFOP 1202 e destinatário) com autocompletes e requisições monitoradas.
- Verificar a transição para a etapa de itens, incluindo aguardo de carregamento, inserção de um item e confirmação na tabela.
- Abrir o painel de pagamentos, cadastrar um novo pagamento "Sem Pagamento" via modal e confirmar a persistência.
- Emitir a nota e validar o modal de sucesso (SweetAlert), escolhendo a ação de retorno em todos os fluxos.

## Importações e dependências
- `ListagemNfePage` (`cypress/support/pages/Venda/ListagemNfePage.js`): encapsula navegação até a listagem de NFe e acionamento do botão "Novo Cadastro".
- `CadastroNfePage` (`cypress/support/pages/Venda/CadastroNfePage.js`): encapsula métodos gerais como `desabilitarTourFinalidadeNormal()`.
- `CadastroNfeDevolucaoPage` (`cypress/support/pages/Venda/NFe/Devolucao/index.js`): facade que agrupa todas as classes específicas de devolução, mantendo compatibilidade com testes existentes. A estrutura foi refatorada seguindo o padrão de Page Object Hierarchy (ADR-0008):
  - **Estrutura de classes**:
    - `CadastroNfeDevolucaoBasePage` (`cypress/support/pages/Venda/NFe/Devolucao/CadastroNfeDevolucaoBasePage.js`): classe base com métodos compartilhados:
      - `fecharTutorialSeVisivel()`: fecha tutorial se estiver visível
      - `adicionarNotaReferenciada()`: adiciona nota referenciada (obrigatório para devolução)
      - `finalizarEmissaoDevolucao()`: executa fluxo completo (itens → pagamentos → emissão)
    - `CadastroNfeDevolucaoAvulsaPage` (`cypress/support/pages/Venda/NFe/Devolucao/CadastroNfeDevolucaoAvulsaPage.js`): métodos específicos para devolução avulsa:
      - `avancarParaCadastroDevolucaoAvulsa()`, `validarFormularioDevolucaoAvulsa()`
    - `CadastroNfeDevolucaoCompraPage` (`cypress/support/pages/Venda/NFe/Devolucao/CadastroNfeDevolucaoCompraPage.js`): métodos específicos para devolução de compra:
      - `avancarParaCadastroDevolucaoCompra()`, `pesquisarDevolucaoCompra()`, `selecionarPrimeiraDevolucaoCompra()`, `validarModalSelecaoItensDevolucaoCompra()`, `preencherQuantidadeDevolverMetade()`, `gerarNotaDevolucaoCompra()`, `validarFormularioDevolucaoCompra()`
    - `CadastroNfeDevolucaoMovimentacaoPage` (`cypress/support/pages/Venda/NFe/Devolucao/CadastroNfeDevolucaoMovimentacaoPage.js`): métodos específicos para devolução de movimentação:
      - `avancarParaCadastroDevolucaoMovimentacao()`, `pesquisarDevolucaoMovimentacao()`, `selecionarPrimeiraDevolucaoMovimentacao()`, `validarFormularioDevolucaoMovimentacao()`
    - `CadastroNfeDevolucaoNotaFiscalSaidaPage` (`cypress/support/pages/Venda/NFe/Devolucao/CadastroNfeDevolucaoNotaFiscalSaidaPage.js`): métodos específicos para devolução de nota fiscal saída:
      - `avancarParaCadastroDevolucaoNotaFiscalSaida()`, `pesquisarDevolucaoNotaFiscalSaida()`, `selecionarPrimeiraDevolucaoNotaFiscalSaida()`, `validarFormularioDevolucaoNotaFiscalSaida()`
    - `CadastroNfeDevolucaoTrocasPage` (`cypress/support/pages/Venda/NFe/Devolucao/CadastroNfeDevolucaoTrocasPage.js`): métodos específicos para devolução de trocas:
      - `avancarParaCadastroDevolucaoTrocas()`, `pesquisarDevolucaoTrocas()`, `selecionarPrimeiraDevolucaoTrocas()`, `validarFormularioDevolucaoTrocas()`
  - **Facade Pattern**: O `index.js` exporta uma instância de `CadastroNfeDevolucaoPage` que delega chamadas para as classes específicas, mantendo compatibilidade total com os testes existentes.
- `CadastroNfeBasePage` (`cypress/support/pages/Venda/NFe/CadastroNfeBasePage.js`): classe base com métodos comuns herdados:
  - `preencherNatureza(cfop)`: preenche natureza CFOP via autocomplete
  - `preencherDestinatario(nome)`: preenche destinatário via autocomplete e aguarda salvamento
  - `adicionarItem(produto, quantidade)`: adiciona item na tabela
  - `validarTelaSelecaoItens()`: valida tela de itens carregada
  - `validarTelaPagamentos()`: valida tela de pagamentos
  - `adicionarPagamentoBasico()`: adiciona pagamento "Sem Pagamento"
  - `clicarBotaoContinuarRodape()`: clica no botão "Continuar" do rodapé
  - `validarTelaEmitirNota()`: valida tela de emissão
  - `emitirNota()`: emite a nota
  - `validarModalSucessoEmissao(acao)`: valida modal de sucesso e escolhe ação (listagem/nova nota)
- `CadastroNfeLocators` (`cypress/support/locators/Venda/CadastroNfeLocators.js`): seletores de tabs (`tabsTipoNota.devolucao`), radios de tipo de devolução (`radiosTipoDevolucao`), formulários de pesquisa para cada tipo (`devolucao.compra`, `devolucao.movimentacao`, `devolucao.notaFiscalSaida`, `devolucao.trocas`), modal de seleção de itens para compra (`devolucao.compra.modalSelecaoItens`, `devolucao.compra.modalTabelaItens`, etc.), formulário principal, itens, pagamentos e painel final.
- `cy.login()` (custom command) garante autenticação antes de cada teste (usuário fiscal para funcionalidades fiscais).
- Intercepts utilizados:
  - `POST **/nfe2/salvar*` (destinatário - aguardado antes de continuar, com lógica condicional).
  - `GET **/nfe2/**/itens*` (carregamento da tela de itens, com flag condicional).
  - `POST **/nfe2/**/itens/salvar` (inserção de item - com intercept condicional para evitar timeouts quando a requisição não é interceptada ou já foi feita antes do intercept ser configurado).
  - `POST **/nfe2/**/pagamentos/salvar` (modal de pagamento).
  - `POST **/nfe-nfce/vinculos-fiscais/autocomplete/cfop` (autocomplete de natureza).

## Estrutura do teste

### beforeEach
- `cy.login()` e `cy.visit('/')` para garantir autenticação fiscal.
- `CadastroNfePage.desabilitarTourFinalidadeNormal()` para evitar tooltips.
- `ListagemNfePage.visitar()` e `ListagemNfePage.clicarNovoCadastro()` para abrir o wizard.

### Testes

#### 1. Devolução Avulsa (comentado)
- `realiza fluxo completo da NFe de devolucao avulsa`:
  - `avancarParaCadastroDevolucaoAvulsa()`: fecha tutorial, seleciona aba Devolução, seleciona tipo Avulsa, clica em "Continuar" e aguarda formulário carregar.
  - `validarFormularioDevolucaoAvulsa()`: valida campos principais (finalidade 4, série, natureza, datas, indicador presencial, movimentar estoque, painel destinatário).
  - `preencherNatureza('1202')`: preenche CFOP 1202 via autocomplete.
  - `preencherDestinatario('SOFTCOM TECNOLOGIA')`: seleciona destinatário e aguarda salvamento.
  - `validarTelaSelecaoItens()`: valida tela de itens carregada.
  - `adicionarItem(null, '1')`: adiciona item com quantidade 1.
  - `validarTelaPagamentos()`: valida tela de pagamentos.
  - `adicionarPagamentoBasico()`: adiciona pagamento "Sem Pagamento".
  - `clicarBotaoContinuarRodape()`: avança para tela de emissão.
  - `validarTelaEmitirNota()`: valida tela de emissão.
  - `emitirNota()`: emite a nota.
  - `validarModalSucessoEmissao('listagem')`: valida modal de sucesso e retorna para listagem.

#### 2. Devolução Compra (comentado)
- `abre formulario de NFe devolucao compra apos pesquisar e selecionar`:
  - `avancarParaCadastroDevolucaoCompra()`: fecha tutorial, seleciona aba Devolução, seleciona tipo Compra e aguarda formulário de pesquisa carregar.
  - `pesquisarDevolucaoCompra()`: preenche período de data (últimos 2 meses), opcionalmente fornecedor/CNPJ/nota fiscal/chave de acesso, clica em "Pesquisar" e aguarda tabela de resultados.
  - `selecionarPrimeiraDevolucaoCompra()`: clica no botão de ações da primeira linha, abre dropdown, clica em "Gerar nota de devolução" e aguarda modal de seleção de itens.
  - `preencherQuantidadeDevolverMetade()`: preenche quantidade a devolver (metade da quantidade original, ou 1 se quantidade for 1).
  - `gerarNotaDevolucaoCompra()`: clica em "Gerar Nota de Devolução", confirma modal se aparecer e aguarda redirecionamento para formulário.
  - `validarFormularioDevolucaoCompra()`: valida campos principais (finalidade 4, série, natureza, painel destinatário).

- `realiza fluxo completo da NFe devolucao compra`:
  - Repete pesquisa e seleção.
  - `validarModalSelecaoItensDevolucaoCompra()`: valida modal completo (título, informações da nota, tabela de itens, totais, botões).
  - `preencherQuantidadeDevolverMetade()`: preenche quantidades.
  - `gerarNotaDevolucaoCompra()`: gera nota.
  - `finalizarEmissaoDevolucao()`: executa fluxo completo (itens → pagamentos → emissão).

#### 3. Devolução Movimentação (ativo)
- `abre formulario de NFe devolucao movimentacao apos pesquisar e selecionar`:
  - `avancarParaCadastroDevolucaoMovimentacao()`: fecha tutorial, seleciona aba Devolução, seleciona tipo Movimentação e aguarda formulário de pesquisa carregar.
  - `pesquisarDevolucaoMovimentacao()`: preenche período de data (últimos 60 dias), opcionalmente fornecedor/CNPJ/nota fiscal/chave de acesso, clica em "Pesquisar" e aguarda tabela de resultados.
  - `selecionarPrimeiraDevolucaoMovimentacao()`: encontra primeira linha com valor > 0, marca checkbox, clica em "Continuar", trata modais de confirmação se aparecerem e aguarda formulário carregar.
  - `validarFormularioDevolucaoMovimentacao()`: valida campos principais (finalidade 4, série, natureza, painel destinatário).

- `realiza fluxo completo da NFe devolucao movimentacao` (comentado):
  - Repete pesquisa e seleção.
  - `adicionarNotaReferenciada()`: adiciona nota referenciada (obrigatório para devolução).
  - Intercepta requisição de itens e aguarda carregamento completo.
  - Segue fluxo completo (itens → pagamentos → emissão).

#### 4. Devolução Nota Fiscal Saída (ativo)
- `abre formulario de NFe devolucao nota fiscal saida apos pesquisar e selecionar`:
  - `avancarParaCadastroDevolucaoNotaFiscalSaida()`: fecha tutorial, seleciona aba Devolução, seleciona tipo Nota Fiscal Saída e aguarda formulário de pesquisa carregar.
  - `pesquisarDevolucaoNotaFiscalSaida()`: preenche período de data (últimos 60 dias), opcionalmente cliente/CNPJ/nota fiscal/chave de acesso, clica em "Pesquisar" e aguarda tabela de resultados.
  - `selecionarPrimeiraDevolucaoNotaFiscalSaida()`: marca checkbox da primeira linha, clica em "Continuar" e aguarda formulário carregar.
  - `validarFormularioDevolucaoNotaFiscalSaida()`: valida campos principais (finalidade 4, série, natureza, painel destinatário).

- `realiza fluxo completo da NFe devolucao nota fiscal saida` (ativo):
  - Repete pesquisa e seleção.
  - `adicionarNotaReferenciada()`: adiciona nota referenciada (obrigatório para devolução).
  - Intercepta requisição de itens e aguarda carregamento completo.
  - Segue fluxo completo (itens → pagamentos → emissão).

#### 5. Devolução Trocas (comentado)
- `abre formulario de NFe devolucao trocas apos pesquisar e selecionar`:
  - `avancarParaCadastroDevolucaoTrocas()`: fecha tutorial, seleciona aba Devolução, seleciona tipo Trocas e aguarda formulário de pesquisa carregar.
  - `pesquisarDevolucaoTrocas()`: opcionalmente preenche fornecedor/CNPJ/nota fiscal/chave de acesso, clica em "Pesquisar" e aguarda tabela de resultados.
  - `selecionarPrimeiraDevolucaoTrocas()`: clica na primeira linha e aguarda formulário carregar.
  - `validarFormularioDevolucaoTrocas()`: valida campos principais.

- `realiza fluxo completo da NFe devolucao trocas` (comentado):
  - Repete pesquisa e seleção.
  - Segue fluxo completo (natureza → itens → pagamentos → emissão).

## Estrutura de arquivos

A implementação segue uma estrutura modular organizada no diretório `cypress/support/pages/Venda/NFe/Devolucao/`:

```
Devolucao/
├── CadastroNfeDevolucaoBasePage.js          # Classe base com métodos compartilhados
├── CadastroNfeDevolucaoAvulsaPage.js        # Métodos específicos para devolução avulsa
├── CadastroNfeDevolucaoCompraPage.js         # Métodos específicos para devolução de compra
├── CadastroNfeDevolucaoMovimentacaoPage.js   # Métodos específicos para devolução de movimentação
├── CadastroNfeDevolucaoNotaFiscalSaidaPage.js # Métodos específicos para devolução de nota fiscal saída
├── CadastroNfeDevolucaoTrocasPage.js         # Métodos específicos para devolução de trocas
└── index.js                                  # Facade que exporta todas as classes e mantém compatibilidade
```

### Benefícios da estrutura modular:
- **Manutenibilidade**: Cada classe tem responsabilidade única e bem definida
- **Escalabilidade**: Fácil adicionar novos tipos de devolução sem modificar classes existentes
- **Testabilidade**: Classes menores são mais fáceis de testar e debugar
- **Reutilização**: Métodos comuns na classe base evitam duplicação de código
- **Compatibilidade**: O facade mantém a interface original, permitindo migração gradual

## Padrões e boas práticas
- **Page Object Hierarchy (ADR-0008)**: A estrutura segue o padrão de hierarquia de Page Objects, com uma classe base (`CadastroNfeDevolucaoBasePage`) que estende `CadastroNfeBasePage`, e classes específicas para cada tipo de devolução que estendem a base. Isso permite:
  - Separação clara de responsabilidades
  - Classes menores e mais fáceis de manter
  - Reutilização de código através da herança
  - Facilidade para adicionar novos tipos de devolução
- **Facade Pattern**: O `index.js` implementa um padrão facade que mantém compatibilidade com testes existentes, delegando chamadas para as classes específicas.
- **Herança de classe base**: `CadastroNfeDevolucaoBasePage` herda de `CadastroNfeBasePage`, reutilizando métodos comuns (itens, pagamentos, emissão, natureza, destinatário).
- **Métodos específicos por tipo**: cada tipo de devolução possui uma classe dedicada com métodos específicos para navegação, pesquisa e seleção, mantendo a lógica isolada e organizada.
- **Pesquisa com período de data**: métodos de pesquisa calculam automaticamente períodos (últimos 2 meses para compra, últimos 60 dias para movimentação) para garantir resultados.
- **Modal de seleção de itens (Compra)**: validação completa do modal antes de gerar nota, incluindo título, informações da nota, tabela de itens, totais e botões.
- **Preenchimento inteligente de quantidade**: `preencherQuantidadeDevolverMetade()` calcula metade da quantidade original, mas usa 1 se a quantidade for 1, evitando valores decimais inválidos.
- **Aguardos defensivos**: todos os métodos aguardam loading desaparecer, validam visibilidade de elementos e usam timeouts adequados.
- **Tratamento de modais condicionais**: métodos verificam se modais aparecem antes de interagir (ex: `selecionarPrimeiraDevolucaoMovimentacao()` trata SweetAlert se aparecer).
- **Validação de formulário após seleção**: todos os tipos validam que o formulário foi carregado corretamente após seleção, verificando finalidade 4 e campos principais.
- **CFOP padrão para devolução**: todos os fluxos completos usam CFOP 1202 (natureza de devolução).
- **Método de finalização reutilizável**: `finalizarEmissaoDevolucao()` encapsula o fluxo completo (itens → pagamentos → emissão) para evitar duplicação.
- **Documentação de tags**: suite anotada com `{ tags: ['@nfe', '@vendas', '@regressivo', '@nfe-devolucao'] }` para filtros via `@cypress/grep`.

## Tipos de Devolução cobertos
- ✅ **Avulsa**: Fluxo completo validado (CFOP 1202) - teste comentado
- ✅ **Compra**: Pesquisa (fornecedor, CNPJ, nota fiscal, chave de acesso), seleção, modal de itens e fluxo completo validados - testes comentados
- ✅ **Movimentação**: Pesquisa, seleção e fluxo completo validados - 1 teste ativo, 1 comentado
- ✅ **Nota Fiscal Saída**: Pesquisa (cliente, CNPJ, nota fiscal, chave de acesso), seleção e fluxo completo validados - 2 testes ativos
- ✅ **Trocas**: Pesquisa, seleção e fluxo completo validados - testes comentados

## Diferenças entre tipos de devolução

### Tipo Avulsa
- Não requer pesquisa prévia.
- Seleciona tipo Avulsa e clica em "Continuar".
- Preenche formulário diretamente.

### Tipo Compra
- Requer pesquisa de compras disponíveis.
- Após pesquisa, clica no botão de ações (dropdown) e seleciona "Gerar nota de devolução".
- Abre modal de seleção de itens onde é possível escolher quais itens devolver e quantidades.
- Após gerar nota, redireciona para formulário de edição.

### Tipos Movimentação, Nota Fiscal Saída e Trocas
- Requerem pesquisa de registros disponíveis.
- Após pesquisa, clica diretamente na linha da tabela para selecionar.
- Redireciona diretamente para formulário de edição.

## Execução seletiva
```bash
# Executar apenas testes de devolução
npm run e2e -- --grep "@nfe-devolucao"
```

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.login()` usado
- **ADR-0008:** Use Page Object Hierarchy - Hierarquia de Page Objects utilizada
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas
- **ADR-0011:** Use Conditional Intercepts - Intercepts condicionais utilizados

### Documentação relacionada
- `docs/cases/architecture-cadastro-nfe.md` - Cadastro de NFe (Geral) (tipo específico de NFe)
- `docs/cases/architecture-listagem-nfe.md` - Listagem de NFe (NFes Devolução podem ser listadas)
- `docs/cases/architecture-cadastro-nfe-normal.md` - Cadastro de NFe Normal (outro tipo específico)
- `docs/cases/architecture-cadastro-nfe-ajuste.md` - Cadastro de NFe Ajuste (outro tipo específico)
- `docs/cases/architecture-cadastro-nfe-complementar.md` - Cadastro de NFe Complementar (outro tipo específico)
- `docs/cases/architecture-cancelamento-nfe.md` - Cancelamento de NFe (NFes Devolução podem ser canceladas)
- `docs/cases/architecture-carta-correcao-nfe.md` - Carta de Correção NFe (NFes Devolução podem receber carta de correção)
- `docs/testes.md` - Inventário de testes

### Arquivos relacionados
- `cypress/e2e/venda-nfcenfe/cadastro-nfe-devolucao.spec.js` - Spec de teste
- `cypress.config.js` - Configuração (specPattern)

---

