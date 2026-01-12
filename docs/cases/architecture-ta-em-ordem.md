# Arquitetura dos casos de teste: Tá em ordem - Dashboard

## Objetivo

Validar a funcionalidade do dashboard "Tá em ordem", incluindo:
- Exibição correta da tela e elementos principais
- Funcionamento dos comboboxes de filtro (Venda de Hoje, Ticket Médio, Ranking de Produtos)
- Exibição dos cards de informações (totalizadores)
- Exibição da tabela de ranking de produtos
- Presença e funcionalidade dos links de ação rápida
- Exibição das seções de gráficos

**Funcionalidades cobertas:**
- Dashboard principal com informações de vendas
- Filtros dinâmicos (Venda de Hoje, Ticket Médio, Ranking de Produtos)
- Cards de totalizadores (Venda do mês, Cancelados mês, Pedidos hoje, Pedido mês)
- Tabela de ranking de produtos
- Links de ação rápida (Nova venda, Nova Compra, Emitir NF-e, Cadastrar cliente)
- Seções de gráficos (Vendas por horário, Vendas por dia da semana, Forma de pagamento, Evolução Receita, Vendas por dia do mês, Origem da venda)

**Cenários principais:**
- Exibição da tela e validação de elementos principais
- Validação de todos os comboboxes de filtro
- Validação de opções disponíveis nos comboboxes
- Alteração do filtro de ranking e validação de atualização da tabela
- Validação de cards de informações (totalizadores) e seus valores
- Validação da tabela de ranking de produtos (estrutura e colunas)
- Validação de links de ação rápida (visibilidade e URLs)
- Validação de seções de gráficos

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/ta-em-ordem.spec.js` - Testes do dashboard "Tá em ordem"

### Page Objects
- `cypress/support/pages/TaEmOrdem/TaEmOrdemPage.js` - Métodos de interação com o dashboard

### Locators
- `cypress/support/locators/TaEmOrdem/TaEmOrdemLocators.js` - Seletores da tela do dashboard

### Menu Navigation
- `cypress/support/pages/menulateral/menulateraltaemordempage.js` - Navegação via menu "Tá em ordem"

---

## Imports e dependências

### Page Objects
```javascript
import TaEmOrdemPage from '../support/pages/TaEmOrdem/TaEmOrdemPage';
```

### Locators
- `TaEmOrdemLocators` - Contém todos os seletores do dashboard (comboboxes, tabela, links, seções)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Menu Navigation
- `MenulateralTaeMordemPage.acessarTaEmOrdem()` - Navegação via menu "Tá em ordem"

---

## Estrutura do teste

### Suite: Tá em ordem - Dashboard

**Tags:** `['@dashboard', '@ta-em-ordem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir a tela Tá em ordem corretamente')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `TaEmOrdemPage.acessarTela()` para navegar até o dashboard
   - Valida que a URL contém `/ta-em-ordem`
   - Valida que a tela foi carregada corretamente

2. **Validações:**
   - Valida que o título "Ta em ordem" está visível
   - Valida que o campo de data/mês está visível e possui valor

#### `it('deve exibir todos os comboboxes de filtro')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que o combobox "Venda de Hoje" está visível e habilitado
   - Valida que o combobox "Ticket Médio" está visível e habilitado
   - Valida que o combobox "Ranking de Produtos" está visível e habilitado

#### `it('deve validar que os comboboxes possuem opções disponíveis')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que o combobox de Venda de Hoje tem mais de 1 opção
   - Valida que o combobox de Ticket Médio tem mais de 1 opção
   - Valida que o combobox de Ranking tem mais de 1 opção

#### `it('deve exibir os cards de informações (totalizadores)')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que o container de totalizadores está visível
   - Valida que existem cards de totalizadores na tela

#### `it('deve validar que os totalizadores exibem valores')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que o container de totalizadores está visível
   - Valida que existem cards de totalizadores
   - Valida que cada card está visível
   - Valida que cada card contém valores (não está vazio)

#### `it('deve exibir a tabela de ranking de produtos')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que a tabela de ranking está visível
   - Valida que a tabela possui cabeçalho (thead)
   - Valida que a tabela possui corpo (tbody)
   - Valida que a tabela possui dados (linhas)

#### `it('deve validar estrutura da tabela de ranking (colunas)')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que a tabela está visível
   - Valida que o cabeçalho (thead) está visível
   - Valida que o corpo (tbody) está visível
   - Valida que o cabeçalho contém a coluna "Margem de Lucro"
   - Valida que o cabeçalho contém a coluna "Valor Venda"

#### `it('deve exibir todos os links de ação rápida')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que o link "Nova venda" está visível e contém o texto correto
   - Valida que o link "Nova Compra" está visível e contém o texto correto
   - Valida que o link "Emitir NF-e" está visível e contém o texto correto
   - Valida que o link "Cadastrar cliente" está visível e contém o texto correto

#### `it('deve validar URLs dos links de ação rápida')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que o link "Nova venda" possui href correto (`/vendas/novo`)
   - Valida que o link "Nova Compra" possui href correto (`/compra/novo`)
   - Valida que o link "Emitir NF-e" possui href correto (`/nfe2/novo`)
   - Valida que o link "Cadastrar cliente" possui href correto (`/cadastro/cliente/novo`)

#### `it('deve exibir todas as seções de gráficos')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validações:**
   - Valida que a seção "Vendas por horário" está visível
   - Valida que a seção "Vendas por dia da semana" está visível
   - Valida que a seção "Forma de pagamento" está visível
   - Valida que a seção "Evolução Receita" está visível
   - Valida que a seção "VENDAS POR DIA DO MÊS" está visível
   - Valida que a seção "Origem da venda" está visível

#### `it('deve validar alteração do filtro de ranking e atualização da tabela')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela do dashboard

2. **Validação inicial:**
   - Valida que o combobox de ranking está habilitado (não desabilitado)

3. **Alteração para MARGEM DE LUCRO:**
   - Seleciona opção "RANKING DE PRODUTOS - MARGEM DE LUCRO"
   - Aguarda possível atualização (2 segundos)
   - Valida que a tabela ainda possui dados
   - Valida que o valor do select foi alterado para "MARGEM"

4. **Retorno para VALOR VENDA:**
   - Seleciona opção "RANKING DE PRODUTOS - VALOR VENDA"
   - Aguarda possível atualização (2 segundos)
   - Valida que a tabela ainda possui dados
   - Valida que o valor do select foi alterado para "VALOR"

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Todos os métodos de interação estão encapsulados no Page Object
- ✅ **Separate Locators** (ADR-0003): Todos os seletores estão centralizados em arquivo de Locators
- ✅ **Session Persistence** (ADR-0004): Usa `cy.loginArmazenandoSessao()` para login persistente (não é funcionalidade fiscal)
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas para filtragem de testes (`@dashboard`, `@ta-em-ordem`, `@regressivo`)

### Boas Práticas
- **Validações Assertivas**: Todos os testes usam validações assertivas (`.should()`) em vez de waits fixos
- **Encapsulamento**: Toda a lógica de interação está no Page Object, specs apenas orquestram os testes
- **Seletores por ID**: Priorização de seletores por ID quando disponíveis (ADR-0015)
- **Validações Granulares**: Cada teste valida um aspecto específico do dashboard

### Observações
- **Tela de Dashboard**: Esta é uma tela de visualização/dashboard, não possui formulários de cadastro ou edição
- **Dados Dinâmicos**: Os dados exibidos são dinâmicos e dependem do ambiente/teste
- **Gráficos**: As seções de gráficos são validadas pela presença do texto, não pela renderização visual dos gráficos
- **Comboboxes**: Os comboboxes de "Venda de Hoje" e "Ticket Médio" estão desabilitados na tela. Apenas o combobox de "Ranking de Produtos" está habilitado e pode ser alterado, validando que a tabela mantém dados após a alteração
- **Alteração de Ranking**: O teste valida que ao alterar o filtro de ranking, a tabela mantém dados e o valor do select é atualizado corretamente

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação Relacionada
- [Menu Lateral - Tá em ordem](../../cypress/support/pages/menulateral/menulateraltaemordempage.js)

---

**Última atualização:** 2024-12-29  
**Total de testes:** 11  
**Mantido por:** Equipe de Automação

