# Arquitetura dos casos de teste: Balanço

## Objetivo

Este documento descreve a arquitetura dos testes relacionados ao módulo de **Balanço**, que valida o processo completo de criação e finalização de balanços de estoque.

**Funcionalidades cobertas:**
- Criação de novo balanço
- Preenchimento de cabeçalho com responsável
- Seleção de produtos para balanço
- Finalização de balanço
- Validação de status e mensagens de sucesso

**Cenários principais:**
- Realizar um novo balanço completo (cabeçalho → produto → finalização)
- Verificar alteração de status para "Finalizado"
- Validar mensagem de sucesso após finalização

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/Balanco/balanco.spec.js` - Teste de criação e finalização de balanço

### Page Objects
- `cypress/support/pages/Balanco/BalancoPage.js` - Métodos para interação com a página de balanço

### Locators
- `cypress/support/locators/BalancoLocator.js` - Seletores da página de balanço

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralProdutoPage.js` - Navegação para módulo de balanço

---

## Imports e dependências

### Page Objects
```javascript
import BalancoPage from "../../support/pages/Balanco/BalancoPage";
import MenulateralProdutoPage from "../../support/pages/menulateral/MenulateralProdutoPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import BalancoLocators from "../../locators/BalancoLocator";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Balanço

**Tags:** `['@balanco', '@regressivo']` (ADR-0010)

#### `it('Deve realizar um novo balanco')`

**Fluxo completo:**
1. **Navegação:**
   - Acessa listagem de balanço através do menu lateral
   - Acessa cadastro de novo balanço

2. **Preenchimento do cabeçalho:**
   - Preenche campo responsável com "VENDEDOR"
   - Salva cabeçalho para habilitar próximas opções

3. **Seleção de produto:**
   - Seleciona produto para balanço (primeiro item da lista)
   - Salva balanço após inserção do produto

4. **Finalização:**
   - Clica no botão de finalizar
   - Altera status do balanço para "Finalizado"

5. **Validações:**
   - Verifica toast de sucesso: "Balanço finalizado com Sucesso!"
   - Verifica status alterado para "Finalizado"

---

## Padrões e boas práticas

### Navegação
- Uso de `MenulateralProdutoPage` para acessar módulo de balanço
- Menu lateral: "Compras e Estoque" → "Balanço"

### Interação com elementos
- Uso de autocomplete para seleção de responsável
- Uso de xpath para seleção de produto (primeiro item da lista)
- Validação de toasts para feedback de ações

### Validações
- Validação de toast de sucesso após finalização
- Validação de status alterado na interface
- Uso de `contains()` para validação de textos

### Tratamento de elementos dinâmicos
- Seleção de primeiro produto disponível usando xpath com `data-index='0'`
- Seleção de responsável usando texto "VENDEDOR" no autocomplete

### Tags aplicadas
- `@balanco` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### BalancoPage

- `preencherCabecalho()` - Preenche campo responsável com "VENDEDOR"
- `salvarCabecalho()` - Salva cabeçalho do balanço
- `selecionarProduto()` - Seleciona primeiro produto da lista
- `salvarBalanco()` - Salva balanço após inserção de produto
- `finalizarBalanco()` - Finaliza o balanço
- `verificarStatusFinalizado()` - Valida status "Finalizado"
- `verificarToastSucesso()` - Valida mensagem de sucesso

---

## Locators utilizados

### BalancoLocators

- `responsavelInput` - Campo de seleção de responsável
- `botaoSalvarCabecalho` - Botão para salvar cabeçalho
- `produtoInput` - Campo de seleção de produto
- `botaoSalvarBalanco` - Botão para salvar balanço
- `botaoFinalizarBalanco` - Botão para finalizar balanço
- `statusFinalizado` - Elemento que exibe status "Finalizado"
- `toastSucesso` - Elemento de toast de sucesso

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags `@balanco` e `@regressivo` aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste assume que existe pelo menos um produto disponível no sistema
- O teste assume que existe um responsável "VENDEDOR" disponível
- A seleção de produto usa xpath para pegar o primeiro item da lista
- O fluxo é sequencial e depende de cada etapa anterior ser concluída

---

**Última atualização:** 2024-12-19

