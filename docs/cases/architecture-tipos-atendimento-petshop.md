# Arquitetura de Testes: Tipos de Atendimento (Petshop)

## 1. Objetivo
Validar o acesso e funcionamento do cadastro de Tipos de Atendimento, utilizado para categorizar serviços veterinários (consulta, cirurgia, banho e tosa, etc.). Inclui validação de listagem, filtros, cadastro e edição de tipos de atendimento.

## 2. Estrutura e Dependências

### Localização
- **Spec:** `cypress/e2e/petshop/tipos-atendimento.spec.js`
- **Page Object:** `cypress/support/pages/petshop/TiposAtendimentoPage.js`
- **Locators:** `cypress/support/locators/Petshop/TiposAtendimentoLocators.js`
- **Menu Locators:** `cypress/support/locators/Petshop/MenuLateralPetshopLocators.js`

### Dependências
- **Login:** `cy.loginArmazenandoSessao()` (usuário padrão, não fiscal)
- **Menu:** `MenuPage.js` (base) - para navegação e espera de carregamento

## 3. Estrutura da Página

### Listagem (`/tipo-atendimento`)
- **Título:** "Listagem de Tipos de Atendimentos"
- **Filtros:**
  - **Nome:** `#nome` (text)
- **Botões:**
  - **Pesquisar:** `#pesquisar`
  - **Novo Cadastro:** Link para `/tipo-atendimento/novo`
- **Tabela:** Listagem com colunas:
  - **Código:** Ordenável (crescente/decrescente)
  - **Nome:** Nome do tipo de atendimento
  - **Duração:** Duração estimada
  - **Cor:** Cor da etiqueta no Painel de Atendimentos
- **Ações:** Link de edição (ícone) em cada linha

### Cadastro (`/tipo-atendimento/novo` ou `/tipo-atendimento/{id}/editar`)
- **Título:** "Cadastro de Tipos de atendimento"
- **Campos:**
  - **Nome:** `#nome_atendimento` (text, obrigatório)
  - **Duração:** `#duracao` (select: 5 minutos até 12 horas)
  - **Cor:** `#cor` (text, obrigatório - formato hexadecimal)
  - **Desativar:** `#switcher_desativar` (checkbox)
- **Botões:**
  - **Salvar:** `#btn-salvar`
  - **Voltar:** Link para `/tipo-atendimento`
  - **Novo Cadastro:** `#btn-novo` (link para `/tipo-atendimento/novo`)
- **Preview:** Exemplo visual da etiqueta no Painel de Atendimentos

## 4. Métodos do Page Object

### Navegação
- `acessar()` - Acessa a listagem de Tipos de Atendimento via menu lateral
- `clicarNovoCadastro()` - Acessa página de cadastro
- `clicarVoltar()` - Volta da página de cadastro para listagem
- `clicarEditar(linhaIndex)` - Acessa edição de um tipo específico

### Filtros - Listagem
- `filtrarPorNome(nome)` - Filtra por nome
- `aplicarFiltros()` - Aplica os filtros configurados

### Cadastro
- `preencherNome(nome)` - Preenche campo nome
- `selecionarDuracao(duracao)` - Seleciona duração (ex: "1 hora")
- `preencherCor(cor)` - Preenche cor em formato hexadecimal
- `marcarDesativar()` / `desmarcarDesativar()` - Controla checkbox desativar
- `salvar()` - Salva o cadastro

### Validações
- `validarCarregamento()` - Valida URL e carregamento da página
- `validarPresencaTabela()` - Valida presença da tabela
- `validarColunasTabela()` - Valida todas as colunas da tabela
- `validarCadastroCarregado()` - Valida carregamento da página de cadastro
- `validarLinhaNaTabela(nome)` - Valida presença de tipo na tabela

## 5. Casos de Teste Implementados

1. **Deve acessar a tela de listagem de Tipos de Atendimento**
   - Valida acesso, tabela e colunas

2. **Deve filtrar tipos de atendimento por nome**
   - Testa filtro de nome

3. **Deve acessar a página de cadastro de tipo de atendimento**
   - Valida navegação para cadastro

4. **Deve preencher formulário de cadastro de tipo de atendimento**
   - Testa preenchimento de campos obrigatórios e opcionais

5. **Deve voltar da página de cadastro para listagem**
   - Valida navegação de retorno

6. **Deve validar estrutura da tabela de listagem**
   - Valida colunas e presença de dados

## 6. Fluxo do Teste

### Teste Básico
1. **Login:** Realiza login no ambiente Petshop
2. **Navegação:** Expande menu "Serviços e NFS-e" > "CADASTROS" > "Tipos de Atendimento"
3. **Validação:** Verifica carregamento da página, URL, tabela e colunas

### Teste com Filtros
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Tipos de Atendimento
3. **Filtro:** Aplica filtro por nome
4. **Validação:** Verifica aplicação dos filtros

### Teste de Cadastro
1. **Login:** Realiza login
2. **Acesso:** Acessa listagem de Tipos de Atendimento
3. **Novo Cadastro:** Clica em "Novo Cadastro"
4. **Preenchimento:** Preenche campos obrigatórios (nome, cor) e opcionais (duração)
5. **Validação:** Verifica que campos foram preenchidos corretamente

## 7. Padrões Aplicados
- **Page Object Pattern (ADR-0002):** Lógica encapsulada em `TiposAtendimentoPage`
- **Separate Locators (ADR-0003):** Locators centralizados em `TiposAtendimentoLocators.js`
- **Tags (ADR-0010):** `@petshop`, `@regressivo`, `@tipos-atendimento`
- **Prioritize IDs (ADR-0015):** Locators priorizam IDs quando disponíveis
- **No Fixed Waits:** Usa validações condicionais ao invés de `cy.wait()` fixos

## 8. Dados de Teste
- Utiliza usuário padrão configurado em `users.json` (não fiscal)
- Durações disponíveis: "5 minutos" até "12 horas"
- Cor deve ser em formato hexadecimal (ex: "#FF5733")
- Exemplos de tipos: "CONSULTA CLÍNICA", "VACINAÇÃO", "SERVIÇO", "BANHO E TOSA"

## 9. Observações Importantes
- **URL:** A rota correta é `/tipo-atendimento` (singular), não `/tipos_de_atendimento`
- **Menu Aninhado:** Requer expansão do menu "Serviços e NFS-e" antes de acessar "Tipos de Atendimento"
- **Cor:** Campo aceita formato hexadecimal com ou sem `#`
- **Duração:** Select com opções pré-definidas de 5 minutos até 12 horas
- **Preview:** Página de cadastro mostra exemplo visual da etiqueta no Painel de Atendimentos
- **Ordenação:** Tabela permite ordenação por código (crescente/decrescente)

## 10. Referências
- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0010: Tags for Test Filtering](../adr/0010-use-tags-for-test-filtering.md)
- [ADR-0015: Prioritize IDs and Context](../adr/0015-prioritize-ids-and-context-in-locators.md)

