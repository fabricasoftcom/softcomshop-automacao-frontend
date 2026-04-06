# Arquitetura de Testes: Cadastro de Atestados e Termos (Petshop)

## 1. Objetivo
Validar o acesso e funcionamento do Cadastro de Atestados e Termos, funcionalidade para gestão de documentos veterinários padronizados. Inclui validação de listagem, filtros, cadastro e edição de atestados e termos.

## 2. Estrutura e Dependências

### Localização
- **Spec:** `cypress/e2e/petshop/atestados-termos.spec.js`
- **Page Object:** `cypress/support/pages/petshop/AtestadosTermosPage.js`
- **Locators:** `cypress/support/locators/Petshop/AtestadosTermosLocators.js`
- **Menu Locators:** `cypress/support/locators/Petshop/MenuLateralPetshopLocators.js`

### Dependências
- **Login:** `cy.loginArmazenandoSessao()` (usuário padrão, não fiscal)
- **Menu:** `MenuPage.js` (base) - para navegação e espera de carregamento

## 3. Estrutura da Página

### Listagem (`/atestados-termos`)
- **Título:** "Listagem de Atestados e Termos" (ou similar)
- **Filtros:**
  - **Descrição:** Campo de texto (pode estar oculto)
  - **Tipo:** Select (Atestado/Termo) - pode não estar disponível
  - **Status:** Select (pode não estar disponível)
- **Botões:**
  - **Pesquisar:** Botão para aplicar filtros (pode não estar disponível)
  - **Novo Cadastro:** Link para `/atestados-termos/novo` ou `/atestados-termos/cadastro`
- **Tabela:** Listagem de atestados e termos
- **Ações:** Link de edição em cada linha

### Cadastro (`/atestados-termos/novo` ou `/atestados-termos/{id}/editar`)
- **Título:** "Cadastro de Atestados e Termos" (ou similar)
- **Campos:**
  - **Descrição:** Campo de texto
  - **Tipo:** Select (Atestado/Termo)
  - **Conteúdo:** Textarea para o conteúdo do documento
  - **Desativar:** Checkbox (opcional)
- **Botões:**
  - **Salvar:** Botão para salvar o cadastro
  - **Voltar:** Link para retornar à listagem

## 4. Métodos do Page Object

### Navegação
- `acessar()` - Acessa a listagem de Atestados e Termos via menu lateral
- `clicarNovoCadastro()` - Acessa página de cadastro
- `tentarClicarNovoCadastro()` - Clica em novo cadastro se o botão existir (não falha se ausente)
- `clicarVoltar()` / `tentarClicarVoltar()` - Volta da página de cadastro/edição para listagem
- `clicarEditar(linhaIndex)` - Acessa edição de um documento específico
- `tentarClicarEditar(linhaIndex)` - Clica em editar na linha se existir (não falha se tabela vazia)

### Filtros - Listagem
- `filtrarPorDescricao(descricao)` - Filtra por descrição (verifica se campo existe)
- `filtrarPorTipo(tipo)` - Filtra por tipo (verifica se campo existe e opções disponíveis)
- `filtrarPorStatus(status)` - Filtra por status (verifica se campo existe)
- `aplicarFiltros()` - Aplica os filtros configurados (verifica se botão existe)

### Cadastro
- `preencherDescricao(descricao)` - Preenche campo descrição (verifica se campo existe)
- `selecionarTipo(tipo)` - Seleciona tipo (verifica se campo existe)
- `preencherConteudo(conteudo)` - Preenche campo conteúdo (verifica se campo existe)
- `marcarDesativar()` / `desmarcarDesativar()` - Controla checkbox desativar
- `salvar()` - Salva o cadastro

### Validações
- `validarCarregamento()` - Valida URL e carregamento da página
- `validarPresencaTabela()` - Valida presença da tabela
- `validarListagemVazia()` - Valida mensagem de sem resultados
- `validarCadastroCarregado()` - Valida carregamento da página de cadastro
- `validarSucessoAposSalvar()` - Valida toast de sucesso (se existir) e redirecionamento para listagem

## 5. Casos de Teste Implementados

1. **Deve acessar a tela de listagem de Atestados e Termos**
   - Valida acesso, tabela e estrutura

2. **Deve filtrar atestados e termos por descrição**
   - Testa filtro de descrição (se disponível)

3. **Deve filtrar atestados e termos por tipo**
   - Testa filtro de tipo (se disponível, seleciona primeira opção válida)

4. **Deve filtrar atestados e termos por status**
   - Testa filtro de status (se disponível)

5. **Deve acessar a página de cadastro de atestado/termo**
   - Valida navegação para cadastro (se botão disponível)

6. **Deve preencher formulário de cadastro de atestado/termo**
   - Testa preenchimento de campos (se disponíveis)

7. **Deve criar novo atestado/termo com sucesso**
   - Preenche formulário, salva e valida sucesso (toast ou URL/listagem)

8. **Deve voltar da página de cadastro para listagem**
   - Valida navegação de retorno

9. **Deve validar estrutura da tabela de listagem**
   - Valida tabela e presença de dados ou mensagem de sem resultados

10. **Deve acessar a página de edição de atestado/termo**
    - Valida navegação para edição (se houver registro na listagem)

11. **Deve alterar atestado/termo existente e salvar**
    - Abre edição, altera descrição, salva e valida sucesso

12. **Deve voltar da página de edição para listagem**
    - Valida navegação de retorno da edição

## 6. Fluxo do Teste

### Teste Básico
1. **Login:** Realiza login no ambiente Petshop
2. **Navegação:** Expande menu "Serviços e NFS-e" > "CADASTROS" > "Cadastro de Atestados e Termos"
3. **Validação:** Verifica carregamento da página, URL, tabela e estrutura

### Teste com Filtros
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Atestados e Termos
3. **Filtro:** Aplica filtros (se disponíveis)
4. **Validação:** Verifica aplicação dos filtros

### Teste de Cadastro
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Atestados e Termos
3. **Novo Cadastro:** Clica em "Novo Cadastro" (se disponível)
4. **Preenchimento:** Preenche campos (se disponíveis)
5. **Validação:** Verifica que campos foram preenchidos corretamente

## 7. Padrões Aplicados
- **Page Object Pattern (ADR-0002):** Lógica encapsulada em `AtestadosTermosPage`
- **Separate Locators (ADR-0003):** Locators centralizados em `AtestadosTermosLocators.js`
- **Tags (ADR-0010):** `@petshop`, `@regressivo`, `@atestados`
- **Prioritize IDs (ADR-0015):** Locators priorizam IDs quando disponíveis
- **No Fixed Waits:** Usa validações condicionais ao invés de `cy.wait()` fixos
- **Robustez:** Métodos verificam existência de elementos antes de interagir

## 8. Dados de Teste
- Utiliza usuário padrão configurado em `users.json` (não fiscal)
- Descrições e conteúdos são mockados para testes
- Tipos: "Atestado" ou "Termo" (se disponíveis no select)

## 9. Observações Importantes
- **URL:** A rota correta é `/atestados-termos`
- **Menu Aninhado:** Requer expansão do menu "Serviços e NFS-e" > "CADASTROS" antes de acessar
- **Elementos Opcionais:** Alguns elementos (filtros, botões) podem não estar disponíveis na página
- **Robustez:** Testes verificam existência de elementos antes de interagir, tornando-os resilientes a mudanças na interface
- **Flexibilidade:** Métodos são adaptativos e funcionam mesmo quando alguns elementos não estão presentes
- **Seleção de Tipo:** O método `filtrarPorTipo` verifica opções disponíveis antes de selecionar
- **Pós-salvar:** Validação de sucesso usa toast (se existir) ou fallback para URL e presença da tabela. Locator `toastSucesso` em AtestadosTermosLocators.
- **Exclusão:** Não há cenário de exclusão; a aplicação não expõe ação de excluir na listagem/cadastro explorada (escopo apenas criar, editar e listagem).

## 10. Referências
- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0010: Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md)
- [ADR-0015: Prioritize IDs and Context](../adr/0015-prioritize-ids-and-context-in-locators.md)

