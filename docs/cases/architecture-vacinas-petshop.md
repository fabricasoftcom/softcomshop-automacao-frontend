# Arquitetura de Testes: Vacinas (Petshop)

## 1. Objetivo
Validar o acesso e funcionamento do cadastro de Vacinas, funcionalidade exclusiva do Petshop para gerenciamento de imunização animal. Inclui validação de listagem, filtros, cadastro e edição de vacinas.

## 2. Estrutura e Dependências

### Localização
- **Spec:** `cypress/e2e/petshop/vacinas.spec.js`
- **Page Object:** `cypress/support/pages/petshop/VacinasPage.js`
- **Locators:** `cypress/support/locators/Petshop/VacinasLocators.js`
- **Menu Locators:** `cypress/support/locators/Petshop/MenuLateralPetshopLocators.js`

### Dependências
- **Login:** `cy.loginArmazenandoSessao()` (usuário padrão, não fiscal)
- **Menu:** `MenuPage.js` (base) - para navegação e espera de carregamento

## 3. Estrutura da Página

### Listagem (`/vacinas`)
- **Título:** "Listagem de Vacinas"
- **Filtros:**
  - **Vacina:** `#auto_vacina_id` (autocomplete)
  - **Grupo:** `#grupo` (select: Vacina, Vermifugo, Antiparasitário)
  - **Status:** `#status` (select)
- **Botões:**
  - **Pesquisar:** `#btn-pesquisa-form`
  - **Novo Cadastro:** Link para `/vacinas/cadastro`
- **Tabela:** Listagem de vacinas cadastradas

### Cadastro (`/vacinas/cadastro`)
- **Título:** "Cadastro de Vacinas"
- **Campos:**
  - **Descrição:** `#descricao` (text, obrigatório)
  - **Grupo:** `#grupo` (select, obrigatório: Vacina, Vermifugo, Antiparasitário)
  - **Desativar:** `#switcher_desativar` (checkbox)
  - **Respeitar intervalo de aplicação:** `#switcher_respeitar_intervalo` (checkbox)
  - **Laboratórios:** `#laboratorio_id` (select multiple) + campo de adição
- **Botões:**
  - **Salvar:** `#adicionar`
  - **Voltar:** Link para `/vacinas`
  - **Novo Cadastro:** Link para `/vacinas/cadastro`
  - **Excluir:** `#btn-excluir` (apenas em edição)

## 4. Métodos do Page Object

### Navegação
- `acessar()` - Acessa a listagem de Vacinas via menu lateral
- `clicarNovoCadastro()` - Acessa página de cadastro
- `clicarVoltar()` - Volta da página de cadastro para listagem

### Filtros - Listagem
- `filtrarPorVacina(nomeVacina)` - Filtra por nome (autocomplete)
- `filtrarPorGrupo(grupo)` - Filtra por grupo (select)
- `filtrarPorStatus(status)` - Filtra por status (select)
- `aplicarFiltros()` - Aplica os filtros configurados

### Cadastro
- `preencherDescricao(descricao)` - Preenche campo descrição
- `selecionarGrupo(grupo)` - Seleciona grupo
- `marcarDesativar()` / `desmarcarDesativar()` - Controla checkbox desativar
- `marcarRespeitarIntervalo()` / `desmarcarRespeitarIntervalo()` - Controla checkbox intervalo
- `adicionarLaboratorio(laboratorio)` - Adiciona laboratório à lista
- `salvar()` - Salva o cadastro

### Validações
- `validarCarregamento()` - Valida URL e título da listagem
- `validarListagemVazia()` - Valida mensagem de sem resultados
- `validarPresencaTabela()` - Valida presença da tabela
- `validarCadastroCarregado()` - Valida carregamento da página de cadastro

## 5. Casos de Teste Implementados

1. **Deve acessar a tela de listagem de Vacinas**
   - Valida acesso e presença da tabela

2. **Deve filtrar vacinas por grupo**
   - Testa filtro de grupo

3. **Deve filtrar vacinas por status**
   - Testa filtro de status

4. **Deve acessar a página de cadastro de vacina**
   - Valida navegação para cadastro

5. **Deve preencher formulário de cadastro de vacina**
   - Testa preenchimento de campos obrigatórios e opcionais

6. **Deve voltar da página de cadastro para listagem**
   - Valida navegação de retorno

## 6. Fluxo do Teste

### Teste Básico
1. **Login:** Realiza login no ambiente Petshop
2. **Navegação:** Expande menu "Serviços e NFS-e" > "CADASTROS" > "Vacinas"
3. **Validação:** Verifica carregamento da página, URL e presença da tabela

### Teste com Filtros
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Vacinas
3. **Filtro:** Aplica filtros (grupo, status, etc.)
4. **Validação:** Verifica aplicação dos filtros

### Teste de Cadastro
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Vacinas
3. **Novo Cadastro:** Clica em "Novo Cadastro"
4. **Preenchimento:** Preenche campos obrigatórios
5. **Validação:** Verifica que campos foram preenchidos corretamente

## 7. Padrões Aplicados
- **Page Object Pattern (ADR-0002):** Lógica encapsulada em `VacinasPage`
- **Separate Locators (ADR-0003):** Locators centralizados em `VacinasLocators.js`
- **Tags (ADR-0010):** `@petshop`, `@regressivo`, `@vacinas`
- **Prioritize IDs (ADR-0015):** Locators priorizam IDs quando disponíveis
- **No Fixed Waits:** Usa validações condicionais ao invés de `cy.wait()` fixos

## 8. Dados de Teste
- Utiliza usuário padrão configurado em `users.json` (não fiscal)
- Grupos disponíveis: "Vacina", "Vermifugo", "Antiparasitário"
- Filtros podem ser parametrizados via fixtures se necessário

## 9. Observações Importantes
- **Autocomplete:** Campo de vacina tem delay de 1000ms (debounce)
- **Menu Aninhado:** Requer expansão do menu "Serviços e NFS-e" antes de acessar "Vacinas"
- **Laboratórios:** Campo de múltipla seleção com adição dinâmica
- **Checkboxes:** Usam switchers customizados, requer `{ force: true }` em alguns casos

## 10. Referências
- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0010: Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md)
- [ADR-0015: Prioritize IDs and Context](../adr/0015-prioritize-ids-and-context-in-locators.md)

