# Arquitetura do caso de teste: `nfce/nfce-download-xml.spec.js`

## Objetivo

Validar a tela de Download do XML da NFC-e através do menu Vendas e NF-e > NFC-e > Download XML, garantindo que a tela seja exibida corretamente e que seja possível preencher o formulário de download.

**Funcionalidades cobertas:**
- Exibição da tela de Download do XML
- Preenchimento do formulário de download (período, número da nota)
- Download do XML com período dos últimos 30 dias
- Validação de arquivo baixado

**Cenários principais:**
- Validação da tela com todos os elementos principais
- Preenchimento do formulário de download
- Download do XML e validação do arquivo baixado

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/nfce/nfce-download-xml.spec.js` - Spec principal com 3 cenários de teste

### Page Objects
- `cypress/support/pages/Nfce/NfceDownloadXmlPage.js` - Encapsula todas as interações com a tela de Download XML da NFC-e
- `cypress/support/pages/menulateral/menulateralvendapage.js` - Método `acessarDownloadXmlNFCe()` para navegação via menu

### Locators
- `cypress/support/locators/Nfce/NfceDownloadXmlLocators.js` - Todos os seletores da tela (título, formulário, botões)
- `cypress/support/locators/Menu/MenulateralVendaLocators.js` - Locator `nfceDownloadXml` para acesso via menu

---

## Importações e dependências

### Page Objects
```javascript
import NfceDownloadXmlPage from "../../support/pages/Nfce/NfceDownloadXmlPage";
```

### Locators
Os locators são importados dentro do Page Object:
```javascript
import NfceDownloadXmlLocators from "../../locators/Nfce/NfceDownloadXmlLocators";
```

### Commands
- `cy.login()` - Login para funcionalidades fiscais (ADR-0004)
- `cy.visit('/')` - Navegação para a raiz da aplicação

---

## Estrutura do teste

### Suite: NFC-e > Download XML

**Tags:** `['@nfce', '@download-xml', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a tela de Download do XML com todos os elementos principais')`

**Fluxo completo:**
1. **Acesso:**
   - Login via `cy.login()` (funcionalidades fiscais - ADR-0004)
   - Navegação para raiz (`cy.visit('/')`)
   - Acesso via menu: `NfceDownloadXmlPage.acessarViaMenu()`

2. **Validação:**
   - Valida URL contém `/nfce/download-xml`
   - Valida título "Download do XML" visível
   - Valida todos os campos do formulário visíveis (período, número nota, chave de acesso)
   - Valida botão Download visível

#### `it('Deve preencher o formulário de download')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação (mesmo processo do teste anterior)

2. **Preenchimento:**
   - Preenche período: `01/2026 - 01/2026`
   - Preenche número da nota: `1`

3. **Validação:**
   - Valida que os campos foram preenchidos corretamente

#### `it('Deve fazer download do XML definindo período dos últimos 30 dias')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação (mesmo processo dos testes anteriores)

2. **Cálculo de Período:**
   - Calcula período dos últimos 30 dias dinamicamente
   - Formata como `MM/YYYY - MM/YYYY`

3. **Preenchimento:**
   - Preenche período calculado
   - Fecha datepicker se estiver aberto

4. **Download:**
   - Clica no botão Download
   - Aguarda o download completar

5. **Validação:**
   - Valida que o arquivo `xml-nfce.zip` foi baixado em `cypress/downloads/`
   - Valida que o arquivo não está vazio
   - Valida que é um arquivo ZIP válido (verifica assinatura "PK" nos primeiros bytes)

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Toda interação com a UI está encapsulada em `NfceDownloadXmlPage`
- ✅ **Separate Locators** (ADR-0003): Todos os seletores estão centralizados em `NfceDownloadXmlLocators`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.login()` para funcionalidades fiscais
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas no `describe` para filtragem de testes

### Boas Práticas
- **Priorização de IDs**: Todos os locators usam IDs quando disponíveis (ADR-0015)
- **Validação de URL**: Após navegação, valida URL para garantir que a navegação foi bem-sucedida
- **Validação de elementos**: Valida visibilidade de todos os elementos principais antes de interagir

### Observações
- O teste de download valida que o arquivo foi baixado corretamente verificando o arquivo em `cypress/downloads/xml-nfce.zip`
- O teste valida que o arquivo é um ZIP válido verificando a assinatura "PK" nos primeiros bytes
- O período dos últimos 30 dias é calculado dinamicamente para garantir que sempre use um período válido
- O datepicker é fechado antes de clicar no botão Download para evitar que cubra o botão

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
- [Arquitetura NFC-e Inutilizar](./architecture-nfce-inutilizar.md)

---

**Última atualização:** 2025-01-27  
**Mantido por:** Equipe de Automação

