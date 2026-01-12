# Arquitetura de Testes: Gestão de Ordem de Serviço (Petshop)

## 1. Objetivo
Validar o acesso e funcionamento do Painel de Gestão de Ordens de Serviço, funcionalidade crítica para controle de atendimentos veterinários. Inclui validação de filtros, listagem, resumo e geração de registros (vendas, NFSe).

## 2. Estrutura e Dependências

### Localização
- **Spec:** `cypress/e2e/petshop/gestao-ordem-servico.spec.js`
- **Page Object:** `cypress/support/pages/petshop/GestaoOrdemServicoPage.js`
- **Locators:** `cypress/support/locators/Petshop/GestaoOrdemServicoLocators.js`
- **Menu Locators:** `cypress/support/locators/Petshop/MenuLateralPetshopLocators.js`

### Dependências
- **Login:** `cy.loginArmazenandoSessao()` (usuário padrão, não fiscal)
- **Menu:** `MenuPage.js` (base) - para navegação e espera de carregamento

## 3. Estrutura da Página

### Painel (`/ordem-servico/painel`)
- **Título:** "Gestão de Ordem de Serviços"
- **Seção Filtros:**
  - **Cliente:** `#auto_cliente_id` (autocomplete)
  - **Nº da OS:** `#os_numero` (text)
  - **Período:** `#data` (daterangepicker)
  - **Vendas geradas:** `#parcelas` (select: Todos, Sim, Não)
  - **NFSe geradas:** `#nfse` (select: Todos, Sim, Não)
  - **NFSe Emitida:** `#nfse_emitida` (select: Todos, Sim, Não)
  - **Botão Pesquisar:** `#pesquisar`
- **Seção Listagem:**
  - **Título:** "Listagem"
  - **Tabela:** Listagem de ordens de serviço
- **Seção Resumo:**
  - **Quantidade:** Total de OS
  - **Quantidade Selecionados:** OS selecionadas
  - **Valor Total:** Soma dos valores
- **Seção Geração de Registros:**
  - **Título:** "Geração, emissão e envio de registros"
  - **Checkboxes:**
    - **Gerar Vendas**
    - **Gerar NFSe**
    - **Emitir NFSe**
  - **Botão:** "Gerar Registros Selecionados" (`#btn-gerar-registros-selecionados`)

## 4. Métodos do Page Object

### Navegação
- `acessar()` - Acessa o Painel de Gestão de OS via menu lateral
- `validarCarregamento()` - Valida URL e título da página

### Filtros
- `filtrarPorCliente(cliente)` - Filtra por cliente (autocomplete)
- `filtrarPorNumeroOS(numero)` - Filtra por número da OS
- `filtrarPorPeriodo(dataInicio, dataFim)` - Filtra por período
- `filtrarPorVendasGeradas(valor)` - Filtra por vendas geradas (select)
- `filtrarPorNfseGeradas(valor)` - Filtra por NFSe geradas (select)
- `filtrarPorNfseEmitida(valor)` - Filtra por NFSe emitida (select)
- `aplicarFiltros()` - Aplica os filtros configurados

### Geração de Registros
- `marcarGerarVendas()` / `desmarcarGerarVendas()` - Controla checkbox gerar vendas
- `marcarGerarNfse()` / `desmarcarGerarNfse()` - Controla checkbox gerar NFSe
- `marcarEmitirNfse()` / `desmarcarEmitirNfse()` - Controla checkbox emitir NFSe
- `gerarRegistrosSelecionados()` - Executa geração de registros

### Validações
- `validarPresencaTabela()` - Valida presença da tabela
- `validarListagemVazia()` - Valida mensagem de sem resultados
- `validarResumo()` - Valida seção de resumo (quantidades e valores)
- `validarSecaoGeracao()` - Valida seção de geração de registros

## 5. Casos de Teste Implementados

1. **Deve acessar o Painel de Gestão de OS**
   - Valida acesso e presença da tabela

2. **Deve filtrar ordens de serviço por período**
   - Testa filtro de período

3. **Deve filtrar ordens de serviço por número da OS**
   - Testa filtro por número

4. **Deve filtrar ordens de serviço por vendas geradas**
   - Testa filtro de vendas geradas

5. **Deve validar seção de geração de registros**
   - Valida presença e elementos da seção

6. **Deve validar resumo de quantidades e valores**
   - Valida seção de resumo

7. **Deve marcar opções de geração de registros**
   - Testa marcação de checkboxes

## 6. Fluxo do Teste

### Teste Básico
1. **Login:** Realiza login no ambiente Petshop
2. **Navegação:** Expande menu "Serviços e NFS-e" > "LANÇAMENTOS" > "Gestão de Ordem de Serviço"
3. **Validação:** Verifica carregamento da página, URL, tabela e seções

### Teste com Filtros
1. **Login:** Realiza login
2. **Acesso:** Acessa Painel de Gestão de OS
3. **Filtro:** Aplica filtros (período, número, vendas, etc.)
4. **Validação:** Verifica aplicação dos filtros

### Teste de Geração
1. **Login:** Realiza login
2. **Acesso:** Acessa Painel de Gestão de OS
3. **Seleção:** Marca opções de geração
4. **Validação:** Verifica que opções foram marcadas

## 7. Padrões Aplicados
- **Page Object Pattern (ADR-0002):** Lógica encapsulada em `GestaoOrdemServicoPage`
- **Separate Locators (ADR-0003):** Locators centralizados em `GestaoOrdemServicoLocators.js`
- **Tags (ADR-0010):** `@petshop`, `@regressivo`, `@ordem-servico`
- **Prioritize IDs (ADR-0015):** Locators priorizam IDs quando disponíveis
- **No Fixed Waits:** Usa validações condicionais ao invés de `cy.wait()` fixos

## 8. Dados de Teste
- Utiliza usuário padrão configurado em `users.json` (não fiscal)
- Filtros podem ser parametrizados via fixtures se necessário
- Valores de select: "Todos", "Sim", "Não"

## 9. Observações Importantes
- **Autocomplete:** Campo de cliente tem delay de 1000ms (debounce)
- **Menu Aninhado:** Requer expansão do menu "Serviços e NFS-e" > "LANÇAMENTOS" antes de acessar
- **Resumo:** Valores são atualizados dinamicamente conforme filtros e seleções
- **Geração:** Requer seleção de OS na tabela antes de gerar registros
- **Checkboxes:** Usam labels, requer navegação para elemento input anterior

## 10. Referências
- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0010: Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md)
- [ADR-0015: Prioritize IDs and Context](../adr/0015-prioritize-ids-and-context-in-locators.md)

