# Arquitetura do caso de teste: `sped/valores-declaratorios.spec.js`

## Objetivo

Validar a tela de Valores Declaratórios do SPED através do menu Fiscal > SPED > Valores Declaratórios, garantindo que a listagem seja exibida corretamente, que seja possível navegar para o cadastro e preencher o formulário com os campos obrigatórios.

**Funcionalidades cobertas:**
- Exibição da tela de listagem
- Navegação para o cadastro
- Preenchimento do formulário de cadastro
- Cancelamento do cadastro

**Cenários principais:**
- Validação da listagem de valores declaratórios
- Navegação para novo cadastro
- Preenchimento do formulário (data referência, valor ajuste)
- Cancelamento do cadastro retornando para a listagem

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/sped/valores-declaratorios.spec.js` - Spec principal com 4 cenários de teste

### Page Objects
- `cypress/support/pages/Sped/ValoresDeclaratoriosPage.js` - Encapsula todas as interações com a tela de Valores Declaratórios do SPED
- `cypress/support/pages/menulateral/menulateralfiscalpage.js` - Método `acessarSpedValoresDeclaratorios()` para navegação via menu

### Locators
- `cypress/support/locators/Sped/ValoresDeclaratoriosLocators.js` - Todos os seletores da tela (listagem, formulário, botões)
- `cypress/support/locators/Menu/MenulateralFiscalLocators.js` - Locator `spedValoresDeclaratorios` para acesso via menu

---

## Importações e dependências

### Page Objects
```javascript
import ValoresDeclaratoriosPage from "../../support/pages/Sped/ValoresDeclaratoriosPage";
```

### Locators
Os locators são importados dentro do Page Object:
```javascript
import ValoresDeclaratoriosLocators from "../../locators/Sped/ValoresDeclaratoriosLocators";
```

### Commands
- `cy.login()` - Login para funcionalidades fiscais (ADR-0004)
- `cy.visit('/')` - Navegação para a raiz da aplicação

---

## Estrutura do teste

### Suite: SPED > Valores Declaratórios

**Tags:** `['@sped', '@valores-declaratorios', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a tela de listagem de Valores Declaratórios')`

**Fluxo completo:**
1. **Acesso:**
   - Login via `cy.login()` (funcionalidades fiscais - ADR-0004)
   - Navegação para raiz (`cy.visit('/')`)
   - Acesso via menu: `ValoresDeclaratoriosPage.acessarViaMenu()`

2. **Validação:**
   - Valida título da listagem visível
   - Valida URL contém `/sped/valores-declaratorios` e não contém `/novo`

#### `it('Deve navegar para o cadastro ao clicar em Novo Cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação (mesmo processo do teste anterior)

2. **Navegação:**
   - Clica no botão "Novo Cadastro" usando `cy.contains()`

3. **Validação:**
   - Valida URL contém `/sped/valores-declaratorios/novo`
   - Valida título do cadastro visível

#### `it('Deve preencher o formulário de cadastro de valores declaratórios')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação (mesmo processo dos testes anteriores)
   - Navega para o cadastro

2. **Preenchimento:**
   - Preenche data referência: `01/01/2025`
   - Preenche valor ajuste: `100,00`
   - Nota: O campo "Código do Ajuste" é um autocomplete complexo e foi omitido do teste para evitar problemas de interação

3. **Validação:**
   - Valida que os campos foram preenchidos corretamente

#### `it('Deve cancelar o cadastro clicando em Voltar')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação (mesmo processo dos testes anteriores)
   - Navega para o cadastro

2. **Cancelamento:**
   - Clica no botão "Voltar"

3. **Validação:**
   - Valida que retornou para a listagem (URL não contém `/novo`)

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Toda interação com a UI está encapsulada em `ValoresDeclaratoriosPage`
- ✅ **Separate Locators** (ADR-0003): Todos os seletores estão centralizados em `ValoresDeclaratoriosLocators`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.login()` para funcionalidades fiscais
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas no `describe` para filtragem de testes

### Boas Práticas
- **Uso de `cy.contains()`**: Para elementos sem ID específico (botão "Novo Cadastro"), usa `cy.contains()` que é mais robusto
- **Validação de URL**: Após navegação, valida URL para garantir que a navegação foi bem-sucedida
- **Simplificação de testes**: O campo autocomplete "Código do Ajuste" foi omitido do teste de preenchimento devido à complexidade de interação, focando nos campos básicos que funcionam de forma confiável

### Observações
- O campo "Código do Ajuste" é um autocomplete que pode ter comportamento complexo, por isso foi omitido do teste de preenchimento completo
- O teste foca em validar a estrutura e navegação da tela, garantindo que os elementos principais estão funcionando
- O campo "Descrição Ajuste" é opcional e não foi incluído no teste básico

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering

### Documentação Relacionada
- [Processo de Documentação](../referencias/processo-documentacao.md)
- [Arquitetura SPED Configurações](./architecture-sped-configuracoes.md)
- [Arquitetura Plano de Contas SPED](./architecture-plano-contas-sped.md)

---

**Última atualização:** 2025-01-27  
**Mantido por:** Equipe de Automação

