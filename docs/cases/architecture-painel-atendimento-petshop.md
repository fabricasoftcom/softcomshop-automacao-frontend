# Arquitetura de Testes: Painel de Atendimento (Petshop)

## 1. Objetivo
Validar o acesso e funcionamento do Painel de Atendimento, funcionalidade core do segmento Petshop que gerencia o fluxo de atendimentos e vacinações. Inclui validação de filtros, navegação entre abas, criação de atendimentos e validação de contadores de status.

## 2. Estrutura e Dependências

### Localização
- **Spec:** `cypress/e2e/petshop/painel-atendimento.spec.js`
- **Page Object:** `cypress/support/pages/petshop/PainelAtendimentoPage.js`
- **Locators:** `cypress/support/locators/Petshop/PainelAtendimentoLocators.js`
- **Menu Locators:** `cypress/support/locators/Petshop/MenuLateralPetshopLocators.js`

### Dependências
- **Login:** `cy.loginArmazenandoSessao()` (usuário padrão, não fiscal)
- **Menu:** `MenuPage.js` (base) - para navegação e espera de carregamento

## 3. Estrutura da Página

### Abas Principais
1. **Painel de Atendimentos** (`#painelAtendimentos`)
   - Filtros de atendimento
   - Cards de status (Agendados, Em Espera, Em Atendimento, Concluído)
   - Listagem de atendimentos

2. **Vacinação** (`#vacinacao`)
   - Filtros específicos de vacinação
   - Listagem de vacinações

### Filtros - Aba Painel de Atendimentos
- **Data de Atendimento:** `#filtro_data_atendimento` (daterangepicker)
- **Tipo de Atendimento:** `#auto_filtro_tipo_atendimento_id` (autocomplete)
- **Funcionário:** `#auto_filtro_funcionario_id` (autocomplete)
- **Setor:** `#auto_filtro_setor_id` (autocomplete)
- **Status:** `#filtro_status` (select)
- **Cliente:** `#auto_filtro_cliente_id` (autocomplete)
- **Animal:** `#auto_animal_id` (autocomplete)

### Filtros - Aba Vacinação
- **Pesquisa:** `#pesquisa`
- **Vacina Nome:** `#vacina_nome`
- **Data:** `#data` (daterangepicker)
- **Status:** `#status` (select)
- **Grupo:** `#grupo_` (select)
- **Vacinas:** `#auto_vacinas` (autocomplete)

### Cards de Status
- **Agendados:** Contador de atendimentos agendados
- **Em Espera:** Contador de atendimentos em espera
- **Em Atendimento:** Contador de atendimentos em andamento
- **Concluído:** Contador de atendimentos finalizados

### Botões e Ações
- **Buscar:** `#btn-pesquisar` - Aplica filtros
- **Configurações:** `#btn-configuracoes` - Abre configurações
- **Novo Atendimento:** `#add-atendimento` - Redireciona para pesquisa de animal
- **Pesquisar Animal:** Link no card "Agendados" - Redireciona para `/pesquisar-animal`

## 4. Métodos do Page Object

### Navegação
- `acessar()` - Acessa o Painel de Atendimento via menu lateral
- `acessarAbaVacinacao()` - Navega para aba Vacinação
- `acessarAbaPainelAtendimentos()` - Navega para aba Painel de Atendimentos

### Filtros
- `filtrarPorData(dataInicio, dataFim)` - Filtra por intervalo de datas
- `filtrarPorTipoAtendimento(tipoAtendimento)` - Filtra por tipo (autocomplete)
- `filtrarPorStatus(status)` - Filtra por status (select)
- `filtrarPorFuncionario(funcionario)` - Filtra por funcionário (autocomplete)
- `filtrarPorCliente(cliente)` - Filtra por cliente (autocomplete)
- `aplicarFiltros()` - Aplica os filtros configurados
- `limparFiltros()` - Limpa todos os filtros

### Criação de Atendimento
- `clicarNovoAtendimento()` - Acessa página de pesquisa de animal
- `pesquisarAnimal(nomeAnimal)` - Busca animal no autocomplete
- `clicarAdicionarAnimal()` - Acessa cadastro de novo animal

### Validações
- `validarCarregamento()` - Valida URL e título da página
- `validarAbas()` - Valida presença das abas principais
- `validarContadores()` - Valida presença dos cards de status
- `validarCardStatus(status, quantidadeEsperada)` - Valida card específico e quantidade
- `validarListagemVazia()` - Valida quando não há atendimentos

## 5. Casos de Teste Implementados

1. **Deve acessar o Painel de Atendimento e validar elementos principais**
   - Valida acesso, abas e contadores

2. **Deve filtrar atendimentos por data**
   - Testa filtro de data com intervalo

3. **Deve filtrar atendimentos por status**
   - Testa filtro de status

4. **Deve navegar entre as abas (Painel de Atendimentos e Vacinação)**
   - Valida navegação entre abas

5. **Deve acessar a página de pesquisa de animal**
   - Valida acesso à criação de atendimento

6. **Deve validar contadores de status estão presentes**
   - Valida todos os cards de status

7. **Deve limpar filtros aplicados**
   - Testa funcionalidade de limpar filtros

## 6. Fluxo do Teste

### Teste Básico
1. **Login:** Realiza login no ambiente Petshop
2. **Navegação:** Acessa o menu lateral "Painel de Atendimento"
3. **Validação:** Verifica carregamento da página, URL, abas principais e contadores

### Teste com Filtros
1. **Login:** Realiza login
2. **Acesso:** Acessa Painel de Atendimento
3. **Filtro:** Aplica filtros (data, status, etc.)
4. **Validação:** Verifica aplicação dos filtros

### Teste de Criação
1. **Login:** Realiza login
2. **Acesso:** Acessa Painel de Atendimento
3. **Novo Atendimento:** Clica em "Novo Atendimento"
4. **Pesquisa:** Busca animal ou adiciona novo
5. **Validação:** Verifica redirecionamento e formulário

## 7. Padrões Aplicados
- **Page Object Pattern (ADR-0002):** Lógica encapsulada em `PainelAtendimentoPage`
- **Separate Locators (ADR-0003):** Locators centralizados em `PainelAtendimentoLocators.js`
- **Tags (ADR-0010):** `@petshop`, `@regressivo`, `@painel-atendimento`
- **Prioritize IDs (ADR-0015):** Locators priorizam IDs quando disponíveis
- **No Fixed Waits:** Usa validações condicionais ao invés de `cy.wait()` fixos

## 8. Dados de Teste
- Utiliza usuário padrão configurado em `users.json` (não fiscal)
- Filtros podem ser parametrizados via fixtures se necessário

## 9. Observações Importantes
- **Autocomplete:** Todos os campos de autocomplete têm delay de 1000ms (debounce)
- **Contadores:** Validação usa `.should('exist')` ao invés de `.should('be.visible')` para robustez
- **Cards de Status:** Podem estar em diferentes estados visuais dependendo do conteúdo
- **Pesquisa de Animal:** Página carregada via AJAX, requer espera adequada

## 10. Referências
- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0010: Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md)
- [ADR-0015: Prioritize IDs and Context](../adr/0015-prioritize-ids-and-context-in-locators.md)

