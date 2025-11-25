# Arquitetura dos casos de teste: Movimentações

## Objetivo
- Validar o filtro "Operação" na listagem de Movimentações dentro do menu Compras e Estoque, assegurando que a requisição GET a `/movimentacao` retorne com sucesso e apresente resultados na tabela.
- Validar o cadastro de movimentações para operações ENTRADA e SAIDA, incluindo preenchimento do formulário, salvamento e adição de itens com validação de totalizadores.

## Estrutura de arquivos

Os testes foram separados por funcionalidade seguindo o padrão do projeto:

```
cypress/e2e/compras/
├── listagem-movimentacoes.spec.js    # Testes de listagem e filtros
└── cadastro-movimentacoes.spec.js    # Testes de cadastro (ENTRADA e SAIDA)
```

## Importações e dependências
- `MenulateralProdutoPage` (em `cypress/support/pages/menulateral`) disponibiliza o acesso pelo menu "Compras e Estoque › Movimentações" e lança o botão "Novo Cadastro".
- `ListagemMovimentacoesPage` encapsula a interação com o select `#operacao`, o botão "Pesquisar" e a verificação da tabela `table.table-hover`.
- `CadastroMovimentacoesPage` cobre os campos do formulário de cadastro (`#data_operacao`, `#operacao`, `#auto_tipo_ajuste_id`, `#observacao`, `#btn-salvar`).
- `ItensMovimentacoesPage` valida os campos de produto, quantidade e preço exibidos após salvar.
- Hooks e plugins de `support/e2e.js` continuam ativos; `cy.loginArmazenandoSessao()` + `cy.visit('/')` garantem sessão e estado inicial.
- Os specs estão registrados no `specPattern` (`cypress.config.js`) sob o bloco `// compras e estoque`.

## Estrutura dos testes

### 1. `listagem-movimentacoes.spec.js` - Listagem
**Suite**: `Listagem de Movimentações`  
**Tags**: `@compras`, `@regressivo`, `@listagem-movimentacoes`

1. **beforeEach**: realiza login, abre a página inicial (`cy.visit('/')`) e navega via menu lateral até a listagem.
2. **Testes**:
   - `Deve filtrar movimentações por operação`:
     - Intercepta o GET `/movimentacao*`.
     - Abre o formulário de pesquisa, seleciona "ENTRADA" no filtro de operação e clica em "Pesquisar".
     - Aguarda a interceptação (`cy.wait("@pesquisarMovimentacao")`) e exige status 200.
     - Valida a presença e quantidade de registros na tabela.

### 2. `cadastro-movimentacoes.spec.js` - Cadastro
**Suite**: `Cadastro de Movimentações`  
**Tags**: `@compras`, `@regressivo`, `@cadastro-movimentacoes`

1. **beforeEach**: realiza login, abre a página inicial (`cy.visit('/')`) e navega via menu lateral até a listagem.
2. **Testes**:
   - `Deve abrir o formulário de novo cadastro de movimentação para operação Entrada`:
     - Usa `MenulateralProdutoPage.acessarCadastroNovaMovimentacoes()` para abrir `movimentacao/novo`.
     - Valida a URL e garante que os campos data, operação e tipo estão visíveis.
     - Define operação "ENTRADA", preenche observação e salva.
     - Confirma que o painel de itens aparece, seleciona o primeiro produto disponível, preenche quantidade (2,00) e preço (10,00).
     - Valida que a tabela apresenta uma linha e que os totalizadores (itens: 1, volumes: 2,00, total: 20,00) refletem os valores adicionados.
   - `Deve abrir o formulário de novo cadastro de movimentação para operação Saída`:
     - Repete o fluxo anterior, mas define operação "SAIDA".
     - Adiciona produto com quantidade (1,00) e preço (5,00) diferentes.
     - Valida tabela e totalizadores (itens: 1, volumes: 1,00, total: 5,00) para garantir o comportamento da operação de saída.

## Boas práticas
- **Separação por funcionalidade**: Listagem e cadastro em arquivos distintos facilitam manutenção e execução seletiva.
- Page Objects mantêm o spec focado no fluxo sem expor seletores complexos.
- `ItensMovimentacoesPage` abstrai as ações do formulário de itens, mantendo o spec em um nível mais alto ao preencher produto, quantidade e preço.
- Tags específicas (`@listagem-movimentacoes`, `@cadastro-movimentacoes`) permitem filtrar testes por funcionalidade.
- O helper `ListagemMovimentacoesPage.obterLinhasVisiveis()` facilita assertivas quantitativas.
- `CadastroMovimentacoesPage` abstrai as verificações do formulário de cadastro, mantendo o spec focado no comportamento em vez de nos seletores.

## Integração com a arquitetura global
- Registrados em `specPattern` dentro do bloco `// compras e estoque`, alinhado com `defaultCommandTimeout` (50s) e `testIsolation: false`.
- Hooks globais (`support/e2e.js`) continuam capturando erros 500 e forçando falhas inesperadas.
- Persiste nos relatórios Allure e pode gerar screenshots/vídeos se habilitados, mantendo traço completo dos fluxos de compras.
- Documentação reforça `docs/test-case-architecture.md` como checklist para novos specs.

## Padrões aplicados
- **Separação de specs por funcionalidade**: Seguindo o padrão estabelecido no projeto (clientes, vendas, produtos), os testes foram separados em listagem e cadastro.
- **Tags específicas**: Cada suite possui tags que permitem execução seletiva (`@listagem-movimentacoes`, `@cadastro-movimentacoes`).
- **Reuso de Page Objects**: Ambos os specs compartilham `MenulateralProdutoPage` para navegação inicial.

## Sugestões para evolução
1. Expandir os testes de listagem para validar outros filtros (empresa ou tipo) e comportamentos da tabela.
2. Adicionar testes de edição e exclusão de movimentações na listagem.
3. Capturar o `status` e o `operacao` das linhas retornadas no Allure para análise posterior.
4. Adicionar validações de regras de negócio específicas para cada tipo de operação.
