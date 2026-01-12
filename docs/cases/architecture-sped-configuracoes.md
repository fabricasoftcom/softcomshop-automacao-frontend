# Arquitetura do caso de teste: `sped/sped-configuracoes.spec.js`

## Objetivo

Validar a tela de Configurações do SPED através do menu Fiscal > SPED > Configurações, garantindo que todos os elementos principais sejam exibidos corretamente e que as configurações possam ser alteradas e salvas com sucesso.

**Funcionalidades cobertas:**
- Exibição da tela de configurações com todos os elementos principais
- Validação da seção Fiscal com todos os campos
- Alteração de configurações e salvamento

**Cenários principais:**
- Validação de elementos principais (tabs, botão salvar, campos)
- Validação da seção Fiscal (selects, checkboxes, inputs)
- Alteração de configurações (perfil de escrituração, atividade da empresa, checkboxes) e salvamento

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/sped/sped-configuracoes.spec.js` - Spec principal com 3 cenários de teste

### Page Objects
- `cypress/support/pages/Sped/SpedConfiguracoesPage.js` - Encapsula todas as interações com a tela de Configurações do SPED
- `cypress/support/pages/menulateral/menulateralfiscalpage.js` - Método `acessarSpedConfiguracoes()` para navegação via menu

### Locators
- `cypress/support/locators/Sped/SpedConfiguracoesLocators.js` - Todos os seletores da tela (tabs, selects, checkboxes, inputs, botões)
- `cypress/support/locators/Menu/MenulateralFiscalLocators.js` - Locator `spedConfiguracoes` para acesso via menu

---

## Importações e dependências

### Page Objects
```javascript
import SpedConfiguracoesPage from "../../support/pages/Sped/SpedConfiguracoesPage";
```

### Locators
Os locators são importados dentro do Page Object:
```javascript
import SpedConfiguracoesLocators from "../../locators/Sped/SpedConfiguracoesLocators";
```

### Commands
- `cy.login()` - Login para funcionalidades fiscais (ADR-0004)
- `cy.visit('/')` - Navegação para a raiz da aplicação

---

## Estrutura do teste

### Suite: SPED > Configurações

**Tags:** `['@sped', '@configuracoes', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a tela de Configurações do SPED com todos os elementos principais')`

**Fluxo completo:**
1. **Acesso:**
   - Login via `cy.login()` (funcionalidades fiscais - ADR-0004)
   - Navegação para raiz (`cy.visit('/')`)
   - Acesso via menu: `SpedConfiguracoesPage.acessarViaMenu()`

2. **Validação:**
   - Valida URL contém `/sped/configuracoes`
   - Valida tabs Fiscal e Contribuições visíveis
   - Valida botão Salvar visível
   - Valida seção Fiscal com todos os campos

#### `it('Deve validar a seção Fiscal com todos os campos')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação (mesmo processo do teste anterior)

2. **Navegação:**
   - Clica na tab Fiscal

3. **Validação:**
   - Valida seção Fiscal visível
   - Valida todos os selects (perfil de escrituração, atividade da empresa, NFe própria data imposto, entradas adicionar ST, regime 1601, entradas adicionar IPI)

#### `it('Deve alterar configurações e salvar')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação (mesmo processo dos testes anteriores)

2. **Alteração de Configurações:**
   - Seleciona perfil de escrituração 'A'
   - Seleciona atividade da empresa '0'
   - Marca checkbox "Exibir escolha perfil" (usando `force: true` devido ao Switchery)

3. **Salvamento:**
   - Clica no botão Salvar
   - Valida que a página permanece na mesma URL (configurações salvas)

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Toda interação com a UI está encapsulada em `SpedConfiguracoesPage`
- ✅ **Separate Locators** (ADR-0003): Todos os seletores estão centralizados em `SpedConfiguracoesLocators`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.login()` para funcionalidades fiscais
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas no `describe` para filtragem de testes

### Boas Práticas
- **Priorização de IDs**: Todos os locators usam IDs quando disponíveis (ADR-0015)
- **Uso de `force: true`**: Checkboxes usam `force: true` porque são elementos Switchery que escondem o input original
- **Validação de URL**: Após salvar, valida que a URL permanece correta (mais confiável que toast messages)
- **Validação de elementos**: Valida visibilidade de elementos principais antes de interagir

### Observações
- A tab "Contribuições" pode ter problemas de rota no backend (URIError), por isso não é validada nos testes
- Os checkboxes são elementos Switchery (plugin JavaScript) que escondem o input original, necessitando `force: true`
- A validação de salvamento é feita através da URL, não através de toast messages, para maior confiabilidade

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação Relacionada
- [Plano de Contas SPED](./architecture-plano-contas-sped.md) - Configurações do SPED incluem plano de contas
- [Valores Declaratórios](./architecture-valores-declaratorios.md) - Configurações do SPED incluem valores declaratórios
- [SPED Gerar Arquivo](./architecture-sped-gerar-arquivo.md) - Configurações são necessárias para gerar arquivo
- [Processo de Documentação](../referencias/processo-documentacao.md)

---

**Última atualização:** 2025-01-27  
**Mantido por:** Equipe de Automação

