# Cenários de Teste: Cadastro de Mensagens

- **Módulo:** Configuração > Venda Mais
- **Login:** cy.loginArmazenandoSessao()
- **Tags:** @venda-mais, @mensagem, @configuracao

## Cenários

### 1. Criar Nova Mensagem Completa (positivo, prioridade alta)

- **Objetivo:** Testar o fluxo completo de criação de uma nova mensagem com todos os campos preenchidos corretamente.
- **Pré-condições:** Usuário deve estar logado.; Deve ter acesso ao módulo 'Venda Mais'.
- **Passos:** Navegar para a página '/configuracao/mensagem/novo'. → Preencher campo 'Assunto' com texto válido. → Preencher campo 'Título' com texto válido. → Inserir uma mensagem no campo 'Mensagem'. → Selecionar um canal no campo 'Canal'. → Selecionar um tipo no campo 'Tipo'. → Adicionar tags para Empresa, Cliente e Datas. → Anexar arquivos no formato .jpeg e .pdf. → Clicar no botão 'Salvar'.
- **Resultado esperado:** Mensagem é criada com sucesso e uma notificação de sucesso é exibida.
- **Dados dinâmicos:** Assunto, Título, Mensagem

### 2. Validação de Campos Obrigatórios (negativo, prioridade alta)

- **Objetivo:** Verificar que o sistema exibe erros quando campos obrigatórios não são preenchidos.
- **Pré-condições:** Usuário deve estar logado.; Deve ter acesso ao módulo 'Venda Mais'.
- **Passos:** Navegar para a página '/configuracao/mensagem/novo'. → Deixar os campos 'Assunto' e 'Título' vazios. → Clicar no botão 'Salvar'.
- **Resultado esperado:** Sistema exibe mensagem de erro informando que os campos obrigatórios devem ser preenchidos.
- **Dados dinâmicos:** -

### 3. Editar Mensagem Existente (positivo, prioridade media)

- **Objetivo:** Confirmar que é possível editar e salvar mudanças em uma mensagem existente.
- **Pré-condições:** Usuário deve estar logado.; Deve ter acesso ao módulo 'Venda Mais'.; Mensagem já existente para edição.
- **Passos:** Navegar para a página '/configuracao/mensagem'. → Selecionar uma mensagem existente. → Alterar o 'Título' e 'Mensagem'. → Salvar as alterações.
- **Resultado esperado:** As alterações são salvas e uma notificação de sucesso aparece.
- **Dados dinâmicos:** -

### 4. Excluir Mensagem (positivo, prioridade alta)

- **Objetivo:** Verificar se uma mensagem pode ser excluída com sucesso.
- **Pré-condições:** Usuário deve estar logado.; Deve ter acesso ao módulo 'Venda Mais'.; Mensagem já existente para exclusão.
- **Passos:** Navegar para a página '/configuracao/mensagem'. → Selecionar a mensagem a ser excluída. → Clicar no botão de excluir e confirmar a exclusão.
- **Resultado esperado:** Mensagem é excluída com sucesso e removida da listagem.
- **Dados dinâmicos:** -

### 5. Exibição de Mensagem Expirada (edge, prioridade media)

- **Objetivo:** Testar o comportamento do sistema quando uma mensagem expirada é criada.
- **Pré-condições:** Usuário deve estar logado.; Deve ter acesso ao módulo 'Venda Mais'.
- **Passos:** Navegar para a página '/configuracao/mensagem/novo'. → Criar uma mensagem com data de validade no passado. → Salvar a mensagem.
- **Resultado esperado:** Mensagem é salva como expirada e marcada visivelmente como expirada na listagem.
- **Dados dinâmicos:** Assunto, Título, Mensagem


## Observações

- Locators devem ser explorados e validados antes de implementação.
- Tagging deve ser adequado para categorização correta nos relatórios.

---


## Ações Cursor-ready

> Instruções para o Cursor Agent mode. Copie esta seção inteira
> e cole no chat do Cursor com: "Implemente as ações aprovadas abaixo."
> Remova ou altere [APROVADO] para [REJEITADO] nas ações que NÃO deseja executar.

> IMPORTANTE: A ação de explorar tela (explorar-tela) deve ser executada ANTES das demais, pois os locators dependem do DOM real.

### [APROVADO] Ação 1: explorar-tela
- **Tipo**: explorar-tela
- **Arquivo(s)**: /configuracao/mensagem
- **URL**: /configuracao/mensagem
- **O que fazer**: Explorar a tela e validar o DOM para identificar elementos necessários para automação.
- **Contexto**: locators

### [APROVADO] Ação 2: criar-spec-cadastro-mensagem
- **Tipo**: criar-arquivo
- **Arquivo(s)**: cypress/e2e/configuracao/cadastro-mensagem.spec.js
- **O que fazer**: Criar arquivo de spec para cadastro de mensagem com cenários definidos.
- **Contexto**: specPattern
- **Estrutura sugerida**:
  ```javascript
  describe('Cadastro de Mensagens', …
  ```

### [APROVADO] Ação 3: criar-arquivo-locators
- **Tipo**: criar-arquivo
- **Arquivo(s)**: cypress/support/locators/MensagemCadastroLocator.js
- **O que fazer**: Criar locators para os elementos da tela de Cadastro de Mensagens.
- **Contexto**: locators
- **Estrutura sugerida**:
  ```javascript
  export const MensagemCadastroLocator = { …
  ```

### [APROVADO] Ação 4: criar-page-cadastro-mensagem
- **Tipo**: criar-arquivo
- **Arquivo(s)**: cypress/support/pages/MensagemCadastroPage.js
- **O que fazer**: Criar Page Object para manipulação de ações na tela de Cadastro de Mensagens.
- **Contexto**: Page Object
- **Estrutura sugerida**:
  ```javascript
  class MensagemCadastroPage { …
  ```

### [APROVADO] Ação 5: adicionar-documentacao
- **Tipo**: criar-arquivo
- **Arquivo(s)**: docs/cases/architecture-cadastro-mensagem.md
- **O que fazer**: Adicionar documentação para arquitetura do teste de cadastro de mensagem.
- **Contexto**: documentacao