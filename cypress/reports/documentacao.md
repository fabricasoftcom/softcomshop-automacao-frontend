# 📖 Documentação dos Testes Automatizados

### 📂 Balanco\balanco.spec.js

## 📌 Balanco

- ✅ /
- ✅ Deve realizar um novo balanco

### 📂 Balanco\reverterBalanco.spec.js

## 📌 Reverter Balanço

- ✅ Deve acessar a tela de balanco e reverter um balanco em andamento

### 📂 cadastro-clientes\cadastro-cliente.spec.js

## 📌 Cadastro de cliente

- ✅ Realizar cadastro de cliente

### 📂 cadastro-produto\cadastro-produto.spec.js

## 📌 Cadastro de produtos

- ✅ Realizar cadastro de produto valido informando o vinculo fiscal

### 📂 debounce-autocomplete\debounce-autocomplete.spec.js

- ✅ Deve contar as requisições de autocomplete

### 📂 financeiro\baixar-despesa.spec.js

## 📌 Testes de Baixa de Despesas

- ✅ /
- ✅ Deve realizar baixa completa e verificar status 
- ✅ Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 
- ✅ Deve realizar baixa parcial (50%) e verificar status 
- ✅ Deve localizar e clicar no botão 
- ✅ Deve desfazer baixa e verificar valor pendente restaurado
- ✅ Deve expandir os detalhes de pagamento e verificar tabela vazia

### 📂 financeiro\cadastro-conta-corrente.spec.js

## 📌 Cadastro de Conta Corrente

- ✅ /
- ✅ Deve cadastrar uma conta para o banco: ${nome} (Código: ${codigo}) com cobrança bancária

### 📂 financeiro\cadastro-conta.spec.js

## 📌 Cadastro de Contas

- ✅ /
- ✅ Deve selecionar a Conta Corrente
- ✅ Deve selecionar a Caixinha
- ✅ Deve retornar à listagem ao clicar em Voltar

### 📂 financeiro\detalhes-do-titulo.spec.js

### 📂 financeiro\edicao-conta-corrente.spec.js

## 📌 Testes de Edição de Conta Corrente

- ✅ /
- ✅ Deve acessar uma conta ativa com nome 
- ✅ Deve desativar uma conta ativa
- ✅ Deve alterar o último número da remessa, salvar e validar a alteração
- ✅ Deve ativar uma conta inativa

### 📂 financeiro\editarDespesa.spec.js

## 📌 Edição Completa de Despesa

- ✅ /
- ✅ Deve editar completamente uma despesa e salvar

### 📂 financeiro\editarReceita.spec.js

## 📌 Edição Completa de Receita

- ✅ /
- ✅ Deve realizar uma edição completa e salvar a receita
- ✅ Deve cancelar a edição clicando no botão 

### 📂 financeiro\listagem-conta.spec.js

## 📌 Testes de Listagem de Contas

- ✅ /
- ✅ Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro

### 📂 financeiro\listagem-contas-a-pagar.spec.js

## 📌 Testes de Listagem de Contas a Pagar

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

### 📂 financeiro\listagem-contas-a-receber.spec.js

## 📌 Testes da Listagem de Contas a Receber

## 📌 Ações de Cadastro

## 📌 Ações de Baixa e Confirmações

## 📌 Validações de Campos e Totalizadores

## 📌 Ações de Dropdown

## 📌 Exclusão e Confirmações

## 📌 Cancelamento de Parcelas

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

### 📂 financeiro\novaDespesa.spec.js

## 📌 Cadastro de Nova Despesa

- ✅ Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ✅ /financeiro/contas-a-pagar

### 📂 financeiro\novaReceita.spec.js

## 📌 Cadastro de Nova Receita

- ✅ Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ✅ /financeiro/contas-a-receber
- ✅ Valida erro ao tentar criar receita com tipo 
- ✅ /financeiro/contas-a-receber

### 📂 financeiro\recebimento.spec.js

## 📌 Testes do Modal de Recebimento

- ✅ /
- ✅ Deve verificar os dados principais do modal
- ✅ Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece 
- ✅ Deve preencher as informações de pagamento, salvar e verificar status Pago
- ✅ Deve preencher as informações de pagamento com baixa parcial de 20% e salvar
- ✅ Deve localizar e clicar no botão 
- ✅ Deve expandir os detalhes de pagamento e verificar tabela vazia
- ✅ Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 

### 📂 login\login.spec.js

## 📌 Login com credenciais validas

## 📌 Login com credenciais invalidas

- ✅ Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas

### 📂 menulateral\menuLateralTeste.spec.js

## 📌 Validação do Menu Lateral do Softcomshop

- ✅ Deve validar os menus e submenus
- ✅ /
- ✅ /
- ✅ /

### 📂 orcamento\orcamento-cadastro.spec.js

## 📌 Cadastro de Novo Orçamento

- ✅ Deve preencher e salvar um novo orçamento com sucesso

### 📂 orcamento\orcamento-listagem.spec.js

## 📌 Testes de Listagem de Orçamento

- ✅ Deve realizar cadastro de novo orçamento

### 📂 relatorio\relatorios.spec.js

## 📌 Acessar relatorios: 

- ✅ Deve validar os relatorios
- ✅ /softcomtecnologia/relatorios-gerais

### 📂 setup\_beforeConfigPadrao.spec.js

## 📌 _beforeAll

## 📌 cypress setup

- ✅ Configurar sistema Padrao com NFSe

### 📂 venda-nfce\venda-nfce.spec.js

## 📌 Realizar venda

- ✅ Realizar venda com sucesso

### 📂 vinculo-fiscal\novocadastrovinculofiscal.spec.js

## 📌 Cadastro de Novo Vínculo Fiscal

- ✅ /
- ✅ Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas

### 📂 vinculo-fiscal\vinculo-fiscal-listagem.spec.js

## 📌 Testes de Listagem de Vínculo Fiscal

- ✅ /
- ✅ Deve realizar cadastro de novo vínculo fiscal
- ✅ Deve excluir todos os itens selecionados
- ✅ Deve editar o primeiro vínculo fiscal da tabela

