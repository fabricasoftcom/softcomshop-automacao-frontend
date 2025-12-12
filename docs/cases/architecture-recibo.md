# Arquitetura dos casos de teste: Recibo

## Objetivo

Este documento descreve a arquitetura dos testes relacionados ao módulo **Recibo** no Financeiro, que valida o processo completo de criação e gerenciamento de recibos.

**Funcionalidades cobertas:**
- Listagem de recibos
- Abertura de formulário de novo cadastro
- Preenchimento de formulário de recibo
- Criação de novo recibo
- Validação de campos obrigatórios
- Cancelamento de cadastro

**Cenários principais:**
- Validação de exibição da página de listagem
- Validação de exibição do formulário de cadastro
- Criação de recibo com todos os campos preenchidos
- Cancelamento de cadastro via botão Voltar
- Validação de campos obrigatórios

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/recibo.spec.js` - Teste de recibo (listagem, cadastro, validações)

### Page Objects
- `cypress/support/pages/Financeiro/ReciboPage.js` - Métodos para interação com página de recibo

### Locators
- `cypress/support/locators/Financeiro/ReciboLocators.js` - Seletores da página de recibo

---

## Imports e dependências

### Page Objects
```javascript
import ReciboPage from '../../support/pages/Financeiro/ReciboPage';
```

### Locators
Os locators são importados dentro do Page Object:
```javascript
import ReciboLocators from '../../locators/Financeiro/ReciboLocators';
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/financeiro/recibo')` - Navegação direta para listagem
- `cy.visit('/financeiro/recibo/novo')` - Navegação direta para formulário

---

## Estrutura do teste

### Suite: Testes de Recibo

**Tags:** `['@recibo', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve validar que a página de listagem está visível ao acessar')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação para `/financeiro/recibo`
   - Aguarda desaparecimento de `#loading`

2. **Validação:**
   - Verifica título "Recibos" visível

#### `it('Deve abrir o formulário de novo cadastro ao clicar no botão Novo Cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa página de listagem
   - Clica no botão "Novo Cadastro"

2. **Validação:**
   - Verifica título "Recibo" no formulário
   - Verifica que todos os campos do formulário estão visíveis

#### `it('Deve validar que o formulário de novo cadastro está visível ao acessar diretamente')`

**Fluxo completo:**
1. **Acesso:**
   - Navegação direta para `/financeiro/recibo/novo`
   - Aguarda desaparecimento de `#loading`

2. **Validação:**
   - Verifica título "Recibo" visível
   - Verifica que todos os campos do formulário estão visíveis

#### `it('Deve preencher e salvar um novo recibo com sucesso')`

**Fluxo completo:**
1. **Acesso:**
   - Navegação direta para formulário de novo cadastro

2. **Preenchimento:**
   - CPF/CNPJ: `12345678000190`
   - Recebemos de: Nome com timestamp para garantir unicidade
   - Referente a: "Serviço de teste automatizado"
   - Valor: Valor aleatório entre 1 e 999 (formato brasileiro)
   - Data: Data atual do sistema

3. **Salvamento:**
   - Clica no botão "Salvar"
   - Aguarda desaparecimento de `#loading`

4. **Validação:**
   - Verifica toast de sucesso visível

#### `it('Deve cancelar o cadastro clicando em Voltar')`

**Fluxo completo:**
1. **Acesso:**
   - Navegação direta para formulário de novo cadastro

2. **Preenchimento parcial:**
   - Preenche alguns campos (simulação de preenchimento)

3. **Cancelamento:**
   - Clica no botão "Voltar"
   - Aguarda desaparecimento de `#loading`

4. **Validação:**
   - Verifica que retornou para a página de listagem
   - Verifica título "Recibos" visível

#### `it('Deve exibir erro ao tentar salvar sem preencher campos obrigatórios')`

**Fluxo completo:**
1. **Acesso:**
   - Navegação direta para formulário de novo cadastro

2. **Tentativa de salvamento:**
   - Clica no botão "Salvar" sem preencher campos obrigatórios

3. **Validação:**
   - Verifica mensagem de erro (toast de erro ou validação HTML5)

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Todos os métodos de interação encapsulados em `ReciboPage`
- ✅ **Separate Locators** (ADR-0003): Locators centralizados em `ReciboLocators.js`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.loginArmazenandoSessao()` para login persistente
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas no `describe` para filtragem
- ✅ **Prioritize IDs and Context** (ADR-0015): Locators priorizam IDs quando disponíveis

### Boas Práticas
- **Aguardo de loading:** Sempre aguarda `#loading` desaparecer após ações que podem carregar dados
- **Validação de visibilidade:** Valida que elementos estão visíveis antes de interagir
- **Dados dinâmicos:** Usa timestamp para garantir unicidade em nomes
- **Valores aleatórios:** Gera valores aleatórios para evitar conflitos
- **Validação condicional:** Trata diferentes tipos de validação de erro (toast ou HTML5)

### Observações
- A tabela de listagem possui ID dinâmico, então usa classe `.table.table-hover` para seleção
- Campos do formulário possuem IDs específicos e únicos
- Botões possuem IDs específicos quando disponíveis
- Campo de valor usa classe especial `softcom-decimal-number` para formatação
- Campo de data usa classe `datepicker` (jQuery datepicker)

---

## Métodos do Page Object

### ReciboPage

#### Navegação
- `visit()` - Navega para página de listagem e valida título
- `visitNovoCadastro()` - Navega diretamente para formulário de novo cadastro

#### Interações com Listagem
- `clicarNovoCadastro()` - Clica no botão "Novo Cadastro" da listagem
- `verificarTituloListagem()` - Valida título "Recibos" visível
- `verificarTabelaVazia()` - Valida mensagem de tabela vazia

#### Interações com Formulário
- `preencherCnpj(cnpj)` - Preenche campo CPF/CNPJ
- `clicarConsultaReceita()` - Clica no botão de consulta na Receita Federal
- `preencherRecebemosDe(nome)` - Preenche campo "Recebemos de"
- `preencherReferenteA(servico)` - Preenche campo "Referente a"
- `preencherValor(valor)` - Preenche campo "Valor"
- `preencherData(data)` - Preenche campo "Data"
- `clicarSalvar()` - Clica no botão "Salvar"
- `clicarVoltar()` - Clica no botão "Voltar"
- `clicarNovoCadastroForm()` - Clica no botão "Novo Cadastro" do formulário

#### Validações
- `verificarTituloFormulario()` - Valida título "Recibo" no formulário
- `verificarCamposFormulario()` - Valida que todos os campos do formulário estão visíveis

---

## Locators utilizados

### ReciboLocators

#### Títulos
- `tituloListagem` - Título da página de listagem (`h5`)
- `tituloFormulario` - Título do formulário (`h5`)

#### Listagem
- `tabela` - Tabela de recibos (`.table.table-hover`)
- `tabelaVazia` - Mensagem de tabela vazia (`.table tbody tr td`)
- `linhasTabela` - Linhas da tabela (`.table tbody tr`)

#### Botões da Listagem
- `botaoNovoCadastro` - Botão "Novo Cadastro" (`a.btn.btn-warning[href*="/recibo/novo"]`)
- `botaoExcluirSelecionados` - Botão "Excluir Selecionados" (`a.btn.btn-danger.delete_all_forma[href*="/recibo/excluir"]`)

#### Campos do Formulário
- `campoCnpj` - Campo CPF/CNPJ (`#cnpj`)
- `botaoConsultaReceita` - Botão de consulta na Receita (`#btn_consulta_receita_cnpj`)
- `campoRecebemosDe` - Campo "Recebemos de" (`#nome`)
- `campoReferenteA` - Campo "Referente a" (`#servico_realizado`)
- `campoValor` - Campo "Valor" (`#valor`)
- `campoData` - Campo "Data" (`#data_recibo`)

#### Botões do Formulário
- `botaoVoltar` - Botão "Voltar" (`#btn-voltar`)
- `botaoNovoCadastroForm` - Botão "Novo Cadastro" do formulário (`#btn-novo`)
- `botaoSalvar` - Botão "Salvar" (`#btn-salvar`)

#### Container
- `formulario` - Formulário (`form.form-horizontal`)

---

## Referências

### ADRs relacionadas
- **ADR-0002:** [Use Page Object Pattern](../adr/0002-use-page-object-pattern.md) - Page Objects utilizados
- **ADR-0003:** [Separate Locators from Page Objects](../adr/0003-separate-locators-from-page-objects.md) - Locators separados
- **ADR-0004:** [Use cy.session for Login Persistence](../adr/0004-use-cy-session-for-login-persistence.md) - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** [Use Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md) - Tags aplicadas
- **ADR-0015:** [Prioritize IDs and Context in Locators](../adr/0015-prioritize-ids-and-context-in-locators.md) - IDs priorizados nos locators

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/README.md` - Índice de documentações arquiteturais
- `docs/descobertas-recibo.md` - Documentação das descobertas da exploração

---

## Observações

- O teste utiliza dados dinâmicos (timestamp) para garantir unicidade
- Valores aleatórios são gerados para evitar conflitos
- Validação de erro trata diferentes cenários (toast ou HTML5)
- A tabela possui ID dinâmico, então usa classe para seleção
- Todos os campos do formulário possuem IDs específicos e únicos

---

## Melhorias Sugeridas

1. **Adicionar teste de edição:**
   - Testar edição de recibo existente (quando funcionalidade estiver disponível)

2. **Adicionar teste de exclusão:**
   - Testar exclusão de recibos selecionados

3. **Adicionar teste de consulta Receita:**
   - Testar funcionalidade de consulta na Receita Federal

4. **Adicionar teste de impressão:**
   - Testar impressão/visualização de recibo (quando funcionalidade estiver disponível)

5. **Usar Faker (ADR-0009):**
   - Migrar geração de dados para Faker em vez de `Math.random()`

---

**Última atualização:** 2025-12-11

