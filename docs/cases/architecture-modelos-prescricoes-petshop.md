# Arquitetura de Testes: Modelos de Prescrições (Petshop)

## 1. Objetivo
Validar o acesso e funcionamento do cadastro de Modelos de Prescrições, funcionalidade auxiliar para agilizar atendimentos veterinários. Inclui validação de listagem, filtros, cadastro e edição de modelos de prescrições.

## 2. Estrutura e Dependências

### Localização
- **Spec:** `cypress/e2e/petshop/modelos-prescricoes.spec.js`
- **Page Object:** `cypress/support/pages/petshop/ModelosPrescricoesPage.js`
- **Locators:** `cypress/support/locators/Petshop/ModelosPrescricoesLocators.js`
- **Menu Locators:** `cypress/support/locators/Petshop/MenuLateralPetshopLocators.js`

### Dependências
- **Login:** `cy.loginArmazenandoSessao()` (usuário padrão, não fiscal)
- **Menu:** `MenuPage.js` (base) - para navegação e espera de carregamento

## 3. Estrutura da Página

### Listagem (`/prescricao`)
- **Título:** "Listagem de Modelos de Prescrições" (ou similar)
- **Filtros:**
  - **Descrição:** Campo de texto (pode estar oculto)
  - **Status:** Select (pode não estar disponível)
- **Botões:**
  - **Pesquisar:** Botão para aplicar filtros (pode não estar disponível)
  - **Novo Cadastro:** Link para `/prescricao/novo` ou `/prescricao/cadastro`
- **Tabela:** Listagem de modelos de prescrições
- **Ações:** Link de edição em cada linha

### Cadastro (`/prescricao/novo` ou `/prescricao/{id}/editar`)
- **Título:** "Cadastro de Modelos de Prescrições" (ou similar)
- **Campos:**
  - **Descrição:** Campo de texto
  - **Conteúdo:** Textarea para o conteúdo do modelo
  - **Desativar:** Checkbox (opcional)
- **Botões:**
  - **Salvar:** Botão para salvar o cadastro
  - **Voltar:** Link para retornar à listagem

## 4. Métodos do Page Object

### Navegação
- `acessar()` - Acessa a listagem de Modelos de Prescrições via menu lateral
- `clicarNovoCadastro()` - Acessa página de cadastro
- `clicarVoltar()` - Volta da página de cadastro para listagem
- `clicarEditar(linhaIndex)` - Acessa edição de um modelo específico

### Filtros - Listagem
- `filtrarPorDescricao(descricao)` - Filtra por descrição (verifica se campo existe)
- `filtrarPorStatus(status)` - Filtra por status (verifica se campo existe)
- `aplicarFiltros()` - Aplica os filtros configurados (verifica se botão existe)

### Cadastro
- `preencherDescricao(descricao)` - Preenche campo descrição (verifica se campo existe)
- `preencherConteudo(conteudo)` - Preenche campo conteúdo (verifica se campo existe)
- `marcarDesativar()` / `desmarcarDesativar()` - Controla checkbox desativar
- `salvar()` - Salva o cadastro

### Validações
- `validarCarregamento()` - Valida URL e carregamento da página
- `validarPresencaTabela()` - Valida presença da tabela
- `validarListagemVazia()` - Valida mensagem de sem resultados
- `validarCadastroCarregado()` - Valida carregamento da página de cadastro

## 5. Casos de Teste Implementados

1. **Deve acessar a tela de listagem de Modelos de Prescrições**
   - Valida acesso, tabela e estrutura

2. **Deve filtrar modelos de prescrições por descrição**
   - Testa filtro de descrição (se disponível)

3. **Deve filtrar modelos de prescrições por status**
   - Testa filtro de status (se disponível)

4. **Deve acessar a página de cadastro de modelo de prescrição**
   - Valida navegação para cadastro (se botão disponível)

5. **Deve preencher formulário de cadastro de modelo de prescrição**
   - Testa preenchimento de campos (se disponíveis)

6. **Deve voltar da página de cadastro para listagem**
   - Valida navegação de retorno

7. **Deve validar estrutura da tabela de listagem**
   - Valida tabela e presença de dados ou mensagem de sem resultados

## 6. Fluxo do Teste

### Teste Básico
1. **Login:** Realiza login no ambiente Petshop
2. **Navegação:** Expande menu "Serviços e NFS-e" > "CADASTROS" > "Modelos de Prescrições"
3. **Validação:** Verifica carregamento da página, URL, tabela e estrutura

### Teste com Filtros
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Modelos de Prescrições
3. **Filtro:** Aplica filtros (se disponíveis)
4. **Validação:** Verifica aplicação dos filtros

### Teste de Cadastro
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Modelos de Prescrições
3. **Novo Cadastro:** Clica em "Novo Cadastro" (se disponível)
4. **Preenchimento:** Preenche campos (se disponíveis)
5. **Validação:** Verifica que campos foram preenchidos corretamente

## 7. Padrões Aplicados
- **Page Object Pattern (ADR-0002):** Lógica encapsulada em `ModelosPrescricoesPage`
- **Separate Locators (ADR-0003):** Locators centralizados em `ModelosPrescricoesLocators.js`
- **Tags (ADR-0010):** `@petshop`, `@regressivo`, `@prescricoes`
- **Prioritize IDs (ADR-0015):** Locators priorizam IDs quando disponíveis
- **No Fixed Waits:** Usa validações condicionais ao invés de `cy.wait()` fixos
- **Robustez:** Métodos verificam existência de elementos antes de interagir

## 8. Dados de Teste
- Utiliza usuário padrão configurado em `users.json` (não fiscal)
- Descrições e conteúdos são mockados para testes

## 9. Observações Importantes
- **URL:** A rota correta é `/prescricao` (singular)
- **Menu Aninhado:** Requer expansão do menu "Serviços e NFS-e" > "CADASTROS" antes de acessar
- **Elementos Opcionais:** Alguns elementos (filtros, botões) podem não estar disponíveis na página
- **Robustez:** Testes verificam existência de elementos antes de interagir, tornando-os resilientes a mudanças na interface
- **Flexibilidade:** Métodos são adaptativos e funcionam mesmo quando alguns elementos não estão presentes

## 10. Referências
- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0010: Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md)
- [ADR-0015: Prioritize IDs and Context](../adr/0015-prioritize-ids-and-context-in-locators.md)

