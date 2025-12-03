# Arquitetura dos casos de teste: Painel de Atendimento

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Painel de Atendimento**, que valida o processo completo de criação de atendimentos, alteração de status e geração de vendas no contexto de petshop.

**Funcionalidades cobertas:**
- Configuração do painel (gerar atendimento por serviço, registro de tempo)
- Geração de novo atendimento
- Alteração de status para "Em Atendimento"
- Geração de venda a partir de atendimento
- Validação de redirecionamento para vendas

**Cenários principais:**
- Gerar atendimento com diferentes configurações (4 combinações):
  - Gerar atendimento por serviço = não + registro tempo = turno
  - Gerar atendimento por serviço = sim + registro tempo = turno
  - Gerar atendimento por serviço = não + registro tempo = horário
  - Gerar atendimento por serviço = sim + registro tempo = horário
- Alterar status e gerar venda para cada configuração

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/painel-atendimento/painel-atendimento.spec.js` - Teste de painel de atendimento

### Page Objects
- `cypress/support/pages/painel-atendimento/PainelAtendimentoPage.js` - Métodos para painel de atendimento

### Locators
- `cypress/support/locators/PainelAtendimentoLocators.js` - Seletores do painel

### Commands
- `cypress/support/commands.js` - Comando `cy.setupSistemaPetshop()` para configuração

---

## Imports e dependências

### Page Objects
```javascript
import PainelAtendimentoPage from "../../support/pages/painel-atendimento/PainelAtendimentoPage";
```

### Commands
- `cy.setupSistemaPetshop()` - Configura sistema para petshop (hook `before`)
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/petshop/painel-de-atendimento')` - Navegação para painel

---

## Estrutura do teste

### Suite: Testes no Painel de Atendimento

**Tags:** `['@painel-atendimento', '@regressivo']` (ADR-0010)

#### Hook Before

**Fluxo:**
1. Executa `cy.setupSistemaPetshop()` uma vez antes de todos os testes
   - Configura segmento para "PETSHOP"
   - Ativa módulos necessários

#### Hook BeforeEach

**Fluxo:**
1. Login com `cy.loginArmazenandoSessao()`
2. Visita página do painel de atendimento

---

### Suite 1: Gerar atendimento por serviço = não + registro tempo = turno

#### `it('Deve gerar um novo atendimento')`

**Fluxo:**
1. Desmarca checkbox "Gerar atendimento por serviço" (se marcado)
2. Configura registro de tempo para "Turno"
3. Inicia novo atendimento:
   - Clica em "Novo Atendimento"
   - Abre busca de animal
   - Seleciona primeiro resultado
   - Preenche formulário (tipo atendimento, horário/duração, profissional, data, observação)
   - Preenche campos de atendimento (serviço/produto, quantidade)
   - Adiciona item
   - Imprime

---

#### `it('Deve alterar o status para em atendimento e gerar Venda')`

**Fluxo:**
1. Clica no primeiro card da coluna "Agendado"
2. Seleciona status "Em Atendimento"
3. Salva atendimento
4. Clica no primeiro card da coluna "Em Atendimento"
5. Clica na aba "Ordem de Serviço"
6. Gera venda
7. Aguarda 4 segundos
8. Valida que URL contém `/vendas`

---

### Suite 2: Gerar atendimento por serviço = sim + registro tempo = turno

**Fluxo similar à Suite 1, mas:**
- Marca checkbox "Gerar atendimento por serviço" (se desmarcado)

---

### Suite 3: Gerar atendimento por serviço = não + registro tempo = horário

**Fluxo similar à Suite 1, mas:**
- Configura registro de tempo para "Horário"

---

### Suite 4: Gerar atendimento por serviço = sim + registro tempo = horário

**Fluxo similar à Suite 1, mas:**
- Marca checkbox "Gerar atendimento por serviço" (se desmarcado)
- Configura registro de tempo para "Horário"

---

## Padrões e boas práticas

### Setup Específico
- Uso de `cy.setupSistemaPetshop()` para configurar segmento
- Executado uma vez antes de todos os testes (`before`)

### Configuração Condicional
- Verificação de estado antes de alterar (checkbox, select)
- Evita alterações desnecessárias

### Testes Parametrizados
- 4 combinações de configurações testadas
- Cada combinação tem 2 testes (gerar atendimento + gerar venda)

### Waits Explícitos
- Uso de `cy.wait()` em pontos críticos:
  - 5000ms após abrir busca de animal
  - 5000ms após selecionar animal
  - 5000ms após abrir serviço/produto
  - 4000ms após gerar venda

### Validação de Redirecionamento
- Validação de URL após gerar venda
- Garante que foi redirecionado para módulo de vendas

### Tags aplicadas
- `@painel-atendimento` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### PainelAtendimentoPage

**Navegação:**
- `visit()` - Visita página do painel (`/petshop/painel-de-atendimento`)

**Configuração:**
- `configurarPainel()` - Abre configurações do painel
- `marcarCheckboxGerarAtendimentoServicoSeDesmarcado()` - Marca checkbox se desmarcado
- `desmarcarCheckboxGerarAtendimentoServicoSeMarcado()` - Desmarca checkbox se marcado
- `registroTempoTurno()` - Configura registro de tempo para "Turno"
- `registroTempoHorario()` - Configura registro de tempo para "Horário"
- `alterarTipoRegistroTempo(valorDesejado)` - Altera tipo de registro de tempo

**Atendimento:**
- `iniciarNovoAtendimento()` - Inicia novo atendimento completo:
  - Clica em "Novo Atendimento"
  - Abre busca de animal
  - Seleciona primeiro resultado
  - Preenche formulário
  - Preenche campos de atendimento

- `preencherFormularioNovoAtendimento()` - Preenche formulário:
  - Seleciona tipo de atendimento
  - Preenche horário (se necessário)
  - Seleciona duração
  - Seleciona profissional
  - Seleciona data (hoje)
  - Preenche observação
  - Clica em "Próximo"

- `preencherCamposAtendimento()` - Preenche campos:
  - Abre serviço/produto
  - Seleciona primeiro resultado
  - Preenche quantidade aleatória
  - Adiciona item
  - Imprime

**Interação com Cards:**
- `clicarNoPrimeiroCardAgendado()` - Clica no primeiro card da coluna "Agendado"
- `clicarNoPrimeiroCardDaColunaEmAtendimento()` - Clica no primeiro card da coluna "Em Atendimento" (sem badge venda)

**Status e Ações:**
- `selecionarStatus(statusValue)` - Seleciona status no modal
- `salvarAtendimento()` - Salva atendimento
- `clicarAbaOrdemServico()` - Clica na aba "Ordem de Serviço"
- `gerarVenda()` - Gera venda e confirma no popup

**Pesquisa (não usados no teste atual):**
- `pesquisarAtendimentos(data, tipoAtendimento, funcionario, cliente, animal)` - Pesquisa com filtros
- `verificarPainelKanban(status, quantidadeEsperada)` - Verifica painel Kanban
- `filtrarStatus(status)` - Filtra por status
- `filtrarPorData(data)` - Filtra por data
- `fecharModalAtendimento()` - Fecha modal de atendimento

---

## Comando Customizado

### cy.setupSistemaPetshop()

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
   - Seleciona segmento "PETSHOP" se não estiver selecionado

6. **Salvamento:**
   - Clica em "Salvar Módulo"

---

## Locators utilizados

### PainelAtendimentoLocators

**Botões:**
- `btnNovoAtendimento` - Botão novo atendimento
- `btnAbrirBuscaAnimal` - Botão abrir busca animal
- `btnProximo` - Botão próximo
- `botaoAdicionarItem` - Botão adicionar item
- `btnImprimir` - Botão imprimir
- `btnSalvarAtendimento` - Botão salvar atendimento
- `btnGerarVenda` - Botão gerar venda
- `botaoSimPopupConfirmacao` - Botão sim no popup de confirmação
- `btnConfigurar` - Botão configurar

**Campos:**
- `campoHorario` - Campo horário
- `campoDuracao` - Campo duração
- `campoData` - Campo data
- `campoObservacao` - Campo observação
- `campoQuantidade` - Campo quantidade
- `campoStatus` - Campo status

**Seleções:**
- `btnAbrirTipoAtendimento` - Botão abrir tipo atendimento
- `listaResultadoTipoAtendimento` - Lista resultado tipo atendimento
- `btnAbrirProfissional` - Botão abrir profissional
- `listaResultadoProfissional` - Lista resultado profissional
- `btnAbrirservicoProduto` - Botão abrir serviço/produto
- `listaResultadoProduto` - Lista resultado produto

**Cards:**
- `cardKanbanAgendado` - Card Kanban agendado
- `cardKanbanEmAtendimento` - Card Kanban em atendimento

**Abas:**
- `abaOrdemServico` - Aba ordem de serviço

**Checkboxes:**
- `checkboxGerarAtendimentoServico` - Checkbox gerar atendimento por serviço

**Outros:**
- `listaResultadoBuscaAnimal` - Lista resultado busca animal
- `dataHoje` - Data hoje
- `tipoRegistroTempo` - Select tipo registro tempo

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Setup específico para petshop (`cy.setupSistemaPetshop()`)
- Testes parametrizados com 4 combinações de configurações
- Waits explícitos em pontos críticos
- Validação de redirecionamento após gerar venda
- Configuração condicional (verifica estado antes de alterar)
- Geração de quantidade aleatória para itens

---

## Fluxo Completo de Atendimento

```
Setup sistema petshop (before)
    ↓
Login e visitar painel (beforeEach)
    ↓
Configurar painel (gerar atendimento por serviço, registro tempo)
    ↓
Gerar novo atendimento
    ↓
Alterar status para "Em Atendimento"
    ↓
Gerar venda
    ↓
Validar redirecionamento para /vendas
```

---

**Última atualização:** 2024-12-19

