# 📌 Testes Automatizados no Cypress

> 🚀 Este documento lista os testes organizados por módulo.

## 🗂️ Balanco

### 📂 Arquivo: `Balanco/balanco.spec.js`

#### 🔹 Suite: Balanco
- ✅ /
- ✅ Deve realizar um novo balanco

### 📂 Arquivo: `Balanco/reverterBalanco.spec.js`

#### 🔹 Suite: Reverter Balanço
- ✅ Deve acessar a tela de balanco e reverter um balanco em andamento

## 🗂️ cadastro-clientes

### ?Y"' Arquivo: `cadastro-clientes/cadastro-cliente.spec.js`

#### ?Y"? Suite: Cadastro de cliente
- Exibe abas e botoes principais do formulario
- Alterna os switches de bloqueado e desativado
- Realizar cadastro de cliente

### ?Y"' Arquivo: `cadastro-clientes/listagem-clientes.spec.js`

#### ?Y"? Suite: Listagem de clientes
- Exibe a tabela inicial, valida paginacao e abre o formulario de filtros
- Aplica filtro por nome, valida resultado e limpa o campo apos a pesquisa
- Seleciona todos os checkboxes e os limpa em seguida
- Tenta excluir sem selecionar registros e valida o alerta
- Seleciona um registro, abre o modal de exclusao e cancela a acao


## 🗂️ debounce-autocomplete

### 📂 Arquivo: `debounce-autocomplete/debounce-autocomplete.spec.js`

- ✅ Deve contar as requisições de autocomplete

## 🗂️ financeiro

### 📂 Arquivo: `financeiro/baixar-despesa.spec.js`

#### 🔹 Suite: Testes de Baixa de Despesas
- ✅ /
- ✅ Deve realizar baixa completa e verificar status 
- ✅ Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 
- ✅ Deve realizar baixa parcial (50%) e verificar status 
- ✅ Deve localizar e clicar no botão 
- ✅ Deve desfazer baixa e verificar valor pendente restaurado
- ✅ Deve expandir os detalhes de pagamento e verificar tabela vazia

### 📂 Arquivo: `financeiro/cadastro-conta-corrente.spec.js`

#### 🔹 Suite: Cadastro de Conta Corrente
- ✅ /
- ✅ Deve cadastrar uma conta para o banco: ${nome} (Código: ${codigo}) com cobrança bancária

### 📂 Arquivo: `financeiro/cadastro-conta.spec.js`

#### 🔹 Suite: Cadastro de Contas
- ✅ /
- ✅ Deve selecionar a Conta Corrente
- ✅ Deve selecionar a Caixinha
- ✅ Deve retornar à listagem ao clicar em Voltar

### 📂 Arquivo: `financeiro/detalhes-do-titulo.spec.js`


### 📂 Arquivo: `financeiro/edicao-conta-corrente.spec.js`

#### 🔹 Suite: Testes de Edição de Conta Corrente
- ✅ /
- ✅ Deve acessar uma conta ativa com nome 
- ✅ Deve desativar uma conta ativa
- ✅ Deve alterar o último número da remessa, salvar e validar a alteração
- ✅ Deve ativar uma conta inativa

### 📂 Arquivo: `financeiro/editarDespesa.spec.js`

#### 🔹 Suite: Edição Completa de Despesa
- ✅ /
- ✅ Deve editar completamente uma despesa e salvar

### 📂 Arquivo: `financeiro/editarReceita.spec.js`

#### 🔹 Suite: Edição Completa de Receita
- ✅ /
- ✅ Deve realizar uma edição completa e salvar a receita
- ✅ Deve cancelar a edição clicando no botão 

### 📂 Arquivo: `financeiro/listagem-conta.spec.js`

#### 🔹 Suite: Testes de Listagem de Contas
- ✅ /
- ✅ Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro

### 📂 Arquivo: `financeiro/listagem-contas-a-pagar.spec.js`

#### 🔹 Suite: Testes de Listagem de Contas a Pagar
- ✅ /
- ✅ Deve validar a exibição da tabela de contas a pagar e linhas da tabela
- ✅ Deve validar a exibição dos totalizadores corretamente
- ✅ Deve filtrar despesas por período e tipo de data
- ✅ Deve efetuar pagamento da primeira despesa com status 
- ✅ Deve abrir a página de novo cadastro de despesa
- ✅ Deve selecionar todas as linhas da tabela
- ✅ Deve abrir o dropdown da primeira linha com status 
- ✅ Deve abrir o dropdown e selecionar a opção 
- ✅ Deve abrir o dropdown e selecionar a opção 
- ✅ Deve abrir o dropdown e selecionar a opção 
- ✅ Deve abrir o dropdown e selecionar a opção 
- ✅ Não deve cancelar a despesa se a confirmação for cancelada
- ✅ Não deve excluir a despesa se a confirmação for cancelada
- ✅ Deve abrir o dropdown na primeira linha com status 
- ✅ Deve abrir o dropdown e selecionar a opção 
- ✅ Deve selecionar o período 

### 📂 Arquivo: `financeiro/listagem-contas-a-receber.spec.js`

#### 🔹 Suite: Testes da Listagem de Contas a Receber
#### 🔹 Suite: Ações de Cadastro
#### 🔹 Suite: Ações de Baixa e Confirmações
#### 🔹 Suite: Validações de Campos e Totalizadores
#### 🔹 Suite: Ações de Dropdown
#### 🔹 Suite: Exclusão e Confirmações
#### 🔹 Suite: Cancelamento de Parcelas
- ✅ /
- ✅ Deve abrir o modal de novo cadastro ao clicar no botão 
- ✅ Deve exibir erro ao tentar baixar sem selecionar parcelas
- ✅ Deve marcar o checkbox da primeira parcela, realizar a baixa e confirmar
- ✅ Deve exibir o popup de confirmação e cancelar a ação de baixa
- ✅ Deve validar os totalizadores de valores e rótulos
- ✅ Deve verificar que os campos estão visíveis na primeira linha
- ✅ Deve abrir o dropdown de ações e verificar que as opções estão visíveis
- ✅ Deve validar as opções do dropdown de ações
- ✅ Deve clicar na opção 
- ✅ Deve clicar na opção 
- ✅ Deve clicar na opção 
- ✅ Deve clicar na opção 
- ✅ Deve realizar a exclusão com sucesso e validar que o tamanho da tabela diminuiu
- ✅ Deve cancelar a exclusão e verificar que a parcela permanece na tabela
- ✅ Deve preencher o motivo, confirmar o cancelamento e verificar o status atualizado
- ✅ Deve preencher o motivo e cancelar a ação de cancelamento
- ✅ Deve selecionar o período 

### 📂 Arquivo: `financeiro/novaDespesa.spec.js`

#### 🔹 Suite: Cadastro de Nova Despesa
- ✅ Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ✅ /financeiro/contas-a-pagar

### 📂 Arquivo: `financeiro/novaReceita.spec.js`

#### 🔹 Suite: Cadastro de Nova Receita
- ✅ Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ✅ /financeiro/contas-a-receber
- ✅ Valida erro ao tentar criar receita com tipo 
- ✅ /financeiro/contas-a-receber

### 📂 Arquivo: `financeiro/recebimento.spec.js`

#### 🔹 Suite: Testes do Modal de Recebimento
- ✅ /
- ✅ Deve verificar os dados principais do modal
- ✅ Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece 
- ✅ Deve preencher as informações de pagamento, salvar e verificar status Pago
- ✅ Deve preencher as informações de pagamento com baixa parcial de 20% e salvar
- ✅ Deve localizar e clicar no botão 
- ✅ Deve expandir os detalhes de pagamento e verificar tabela vazia
- ✅ Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 

## 🗂️ login

### 📂 Arquivo: `login/login.spec.js`

#### 🔹 Suite: Login com credenciais validas
#### 🔹 Suite: Login com credenciais invalidas
- ✅ Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas

## 🗂️ menulateral

### 📂 Arquivo: `menulateral/menuLateralTeste.spec.js`

#### 🔹 Suite: Validação do Menu Lateral do Softcomshop
- ✅ Deve validar os menus e submenus
- ✅ /
- ✅ /
- ✅ /

## 🗂️ orcamento

### 📂 Arquivo: `orcamento/orcamento-cadastro.spec.js`

#### 🔹 Suite: Cadastro de Novo Orçamento
- ✅ Deve preencher e salvar um novo orçamento com sucesso

### 📂 Arquivo: `orcamento/orcamento-listagem.spec.js`

#### 🔹 Suite: Testes de Listagem de Orçamento
- ✅ Deve realizar cadastro de novo orçamento

## 🗂️ relatorio

### 📂 Arquivo: `relatorio/relatorios.spec.js`

#### 🔹 Suite: Acessar relatorios: 
- ✅ Deve validar os relatorios
- ✅ /softcomtecnologia/relatorios-gerais

## 🗂️ setup

### 📂 Arquivo: `setup/_beforeConfigPadrao.spec.js`

#### 🔹 Suite: _beforeAll
#### 🔹 Suite: cypress setup
- ✅ Configurar sistema Padrao com NFSe

## 🗂️ venda-nfce

### 📂 Arquivo: `venda-nfce/venda-nfce.spec.js`

#### 🔹 Suite: Realizar venda
- ✅ Realizar venda com sucesso

## 🗂️ vinculo-fiscal

### 📂 Arquivo: `vinculo-fiscal/novocadastrovinculofiscal.spec.js`

#### 🔹 Suite: Cadastro de Novo Vínculo Fiscal
- ✅ /
- ✅ Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas

### 📂 Arquivo: `vinculo-fiscal/vinculo-fiscal-listagem.spec.js`

#### 🔹 Suite: Testes de Listagem de Vínculo Fiscal
- ✅ /
- ✅ Deve realizar cadastro de novo vínculo fiscal
- ✅ Deve excluir todos os itens selecionados
- ✅ Deve editar o primeiro vínculo fiscal da tabela



