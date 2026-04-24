# Arquitetura dos casos de teste: Venda - Gerar NFSe

## Objetivo
Validar o fluxo **happy path** de geração/emissão de **NFSe** a partir de uma **Venda**, garantindo que:
- É possível criar uma venda com um item de serviço (**“serviço a01”**)
- É possível gerar a NFSe a partir dessa venda
- O sistema apresenta **confirmação visual de sucesso** (modal/alerta/toast)

**Funcionalidades cobertas:**
- Cadastro de venda (cliente, vendedor, item de serviço)
- Geração de pagamento padrão
- Acionamento de geração/emissão de NFSe
- Validação de sucesso via feedback visual

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/venda-nfcenfe/venda-nfse.spec.js` - Fluxo completo de venda com geração de NFSe

### Page Objects
- `cypress/support/pages/Venda/CadastroVendaPage.js` - Reuso do fluxo de venda (cliente/vendedor/produto/pagamento)
- `cypress/support/pages/Venda/VendaNfsePage.js` - Ações e validações específicas de NFSe na tela de venda

### Locators
- `cypress/support/locators/Venda/CadastroVendaLocators.js` - Locators do cadastro de venda
- `cypress/support/locators/Venda/VendaNfseLocators.js` - Locators auxiliares (modais/sweetalert e fallbacks por ID)

### Fixtures
- `cypress/fixtures/users.json` - credencial `validNFSe`

---

## Imports e dependências

### Specs

```javascript
import CadastroVendaPage from '../../support/pages/Venda/CadastroVendaPage';
import VendaNfsePage from '../../support/pages/Venda/VendaNfsePage';
```

### Commands
- `cy.loginArmazenandoSessaoNFSe()` - login persistente para rotinas de NFSe (ADR-0004)

---

## Estrutura do teste

### Suite: Realizar venda com NFSe

**Tags:** `['@venda-nfse', '@vendas', '@fiscal', '@regressivo']` (ADR-0010)

#### `it('Deve gerar NFSe com sucesso a partir de uma venda com serviço a01')`

**Fluxo completo:**
1. **Acesso / Setup**
   - Realiza login persistente com `cy.loginArmazenandoSessaoNFSe()`
   - Acessa o novo cadastro de venda via `CadastroVendaPage.acessarNovoCadastro()`

2. **Preenchimento**
   - Seleciona cliente alternativo (evita consumidor quando possível)
   - Seleciona o primeiro vendedor disponível
   - Adiciona item via autocomplete com o termo **“serviço a01”**
   - Gera pagamento padrão para concluir a venda

3. **Geração NFSe**
   - Após o pagamento e recarregamento/redirecionamento para edição, abre **Mais ações**
   - Clica em **Gerar nota**
   - No modal, seleciona **NFSe**
   - Confirma modal de confirmação quando existir

4. **Validação**
   - Valida feedback visual de sucesso (texto contendo sucesso + NFSe)

---

## Padrões e boas práticas

### Padrões aplicados
- ✅ **Page Object Pattern** (ADR-0002)
- ✅ **Separate Locators** (ADR-0003)
- ✅ **Session Persistence** (ADR-0004)
- ✅ **Tags para filtragem** (ADR-0010)

### Observações / trade-offs
- A ação de gerar NFSe é localizada por uma combinação de **fallbacks por ID/data-attrs** e **texto visível** (quando o ambiente não expõe um ID estável no DOM).
- Evita `cy.wait(number)` e prioriza `should(...)`/validações de presença/visibilidade.

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0006](../adr/0006-mandatory-documentation-for-new-tests.md): Mandatory Documentation
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

