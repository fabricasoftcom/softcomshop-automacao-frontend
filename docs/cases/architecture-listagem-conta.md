# Arquitetura dos casos de teste: Listagem de Contas

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Contas**, que valida a navegação e acesso à página de cadastro de contas.

**Funcionalidades cobertas:**
- Acesso à listagem de contas
- Navegação para página de cadastro
- Validação de redirecionamento

**Cenários principais:**
- Clicar no botão de novo cadastro e redirecionar para página de cadastro

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/listagem-conta.spec.js` - Teste de listagem de contas

### Page Objects
- `cypress/support/pages/Financeiro/ListagemContasPage.js` - Métodos para listagem de contas

### Locators
- `cypress/support/locators/ListagemContasLocators.js` - Seletores da listagem

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import ListagemContasLocators from "../../locators/ListagemContasLocators";
```

### Commands
- `cy.loginArmazenandoSessaoCobranca()` - Login com usuário de cobrança bancária
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Testes de Listagem de Contas

**Tags:** `['@listagem-conta', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem de contas
   - Verifica que página foi carregada

2. **Navegação:**
   - Clica no botão "Novo cadastro"

3. **Validação:**
   - Verifica que foi redirecionado para página de cadastro
   - Valida que título da página de cadastro está visível

---

## Padrões e boas práticas

### Validação de Navegação
- Validação de carregamento da página antes de interagir
- Validação de redirecionamento após ação
- Validação de elementos visíveis na página de destino

### Navegação via Page Object
- Uso de Page Object para encapsular navegação
- Métodos específicos para ações na listagem
- Validação de estado da página

### Tags aplicadas
- `@listagem-conta` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ListagemContasPage

**Navegação:**
- `visit()` - Acessa listagem de contas e valida carregamento

**Validações:**
- `verificarTabelaVisivel()` - Verifica que tabela está visível
- `verificarPrimeiraLinha()` - Verifica primeira linha da tabela
- `verificarStatusAtiva()` - Verifica status ativa

**Ações:**
- `clicarNovoCadastro()` - Clica no botão "Novo cadastro"
- `verificarPaginaCadastro()` - Verifica que página de cadastro foi carregada

**Busca:**
- `buscarConta(nomeConta)` - Busca conta pelo nome

**Dropdown:**
- `abrirDropdownAcoesPrimeiraLinha()` - Abre dropdown de ações na primeira linha
- `selecionarOpcaoDropdown(opcao)` - Seleciona opção do dropdown

**Seleção de contas:**
- `selecionarPrimeiraContaBancoAtiva()` - Seleciona primeira conta ativa com "Banco" no nome
- `selecionarPrimeiraContaBancoInativa()` - Seleciona primeira conta inativa com "Banco" no nome

---

## Locators utilizados

### ListagemContasLocators

**Botões:**
- `buscarButton` - Botão de busca
- `novoCadastroButton` - Botão novo cadastro

**Tabela:**
- `tabelaContas` - Tabela principal
- `tabelaLinhas` - Linhas da tabela

**Colunas:**
- `colunaNomeConta` - Coluna nome da conta
- `colunaAgencia` - Coluna agência
- `colunaNumeroConta` - Coluna número da conta
- `colunaStatus` - Coluna status

**Dropdown:**
- `dropdownAcoes` - Botão do dropdown de ações
- `opcoesDropdown` - Opções do dropdown
- `opcaoEditar` - Opção "Editar"

**Status:**
- `statusAtiva` - Status ativa

**Paginação:**
- `paginacao` - Componente de paginação
- `paginaAnterior` - Botão página anterior
- `proximaPagina` - Botão próxima página
- `paginaAtiva` - Página ativa

**Página de cadastro:**
- `paginaCadastroTitulo` - Título da página de cadastro

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-cadastro-conta.md` - Documentação de seleção de tipo de conta
- `docs/cases/architecture-cadastro-conta-corrente.md` - Documentação de cadastro de conta corrente
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste usa `cy.loginArmazenandoSessaoCobranca()` para usuário com permissões de cobrança bancária
- Teste focado em navegação e redirecionamento
- Validação de carregamento da página garante que elementos estão prontos
- Validação de título da página de cadastro confirma redirecionamento correto
- Page Object encapsula lógica de navegação e validação

---

## Fluxo de Navegação

```
Listagem de Contas
    ↓
Clicar em "Novo cadastro"
    ↓
Página de Seleção de Tipo de Conta
    ↓
Selecionar tipo (ex: Conta Corrente)
    ↓
Página de Cadastro Específica
```

---

**Última atualização:** 2024-12-19

