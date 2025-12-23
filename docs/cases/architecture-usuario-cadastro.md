# Arquitetura dos casos de teste: Cadastro de Usuário

## Objetivo

Validar a funcionalidade de cadastro de usuário, incluindo:
- Exibição do layout básico (abas, botões)
- Preenchimento completo do formulário
- Salvamento com validações
- Edição de usuário existente
- Adição de perfis (obrigatório para acesso ao sistema)

**Funcionalidades cobertas:**
- Cadastro completo de usuário
- Validação de campos obrigatórios (Nome, Email, Senha, Redigite Senha)
- Autocomplete de Perfil
- Múltiplas abas no formulário (2 abas: Dados Cadastrais, Perfis)
- Adição de perfil ao usuário (obrigatório)

**Cenários principais:**
- Validação de layout básico (abas e botões)
- Cadastro completo de usuário com todos os campos e perfil
- Validação de campos obrigatórios
- Validação de senhas diferentes
- Validação de formato de email inválido
- Navegação entre as 2 abas
- Teste de botão Voltar
- Teste de edição de usuário existente
- Edição sem alterar senha (campos opcionais na edição)
- Validação de autocomplete de perfil
- Exclusão de perfil do usuário

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/usuario-cadastro.spec.js` - Testes de cadastro de usuário

### Page Objects
- `cypress/support/pages/Usuario/UsuarioCadastroPage.js` - Métodos de interação com o formulário de cadastro
- `cypress/support/pages/Usuario/UsuarioListagemPage.js` - Métodos de navegação para o cadastro

### Locators
- `cypress/support/locators/Usuario/UsuarioCadastroLocators.js` - Seletores do formulário de cadastro
- `cypress/support/locators/Usuario/UsuarioLocators.js` - Seletores genéricos (modais, etc)

### Factory
- `cypress/support/factory/generateRandomData.js` - Função `generateRandomUsuario()` para gerar dados dinâmicos

---

## Imports e dependências

### Page Objects
```javascript
import UsuarioCadastroPage from '../../support/pages/Usuario/UsuarioCadastroPage';
import UsuarioListagemPage from '../../support/pages/Usuario/UsuarioListagemPage';
import UsuarioCadastroLocators from '../../support/locators/Usuario/UsuarioCadastroLocators';
import { generateRandomUsuario } from '../../support/factory/generateRandomData';
```

### Locators
- `UsuarioCadastroLocators` - Contém todos os seletores do formulário (campos, botões, abas)
- `UsuarioLocators` - Contém seletores genéricos (modal de confirmação)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Factory
- `generateRandomUsuario()` - Gera dados aleatórios de usuário usando Faker (ADR-0009)

---

## Estrutura do teste

### Suite: Cadastro de usuário

**Tags:** `['@configuracoes', '@usuario', '@cadastro', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir as abas e botoes principais do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário de cadastro

2. **Validação de layout:**
   - Verifica que as abas estão visíveis
   - Verifica que os botões (Voltar, Salvar) estão visíveis
   - Verifica que o campo Nome está visível

#### `it('deve realizar cadastro completo de usuario com perfil')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário

2. **Geração de dados:**
   - Gera dados aleatórios usando `generateRandomUsuario()`

3. **Preenchimento:**
   - Preenche campos da aba "Dados Cadastrais" (Nome, Email, Senha, Redigite Senha)

4. **Adição de perfil:**
   - Navega para aba "Perfis"
   - Adiciona perfil ao usuário (obrigatório para acesso ao sistema)

5. **Salvamento:**
   - Salva o cadastro
   - Valida mensagem de sucesso

6. **Limpeza:**
   - Volta para listagem
   - Pesquisa pelo usuário criado
   - Exclui o usuário criado

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário

2. **Tentativa de salvamento:**
   - Tenta salvar sem preencher campos obrigatórios

3. **Validação:**
   - Valida que mensagens de erro aparecem

#### `it('deve permitir navegar entre todas as abas do formulario')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário

2. **Validação:**
   - Valida que todas as abas são acessíveis

3. **Navegação:**
   - Navega por cada aba e valida que está ativa

#### `it('deve retornar para listagem ao clicar em Voltar')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário

2. **Navegação:**
   - Clica no botão Voltar
   - Valida que retornou para a listagem

#### `it('deve validar autocomplete de perfil')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário

2. **Validação:**
   - Navega para aba "Perfis"
   - Valida que o autocomplete de perfil funciona corretamente

#### `it('deve editar usuario existente e validar alteracao')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem de usuários
   - Clica em editar primeiro usuário

2. **Edição:**
   - Edita um campo (ex: Nome)

3. **Salvamento:**
   - Salva a edição
   - Valida mensagem de sucesso

#### `it('deve exibir erro ao tentar salvar com senhas diferentes')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário

2. **Preenchimento:**
   - Preenche nome e email
   - Preenche senha e redigite senha com valores diferentes

3. **Tentativa de salvamento:**
   - Tenta salvar o formulário

4. **Validação:**
   - Valida que mensagem de erro aparece (senhas não conferem)

#### `it('deve exibir erro ao tentar salvar com email invalido')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `UsuarioCadastroPage.visit()` para acessar o formulário

2. **Preenchimento:**
   - Preenche nome
   - Preenche email com formato inválido (sem @, etc)
   - Preenche senhas válidas

3. **Tentativa de salvamento:**
   - Tenta salvar o formulário

4. **Validação:**
   - Valida que mensagem de erro aparece (email inválido)

#### `it('deve permitir excluir perfil do usuario')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa edição de um usuário existente

2. **Navegação:**
   - Navega para aba "Perfis"

3. **Exclusão:**
   - Se houver perfis, exclui o primeiro
   - Se não houver, adiciona um perfil primeiro e depois exclui

4. **Validação:**
   - Valida que a tabela de perfis ainda está visível

#### `it('deve permitir editar usuario sem alterar senha')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa edição de um usuário existente

2. **Edição:**
   - Edita apenas o nome (não preenche campos de senha)

3. **Salvamento:**
   - Salva a edição
   - Valida mensagem de sucesso

4. **Validação:**
   - Pesquisa pelo nome editado e valida que foi encontrado

---

## Padrões e boas práticas

### ADR-0002: Page Object Pattern
- ✅ Todos os métodos de interação estão encapsulados em `UsuarioCadastroPage`
- ✅ Specs não contêm seletores CSS/XPath diretamente

### ADR-0003: Separate Locators
- ✅ Todos os seletores estão centralizados em `UsuarioCadastroLocators`
- ✅ Locators compartilhados (modais) estão em `UsuarioLocators`

### ADR-0004: Session Persistence
- ✅ Usa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)

### ADR-0007: Separate Specs
- ✅ Spec separado para cadastro (`usuario-cadastro.spec.js`)

### ADR-0009: Faker for Dynamic Data
- ✅ Usa `generateRandomUsuario()` para gerar dados dinâmicos

### ADR-0010: Tags for Test Filtering
- ✅ Tags aplicadas: `['@configuracoes', '@usuario', '@cadastro', '@regressivo']`

### ADR-0015: Prioritize IDs and Context
- ✅ Locators priorizam IDs quando disponíveis (ex: `#name`, `#email`, `#password`, `#auto_role_id`)
- ✅ Locators usam contexto quando necessário (ex: `#694002165651c tbody tr`)

---

## Observações importantes

1. **Perfil obrigatório:** O usuário só poderá acessar o sistema quando for adicionado pelo menos um perfil a ele. O teste de cadastro completo deve incluir a adição de um perfil.
2. **Campos de senha:** Os campos de senha são obrigatórios no cadastro de um novo usuário, mas podem ser opcionais na edição de um usuário existente (precisa de validação no fluxo de teste).
3. **Autocomplete de Perfil:** O campo de perfil na aba "Perfis" utiliza um componente de autocomplete com ID `#auto_role_id`.
4. **Abas:** O formulário possui 2 abas: "Dados Cadastrais" e "Perfis".
5. **URL de cadastro:** A URL direta para novo cadastro é `/autenticacao/usuario/novo`.
6. **URL de edição:** A URL para edição é `/autenticacao/usuario/{id}/editar`.

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0007](../adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

