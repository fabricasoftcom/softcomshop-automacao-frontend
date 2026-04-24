# Inventário de Testes

*Última atualização: 22/04/2026 09:04*

Este documento lista todos os testes automatizados do projeto, organizados por módulo.

## ⚖️ Balanco

### 📄 Arquivo: `Balanco/balanco.spec.js`

#### 🧪 Suite: Balanco
- ✅ /
- ✅ Deve realizar um novo balanco

### 📄 Arquivo: `Balanco/reverterBalanco.spec.js`

#### 🧪 Suite: Reverter Balanço
- ✅ /
- ✅ Deve acessar a tela de balanco e reverter um balanco em andamento

---

## 👥 Cadastro clientes

### 📄 Arquivo: `cadastro-clientes/cadastro-cliente.spec.js`

#### 🧪 Suite: Cadastro de cliente
- ✅ /
- ✅ deve exibir as abas e botoes principais do formulario
- ✅ deve alternar os switches de bloqueado e desativado
- ✅ Realizar cadastro de cliente
- ✅ deve realizar cadastro de cliente pessoa juridica
- ✅ deve salvar cliente com endereco completo e acessar aba Outros Enderecos
- ✅ deve salvar cliente e acessar aba Contato/Notificacoes

### 📄 Arquivo: `cadastro-clientes/listagem-clientes.spec.js`

#### 🧪 Suite: Listagem de clientes
- ✅ /
- ✅ exibe a listagem e permite abrir o formulario de filtros
- ✅ aplica filtro por nome e limpa o campo apos a pesquisa
- ✅ seleciona e limpa todos os checkboxes da tabela
- ✅ alerta quando tentar excluir sem selecionar registros
- ✅ abre o modal de exclusao ao selecionar registros e cancela a acao

---

## 📦 Cadastro produto

### 📄 Arquivo: `cadastro-produto/cadastro-produto.spec.js`

#### 🧪 Suite: Cadastro de produtos
- ✅ /
- ✅ cadastra produto com venda desativada e valida o estado apos salvar
- ✅ edita um produto pela listagem e valida a alteracao
- ✅ exibe as abas principais do formulario antes de cadastrar
- ✅ Realizar cadastro de produto valido informando o vinculo fiscal
- ✅ cadastra produto habilitando grade e recusa os dados fiscais
- ✅ cadastra produto habilitando combo e valida a aba sem itens
- ✅ cadastra e exclui o produto depois de recusar preencher os dados fiscais

---

## 📦 Compras

### 📄 Arquivo: `compras/cadastro-compra-manual.spec.js`

#### 🧪 Suite: Cadastro manual de compra
- ✅ /
- ✅ realiza fluxo completo: fornecedor, dados principais, item e pagamento
- ✅ adiciona três itens e gera pagamento
- ✅ cria compra sem pagamentos

### 📄 Arquivo: `compras/cadastro-compra-xml.spec.js`

#### 🧪 Suite: Cadastro de compra - Importação XML
- ✅ /
- ✅ Importando NFe pelo XML
- ✅ Importando NFe pelo XML e excluindo
- ✅ Deve aplicar grupo para todos os itens na importação
- ✅ Deve relacionar produto na importação
- ✅ Deve adicionar grupo na importação
- ✅ Deve adicionar vínculo na importação
- ✅ Deve alterar CFOP do item na importação
- ✅ Deve lançar categoria na importação

### 📄 Arquivo: `compras/cadastro-fornecedor.spec.js`

#### 🧪 Suite: Cadastro de Fornecedor
- ✅ Realizar cadastro de Fornecedor

### 📄 Arquivo: `compras/cadastro-movimentacoes.spec.js`

#### 🧪 Suite: Cadastro de Movimentações
- ✅ /
- ✅ Deve abrir o formulário de novo cadastro de movimentação para operação Entrada
- ✅ Deve abrir o formulário de novo cadastro de movimentação para operação Saída

### 📄 Arquivo: `compras/importacao-compra-nuvem-fiscal.spec.js`

#### 🧪 Suite: Importação de Compra pela Nuvem Fiscal
- ✅ /
- ✅ Deve importar compra pela Nuvem Fiscal filtrando por Ciência da Operação

### 📄 Arquivo: `compras/listagem-movimentacoes.spec.js`

#### 🧪 Suite: Listagem de Movimentações
- ✅ /
- ✅ Deve filtrar movimentações por operação
- ✅ @pesquisarMovimentacao

### 📄 Arquivo: `compras/ordem-fornecimento.spec.js`

#### 🧪 Suite: Ordem de Fornecimento
- ✅ Deve acessar o cadastro de ordem de fornecimento

---

## ⚙️ Configuracao

### 📄 Arquivo: `configuracao/cadastro-mensagem.spec.js`

#### 🧪 Suite: Cadastro de Mensagens
- ✅ /
- ✅ deve exibir os elementos principais do formulário de cadastro
- ✅ deve realizar cadastro de mensagem com assunto, título e mensagem
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatórios
- ✅ deve retornar para listagem ao clicar em Voltar

---

## ⚙️ Configuracoes

### 📄 Arquivo: `configuracoes/cadastro-contador.spec.js`

#### 🧪 Suite: Cadastro de contador
- ✅ /
- ✅ deve exibir os botoes principais do formulario
- ✅ deve realizar cadastro completo de contador com todos os campos
- ✅ deve realizar cadastro completo de contador apenas com campos obrigatorios
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- ✅ deve retornar para home ao clicar em Voltar
- ✅ deve validar autocomplete de bairro
- ✅ deve validar autocomplete de cidade

### 📄 Arquivo: `configuracoes/cartao-cadastro.spec.js`

#### 🧪 Suite: Cadastro de cartão
- ✅ /
- ✅ deve exibir os botoes principais do formulario
- ✅ deve realizar cadastro completo de cartao apenas com campos obrigatorios
- ✅ deve realizar cadastro completo de cartao com todos os campos
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- ✅ deve fechar o modal ao clicar no botao Fechar
- ✅ deve realizar cadastro com tipo CRÉDITO
- ✅ deve realizar cadastro com tipo DÉBITO
- ✅ deve excluir todos os cartoes que comecam com CARTAO pela listagem (Excluir selecionados)

### 📄 Arquivo: `configuracoes/cartao-listagem.spec.js`

#### 🧪 Suite: Listagem de cartões
- ✅ /
- ✅ exibe a listagem e permite abrir o formulario de filtros
- ✅ aplica filtro e valida resultado
- ✅ abre o modal de novo cadastro ao clicar no botao Novo Cadastro
- ✅ abre a edicao do primeiro registro da listagem
- ✅ seleciona a primeira linha da tabela

### 📄 Arquivo: `configuracoes/empresa-cadastro.spec.js`

#### 🧪 Suite: Cadastro de empresa
- ✅ /
- ✅ deve exibir as abas e botoes principais do formulario
- ✅ deve realizar cadastro completo de empresa
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- ✅ deve permitir navegar entre todas as abas do formulario
- ✅ deve retornar para listagem ao clicar em Voltar
- ✅ deve validar autocomplete de bairro
- ✅ deve validar autocomplete de cidade
- ✅ deve editar empresa existente e validar alteracao

### 📄 Arquivo: `configuracoes/empresa-listagem.spec.js`

#### 🧪 Suite: Listagem de empresas
- ✅ /
- ✅ exibe a listagem e permite abrir o formulario de filtros
- ✅ aplica filtro por nome e limpa o campo apos a pesquisa
- ✅ seleciona e limpa todos os checkboxes da tabela
- ✅ alerta quando tentar excluir sem selecionar registros
- ✅ abre o modal de exclusao ao selecionar registros e cancela a acao
- ✅ valida paginacao inicial da listagem
- ✅ navega para novo cadastro ao clicar no botao Novo Cadastro
- ✅ abre e fecha o formulario de pesquisa corretamente
- ✅ aplica filtro por CNPJ e valida resultado
- ✅ aplica filtro por Fantasia e valida resultado
- ✅ aplica filtro por Razao Social e valida resultado
- ✅ limpa todos os campos do formulario de pesquisa
- ✅ abre a edicao do primeiro registro da listagem

### 📄 Arquivo: `configuracoes/forma-pagamento-cadastro.spec.js`

#### 🧪 Suite: Cadastro de forma de pagamento
- ✅ /
- ✅ deve exibir os botoes principais do formulario
- ✅ deve realizar cadastro completo de forma de pagamento apenas com campos obrigatorios
- ✅ deve realizar cadastro completo de forma de pagamento com todos os campos
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- ✅ deve fechar o modal ao clicar no botao Fechar
- ✅ deve realizar cadastro com tipo CARTAO
- ✅ deve realizar cadastro com tipo BOLETO

### 📄 Arquivo: `configuracoes/forma-pagamento-listagem.spec.js`

#### 🧪 Suite: Listagem de formas de pagamento
- ✅ /
- ✅ exibe a listagem e permite abrir o formulario de filtros
- ✅ aplica filtro e valida resultado
- ✅ abre o modal de novo cadastro ao clicar no botao Novo Cadastro
- ✅ abre a edicao do primeiro registro da listagem
- ✅ seleciona a primeira linha da tabela

### 📄 Arquivo: `configuracoes/funcionario-cadastro.spec.js`

#### 🧪 Suite: Cadastro de funcionário
- ✅ /
- ✅ deve exibir as abas e botoes principais do formulario
- ✅ deve realizar cadastro completo de funcionario
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- ✅ deve permitir navegar entre todas as abas do formulario
- ✅ deve retornar para listagem ao clicar em Voltar
- ✅ deve validar autocomplete de funcao
- ✅ deve validar autocomplete de bairro
- ✅ deve validar autocomplete de cidade
- ✅ deve editar funcionario existente e validar alteracao

### 📄 Arquivo: `configuracoes/funcionario-listagem.spec.js`

#### 🧪 Suite: Listagem de funcionários
- ✅ /
- ✅ exibe a listagem e permite abrir o formulario de filtros
- ✅ aplica filtro por nome e limpa o campo apos a pesquisa
- ✅ seleciona e limpa todos os checkboxes da tabela
- ✅ alerta quando tentar excluir sem selecionar registros
- ✅ abre o modal de exclusao ao selecionar registros e cancela a acao
- ✅ valida paginacao inicial da listagem
- ✅ navega para novo cadastro ao clicar no botao Novo Cadastro
- ✅ abre e fecha o formulario de pesquisa corretamente
- ✅ aplica filtro por codigo e valida resultado

### 📄 Arquivo: `configuracoes/justificativa-cadastro.spec.js`

#### 🧪 Suite: Cadastro de justificativa
- ✅ /
- ✅ deve exibir os botoes principais do formulario
- ✅ deve realizar cadastro completo de justificativa apenas com descricao
- ✅ deve realizar cadastro completo de justificativa com descricao e rotinas
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- ✅ deve retornar para listagem ao clicar em Voltar

### 📄 Arquivo: `configuracoes/justificativa-listagem.spec.js`

#### 🧪 Suite: Listagem de justificativas
- ✅ /
- ✅ exibe a listagem e permite abrir o formulario de filtros
- ✅ aplica filtro por descricao e valida resultado
- ✅ navega para novo cadastro ao clicar no botao Novo Cadastro
- ✅ abre a edicao do primeiro registro da listagem

### 📄 Arquivo: `configuracoes/perfil-acesso-cadastro.spec.js`

#### 🧪 Suite: Cadastro de Perfil de Acesso
- ✅ /
- ✅ deve exibir o modal de cadastro corretamente
- ✅ deve realizar cadastro completo de perfil com todos os campos
- ✅ deve realizar cadastro de perfil apenas com campos obrigatórios
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatórios
- ✅ deve fechar o modal ao clicar no botão Fechar
- ✅ deve permitir selecionar diferentes tipos de Profile

### 📄 Arquivo: `configuracoes/perfil-acesso.spec.js`

#### 🧪 Suite: Listagem de Perfis de Acesso
- ✅ /
- ✅ deve exibir a tela de listagem corretamente
- ✅ deve abrir e fechar o formulário de pesquisa corretamente
- ✅ deve aplicar filtro por nome e limpar o campo após a pesquisa
- ✅ deve selecionar e limpar todos os checkboxes da tabela
- ✅ deve alertar quando tentar excluir sem selecionar registros
- ✅ deve validar que existe link de edição na primeira linha da tabela
- ✅ deve navegar para novo cadastro ao clicar no botão Perfil

### 📄 Arquivo: `configuracoes/sincronizacao.spec.js`

#### 🧪 Suite: Sincronização - Responsável Técnico
- ✅ /
- ✅ deve exibir a tela de sincronização corretamente
- ✅ deve permitir clicar no botão de sincronizar dados
- ✅ deve validar que as informações de última e próxima sincronização são exibidas

### 📄 Arquivo: `configuracoes/usuario-cadastro.spec.js`

#### 🧪 Suite: Cadastro de usuário
- ✅ /
- ✅ deve exibir as abas e botoes principais do formulario
- ✅ deve realizar cadastro completo de usuario com perfil
- ✅ deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- ✅ deve permitir navegar entre todas as abas do formulario
- ✅ deve retornar para listagem ao clicar em Voltar
- ✅ deve validar autocomplete de perfil
- ✅ deve editar usuario existente e validar alteracao
- ✅ deve exibir erro ao tentar salvar com senhas diferentes
- ✅ deve exibir erro ao tentar salvar com email invalido
- ✅ deve permitir excluir perfil do usuario
- ✅ deve permitir editar usuario sem alterar senha

### 📄 Arquivo: `configuracoes/usuario-listagem.spec.js`

#### 🧪 Suite: Listagem de usuários
- ✅ /
- ✅ exibe a listagem e permite abrir o formulario de filtros
- ✅ aplica filtro por nome e limpa o campo apos a pesquisa
- ✅ seleciona e limpa todos os checkboxes da tabela
- ✅ alerta quando tentar excluir sem selecionar registros
- ✅ abre o modal de exclusao ao selecionar registros e cancela a acao
- ✅ navega para novo cadastro ao acessar URL direta
- ✅ /autenticacao/usuario/novo
- ✅ abre e fecha o formulario de pesquisa corretamente
- ✅ aplica filtro por codigo e valida resultado

---

## 🔄 Consignacao

### 📄 Arquivo: `consignacao/consignacao-extrato.spec.js`

#### 🧪 Suite: Consignação > Extrato
- ✅ /
- ✅ Deve exibir a tela de Extrato de Consignação com todos os elementos principais
- ✅ Deve preencher o formulário de pesquisa

### 📄 Arquivo: `consignacao/devolucao-consignacao-cadastro.spec.js`

#### 🧪 Suite: Cadastro de Devolução/Venda de Consignação
- ✅ /
- ✅ Deve abrir a tela de cadastro de devolução/venda
- ✅ Deve realizar o cadastro de uma devolução/venda com sucesso
- ✅ Deve adicionar um produto à devolução/venda após o cadastro

### 📄 Arquivo: `consignacao/devolucao-consignacao-listagem.spec.js`

#### 🧪 Suite: Listagem de Devoluções/Vendas de Consignação
- ✅ /
- ✅ Deve exibir a tabela de devoluções e permitir abrir o formulário de pesquisa
- ✅ Deve permitir navegar para novo cadastro
- ✅ Deve aplicar filtros de pesquisa
- ✅ Deve selecionar e desmarcar todos os registros

### 📄 Arquivo: `consignacao/requisicao-consignacao-cadastro.spec.js`

#### 🧪 Suite: Cadastro de Requisição de Consignação
- ✅ /
- ✅ Deve abrir a tela de cadastro de requisição
- ✅ Deve preencher e salvar um novo cadastro de requisição com sucesso
- ✅ Deve adicionar um produto à requisição após salvar

### 📄 Arquivo: `consignacao/requisicao-consignacao-listagem.spec.js`

#### 🧪 Suite: Listagem de Requisições de Consignação
- ✅ /
- ✅ Deve exibir a tabela de requisições e permitir abrir o formulário de pesquisa
- ✅ Deve permitir navegar para novo cadastro
- ✅ Deve aplicar filtros de pesquisa
- ✅ Deve selecionar e desmarcar todos os registros

---

## 📄 Contratos

### 📄 Arquivo: `contratos/cadastro-modelos.spec.js`

#### 🧪 Suite: Cadastro de Modelos de Contrato
- ✅ Deve criar um novo modelo de contrato

---

## 📦 Estoque

### 📄 Arquivo: `estoque/dashboard-estoque.spec.js`

#### 🧪 Suite: Dashboard de Estoque
- ✅ Deve carregar os cards do dashboard corretamente

### 📄 Arquivo: `estoque/gestao-estoque.spec.js`

#### 🧪 Suite: Estoque > Gestão de Estoque
- ✅ /
- ✅ Deve exibir a tela de Gestão de Estoque com todos os elementos principais
- ✅ Deve preencher filtros e realizar pesquisa
- ✅ Deve navegar para Visão Geral
- ✅ Deve ter botão de Lista de Compras disponível

---

## 💰 Financeiro

### 📄 Arquivo: `financeiro/baixar-despesa.spec.js`

#### 🧪 Suite: Testes de Baixa de Despesas
- ✅ /
- ✅ Deve realizar baixa completa e verificar status 
- ✅ Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 
- ✅ Deve realizar baixa parcial (50%) e verificar status 
- ✅ Deve localizar e clicar no botão 
- ✅ Deve desfazer baixa e verificar valor pendente restaurado
- ✅ Deve expandir os detalhes de pagamento e verificar tabela vazia

### 📄 Arquivo: `financeiro/cadastro-categoria.spec.js`

#### 🧪 Suite: Cadastro de Categorias
- ✅ /
- ✅ Deve cadastrar uma nova categoria de receita com descrição apenas
- ✅ Deve cadastrar uma nova categoria de despesa com descrição apenas
- ✅ Deve cadastrar uma nova categoria de receita com todos os campos
- ✅ Deve cadastrar uma nova categoria de despesa com checkbox 
- ✅ Deve cancelar o cadastro clicando em Voltar

### 📄 Arquivo: `financeiro/cadastro-conta-corrente.spec.js`

#### 🧪 Suite: Cadastro de Conta Corrente
- ✅ /
- ✅ Deve cadastrar uma conta para o banco: ${nome} (Código: ${codigo}) com cobrança bancária

### 📄 Arquivo: `financeiro/cadastro-conta.spec.js`

#### 🧪 Suite: Cadastro de Contas
- ✅ /
- ✅ Deve selecionar a Conta Corrente
- ✅ Deve selecionar a Caixinha
- ✅ Deve retornar à listagem ao clicar em Voltar

### 📄 Arquivo: `financeiro/dre.spec.js`

#### 🧪 Suite: Financeiro > DRE
- ✅ /
- ✅ Deve exibir a tela de DRE com todos os elementos principais
- ✅ Deve exibir todas as seções do DRE
- ✅ Deve exibir o botão Gerar PDF

### 📄 Arquivo: `financeiro/edicao-conta-corrente.spec.js`

#### 🧪 Suite: Testes de Edição de Conta Corrente
- ✅ /
- ✅ Deve acessar uma conta ativa com nome 
- ✅ Deve desativar uma conta ativa
- ✅ Deve alterar o último número da remessa, salvar e validar a alteração
- ✅ Deve ativar uma conta inativa

### 📄 Arquivo: `financeiro/editarDespesa.spec.js`

#### 🧪 Suite: Edição Completa de Despesa
- ✅ /
- ✅ Deve editar completamente uma despesa e salvar

### 📄 Arquivo: `financeiro/editarReceita.spec.js`

#### 🧪 Suite: Edição Completa de Receita
- ✅ /
- ✅ Deve realizar uma edição completa e salvar a receita
- ✅ Deve cancelar a edição clicando no botão 

### 📄 Arquivo: `financeiro/extrato.spec.js`

#### 🧪 Suite: Financeiro > Extrato
- ✅ /
- ✅ Deve exibir a tela de Extrato com todos os elementos principais
- ✅ Deve exibir os cards de resumo
- ✅ Deve exibir a tabela com todas as colunas
- ✅ Deve exibir o botão Gerar PDF

### 📄 Arquivo: `financeiro/fluxo-caixa.spec.js`

#### 🧪 Suite: Financeiro > Fluxo de Caixa
- ✅ /
- ✅ Deve exibir a tela de Fluxo de Caixa com todos os elementos principais
- ✅ Deve pesquisar por um período específico e exibir resultados
- ✅ Deve exibir o botão Gerar PDF

### 📄 Arquivo: `financeiro/lancamento-conta.spec.js`

#### 🧪 Suite: Testes de Lançamento Conta
- ✅ /
- ✅ Deve realizar lançamento conta completo
- ✅ Deve validar que a tela está visível ao acessar
- ✅ Deve realizar lançamento conta com operação CRÉDITO
- ✅ Deve realizar lançamento conta com tipo de data LANÇAMENTO
- ✅ Deve cancelar lançamento clicando em Voltar
- ✅ Deve exibir erro ao tentar salvar sem preencher campos obrigatórios

### 📄 Arquivo: `financeiro/listagem-categorias.spec.js`

#### 🧪 Suite: Testes de Listagem de Categorias
- ✅ /
- ✅ Deve exibir a página de listagem de categorias corretamente
- ✅ Deve clicar no botão de nova categoria de receita
- ✅ Deve clicar no botão de nova categoria de despesa
- ✅ Deve filtrar categorias de receita por 
- ✅ Deve filtrar categorias de receita por 
- ✅ Deve filtrar categorias de receita por 
- ✅ Deve filtrar categorias de despesa por 
- ✅ Deve filtrar categorias de despesa por 
- ✅ Deve filtrar categorias de despesa por 

### 📄 Arquivo: `financeiro/listagem-conta.spec.js`

#### 🧪 Suite: Testes de Listagem de Contas
- ✅ /
- ✅ Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro

### 📄 Arquivo: `financeiro/listagem-contas-a-pagar.spec.js`

#### 🧪 Suite: Testes de Listagem de Contas a Pagar
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

### 📄 Arquivo: `financeiro/listagem-contas-a-receber.spec.js`

#### 🧪 Suite: Testes da Listagem de Contas a Receber
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
- ✅ @buscarContas

### 📄 Arquivo: `financeiro/meu-lucro.spec.js`

#### 🧪 Suite: Meu Lucro - Dashboard Financeiro
- ✅ /
- ✅ deve exibir a tela Meu Lucro corretamente
- ✅ deve exibir todos os elementos principais da tela
- ✅ deve exibir os botões principais (Configurações e Gerar PDF)
- ✅ deve exibir as tabs de Lucro Realizado e Lucro Projetado
- ✅ deve permitir alternar entre as tabs
- ✅ deve exibir a seção de Meta de Lucro
- ✅ deve exibir a tabela de Ponto de Equilíbrio
- ✅ deve exibir a seção de gráfico do Ponto de Equilíbrio
- ✅ deve abrir e fechar o modal de configurações
- ✅ deve exibir todos os campos do modal de configurações
- ✅ deve validar URL do botão Gerar PDF

### 📄 Arquivo: `financeiro/novaDespesa.spec.js`

#### 🧪 Suite: Cadastro de Nova Despesa
- ✅ Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ✅ /financeiro/contas-a-pagar

### 📄 Arquivo: `financeiro/novaReceita.spec.js`

#### 🧪 Suite: Cadastro de Nova Receita
- ✅ Deve preencher o formulário de Nova Receita com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ✅ /financeiro/contas-a-receber

### 📄 Arquivo: `financeiro/recebimento.spec.js`

#### 🧪 Suite: Testes do Modal de Recebimento
- ✅ /
- ✅ Deve verificar os dados principais do modal
- ✅ Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece 
- ✅ Deve preencher as informações de pagamento e salvar
- ✅ Deve preencher as informações de pagamento com baixa parcial de 20% e salvar
- ✅ Deve localizar e clicar no botão 
- ✅ Deve expandir os detalhes de pagamento e verificar tabela vazia
- ✅ Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 

### 📄 Arquivo: `financeiro/recibo.spec.js`

#### 🧪 Suite: Testes de Recibo
- ✅ Deve validar que a página de listagem está visível ao acessar
- ✅ Deve abrir o formulário de novo cadastro ao clicar no botão Novo Cadastro
- ✅ Deve validar que o formulário de novo cadastro está visível ao acessar diretamente
- ✅ Deve preencher todos os campos do formulário de recibo
- ✅ Deve cancelar o cadastro clicando em Voltar
- ✅ Deve exibir erro ao tentar salvar sem preencher campos obrigatórios

### 📄 Arquivo: `financeiro/transferencia-contas.spec.js`

#### 🧪 Suite: Testes de Transferência Entre Contas
- ✅ /
- ✅ Deve realizar transferência completa entre contas
- ✅ Deve validar que o modal está visível ao acessar a página
- ✅ Deve exibir erro ao tentar salvar sem preencher campos obrigatórios
- ✅ Deve exibir erro ao tentar transferir de uma conta para ela mesma
- ✅ Deve cancelar a operação ao clicar no botão Voltar
- ✅ Deve exibir erro ao tentar transferir valor zero

---

## 🔧 Incidentes

### 📄 Arquivo: `incidentes/ComprasEestoqueNuvemFiscal.spec.js`

#### 🧪 Suite: Incidentes > Compras e Estoque > Nuvem Fiscal
- ✅ /
- ✅ Deve acessar a listagem e pesquisar sem falha crítica de infraestrutura (host/500)

### 📄 Arquivo: `incidentes/ComprasImportarNFe.spec.js`

#### 🧪 Suite: Incidentes > Compras > Importar NFe por chave
- ✅ /
- ✅ Deve importar NFe pela chave de acesso sem erro 500 na interface

### 📄 Arquivo: `incidentes/FinanceiroRecebimentoModal.spec.js`

#### 🧪 Suite: Incidentes > Modal de Recebimento > Calendário
- ✅ /
- ✅ Deve abrir o datepicker da data de recebimento acima do modal

### 📄 Arquivo: `incidentes/ImportacaoNfCompra.spec.js`

#### 🧪 Suite: Incidentes > Importação NF de compra (múltiplas + XML)
- ✅ /
- ✅ Deve importar duas NFs em sequência e em seguida importar por XML sem erro 500

### 📄 Arquivo: `incidentes/RelatoriosCaixa.spec.js`

#### 🧪 Suite: Incidentes > Relatórios > Caixa > PDF período longo
- ✅ Deve pesquisar período longo e acionar Gerar PDF sem erro 500/504
- ✅ /

### 📄 Arquivo: `incidentes/85857-NFeFCPSTDuplicidade.spec.js`

#### 🧪 Suite: Incidentes > NFe > FCPST duplicidade no XML (85857)
- ✅ /
- ✅ Deve emitir NFe sem rejeição por FCPST, exibir FCP no resumo e gerar XML com campos FCP preenchidos

---

## 📁 Login

### 📄 Arquivo: `login/login.spec.js`

#### 🧪 Suite: Login com credenciais validas
- ✅ Login deve ser realizado com sucesso usando credenciais validas
- ✅ Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas

---

## 📁 Menulateral

### 📄 Arquivo: `menulateral/menuLateralTeste.spec.js`

#### 🧪 Suite: Validação do Menu Lateral do Softcomshop
- ✅ /
- ✅ Deve validar os menus e submenus
- ✅ /
- ✅ /

---

## 📁 Nfce

### 📄 Arquivo: `nfce/nfce-configuracoes.spec.js`

#### 🧪 Suite: NFC-e > Configurações
- ✅ /
- ✅ Deve exibir a tela de Configurações da NFC-e com todos os elementos principais

### 📄 Arquivo: `nfce/nfce-download-xml.spec.js`

#### 🧪 Suite: NFC-e > Download XML
- ✅ /
- ✅ Deve exibir a tela de Download do XML com todos os elementos principais
- ✅ Deve preencher o formulário de download
- ✅ Deve fazer download do XML definindo período dos últimos 30 dias

### 📄 Arquivo: `nfce/nfce-inutilizar.spec.js`

#### 🧪 Suite: NFC-e > Inutilizar
- ✅ /
- ✅ Deve exibir a tela de Inutilizar Faixas da NFCE

---

## 📁 Nfe

### 📄 Arquivo: `nfe/nfe-configuracoes.spec.js`

#### 🧪 Suite: NF-e > Configurações
- ✅ /
- ✅ Deve exibir a tela de Configurações da NF-e com todos os elementos principais

### 📄 Arquivo: `nfe/nfe-download-xml.spec.js`

#### 🧪 Suite: NF-e > Download XML
- ✅ /
- ✅ Deve exibir a tela de Download do XML com todos os elementos principais
- ✅ Deve preencher o formulário de download

### 📄 Arquivo: `nfe/nfe-inutilizar.spec.js`

#### 🧪 Suite: NF-e > Inutilizar
- ✅ /
- ✅ Deve exibir a tela de Inutilizar Faixas da NFE

---

## 📁 Orcamento

### 📄 Arquivo: `orcamento/orcamento-cadastro.spec.js`

#### 🧪 Suite: Cadastro de Novo Orçamento
- ✅ Deve preencher e salvar um novo orçamento com sucesso

### 📄 Arquivo: `orcamento/orcamento-listagem.spec.js`

#### 🧪 Suite: Testes de Listagem de Orçamento
- ✅ Deve realizar cadastro de novo orçamento

---

## 🐾 Petshop

### 🐶 Arquivo: `petshop/atestados-termos.spec.js`

#### 🧪 Suite: Cadastro de Atestados e Termos - Petshop
- ✅ Deve realizar o ciclo completo de CRUD (Criar, Listar, Editar, Excluir)
- ✅ Deve validar filtros de listagem (Existentes)

### 🐶 Arquivo: `petshop/gestao-ordem-servico.spec.js`

#### 🧪 Suite: Gestão de Ordem de Serviço - Petshop
- ✅ /
- ✅ Deve acessar o Painel de Gestão de OS
- ✅ Deve filtrar ordens de serviço por período
- ✅ Deve filtrar ordens de serviço por número da OS
- ✅ Deve filtrar ordens de serviço por vendas geradas
- ✅ Deve validar seção de geração de registros
- ✅ Deve validar resumo de quantidades e valores
- ✅ Deve marcar opções de geração de registros

### 🐶 Arquivo: `petshop/menu-lateral-petshop.spec.js`

#### 🧪 Suite: Validação do Menu Lateral do Petshop
- ✅ /
- ✅ Deve validar os menus e submenus exclusivos do Petshop
- ✅ /
- ✅ /
- ✅ /
- ✅ Deve validar especificamente o Painel de Atendimento (menu principal exclusivo)
- ✅ /

### 🐶 Arquivo: `petshop/modelos-prescricoes.spec.js`

#### 🧪 Suite: Modelos de Prescrições - Petshop
- ✅ /
- ✅ Deve acessar a tela de listagem de Modelos de Prescrições
- ✅ Deve filtrar modelos de prescrições por descrição
- ✅ Deve filtrar modelos de prescrições por status
- ✅ Deve acessar a página de cadastro de modelo de prescrição
- ✅ Deve preencher formulário de cadastro de modelo de prescrição
- ✅ Deve voltar da página de cadastro para listagem
- ✅ Deve validar estrutura da tabela de listagem

### 🐶 Arquivo: `petshop/painel-atendimento.spec.js`

#### 🧪 Suite: Painel de Atendimento - Petshop
- ✅ /
- ✅ Deve acessar o Painel de Atendimento e validar elementos principais
- ✅ Deve filtrar atendimentos por data
- ✅ Deve filtrar atendimentos por status
- ✅ Deve navegar entre as abas (Painel de Atendimentos e Vacinação)
- ✅ Deve acessar a página de pesquisa de animal
- ✅ Deve validar contadores de status estão presentes
- ✅ Deve limpar filtros aplicados
- ✅ Deve gerar um novo atendimento
- ✅ Deve alterar o status para em atendimento e gerar Venda
- ✅ Deve gerar um novo atendimento
- ✅ Deve alterar o status para em atendimento e gerar Venda
- ✅ Deve gerar um novo atendimento
- ✅ Deve alterar o status para em atendimento e gerar Venda
- ✅ Deve gerar um novo atendimento
- ✅ Deve alterar o status para em atendimento e gerar Venda

### 🐶 Arquivo: `petshop/smoke-petshop.spec.js`

#### 🧪 Suite: Smoke Test - Petshop
- ✅ Deve carregar a página de login do Petshop corretamente
- ✅ /auth/login

### 🐶 Arquivo: `petshop/tipos-atendimento.spec.js`

#### 🧪 Suite: Tipos de Atendimento - Petshop
- ✅ /
- ✅ Deve acessar a tela de listagem de Tipos de Atendimento
- ✅ Deve filtrar tipos de atendimento por nome
- ✅ Deve acessar a página de cadastro de tipo de atendimento
- ✅ Deve preencher formulário de cadastro de tipo de atendimento
- ✅ Deve voltar da página de cadastro para listagem
- ✅ Deve validar estrutura da tabela de listagem

### 🐶 Arquivo: `petshop/vacinas.spec.js`

#### 🧪 Suite: Vacinas - Petshop
- ✅ /
- ✅ Deve acessar a tela de listagem de Vacinas
- ✅ Deve filtrar vacinas por grupo
- ✅ Deve filtrar vacinas por status
- ✅ Deve acessar a página de cadastro de vacina
- ✅ Deve preencher formulário de cadastro de vacina
- ✅ Deve voltar da página de cadastro para listagem

---

## 📁 Producao

### 📄 Arquivo: `producao/cadastro-producao.spec.js`

#### 🧪 Suite: Cadastro de Produção
- ✅ /
- ✅ deve finalizar uma produção com modo de preparo preenchido
- ✅ deve localizar produção finalizada na listagem, abrir edição e reverter produção

### 📄 Arquivo: `producao/producao-listagem.spec.js`

#### 🧪 Suite: Listagem de Produção
- ✅ /
- ✅ exibe a tela de listagem com título, formulário de pesquisa e tabela visíveis
- ✅ navega para novo cadastro ao clicar no botão
- ✅ abre e fecha o formulário de pesquisa corretamente
- ✅ limpa todos os campos do formulário de pesquisa
- ✅ filtra por código e valida que a requisição foi enviada
- ✅ @pesquisarProducao
- ✅ filtra por produto e valida resultados na tabela
- ✅ @pesquisarProducao
- ✅ filtra por status EM ELABORAÇÃO e valida resultados
- ✅ @pesquisarProducao
- ✅ filtra por status FINALIZADO e valida resultados
- ✅ @pesquisarProducao
- ✅ filtra por período e valida que o parâmetro foi enviado
- ✅ @pesquisarProducao
- ✅ mantém a tabela visível mesmo quando não há resultados para o filtro aplicado
- ✅ @pesquisarProducao

---

## 📁 Produto

### 📄 Arquivo: `produto/pesquisa-preco.spec.js`

#### 🧪 Suite: Produto > Pesquisa Preço
- ✅ /
- ✅ Deve exibir a tela de Pesquisa Preço com todos os elementos principais
- ✅ Deve realizar busca por código de produto
- ✅ Deve exibir detalhes ao selecionar um produto

---

## 📁 Produtos

### 📄 Arquivo: `produtos/atributos.spec.js`

#### 🧪 Suite: Compras e Estoque > Produtos > Atributos
- ✅ @abrirNovo
- ✅ @salvarAtributo
- ✅ /produto/atributo
- ✅ /
- ✅ Deve abrir a listagem de atributos e mostrar o filtro
- ✅ Deve abrir o novo cadastro de atributo e demonstrar o formulário
- ✅ @abrirNovo
- ✅ @salvarAtributo
- ✅ @obterOpcao
- ✅ Deve criar e depois excluir um atributo personalizado sem tocar em Cor/Tamanho
- ✅ @abrirNovo
- ✅ @salvarAtributo
- ✅ /produto/atributo
- ✅ @excluirAtributo
- ✅ Deve excluir em lote atributos personalizados sem tocar em Cor/Tamanho
- ✅ @excluirAtributos

### 📄 Arquivo: `produtos/atualizar-dados-fiscais.spec.js`

#### 🧪 Suite: Atualizar Dados Fiscais
- ✅ Cenário 1: Deve filtrar, editar e atualizar dados na aba Vínculos Fiscais
- ✅ Cenário 2: Deve filtrar, editar e atualizar dados na aba Produto
- ✅ Cenário 3: Deve filtrar, editar e atualizar dados na aba Serviço

### 📄 Arquivo: `produtos/gestor-precos-listagem.spec.js`

#### 🧪 Suite: Gestor de Preços - Listagem
- ✅ /
- ✅ Deve exibir a listagem de preços
- ✅ Deve validar que a tabela contém dados
- ✅ Deve permitir acessar novo cadastro

### 📄 Arquivo: `produtos/gestor-precos.spec.js`

#### 🧪 Suite: Gestor de Preços - Cadastro
- ✅ /
- ✅ Deve exibir formulário de novo cadastro
- ✅ Deve cadastrar reajuste de preço com sucesso
- ✅ Deve permitir voltar para listagem
- ✅ Deve cadastrar reajuste com filtro de tipo NOTAS DE ENTRADA
- ✅ Deve cadastrar reajuste com operação FORMAR PREÇO
- ✅ Deve exibir tabela de itens afetados após salvar
- ✅ Deve cadastrar reajuste completo com filtros opcionais

### 📄 Arquivo: `produtos/gestor-promocoes-listagem.spec.js`

#### 🧪 Suite: Gestor de Promoções - Listagem
- ✅ /
- ✅ Deve exibir a listagem de promoções
- ✅ Deve permitir ordenar por código (crescente)
- ✅ Deve permitir ordenar por código (decrescente)
- ✅ Deve permitir ordenar por descrição (crescente)
- ✅ Deve permitir acessar novo cadastro

### 📄 Arquivo: `produtos/gestor-promocoes.spec.js`

#### 🧪 Suite: Gestor de Promoções - Cadastro
- ✅ /
- ✅ Deve exibir formulário de novo cadastro
- ✅ Deve cadastrar promoção com sucesso
- ✅ Deve permitir voltar para listagem
- ✅ Deve cadastrar promoção com todos os dias da semana
- ✅ Deve exibir seção de produtos após salvar
- ✅ Deve adicionar produto à promoção
- ✅ Deve cadastrar promoção completa com produtos e ativar
- ✅ Deve ativar promoção após cadastro completo
- ✅ Deve permitir desativar promoção ativa

### 📄 Arquivo: `produtos/grupos.spec.js`

#### 🧪 Suite: Compras e Estoque > Produtos > Grupos
- ✅ /
- ✅ @abrirGrupo
- ✅ @salvarGrupo
- ✅ /grupo-padrao
- ✅ permite filtrar a listagem de grupos
- ✅ abre o formulário de novo grupo
- ✅ @abrirGrupo
- ✅ @salvarGrupo
- ✅ /grupo-padrao
- ✅ exclui dois ou mais grupos customizados sem remover os padrões

### 📄 Arquivo: `produtos/listagem-produtos.spec.js`

#### 🧪 Suite: Listagem de produtos
- ✅ /
- ✅ exibe a listagem e permite abrir os filtros
- ✅ aplica filtros de grupo e switches e limpa os campos
- ✅ seleciona e limpa todos os checkboxes da tabela
- ✅ abre o modal Alterar Grupo ao selecionar um produto
- ✅ envia a alteração em massa usando o modal Alterar Grupo

---

## 📊 Relatorio

### 📄 Arquivo: `relatorio/relatorio-aniversariantes.spec.js`

#### 🧪 Suite: Relatorio de Aniversariantes
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Aniversariantes
- ✅ Deve permitir pesquisar o relatorio de Aniversariantes com mes atual
- ✅ Deve permitir pesquisar o relatorio de Aniversariantes sem filtros

### 📄 Arquivo: `relatorio/relatorio-caixa.spec.js`

#### 🧪 Suite: Relatorio de Caixa
- ✅ /
- ✅ Deve acessar via /relatorio-v2 e exibir o drawer com Aplicar Filtros
- ✅ Deve acessar via /relatorios-gerais e exibir o painel com Pesquisar
- ✅ /
- ✅ Cenário 1 (Fluxo Principal): Deve pesquisar no modo Sintético (Hoje) e exibir tabela e botões de exportação
- ✅ Cenário 2 (Filtros Complementares): Deve pesquisar no modo Analítico (Ontem) com filtros extras
- ✅ Cenário 3 (Edge Case): Deve pesquisar no modo Consolidado sem turno e exibir totalizadores

### 📄 Arquivo: `relatorio/relatorio-comissao.spec.js`

#### 🧪 Suite: Relatorio de Comissao
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Comissao
- ✅ Deve permitir pesquisar o relatorio de Comissao com periodo diario

### 📄 Arquivo: `relatorio/relatorio-contas-pagar.spec.js`

#### 🧪 Suite: Relatorio de Contas a Pagar
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Contas a Pagar
- ✅ Deve permitir pesquisar o relatorio de Contas a Pagar com periodo diario

### 📄 Arquivo: `relatorio/relatorio-contas-receber.spec.js`

#### 🧪 Suite: Relatorio de Contas a Receber
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Contas a Receber
- ✅ Deve permitir pesquisar o relatorio de Contas a Receber com periodo diario

### 📄 Arquivo: `relatorio/relatorio-evolucao.spec.js`

#### 🧪 Suite: Relatorio de Evolucao
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Evolucao
- ✅ Deve permitir pesquisar o relatorio de Evolucao

### 📄 Arquivo: `relatorio/relatorio-exibir-estoque.spec.js`

#### 🧪 Suite: Relatorio de Exibir Estoque
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Exibir Estoque
- ✅ Deve permitir pesquisar o relatorio de Exibir Estoque
- ✅ Deve exibir tabela de resultados após pesquisa
- ✅ Deve exibir estrutura da tabela com colunas após pesquisa
- ✅ Deve exibir botões de exportação PDF e Excel após pesquisa
- ✅ Deve exibir dados na tabela quando houver resultados

### 📄 Arquivo: `relatorio/relatorio-ficha-estoque.spec.js`

#### 🧪 Suite: Relatorio de Ficha Estoque
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Ficha Estoque
- ✅ Deve permitir pesquisar o relatorio de Ficha Estoque com periodo diario

### 📄 Arquivo: `relatorio/relatorio-fiscal-entrada-analitico.spec.js`

#### 🧪 Suite: Relatorio Fiscal Entrada Analitico
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Entrada Analitico
- ✅ Deve permitir pesquisar o relatorio Fiscal Entrada Analitico com periodo diario

### 📄 Arquivo: `relatorio/relatorio-fiscal-entrada-sintetico.spec.js`

#### 🧪 Suite: Relatorio Fiscal Entrada Sintetico
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Entrada Sintetico
- ✅ Deve permitir pesquisar o relatorio Fiscal Entrada Sintetico com periodo diario

### 📄 Arquivo: `relatorio/relatorio-fiscal-pis-cofins.spec.js`

#### 🧪 Suite: Relatorio Fiscal Pis/Cofins
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Pis/Cofins
- ✅ Deve permitir pesquisar o relatorio Fiscal Pis/Cofins com periodo diario

### 📄 Arquivo: `relatorio/relatorio-fiscal-saida-analitico.spec.js`

#### 🧪 Suite: Relatorio Fiscal Saida Analitico
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Saida Analitico
- ✅ Deve permitir pesquisar o relatorio Fiscal Saida Analitico com periodo diario

### 📄 Arquivo: `relatorio/relatorio-fiscal-saida-sintetico.spec.js`

#### 🧪 Suite: Relatorio Fiscal Saida Sintetico
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Saida Sintetico
- ✅ Deve permitir pesquisar o relatorio Fiscal Saida Sintetico com periodo diario

### 📄 Arquivo: `relatorio/relatorio-forma-pagamento.spec.js`

#### 🧪 Suite: Relatorio de Forma Pagamento
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Forma Pagamento
- ✅ Deve permitir pesquisar o relatorio de Forma Pagamento com periodo diario
- ✅ Deve exibir tabela de resultados após pesquisa com periodo diario
- ✅ Deve exibir estrutura da tabela com colunas após pesquisa
- ✅ Deve exibir botões de exportação PDF e Excel após pesquisa
- ✅ Deve exibir dados na tabela quando houver resultados

### 📄 Arquivo: `relatorio/relatorio-gerente-vendas.spec.js`

#### 🧪 Suite: Relatorio de Gerente de Vendas
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Gerente de Vendas
- ✅ Deve permitir pesquisar o relatorio de Gerente de Vendas com periodo diario

### 📄 Arquivo: `relatorio/relatorio-inventario.spec.js`

#### 🧪 Suite: Relatorio de Inventario
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Inventario
- ✅ Deve permitir gerar o relatorio de Inventario

### 📄 Arquivo: `relatorio/relatorio-listagem-clientes.spec.js`

#### 🧪 Suite: Relatorio de Listagem dos Clientes
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Listagem dos Clientes
- ✅ Deve permitir pesquisar o relatorio de Listagem dos Clientes sem filtros
- ✅ Deve permitir pesquisar o relatorio de Listagem dos Clientes com filtros basicos

### 📄 Arquivo: `relatorio/relatorio-mais-vendidos.spec.js`

#### 🧪 Suite: Relatorio de Mais Vendidos
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Mais Vendidos
- ✅ Deve permitir pesquisar o relatorio de Mais Vendidos com periodo diario

### 📄 Arquivo: `relatorio/relatorio-movimentacao-estoque.spec.js`

#### 🧪 Suite: Relatorio de Movimentacao de Estoque
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Movimentacao de Estoque
- ✅ Deve permitir pesquisar o relatorio de Movimentacao de Estoque com periodo diario

### 📄 Arquivo: `relatorio/relatorio-ncm.spec.js`

#### 🧪 Suite: Relatorio de NCM
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de NCM
- ✅ Deve permitir pesquisar o relatorio de NCM

### 📄 Arquivo: `relatorio/relatorio-nfse.spec.js`

#### 🧪 Suite: Relatorio NFSe
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio NFSe
- ✅ Deve permitir pesquisar o relatorio NFSe com periodo diario

### 📄 Arquivo: `relatorio/relatorio-periodo.spec.js`

#### 🧪 Suite: Relatorio de Periodo
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Periodo
- ✅ Deve permitir pesquisar o relatorio de Periodo com periodo diario
- ✅ Deve exibir tabela de resultados após pesquisa com periodo diario
- ✅ Deve exibir estrutura da tabela com colunas após pesquisa
- ✅ Deve exibir botões de exportação PDF e Excel após pesquisa
- ✅ Deve exibir dados na tabela quando houver resultados

### 📄 Arquivo: `relatorio/relatorio-projecao-cartoes.spec.js`

#### 🧪 Suite: Relatorio de Projecao de Cartoes
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Projecao de Cartoes
- ✅ Deve permitir pesquisar o relatorio de Projecao de Cartoes com periodo diario

### 📄 Arquivo: `relatorio/relatorio-tabela-preco.spec.js`

#### 🧪 Suite: Relatorio de Tabela de Preco
- ✅ /
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Tabela de Preco
- ✅ Deve permitir pesquisar o relatorio de Tabela de Preco

### 📄 Arquivo: `relatorio/relatorio-ultimas-compras.spec.js`

#### 🧪 Suite: Relatorio de Ultimas Compras
- ✅ /
- ✅ Deve exibir os elementos basicos do relatorio de Ultimas Compras
- ✅ Deve exibir vendas no relatorio de Ultimas Compras
- ✅ Deve exibir paginacao quando houver multiplas paginas

### 📄 Arquivo: `relatorio/relatorios.spec.js`

#### 🧪 Suite: Acessar relatorios: 
- ✅ Deve validar os relatorios

---

## 🛠️ Servicos

### 📄 Arquivo: `servicos/servico.spec.js`

#### 🧪 Suite: Funcionalidade de Serviço
- ✅ Deve cadastrar um novo serviço com sucesso

### 📄 Arquivo: `servicos/vinculo-fiscal-servico.spec.js`

#### 🧪 Suite: Vínculos Fiscais de Serviço
- ✅ Deve cadastrar um novo vínculo fiscal de serviço

---

## ⚙️ Setup

### 📄 Arquivo: `setup/_beforeConfigPadrao.spec.js`

#### 🧪 Suite: _beforeAll
- ✅ Configurar sistema Padrao com NFSe

---

## 📁 Sintegra

### 📄 Arquivo: `sintegra/gerarArquivo.spec.js`

#### 🧪 Suite: Sintegra > Gerar Arquivo
- ✅ /
- ✅ Deve gerar o arquivo com inventário e valor informado
- ✅ @gerarArquivo

---

## 📁 Sped

### 📄 Arquivo: `sped/gerarArquivo.spec.js`

#### 🧪 Suite: SPED > Gerar Arquivo
- ✅ /
- ✅ Deve gerar o arquivo fiscal com inventário ativado e valor informado
- ✅ @gerarArquivo

### 📄 Arquivo: `sped/plano-contas-sped.spec.js`

#### 🧪 Suite: SPED > Plano de Contas
- ✅ /
- ✅ Deve cadastrar um novo plano de contas com todos os campos obrigatórios
- ✅ Deve cadastrar um plano de contas com código referenciado opcional
- ✅ Deve cancelar o cadastro clicando em Voltar

### 📄 Arquivo: `sped/sped-configuracoes.spec.js`

#### 🧪 Suite: SPED > Configurações
- ✅ /
- ✅ Deve exibir a tela de Configurações do SPED com todos os elementos principais
- ✅ Deve validar a seção Fiscal com todos os campos
- ✅ Deve alterar configurações e salvar

### 📄 Arquivo: `sped/sped-icms-ajuste.spec.js`

#### 🧪 Suite: SPED - ICMS Ajuste Apuração
- ✅ /
- ✅ Deve exibir a tela de listagem de ICMS Ajustes Apurações
- ✅ Deve navegar para o cadastro ao clicar em Novo Cadastro
- ✅ Deve preencher o formulário de cadastro de ICMS Ajuste Apuração
- ✅ Deve cancelar o cadastro clicando em Voltar

### 📄 Arquivo: `sped/sped-inventario.spec.js`

#### 🧪 Suite: SPED - Inventário Base
- ✅ /
- ✅ Deve acessar a tela e validar elementos principais
- ✅ Deve preencher a data corretamente
- ✅ Deve validar o link de download
- ✅ Deve realizar upload de arquivo de inventário

### 📄 Arquivo: `sped/sped-ipi-ajuste.spec.js`

#### 🧪 Suite: SPED - IPI Ajuste Apuração
- ✅ /
- ✅ Deve exibir a tela de listagem de IPI Ajustes Apurações
- ✅ Deve navegar para o cadastro ao clicar em Novo Cadastro
- ✅ Deve preencher o formulário de cadastro de IPI Ajuste Apuração
- ✅ Deve cancelar o cadastro clicando em Voltar

### 📄 Arquivo: `sped/valores-declaratorios.spec.js`

#### 🧪 Suite: SPED > Valores Declaratórios
- ✅ /
- ✅ Deve exibir a tela de listagem de Valores Declaratórios
- ✅ Deve navegar para o cadastro ao clicar em Novo Cadastro
- ✅ Deve preencher o formulário de cadastro de valores declaratórios
- ✅ Deve cancelar o cadastro clicando em Voltar

---

## ✅ Ta em ordem

### 📄 Arquivo: `ta-em-ordem/ta-em-ordem.spec.js`

#### 🧪 Suite: Tá em ordem - Dashboard
- ✅ /
- ✅ deve exibir a tela Tá em ordem corretamente
- ✅ deve exibir todos os comboboxes de filtro
- ✅ deve validar que os comboboxes possuem opções disponíveis
- ✅ deve exibir os cards de informações (totalizadores)
- ✅ deve exibir a tabela de ranking de produtos
- ✅ deve exibir todos os links de ação rápida
- ✅ deve exibir todas as seções de gráficos
- ✅ deve validar URLs dos links de ação rápida
- ✅ deve validar estrutura da tabela de ranking (colunas)
- ✅ deve validar que os totalizadores exibem valores
- ✅ deve validar alteração do filtro de ranking e atualização da tabela

---

## 🛒 Venda nfcenfe

### 📄 Arquivo: `venda-nfcenfe/cadastro-nfe-ajuste.spec.js`

#### 🧪 Suite: Cadastro NFe Ajuste
- ✅ /
- ✅ realiza fluxo completo da NFe de ajuste avulsa

### 📄 Arquivo: `venda-nfcenfe/cadastro-nfe-complementar.spec.js`

#### 🧪 Suite: Cadastro NFe Complementar
- ✅ /
- ✅ realiza fluxo completo da NFe complementar avulsa

### 📄 Arquivo: `venda-nfcenfe/cadastro-nfe-devolucao.spec.js`

#### 🧪 Suite: Cadastro NFe Devolução
- ✅ /
- ✅ realiza fluxo completo da NFe de devolucao avulsa
- ✅ abre formulario de NFe devolucao compra apos pesquisar e selecionar
- ✅ realiza fluxo completo da NFe devolucao compra
- ✅ abre formulario de NFe devolucao movimentacao apos pesquisar e selecionar
- ✅ realiza fluxo completo da NFe devolucao movimentacao
- ✅ @carregarItens
- ✅ abre formulario de NFe devolucao nota fiscal saida apos pesquisar e selecionar
- ✅ realiza fluxo completo da NFe devolucao nota fiscal saida
- ✅ @carregarItens
- ✅ abre formulario de NFe devolucao trocas apos pesquisar e selecionar
- ✅ realiza fluxo completo da NFe devolucao trocas
- ✅ @carregarItens

### 📄 Arquivo: `venda-nfcenfe/cadastro-nfe-normal.spec.js`

#### 🧪 Suite: Cadastro NFe Normal
- ✅ /
- ✅ abre formulario de NFe normal avulsa apos continuar
- ✅ preenche formulario com natureza e destinatario na NFe normal avulsa
- ✅ abre formulario de NFe normal venda apos pesquisar e selecionar
- ✅ realiza fluxo completo da NFe normal venda
- ✅ abre formulario de NFe normal NFCe apos pesquisar e selecionar
- ✅ realiza fluxo completo da NFe normal NFCe
- ✅ abre formulario de NFe normal movimentacao apos pesquisar e selecionar
- ✅ realiza fluxo completo da NFe normal movimentacao

### 📄 Arquivo: `venda-nfcenfe/cadastro-nfe.spec.js`

#### 🧪 Suite: Cadastro NFe - Validações Gerais
- ✅ /
- ✅ abre tela de novo cadastro com passos e tipo Avulsa pre-selecionados
- ✅ permite alternar e exibe conteudos das abas de finalidade
- ✅ /
- ✅ /
- ✅ valida que todas as opções do dropdown Mais Ações estão visíveis
- ✅ valida opção Download XML do dropdown Mais Ações
- ✅ valida opção Visualizar Danfe do dropdown Mais Ações
- ✅ valida opção Enviar email do dropdown Mais Ações
- ✅ valida opção Clonar NFe do dropdown Mais Ações

### 📄 Arquivo: `venda-nfcenfe/cancelamento-nfe-ajuste.spec.js`

#### 🧪 Suite: Cancelamento NFe Ajuste
- ✅ /
- ✅ emite e cancela NFe ajuste avulsa

### 📄 Arquivo: `venda-nfcenfe/cancelamento-nfe-complementar.spec.js`

#### 🧪 Suite: Cancelamento NFe Complementar
- ✅ /
- ✅ emite e cancela NFe complementar avulsa

### 📄 Arquivo: `venda-nfcenfe/cancelamento-nfe-devolucao.spec.js`

#### 🧪 Suite: Cancelamento NFe Devolução
- ✅ /
- ✅ emite e cancela NFe devolucao avulsa

### 📄 Arquivo: `venda-nfcenfe/cancelamento-nfe-normal.spec.js`

#### 🧪 Suite: Cancelamento NFe Normal
- ✅ /
- ✅ emite e cancela NFe normal avulsa

### 📄 Arquivo: `venda-nfcenfe/carta-correcao-nfe-ajuste.spec.js`

#### 🧪 Suite: Carta de Correção NFe Ajuste
- ✅ /
- ✅ emite e gera carta de correção NFe ajuste avulsa

### 📄 Arquivo: `venda-nfcenfe/carta-correcao-nfe-complementar.spec.js`

#### 🧪 Suite: Carta de Correção NFe Complementar
- ✅ /
- ✅ emite e gera carta de correção NFe complementar avulsa

### 📄 Arquivo: `venda-nfcenfe/carta-correcao-nfe-devolucao.spec.js`

#### 🧪 Suite: Carta de Correção NFe Devolução
- ✅ /
- ✅ emite e gera carta de correção NFe devolucao avulsa

### 📄 Arquivo: `venda-nfcenfe/carta-correcao-nfe-normal.spec.js`

#### 🧪 Suite: Carta de Correção NFe Normal
- ✅ /
- ✅ emite e gera carta de correção NFe normal avulsa

### 📄 Arquivo: `venda-nfcenfe/listagem-nfe.spec.js`

#### 🧪 Suite: Listagem NFe
- ✅ /
- ✅ aplica filtro avancado por numero e serie dinamicos
- ✅ bloqueia exclusao sem selecionar registros
- ✅ marca todos os itens ao selecionar o checkbox geral
- ✅ aplica filtro por destinatario e serie usando autocomplete
- ✅ @buscarNfe
- ✅ envia o periodo selecionado ao pesquisar pela barra inferior
- ✅ @buscarNfePeriodo
- ✅ abre a edicao do primeiro registro da listagem
- ✅ acessa a impressao (DANFE) do primeiro registro

### 📄 Arquivo: `venda-nfcenfe/venda-nfce.spec.js`

#### 🧪 Suite: Realizar venda
- ✅ /
- ✅ Realizar venda com sucesso

### 📄 Arquivo: `venda-nfcenfe/venda-nfe.spec.js`

#### 🧪 Suite: Realizar venda com nfe
- ✅ /
- ✅ Realizar venda com sucesso

### 📄 Arquivo: `venda-nfcenfe/venda-nfse.spec.js`

#### 🧪 Suite: Realizar venda com NFSe
- ✅ /
- ✅ Deve gerar NFSe com sucesso a partir de uma venda com serviço a01

---

## 🛒 Vendas

### 📄 Arquivo: `vendas/cadastro-venda.spec.js`

#### 🧪 Suite: Cadastro de venda
- ✅ /
- ✅ exibe os botoes principais e o formulario inicial
- ✅ permite pesquisar cliente e vendedor via autocomplete
- ✅ @autocompleteCliente
- ✅ @autocompleteCliente
- ✅ @autocompleteVendedor
- ✅ @autocompleteVendedor
- ✅ mantem o painel de itens pronto para preenchimento
- ✅ exibe sugestoes ao pesquisar produtos
- ✅ @autocompleteProduto
- ✅ @autocompleteProduto
- ✅ apresenta o painel de pagamentos com mensagem padrao
- ✅ realiza fluxo completo alterando cliente, vendedor, item e gerando pagamento
- ✅ adiciona tres itens, aplica desconto e gera pagamento
- ✅ adiciona tres itens, aplica acrescimo e gera pagamento
- ✅ adiciona dois itens, gera duplicata em tres parcelas e valida somatorio
- ✅ cria venda sem pagamentos e exclui o registro

### 📄 Arquivo: `vendas/listagem-vendas.spec.js`

#### 🧪 Suite: Listagem de vendas
- ✅ /
- ✅ exibe a tabela principal e permite abrir o painel de filtros
- ✅ filtra por codigo e situacao e aguarda o retorno da listagem
- ✅ mantem o periodo informado na requisicao da pesquisa
- ✅ seleciona e desmarca todos os registros da listagem
- ✅ valida os fluxos de exclusao em massa
- ✅ abre o dropdown de acoes e exibe a opcao de clonar venda

---

## 🔗 Vinculo fiscal

### 📄 Arquivo: `vinculo-fiscal/novocadastrovinculofiscal.spec.js`

#### 🧪 Suite: Cadastro de Novo Vínculo Fiscal
- ✅ /
- ✅ Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas

### 📄 Arquivo: `vinculo-fiscal/vinculo-fiscal-listagem.spec.js`

#### 🧪 Suite: Testes de Listagem de Vínculo Fiscal
- ✅ /
- ✅ Deve realizar cadastro de novo vínculo fiscal
- ✅ Deve excluir todos os itens selecionados
- ✅ Deve editar o primeiro vínculo fiscal da tabela

---

