# Arquitetura do caso de teste: `nfce/nfce-inutilizar.spec.js`

## Objetivo

Validar a tela de Inutilizar Faixas da NFC-e através do menu Vendas e NF-e > NFC-e > Inutilizar, garantindo que a tela seja exibida corretamente e que os elementos principais estejam presentes.

**Funcionalidades cobertas:**
- Exibição da tela de inutilização de faixas da NFC-e
- Validação de elementos principais da tela

**Cenários principais:**
- Validação da tela de inutilização com título e elementos principais

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/nfce/nfce-inutilizar.spec.js` - Spec principal com 1 cenário de teste

### Page Objects
- `cypress/support/pages/Nfce/NfceInutilizarPage.js` - Encapsula todas as interações com a tela de Inutilizar NFC-e
- `cypress/support/pages/menulateral/menulateralvendapage.js` - Método `acessarInutilizarNFCe()` para navegação via menu

### Locators
- `cypress/support/locators/Nfce/NfceInutilizarLocators.js` - Todos os seletores da tela (título, formulário, botões)
- `cypress/support/locators/Menu/MenulateralVendaLocators.js` - Locator `nfceInutilizar` para acesso via menu

---

## Importações e dependências

### Page Objects
```javascript
import NfceInutilizarPage from "../../support/pages/Nfce/NfceInutilizarPage";
```

### Locators
Os locators são importados dentro do Page Object:
```javascript
import NfceInutilizarLocators from "../../locators/Nfce/NfceInutilizarLocators";
```

### Commands
- `cy.login()` - Login para funcionalidades fiscais (ADR-0004)
- `cy.visit('/')` - Navegação para a raiz da aplicação

---

## Estrutura do teste

### Suite: NFC-e > Inutilizar

**Tags:** `['@nfce', '@inutilizar', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a tela de Inutilizar Faixas da NFCE')`

**Fluxo completo:**
1. **Acesso:**
   - Login via `cy.login()` (funcionalidades fiscais - ADR-0004)
   - Navegação para raiz (`cy.visit('/')`)
   - Acesso via menu: `NfceInutilizarPage.acessarViaMenu()`

2. **Validação:**
   - Valida URL contém `/nfce/inutilizar`
   - Valida título "Inutilizar Faixas da NFCE" visível
   - Valida que o heading do formulário "Adicionar Inutilização de Faixa" existe

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Toda interação com a UI está encapsulada em `NfceInutilizarPage`
- ✅ **Separate Locators** (ADR-0003): Todos os seletores estão centralizados em `NfceInutilizarLocators`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.login()` para funcionalidades fiscais
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas no `describe` para filtragem de testes

### Boas Práticas
- **Validação de URL**: Após navegação, valida URL para garantir que a navegação foi bem-sucedida
- **Validação de elementos principais**: Valida presença de elementos principais sem depender de elementos ocultos
- **Simplicidade**: O teste foca em validar a estrutura da tela, já que o formulário pode estar oculto por padrão

### Observações
- O formulário de inutilização está dentro de um elemento colapsável que pode estar oculto por padrão
- O teste atual foca em validar que a tela carrega corretamente e que os elementos principais existem
- Para testes mais completos de preenchimento do formulário, seria necessário primeiro expandir o formulário clicando no heading "Adicionar Inutilização de Faixa"

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering

### Documentação Relacionada
- [Processo de Documentação](../referencias/processo-documentacao.md)

---

**Última atualização:** 2025-01-27  
**Mantido por:** Equipe de Automação

