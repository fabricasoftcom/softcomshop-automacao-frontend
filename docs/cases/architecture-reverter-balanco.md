# Arquitetura dos casos de teste: Reverter Balanço

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Reverter Balanço**, que valida o processo de reverter um balanço finalizado para o status "Aguardando Finalização".

**Funcionalidades cobertas:**
- Acesso a balanço finalizado
- Reversão de balanço finalizado
- Validação de alteração de status
- Validação de mensagem de sucesso

**Cenários principais:**
- Acessar um balanço finalizado na listagem
- Reverter o balanço para status "Aguardando Finalização"
- Verificar alteração de status
- Validar mensagem de sucesso após reversão

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/Balanco/reverterBalanco.spec.js` - Teste de reversão de balanço

### Page Objects
- `cypress/support/pages/Balanco/ReverterBalancoPage.js` - Métodos para reversão de balanço

### Locators
- `cypress/support/locators/ReverterBalancoLocator.js` - Seletores para reversão de balanço

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralProdutoPage.js` - Navegação para módulo de balanço

---

## Imports e dependências

### Page Objects
```javascript
import ReverterBalancoPage from "../../support/pages/Balanco/ReverterBalancoPage";
import MenulateralProdutoPage from "../../support/pages/menulateral/MenulateralProdutoPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import { ReverterBalancoLocator } from "../../locators/ReverterBalancoLocator";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Reverter Balanço

**Tags:** `['@balanco', '@regressivo']` (ADR-0010)

#### `it('Deve acessar a tela de balanco e reverter um balanco em andamento')`

**Fluxo completo:**
1. **Navegação:**
   - Acessa listagem de balanço através do menu lateral

2. **Acesso ao balanço:**
   - Localiza primeiro balanço com status "Finalizado" na tabela
   - Clica no botão de ação (`.button-tab`) da linha

3. **Reversão:**
   - Clica no botão de reverter balanço
   - Altera status de "Finalizado" para "Aguardando Finalização"

4. **Validações:**
   - Verifica status atualizado para "Aguardando Finalização"
   - Verifica toast de sucesso: "Balanço desfeito com Sucesso!"

---

## Padrões e boas práticas

### Navegação
- Uso de `MenulateralProdutoPage` para acessar módulo de balanço
- Menu lateral: "Compras e Estoque" → "Balanço"

### Interação com tabela
- Uso de `filter()` para localizar linha com status "Finalizado"
- Seleção do primeiro item encontrado com `.first()`
- Uso de `.find()` para localizar botão de ação dentro da linha

### Validações
- Validação de toast de sucesso após reversão
- Validação de status alterado na interface
- Uso de `contains()` para validação de textos

### Tratamento de elementos dinâmicos
- Busca dinâmica na tabela por status "Finalizado"
- Seleção do primeiro balanço finalizado disponível

### Tags aplicadas
- `@balanco` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ReverterBalancoPage

- `acessarPrimeiroBalancoFinalizado()` - Localiza e acessa primeiro balanço finalizado na tabela
- `reverterBalanco()` - Clica no botão de reverter balanço
- `verificarStatusAtualizado()` - Valida status alterado para "Aguardando Finalização"
- `verificarToastSucesso()` - Valida mensagem de sucesso após reversão

---

## Locators utilizados

### ReverterBalancoLocator

- `botaoReverterBalanco` - Botão para reverter balanço
- `statusBalanco` - Elemento que exibe status do balanço
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
- `docs/cases/architecture-balanco.md` - Criação e finalização de balanço (balanços criados podem ser revertidos)
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste assume que existe pelo menos um balanço finalizado no sistema
- A busca na tabela é feita por texto "Finalizado" usando `filter(':contains("Finalizado")')`
- O teste seleciona o primeiro balanço finalizado encontrado
- O fluxo depende de existir um balanço finalizado previamente criado

---

## Relação com outros testes

Este teste complementa o teste de criação de balanço (`architecture-balanco.md`):
- O teste de criação cria e finaliza um balanço
- Este teste reverte um balanço finalizado
- Ambos validam o ciclo completo de vida de um balanço

---

**Última atualização:** 2024-12-19

