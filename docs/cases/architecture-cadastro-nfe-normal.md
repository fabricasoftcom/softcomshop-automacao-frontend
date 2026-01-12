# Arquitetura dos casos de teste: Cadastro NFe Normal

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de NFe Normal**, que valida o processo completo de criação de Notas Fiscais Eletrônicas do tipo Normal no sistema, incluindo diferentes tipos de origem (Avulsa, Venda, NFCe e Movimentação).

**Funcionalidades cobertas:**
- Cadastro de NFe Normal tipo Avulsa
- Cadastro de NFe Normal tipo Venda
- Cadastro de NFe Normal tipo NFCe
- Cadastro de NFe Normal tipo Movimentação
- Validação de formulários específicos por tipo
- Fluxo completo de emissão para cada tipo

**Cenários principais:**
- Abrir formulário de NFe Normal avulsa após continuar
- Preencher e emitir NFe Normal avulsa completa
- Abrir formulário de NFe Normal venda após pesquisar e selecionar
- Realizar fluxo completo da NFe Normal venda
- Abrir formulário de NFe Normal NFCe após pesquisar e selecionar
- Realizar fluxo completo da NFe Normal NFCe
- Abrir formulário de NFe Normal movimentação após pesquisar e selecionar
- Realizar fluxo completo da NFe Normal movimentação

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/venda-nfcenfe/cadastro-nfe-normal.spec.js` - Teste de cadastro de NFe Normal

### Page Objects
- `cypress/support/pages/Venda/ListagemNfePage.js` - Navegação e acesso à listagem de NFe
- `cypress/support/pages/Venda/CadastroNfePage.js` - Métodos gerais de cadastro de NFe
- `cypress/support/pages/Venda/NFe/Normal/index.js` - Facade que agrupa todas as classes específicas de NFe Normal (Page Object Hierarchy - ADR-0008)

### Page Objects Específicos (Hierarquia)
- `cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalBasePage.js` - Classe base para NFe Normal
- `cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalAvulsaPage.js` - Métodos específicos para NFe Normal Avulsa
- `cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalVendaPage.js` - Métodos específicos para NFe Normal Venda
- `cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalNfcePage.js` - Métodos específicos para NFe Normal NFCe
- `cypress/support/pages/Venda/NFe/Normal/CadastroNfeNormalMovimentacaoPage.js` - Métodos específicos para NFe Normal Movimentação

### Locators
- `cypress/support/locators/Venda/CadastroNfeLocators.js` - Seletores do cadastro de NFe

---

## Imports e dependências

### Page Objects
```javascript
import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/Normal';
```

### Locators
Os locators são importados internamente nos Page Objects:
```javascript
import CadastroNfeLocators from "../../locators/Venda/CadastroNfeLocators";
```

### Commands
- `cy.login()` - Login com usuário fiscal (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial

### Intercepts (Conditional - ADR-0011)
- `POST **/nfe2/salvar*` - Salvamento de destinatário (aguardado antes de continuar, com lógica condicional)
- `GET **/nfe2/**/itens*` - Carregamento da tela de itens (com flag condicional)
- `POST **/nfe2/**/itens/salvar` - Inserção de item (com intercept condicional)
- `POST **/nfe2/**/pagamentos/salvar` - Modal de pagamento

---

## Estrutura do teste

### Suite: Cadastro NFe Normal

**Tags:** `['@nfe', '@vendas', '@regressivo', '@nfe-normal']` (ADR-0010)

#### `it('abre formulario de NFe normal avulsa apos continuar')`

**Fluxo completo:**
1. **Acesso:**
   - Desabilita tour da finalidade Normal
   - Visita listagem de NFe
   - Clica em novo cadastro
   - Avança para cadastro Normal Avulsa

2. **Validação:**
   - Valida formulário de NFe Normal Avulsa

---

#### `it('preenche formulario com natureza e destinatario na NFe normal avulsa')`

**Fluxo completo:**
1. **Acesso:**
   - Avança para cadastro Normal Avulsa

2. **Preenchimento:**
   - Preenche natureza (CFOP 5102)
   - Preenche destinatário via autocomplete

3. **Itens:**
   - Valida tela de seleção de itens
   - Adiciona item (quantidade 1)

4. **Pagamentos:**
   - Valida tela de pagamentos
   - Adiciona pagamento básico

5. **Emissão:**
   - Clica em continuar no rodapé
   - Valida tela de emitir nota
   - Emite a nota
   - Valida modal de sucesso (retorno para listagem)

---

#### `it('abre formulario de NFe normal venda apos pesquisar e selecionar')`

**Fluxo completo:**
1. **Acesso:**
   - Avança para cadastro Normal Venda
   - Pesquisa vendas disponíveis
   - Seleciona venda com cliente diferente de "CONSUMIDOR"

2. **Validação:**
   - Valida formulário de NFe Normal Venda carregado

---

#### `it('realiza fluxo completo da NFe normal venda')`

**Fluxo completo:**
1. **Acesso:**
   - Avança para cadastro Normal Venda
   - Pesquisa e seleciona venda

2. **Emissão:**
   - Realiza fluxo completo (natureza, itens, pagamentos, emissão)
   - Valida modal de sucesso (retorno para listagem)

---

#### `it('abre formulario de NFe normal NFCe apos pesquisar e selecionar')`

**Fluxo completo:**
1. **Acesso:**
   - Avança para cadastro Normal NFCe
   - Pesquisa NFCes disponíveis
   - Seleciona primeira NFCe

2. **Validação:**
   - Valida formulário de NFe Normal NFCe carregado

---

#### `it('realiza fluxo completo da NFe normal NFCe')`

**Fluxo completo:**
1. **Acesso:**
   - Avança para cadastro Normal NFCe
   - Pesquisa e seleciona NFCe

2. **Emissão:**
   - Realiza fluxo completo (natureza, itens, pagamentos, emissão)
   - Valida modal de sucesso (retorno para listagem)

---

#### `it('abre formulario de NFe normal movimentacao apos pesquisar e selecionar')`

**Fluxo completo:**
1. **Acesso:**
   - Avança para cadastro Normal Movimentação
   - Pesquisa movimentações disponíveis
   - Seleciona primeira movimentação

2. **Validação:**
   - Valida formulário de NFe Normal Movimentação carregado

---

#### `it('realiza fluxo completo da NFe normal movimentacao')`

**Fluxo completo:**
1. **Acesso:**
   - Avança para cadastro Normal Movimentação
   - Pesquisa e seleciona movimentação

2. **Itens:**
   - Clica em continuar no rodapé
   - Valida tela de seleção de itens
   - Adiciona item (quantidade 1)

3. **Pagamentos:**
   - Valida tela de pagamentos
   - Clica em continuar no rodapé

4. **Emissão:**
   - Valida tela de emitir nota
   - Emite a nota
   - Valida modal de sucesso (retorno para listagem)

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002)
- ✅ **Separate Locators** (ADR-0003)
- ✅ **Session Persistence** (ADR-0004) - Usa `cy.login()` para funcionalidade fiscal
- ✅ **Page Object Hierarchy** (ADR-0008) - Usa hierarquia de Page Objects para diferentes tipos de NFe Normal
- ✅ **Tags for Filtering** (ADR-0010)
- ✅ **Conditional Intercepts** (ADR-0011) - Intercepts condicionais para evitar timeouts

### Boas Práticas
- Uso de Page Object Hierarchy para organizar métodos específicos por tipo de NFe Normal
- Facade pattern (`index.js`) mantém compatibilidade com código existente
- Validação de formulários específicos para cada tipo de origem
- Tratamento de autocompletes com aguardo de requisições
- Validação de modais de sucesso com opção de retorno

### Observações
- O spec testa 4 tipos diferentes de origem para NFe Normal: Avulsa, Venda, NFCe e Movimentação
- Cada tipo tem métodos específicos no Page Object Hierarchy
- O fluxo completo varia ligeiramente entre os tipos (especialmente Movimentação que tem passo adicional)
- Uso de intercepts condicionais evita timeouts quando requisições já foram feitas

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0008](../adr/0008-use-page-object-hierarchy.md): Page Object Hierarchy
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0011](../adr/0011-use-conditional-intercepts.md): Conditional Intercepts

### Documentação Relacionada
- `docs/cases/architecture-cadastro-nfe.md` - Cadastro de NFe (Geral) (tipo específico de NFe)
- `docs/cases/architecture-listagem-nfe.md` - Listagem de NFe (NFes Normal podem ser listadas)
- `docs/cases/architecture-cancelamento-nfe.md` - Cancelamento de NFe (NFes Normal podem ser canceladas)
- `docs/cases/architecture-carta-correcao-nfe.md` - Carta de Correção NFe (NFes Normal podem receber carta de correção)
- `docs/cases/architecture-cadastro-nfe-dropdown-acoes.md` - Dropdown de Ações NFe (NFes Normal têm dropdown de ações)
- `docs/cases/architecture-cadastro-nfe-ajuste.md` - Cadastro de NFe Ajuste (outro tipo específico)
- `docs/cases/architecture-cadastro-nfe-complementar.md` - Cadastro de NFe Complementar (outro tipo específico)
- `docs/cases/architecture-cadastro-nfe-devolucao.md` - Cadastro de NFe Devolução (outro tipo específico)

---

**Última atualização:** 2024-12-19

