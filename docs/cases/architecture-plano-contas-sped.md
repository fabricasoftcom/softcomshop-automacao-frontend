# Arquitetura do caso de teste: `sped/plano-contas-sped.spec.js`

## Objetivo
- Validar o cadastro de planos de contas do SPED através do menu Fiscal > SPED > Plano de Contas, garantindo que todos os campos obrigatórios sejam preenchidos corretamente e que o cadastro seja realizado com sucesso.
- Validar o cancelamento do cadastro através do botão Voltar.

**Funcionalidades cobertas:**
- Cadastro de plano de contas com campos obrigatórios
- Cadastro de plano de contas com código referenciado opcional
- Cancelamento de cadastro

**Cenários principais:**
- Cadastro completo com todos os campos obrigatórios (data de inclusão, natureza, tipo, nível, código, nome)
- Cadastro com código referenciado opcional
- Cancelamento do cadastro retornando para a listagem

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/sped/plano-contas-sped.spec.js` - Spec principal com 3 cenários de teste

### Page Objects
- `cypress/support/pages/Sped/PlanoContasSpedPage.js` - Encapsula todas as interações com a tela de Plano de Contas do SPED
- `cypress/support/pages/menulateral/menulateralfiscalpage.js` - Método `acessarSpedPlanoContas()` para navegação via menu

### Locators
- `cypress/support/locators/Sped/PlanoContasSpedLocators.js` - Todos os seletores da tela (campos, botões, formulário)
- `cypress/support/locators/Menu/MenulateralFiscalLocators.js` - Locator `spedPlanoContas` para acesso via menu

---

## Importações e dependências

### Page Objects
```javascript
import PlanoContasSpedPage from "../../support/pages/Sped/PlanoContasSpedPage";
```

### Locators
Os locators são importados dentro do Page Object:
```javascript
import PlanoContasSpedLocators from "../../locators/Sped/PlanoContasSpedLocators";
```

### Commands
- `cy.login()` - Login para funcionalidades fiscais (ADR-0004)
- `cy.visit('/')` - Navegação para a raiz da aplicação

---

## Estrutura do teste

### Suite: SPED > Plano de Contas

**Tags:** `['@sped', '@plano-contas', '@regressivo']` (ADR-0010)

#### `it('Deve cadastrar um novo plano de contas com todos os campos obrigatórios')`

**Fluxo completo:**
1. **Acesso:**
   - Login via `cy.login()` (ADR-0004: funcionalidades fiscais)
   - Visita a raiz da aplicação
   - Acessa via menu: `PlanoContasSpedPage.acessarViaMenu()`
   - Valida título da listagem

2. **Navegação para Cadastro:**
   - Clica em "Novo Cadastro"
   - Valida URL de cadastro (`/sped/plano-de-contas/novo`)

3. **Preenchimento:**
   - Preenche data de inclusão (campo obrigatório)
   - Seleciona natureza: '01' (Contas de ativo)
   - Seleciona tipo: 'A' (Analítica)
   - Preenche nível: '1'
   - Preenche código (dinâmico com timestamp)
   - Preenche nome (dinâmico com data/hora)

4. **Validação:**
   - Clica em Salvar
   - Valida redirecionamento para listagem (URL não contém `/novo`)

#### `it('Deve cadastrar um plano de contas com código referenciado opcional')`

**Fluxo completo:**
1. **Acesso:**
   - Mesmo fluxo do teste anterior

2. **Navegação para Cadastro:**
   - Mesmo fluxo do teste anterior

3. **Preenchimento:**
   - Preenche todos os campos obrigatórios
   - Adicionalmente preenche código referenciado: 'REF-001'
   - Seleciona natureza: '02' (Contas de passivo)
   - Seleciona tipo: 'S' (Sintética)
   - Preenche nível: '2'

4. **Validação:**
   - Clica em Salvar
   - Valida redirecionamento para listagem

#### `it('Deve cancelar o cadastro clicando em Voltar')`

**Fluxo completo:**
1. **Acesso:**
   - Mesmo fluxo dos testes anteriores

2. **Navegação para Cadastro:**
   - Mesmo fluxo dos testes anteriores

3. **Cancelamento:**
   - Clica em "Voltar"

4. **Validação:**
   - Valida URL de listagem
   - Valida título da listagem visível

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Todas as interações encapsuladas em `PlanoContasSpedPage`
- ✅ **Separate Locators** (ADR-0003): Todos os seletores centralizados em `PlanoContasSpedLocators`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.login()` para funcionalidades fiscais
- ✅ **Tags for Filtering** (ADR-0010): Tags `@sped`, `@plano-contas`, `@regressivo` aplicadas
- ✅ **Prioritize IDs and Context** (ADR-0015): Todos os locators usam IDs quando disponíveis

### Boas Práticas
- Dados dinâmicos gerados usando `Date.now()` e função auxiliar `obterDataHoraAtual()` para evitar conflitos
- Validação de redirecionamento após salvar em vez de depender apenas de toast (mais confiável)
- Aguarda carregamento da página antes de validar elementos
- Método `preencherFormulario()` permite preenchimento flexível (campos opcionais)

### Observações
- Campo "Data de Inclusão" é obrigatório e deve ser preenchido em todos os cadastros
- Campo "Nome" usa o ID `descricao` (não `nome`) - importante para manutenção
- Após salvar, a aplicação redireciona para a listagem automaticamente
- Validação de sucesso baseada em redirecionamento de URL, não em toast (mais confiável)

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação Relacionada
- [Processo de Documentação](../referencias/processo-documentacao.md)
- [Architecture SPED Gerar Arquivo](./architecture-sped-gerar-arquivo.md)

---

## Integração com a arquitetura global
- Registrado em `specPattern` do `cypress.config.js` na seção `// sped`
- Hooks globais em `support/e2e.js` continuam checando erros 500
- Relatórios Allure e evidências seguem o mesmo pipeline
- Menu lateral fiscal atualizado com método `acessarSpedPlanoContas()`


