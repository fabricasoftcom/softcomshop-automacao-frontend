# Arquitetura dos casos de teste: Cadastro NFe - Dropdown Mais Ações

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Validação do Dropdown Mais Ações** no cadastro de NFe, que valida todas as opções disponíveis no dropdown de ações adicionais após a emissão de uma NFe.

**Funcionalidades cobertas:**
- Validação de todas as opções do dropdown "Mais Ações"
- Validação de Download XML
- Validação de Visualizar DANFE
- Validação de Enviar Email
- Validação de Clonar NFe

**Cenários principais:**
- Validar que todas as opções do dropdown estão visíveis
- Validar cada opção individual do dropdown

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/venda-nfcenfe/cadastro-nfe.spec.js` - Teste de validações do dropdown Mais Ações

### Page Objects
- `cypress/support/pages/Venda/ListagemNfePage.js` - Navegação e acesso à listagem de NFe
- `cypress/support/pages/Venda/CadastroNfePage.js` - Métodos gerais de cadastro de NFe
- `cypress/support/pages/Venda/NFe/Normal/index.js` - Métodos para NFe Normal
- `cypress/support/pages/Venda/NFe/CadastroNfeBasePage.js` - Métodos comuns incluindo validações do dropdown

### Locators
- `cypress/support/locators/Venda/CadastroNfeLocators.js` - Seletores do cadastro de NFe e dropdown

---

## Imports e dependências

### Page Objects
```javascript
import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/Normal';
import CadastroNfeBasePage from '../../support/pages/Venda/NFe/CadastroNfeBasePage';
```

### Instanciação
```javascript
const cadastroNfeBasePage = new CadastroNfeBasePage();
```

### Locators
Os locators são importados internamente nos Page Objects:
```javascript
import CadastroNfeLocators from "../../locators/Venda/CadastroNfeLocators";
```

### Commands
- `cy.login()` - Login com usuário fiscal (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Cadastro NFe - Validações Dropdown Mais Ações

**Tags:** `['@nfe', '@vendas', '@regressivo', '@nfe-geral', '@dropdown-acoes']` (ADR-0010)

#### `before()` - Setup Inicial

**Fluxo completo:**
1. **Login e Acesso:**
   - Realiza login com usuário fiscal
   - Visita página inicial
   - Desabilita tour da finalidade Normal
   - Visita listagem de NFe
   - Clica em novo cadastro

2. **Criação de NFe para Teste:**
   - Avança para cadastro Normal Avulsa
   - Preenche natureza (CFOP 5102)
   - Preenche destinatário ('SOFTCOM TECNOLOGIA')
   - Adiciona item (quantidade 1)
   - Adiciona pagamento básico
   - Emite a nota
   - Valida modal de sucesso (retorno para listagem)

**Objetivo:** Criar uma NFe emitida que será usada para validar o dropdown "Mais Ações" nos testes seguintes.

---

#### `beforeEach()` - Preparação para Cada Teste

**Fluxo completo:**
1. **Acesso:**
   - Realiza login com usuário fiscal
   - Visita página inicial
   - Desabilita tour da finalidade Normal
   - Visita listagem de NFe
   - Aguarda 2 segundos
   - Abre edição da primeira linha (NFe criada no `before`)
   - Aguarda 2 segundos

**Objetivo:** Garantir que cada teste comece na tela de edição de uma NFe emitida.

---

#### `it('valida que todas as opções do dropdown Mais Ações estão visíveis')`

**Fluxo completo:**
1. **Validação:**
   - Valida que todas as opções do dropdown "Mais Ações" estão visíveis
   - Verifica presença de todas as opções esperadas

---

#### `it('valida opção Download XML do dropdown Mais Ações')`

**Fluxo completo:**
1. **Validação:**
   - Valida opção "Download XML" do dropdown
   - Verifica funcionalidade de download

---

#### `it('valida opção Visualizar Danfe do dropdown Mais Ações')`

**Fluxo completo:**
1. **Validação:**
   - Valida opção "Visualizar DANFE" do dropdown
   - Verifica abertura da visualização do DANFE

---

#### `it('valida opção Enviar email do dropdown Mais Ações')`

**Fluxo completo:**
1. **Validação:**
   - Valida opção "Enviar Email" do dropdown
   - Verifica funcionalidade de envio de email

---

#### `it('valida opção Clonar NFe do dropdown Mais Ações')`

**Fluxo completo:**
1. **Validação:**
   - Valida opção "Clonar NFe" do dropdown
   - Verifica funcionalidade de clonagem

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002)
- ✅ **Separate Locators** (ADR-0003)
- ✅ **Session Persistence** (ADR-0004) - Usa `cy.login()` para funcionalidade fiscal
- ✅ **Tags for Filtering** (ADR-0010)

### Boas Práticas
- Uso de `before()` para criar uma NFe que será usada em todos os testes
- Uso de `beforeEach()` para garantir estado consistente antes de cada teste
- Validação individual de cada opção do dropdown
- Métodos específicos no `CadastroNfeBasePage` para cada validação
- Aguardas explícitas (`cy.wait()`) para garantir carregamento completo

### Observações
- Este spec foca especificamente nas validações do dropdown "Mais Ações"
- Requer uma NFe já emitida para funcionar (criada no `before`)
- Cada teste valida uma opção específica do dropdown
- Os testes comentados no início do arquivo são validações gerais que podem ser ativadas no futuro

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering

### Documentação Relacionada
- `architecture-cadastro-nfe.md` - Documentação geral de cadastro de NFe
- `architecture-cadastro-nfe-normal.md` - Documentação de NFe Normal
- `architecture-listagem-nfe.md` - Documentação de listagem de NFe

---

**Última atualização:** 2024-12-19

