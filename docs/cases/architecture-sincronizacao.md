# Arquitetura dos casos de teste: Sincronização - Responsável Técnico

## Objetivo

Validar a funcionalidade de sincronização de dados do responsável técnico, incluindo:
- Exibição correta da tela de sincronização
- Visualização das informações de última e próxima sincronização
- Funcionalidade de sincronização manual via botão

**Funcionalidades cobertas:**
- Tela de sincronização do responsável técnico
- Exibição de informações de sincronização (última e próxima)
- Botão de sincronização manual
- Validação de formato de data/hora nas informações

**Cenários principais:**
- Exibição correta da tela de sincronização
- Validação de todos os elementos da tela
- Clique no botão de sincronizar dados
- Validação do formato das informações de data/hora

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/sincronizacao.spec.js` - Testes de sincronização do responsável técnico

### Page Objects
- `cypress/support/pages/Configuracoes/SincronizacaoPage.js` - Métodos de interação com a tela de sincronização

### Locators
- `cypress/support/locators/Configuracoes/SincronizacaoLocators.js` - Seletores da tela de sincronização

### Menu Navigation
- `cypress/support/pages/menulateral/menulateralconfiguracoespage.js` - Navegação via menu Configurações > Sincronização

---

## Imports e dependências

### Page Objects
```javascript
import SincronizacaoPage from '../../support/pages/Configuracoes/SincronizacaoPage';
import SincronizacaoLocators from '../../support/locators/Configuracoes/SincronizacaoLocators';
```

### Locators
- `SincronizacaoLocators` - Contém todos os seletores da tela de sincronização (título, pergunta, informações, botão)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Menu Navigation
- `MenulateralConfiguracoesPage.acessarSincronizacao()` - Navegação via menu Configurações > Sincronização

---

## Estrutura do teste

### Suite: Sincronização - Responsável Técnico

**Tags:** `['@configuracoes', '@sincronizacao', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir a tela de sincronização corretamente')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `SincronizacaoPage.acessarTelaSincronizacao()` para navegar até a tela
   - Valida que a URL contém `/configuracao/sincronizacao`
   - Valida que a tela foi carregada corretamente

2. **Validações:**
   - Valida que a pergunta principal está exibida
   - Valida que as informações de sincronização estão visíveis
   - Valida que o botão de sincronizar está visível e habilitado

#### `it('deve permitir clicar no botão de sincronizar dados')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela de sincronização
   - Valida que o botão está visível e habilitado

2. **Ação:**
   - Clica no botão "Sincronizar dados"

3. **Validação:**
   - Valida que a sincronização foi iniciada
   - Aguarda o loading desaparecer (se existir)
   - Valida que a página ainda está visível (não houve erro)

#### `it('deve validar que as informações de última e próxima sincronização são exibidas')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela de sincronização
   - Valida que as informações estão visíveis

2. **Validação de Formato:**
   - Valida formato da data/hora na última sincronização (padrão: `DD/MM/YYYY às HH:mm:ss`)
   - Valida formato da data/hora na próxima sincronização (padrão: `DD/MM/YYYY às HH:mm:ss`)

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os métodos de interação estão encapsulados em `SincronizacaoPage`
- O spec apenas chama os métodos do Page Object, sem seletores diretos
- Métodos de validação separados por responsabilidade

### Locators Centralizados (ADR-0003)
- Todos os seletores estão em `SincronizacaoLocators`
- Uso de seletores contextuais com `#content-layout` como base (ADR-0015)
- Seletores específicos para cada elemento (título, pergunta, informações, botão)

### Session Persistence (ADR-0004)
- Uso de `cy.loginArmazenandoSessao()` para funcionalidades não fiscais
- Sessão é reutilizada entre testes

### Tags para Filtragem (ADR-0010)
- Tags aplicadas: `@configuracoes`, `@sincronizacao`, `@regressivo`
- Permite execução seletiva: `npm run e2e -- --grep "@sincronizacao"`

### Validações Condicionais
- Uso de `.should('be.visible')` para validações assertivas
- Aguarda loading desaparecer antes de validar resultado
- Validação de formato usando regex para garantir padrão correto

---

## Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

---

## Observações

- A tela de sincronização não possui IDs únicos nos elementos principais, por isso os seletores usam contexto (`#content-layout`) e seletores de tipo (`h4`, `h5`, `button`)
- O botão de sincronizar usa classes Bootstrap (`btn btn-primary`)
- As informações de data/hora seguem o padrão brasileiro: `DD/MM/YYYY às HH:mm:ss`
- A sincronização pode demorar alguns segundos, por isso há validação de loading
- A tela é acessada via menu Configurações > Sincronização

