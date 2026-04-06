# Cenários de Teste: Cadastro de Exemplo

- **Módulo:** Financeiro
- **Login:** cy.loginArmazenandoSessao()
- **Tags:** @financeiro, @cadastro-exemplo

## Cenários

### 1. Cadastro com Sucesso (positivo, prioridade alta)

- **Objetivo:** Validar cadastro com dados válidos.
- **Pré-condições:** Usuário logado no sistema.
- **Passos:** Acessar a tela de cadastro através de /admin/exemplo. → Preencher o campo Nome com valor válido. → Preencher o campo Valor com um número maior que zero. → Clicar no botão Salvar.
- **Resultado esperado:** Cadastro realizado com sucesso e mensagem de confirmação exibida.
- **Dados dinâmicos:** Nome, Valor

### 2. Validação de Campos Obrigatórios (negativo, prioridade alta)

- **Objetivo:** Verificar se a aplicação exige o preenchimento de campos obrigatórios.
- **Pré-condições:** Usuário logado no sistema.
- **Passos:** Acessar a tela de cadastro através de /admin/exemplo. → Deixar o campo Nome vazio. → Deixar o campo Valor vazio. → Clicar no botão Salvar.
- **Resultado esperado:** Sistema exibe mensagens de erro para campos obrigatórios não preenchidos.
- **Dados dinâmicos:** -

### 3. Validação de Valor Numérico (negativo, prioridade alta)

- **Objetivo:** Verificar o comportamento ao inserir um valor não numérico.
- **Pré-condições:** Usuário logado no sistema.
- **Passos:** Acessar a tela de cadastro através de /admin/exemplo. → Preencher o campo Nome com valor válido. → Preencher o campo Valor com texto não numérico. → Clicar no botão Salvar.
- **Resultado esperado:** Sistema exibe mensagem de erro sobre valor inválido.
- **Dados dinâmicos:** Nome

### 4. Cadastro com Valor Zero (edge, prioridade media)

- **Objetivo:** Verificar o comportamento ao inserir zero no campo Valor.
- **Pré-condições:** Usuário logado no sistema.
- **Passos:** Acessar a tela de cadastro através de /admin/exemplo. → Preencher o campo Nome com valor válido. → Preencher o campo Valor com zero. → Clicar no botão Salvar.
- **Resultado esperado:** Sistema não permite cadastro e exibe mensagem de erro.
- **Dados dinâmicos:** Nome



---


## Ações Cursor-ready

> Instruções para o Cursor Agent mode. Copie esta seção inteira
> e cole no chat do Cursor com: "Implemente as ações aprovadas abaixo."
> Remova ou altere [APROVADO] para [REJEITADO] nas ações que NÃO deseja executar.

> IMPORTANTE: A ação de explorar tela (explorar-tela) deve ser executada ANTES das demais, pois os locators dependem do DOM real.

### [APROVADO] Ação 1: Explorar Tela para Locators
- **Tipo**: explorar-tela
- **Arquivo(s)**: cypress/support/locators/FinanceiroExemploLocator.js
- **URL**: /admin/exemplo
- **O que fazer**: Usar ferramentas do navegador para explorar a tela e criar locators assertivos.
- **Contexto**: Cadastro de Exemplo
- **Estrutura sugerida**:
  ```javascript
  modalCampoNome: '.modal #nome',
  modalCampoValor: '.modal #valor',
  modalBtnSalvar: '.modal #btn-salvar'
  ```

### [APROVADO] Ação 2: Criar Spec de Teste
- **Tipo**: criar-arquivo
- **Arquivo(s)**: cypress/e2e/financeiro/cadastro-exemplo.spec.js
- **O que fazer**: Criar spec de teste para o fluxo de cadastro de exemplo.
- **Contexto**: Cadastro de Exemplo
- **Estrutura sugerida**:
  ```javascript
  describe('Cadastro de Exemplo', { tags: ['@financeiro', '@cadastro-exemplo'] }, () => {
    beforeEach(() => { cy.loginArmazenandoSessao(); cy.visit('/admin/exemplo'); });
    it('Cadastro com Sucesso', () => { });
    it('Validação de Campos Obrigatórios', () => { });
    it('Validação de Valor Numérico', () => { });
    it('Cadastro com Valor Zero', () => { });
  });
  ```

### [APROVADO] Ação 3: Adicionar Spec ao specPattern
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress.config.js
- **O que fazer**: Adicionar novo spec ao specPattern no cypress.config.js.
- **Contexto**: Configuração de Cypress
- **Estrutura sugerida**:
  ```javascript
  specPattern: ['./cypress/e2e/financeiro/cadastro-exemplo.spec.js'],
  ```

### [APROVADO] Ação 4: Criar Page Object
- **Tipo**: criar-arquivo
- **Arquivo(s)**: cypress/support/pages/FinanceiroExemploPage.js
- **O que fazer**: Criar um Page Object para encapsular interações com a tela de cadastro de exemplo.
- **Contexto**: Cadastro de Exemplo
- **Estrutura sugerida**:
  ```javascript
  class FinanceiroExemploPage {
    preencherNome(nome) { /* implementação */ }
    preencherValor(valor) { /* implementação */ }
    clicarSalvar() { /* implementação */ }
  }
  ```

### [APROVADO] Ação 5: Documentar Architecture de Testes
- **Tipo**: criar-arquivo
- **Arquivo(s)**: docs/cases/architecture-cadastro-exemplo.md
- **O que fazer**: Documentar arquitetura de teste para o cadastro de exemplo.
- **Contexto**: Cadastro de Exemplo
- **Estrutura sugerida**:
  ```javascript
  # Architecture for Cadastro de Exemplo Testes
  - Modulo: Financeiro
  - Funcionalidades: Cadastro
  - Documentar cenários, passos, e padrões utilizados.
  ```