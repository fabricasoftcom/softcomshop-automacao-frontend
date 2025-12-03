# Arquitetura dos casos de teste: Before Config Padrão

## Objetivo

Este documento descreve a arquitetura do teste de **Configuração Padrão do Sistema**, que valida a configuração inicial do sistema antes da execução dos demais testes.

**Funcionalidades cobertas:**
- Configuração padrão do sistema com NFSe
- Ativação de módulos necessários
- Configuração de segmento

**Cenários principais:**
- Configurar sistema padrão com NFSe antes de todos os testes

**Importante:** Este é um teste de setup que deve ser executado antes de todos os outros testes. Está configurado no `specPattern` como primeiro arquivo.

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/setup/_beforeConfigPadrao.spec.js` - Teste de configuração padrão

### Commands
- `cypress/support/commands.js` - Comando `cy.setupSistemaPadrao()` que realiza a configuração

---

## Imports e dependências

### Commands
```javascript
cy.setupSistemaPadrao();
```

Este comando customizado realiza:
1. Login com `cy.loginArmazenandoSessao()`
2. Visita página inicial
3. Fecha alertas se existirem
4. Acessa menu "Configurações" > "Módulos"
5. Configura segmento para "PADRÃO"
6. Ativa/desativa módulos necessários:
   - Venda (módulo 14) - Ativa
   - NFe (módulo 6) - Ativa
   - SPED (módulo 15) - Ativa
   - MDfe (módulo 16) - Desativa
   - Compra (módulo 18) - Ativa
   - E outros módulos conforme necessário

---

## Estrutura do teste

### Suite: _beforeAll

#### `describe('cypress setup')`

**Tags:** `['@before', '@regressivo']` (ADR-0010)

**Hook:**
- `before(function() { ... })` - Executa uma vez antes de todos os testes

**Teste:**
- `it('Configurar sistema Padrao com NFSe')` - Teste placeholder que apenas registra log
  - Este teste existe apenas para garantir que o hook `before` seja executado
  - Registra log: "Modulos configurados com sucesso."

---

## Padrões e boas práticas

### Hook Before Global
- Uso de `before()` ao invés de `beforeEach()` para executar apenas uma vez
- Execução antes de todos os testes do arquivo

### Comando Customizado
- Encapsulamento da lógica de configuração em comando customizado
- Reutilização em outros contextos se necessário

### Teste Placeholder
- Teste mínimo necessário para garantir execução do hook
- Comentário explica a importância do teste

### Ordem de Execução
- Arquivo configurado como primeiro no `specPattern` em `cypress.config.js`
- Garante que configuração seja feita antes de outros testes

### Tags aplicadas
- `@before` - Identifica teste de setup
- `@regressivo` - Tipo de teste

---

## Comando Customizado

### cy.setupSistemaPadrao()

**Localização:** `cypress/support/commands.js`

**Funcionalidades:**
1. **Login:**
   - `cy.loginArmazenandoSessao()` - Login com usuário padrão

2. **Navegação:**
   - `cy.visit('/')` - Visita página inicial

3. **Fechamento de Alertas:**
   - Verifica se existe alerta SweetAlert
   - Clica em "OK" se existir

4. **Acesso a Configurações:**
   - `cy.expandirClicarMenuUmNivel('Configurações', '#módulos')` - Acessa módulos

5. **Configuração de Segmento:**
   - Seleciona segmento "PADRÃO" se não estiver selecionado

6. **Ativação/Desativação de Módulos:**
   - Verifica estado atual de cada módulo
   - Ativa/desativa conforme necessário
   - Módulos configurados:
     - Venda (módulo 14) - Ativa
     - NFe (módulo 6) - Ativa
     - SPED (módulo 15) - Ativa
     - MDfe (módulo 16) - Desativa
     - Compra (módulo 18) - Ativa
     - E outros conforme necessário

---

## Referências

### ADRs relacionadas
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `cypress.config.js` - Configuração do specPattern
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Este é um teste de setup que deve ser executado primeiro
- Configurado no `specPattern` como primeiro arquivo: `"./cypress/e2e/setup/_beforeConfigPadrao.spec.js"`
- Usa `before()` ao invés de `beforeEach()` para executar apenas uma vez
- Teste placeholder existe apenas para garantir execução do hook
- Comando customizado encapsula toda a lógica de configuração
- Configuração garante que módulos necessários estejam ativos para outros testes

---

## Ordem de Execução

```
1. _beforeConfigPadrao.spec.js (Setup)
    ↓
2. Demais testes do specPattern
```

---

## Módulos Configurados

| Módulo | ID | Estado | Descrição |
|--------|----|----|-----------|
| Venda | 14 | Ativa | Módulo de vendas |
| NFe | 6 | Ativa | Nota Fiscal Eletrônica |
| SPED | 15 | Ativa | Sistema Público de Escrituração Digital |
| MDfe | 16 | Desativa | Manifesto de Documentos Fiscais Eletrônicos |
| Compra | 18 | Ativa | Módulo de compras |

---

**Última atualização:** 2024-12-19

