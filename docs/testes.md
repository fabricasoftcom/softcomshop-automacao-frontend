# ?? Testes Automatizados no Cypress

> ?? Este documento lista os testes organizados por módulo.

## ??? Balanco

### ?? Arquivo: `Balanco/balanco.spec.js`

#### ?? Suite: Balanco
- ? /
- ? Deve realizar um novo balanco

### ?? Arquivo: `Balanco/reverterBalanco.spec.js`

#### ?? Suite: Reverter Balanço
- ? Deve acessar a tela de balanco e reverter um balanco em andamento

## ??? cadastro-clientes

### ?Y"' Arquivo: `cadastro-clientes/cadastro-cliente.spec.js`

#### ?Y"? Suite: Cadastro de cliente
- Exibe abas e botoes principais do formulario
- Alterna os switches de bloqueado e desativado
- Realizar cadastro de cliente
- Realizar cadastro de cliente pessoa juridica com CNPJ
- Salva cliente com endereco completo, acessa a aba Outros Enderecos, abre o modal e salva um novo endereco
- Salva cliente, acessa a aba Contato/Notificacoes, valida ausencia de registros, abre o modal e salva um contato

### ?Y"' Arquivo: `cadastro-clientes/listagem-clientes.spec.js`

#### ?Y"? Suite: Listagem de clientes
- Exibe a tabela inicial, valida paginacao e abre o formulario de filtros
- Aplica filtro por nome, valida resultado e limpa o campo apos a pesquisa
- Seleciona todos os checkboxes e os limpa em seguida
- Tenta excluir sem selecionar registros e valida o alerta
- Seleciona um registro, abre o modal de exclusao e cancela a acao


## debounce-autocomplete

### Arquivo: `debounce-autocomplete/debounce-autocomplete.spec.js`

- Deve contar as requisições de autocomplete (arquivo removido/não existe)

## ??? financeiro

### ?? Arquivo: `financeiro/baixar-despesa.spec.js`

#### ?? Suite: Testes de Baixa de Despesas
- ? /
- ? Deve realizar baixa completa e verificar status 
- ? Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 
- ? Deve realizar baixa parcial (50%) e verificar status 
- ? Deve localizar e clicar no botão 
- ? Deve desfazer baixa e verificar valor pendente restaurado
- ? Deve expandir os detalhes de pagamento e verificar tabela vazia

### ?? Arquivo: `financeiro/cadastro-conta-corrente.spec.js`

#### ?? Suite: Cadastro de Conta Corrente
- ? /
- ? Deve cadastrar uma conta para o banco: ${nome} (Código: ${codigo}) com cobrança bancária

### ?? Arquivo: `financeiro/cadastro-conta.spec.js`

#### ?? Suite: Cadastro de Contas
- ? /
- ? Deve selecionar a Conta Corrente
- ? Deve selecionar a Caixinha
- ? Deve retornar à listagem ao clicar em Voltar

### ?? Arquivo: `financeiro/edicao-conta-corrente.spec.js`

#### ?? Suite: Testes de Edição de Conta Corrente
- ? /
- ? Deve acessar uma conta ativa com nome 
- ? Deve desativar uma conta ativa
- ? Deve alterar o último número da remessa, salvar e validar a alteração
- ? Deve ativar uma conta inativa

### ?? Arquivo: `financeiro/editarDespesa.spec.js`

#### ?? Suite: Edição Completa de Despesa
- ? /
- ? Deve editar completamente uma despesa e salvar

### ?? Arquivo: `financeiro/editarReceita.spec.js`

#### ?? Suite: Edição Completa de Receita
- ? /
- ? Deve realizar uma edição completa e salvar a receita
- ? Deve cancelar a edição clicando no botão 

### ?? Arquivo: `financeiro/listagem-conta.spec.js`

#### ?? Suite: Testes de Listagem de Contas
- ? /
- ? Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro

### ?? Arquivo: `financeiro/listagem-contas-a-pagar.spec.js`

#### ?? Suite: Testes de Listagem de Contas a Pagar
- ? /
- ? Deve validar a exibição da tabela de contas a pagar e linhas da tabela
- ? Deve validar a exibição dos totalizadores corretamente
- ? Deve filtrar despesas por período e tipo de data
- ? Deve efetuar pagamento da primeira despesa com status 
- ? Deve abrir a página de novo cadastro de despesa
- ? Deve selecionar todas as linhas da tabela
- ? Deve abrir o dropdown da primeira linha com status 
- ? Deve abrir o dropdown e selecionar a opção 
- ? Deve abrir o dropdown e selecionar a opção 
- ? Deve abrir o dropdown e selecionar a opção 
- ? Deve abrir o dropdown e selecionar a opção 
- ? Não deve cancelar a despesa se a confirmação for cancelada
- ? Não deve excluir a despesa se a confirmação for cancelada
- ? Deve abrir o dropdown na primeira linha com status 
- ? Deve abrir o dropdown e selecionar a opção 
- ? Deve selecionar o período 

### ?? Arquivo: `financeiro/listagem-contas-a-receber.spec.js`

#### ?? Suite: Testes da Listagem de Contas a Receber
#### ?? Suite: Ações de Cadastro
#### ?? Suite: Ações de Baixa e Confirmações
#### ?? Suite: Validações de Campos e Totalizadores
#### ?? Suite: Ações de Dropdown
#### ?? Suite: Exclusão e Confirmações
#### ?? Suite: Cancelamento de Parcelas
- ? /
- ? Deve abrir o modal de novo cadastro ao clicar no botão 
- ? Deve exibir erro ao tentar baixar sem selecionar parcelas
- ? Deve marcar o checkbox da primeira parcela, realizar a baixa e confirmar
- ? Deve exibir o popup de confirmação e cancelar a ação de baixa
- ? Deve validar os totalizadores de valores e rótulos
- ? Deve verificar que os campos estão visíveis na primeira linha
- ? Deve abrir o dropdown de ações e verificar que as opções estão visíveis
- ? Deve validar as opções do dropdown de ações
- ? Deve clicar na opção 
- ? Deve clicar na opção 
- ? Deve clicar na opção 
- ? Deve clicar na opção 
- ? Deve realizar a exclusão com sucesso e validar que o tamanho da tabela diminuiu
- ? Deve cancelar a exclusão e verificar que a parcela permanece na tabela
- ? Deve preencher o motivo, confirmar o cancelamento e verificar o status atualizado
- ? Deve preencher o motivo e cancelar a ação de cancelamento
- ? Deve selecionar o período 

### ?? Arquivo: `financeiro/novaDespesa.spec.js`

#### ?? Suite: Cadastro de Nova Despesa
- ? Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ? /financeiro/contas-a-pagar

### ?? Arquivo: `financeiro/novaReceita.spec.js`

#### ?? Suite: Cadastro de Nova Receita
- ? Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}
- ? /financeiro/contas-a-receber
- ? Valida erro ao tentar criar receita com tipo 
- ? /financeiro/contas-a-receber

### ?? Arquivo: `financeiro/recebimento.spec.js`

#### ?? Suite: Testes do Modal de Recebimento
- ? /
- ? Deve verificar os dados principais do modal
- ? Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece 
- ? Deve preencher as informações de pagamento, salvar e verificar status Pago
- ? Deve preencher as informações de pagamento com baixa parcial de 20% e salvar
- ? Deve localizar e clicar no botão 
- ? Deve expandir os detalhes de pagamento e verificar tabela vazia
- ? Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status 

### ?? Arquivo: `financeiro/transferencia-contas.spec.js`

#### ?? Suite: Testes de Transferência Entre Contas
- ? Deve realizar transferência completa entre contas
- ? Deve validar que o modal está visível ao acessar a página
- ? Deve exibir erro ao tentar salvar sem preencher campos obrigatórios
- ? Deve exibir erro ao tentar transferir de uma conta para ela mesma
- ? Deve cancelar a operação ao clicar no botão Voltar
- ? Deve exibir erro ao tentar transferir valor zero
- ? Deve validar que o modal está visível ao acessar a página

### ?? Arquivo: `financeiro/lancamento-conta.spec.js`

#### ?? Suite: Testes de Lançamento Conta
- ? Deve realizar lançamento conta completo
- ? Deve validar que a tela está visível ao acessar
- ? Deve realizar lançamento conta com operação CRÉDITO
- ? Deve realizar lançamento conta com tipo de data LANÇAMENTO
- ? Deve cancelar lançamento clicando em Voltar
- ? Deve exibir erro ao tentar salvar sem preencher campos obrigatórios

### ?? Arquivo: `financeiro/recibo.spec.js`

#### ?? Suite: Testes de Recibo
- ? Deve validar que a página de listagem está visível ao acessar
- ? Deve abrir o formulário de novo cadastro ao clicar no botão Novo Cadastro
- ? Deve validar que o formulário de novo cadastro está visível ao acessar diretamente
- ? Deve preencher e salvar um novo recibo com sucesso
- ? Deve cancelar o cadastro clicando em Voltar
- ? Deve exibir erro ao tentar salvar sem preencher campos obrigatórios

### ?? Arquivo: `financeiro/listagem-categorias.spec.js`

#### ?? Suite: Testes de Listagem de Categorias
- ? Deve exibir a página de listagem de categorias corretamente
- ? Deve abrir modal de nova categoria de receita
- ? Deve abrir modal de nova categoria de despesa
- ? Deve filtrar categorias de receita por "Todas"
- ? Deve filtrar categorias de receita por "Ativas"
- ? Deve filtrar categorias de receita por "Inativas"
- ? Deve filtrar categorias de despesa por "Todas"
- ? Deve filtrar categorias de despesa por "Ativas"
- ? Deve filtrar categorias de despesa por "Inativas"

### ?? Arquivo: `financeiro/cadastro-categoria.spec.js`

#### ?? Suite: Cadastro de Categorias
- ? Deve cadastrar uma nova categoria de receita com descrição apenas
- ? Deve cadastrar uma nova categoria de despesa com descrição apenas
- ? Deve cadastrar uma nova categoria de receita com todos os campos
- ? Deve cadastrar uma nova categoria de despesa com checkbox "Não Exibir DRE" marcado
- ? Deve cancelar o cadastro clicando em Voltar

## ??? login

### ?? Arquivo: `login/login.spec.js`

#### ?? Suite: Login com credenciais validas
#### ?? Suite: Login com credenciais invalidas
- ? Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas

## ??? menulateral

### ?? Arquivo: `menulateral/menuLateralTeste.spec.js`

#### ?? Suite: Validação do Menu Lateral do Softcomshop
- ? Deve validar os menus e submenus
- ? /
- ? /
- ? /

## ??? orcamento

### ?? Arquivo: `orcamento/orcamento-cadastro.spec.js`

#### ?? Suite: Cadastro de Novo Orçamento
- ? Deve preencher e salvar um novo orçamento com sucesso

### ?? Arquivo: `orcamento/orcamento-listagem.spec.js`

#### ?? Suite: Testes de Listagem de Orçamento
- ? Deve realizar cadastro de novo orçamento

## ??? producao

### ?? Arquivo: `producao/producao-listagem.spec.js`

#### ?? Suite: Listagem de Produção
- Deve exibir a tela de listagem de produção corretamente
- Deve abrir e fechar o modal de filtros
- Deve realizar pesquisa por código
- Deve realizar pesquisa por produto
- Deve navegar para novo cadastro
- Deve validar mensagem quando não há resultados

### ?? Arquivo: `producao/cadastro-producao.spec.js`

#### ?? Suite: Cadastro de Produção
- Deve finalizar uma produção com modo de preparo preenchido: adiciona item inicial, valida página de edição, adiciona produto na tabela, preenche modo de preparo, salva e finaliza a produção
- Deve localizar produção finalizada na listagem, abrir edição e reverter produção: acessa a listagem, localiza uma produção finalizada, abre para edição e reverte a produção

## relatorio

### Arquivo: `relatorio/relatorios.spec.js`

#### Suite: Acessar relatorios: 
- Deve validar os relatorios
- /softcomtecnologia/relatorios-gerais

### Arquivo: `relatorio/relatorio-caixa.spec.js`

#### Suite: Relatório de Caixa
- Deve exibir os filtros e acoes disponiveis para o relatorio de Caixa
- Deve permitir pesquisar o relatorio de Caixa com periodo diario
- Deve gerar o relatorio de Caixa do tipo sintetico
- Deve pesquisar o periodo atual sem turno e exibir dados em tela
- Deve listar vendas no relatorio analitico sem informar turno

### Arquivo: `relatorio/relatorio-periodo.spec.js`

#### Suite: Relatorio de Periodo
- Deve exibir os filtros e acoes disponiveis para o relatorio de Periodo
- Deve permitir pesquisar o relatorio de Periodo com periodo diario

### Arquivo: `relatorio/relatorio-mais-vendidos.spec.js`

#### Suite: Relatorio de Mais Vendidos
- Deve exibir os filtros e acoes disponiveis para o relatorio de Mais Vendidos
- Deve permitir pesquisar o relatorio de Mais Vendidos com periodo diario

### Arquivo: `relatorio/relatorio-forma-pagamento.spec.js`

#### Suite: Relatorio de Forma Pagamento
- Deve exibir os filtros e acoes disponiveis para o relatorio de Forma Pagamento
- Deve permitir pesquisar o relatorio de Forma Pagamento com periodo diario

### Arquivo: `relatorio/relatorio-gerente-vendas.spec.js`

#### Suite: Relatorio de Gerente de Vendas
- Deve exibir os filtros e acoes disponiveis para o relatorio de Gerente de Vendas
- Deve permitir pesquisar o relatorio de Gerente de Vendas com periodo diario

### Arquivo: `relatorio/relatorio-evolucao.spec.js`

#### Suite: Relatorio de Evolucao
- Deve exibir os filtros e acoes disponiveis para o relatorio de Evolucao
- Deve permitir pesquisar o relatorio de Evolucao

### Arquivo: `relatorio/relatorio-comissao.spec.js`

#### Suite: Relatorio de Comissao
- Deve exibir os filtros e acoes disponiveis para o relatorio de Comissao
- Deve permitir pesquisar o relatorio de Comissao com periodo diario

### Arquivo: `relatorio/relatorio-fiscal-saida-analitico.spec.js`

#### Suite: Relatorio Fiscal Saida Analitico
- Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Saida Analitico
- Deve permitir pesquisar o relatorio Fiscal Saida Analitico com periodo diario

### Arquivo: `relatorio/relatorio-fiscal-saida-sintetico.spec.js`

#### Suite: Relatorio Fiscal Saida Sintetico
- Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Saida Sintetico
- Deve permitir pesquisar o relatorio Fiscal Saida Sintetico com periodo diario

### Arquivo: `relatorio/relatorio-fiscal-entrada-analitico.spec.js`

#### Suite: Relatorio Fiscal Entrada Analitico
- Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Entrada Analitico
- Deve permitir pesquisar o relatorio Fiscal Entrada Analitico com periodo diario

### Arquivo: `relatorio/relatorio-fiscal-entrada-sintetico.spec.js`

#### Suite: Relatorio Fiscal Entrada Sintetico
- Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Entrada Sintetico
- Deve permitir pesquisar o relatorio Fiscal Entrada Sintetico com periodo diario

### Arquivo: `relatorio/relatorio-fiscal-pis-cofins.spec.js`

#### Suite: Relatorio Fiscal Pis/Cofins
- Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Pis/Cofins
- Deve permitir pesquisar o relatorio Fiscal Pis/Cofins com periodo diario

### Arquivo: `relatorio/relatorio-nfse.spec.js`

#### Suite: Relatorio NFSe
- Deve exibir os filtros e acoes disponiveis para o relatorio NFSe
- Deve permitir pesquisar o relatorio NFSe com periodo diario

### Arquivo: `relatorio/relatorio-contas-receber.spec.js`

#### Suite: Relatorio de Contas a Receber
- Deve exibir os filtros e acoes disponiveis para o relatorio de Contas a Receber
- Deve permitir pesquisar o relatorio de Contas a Receber com periodo diario

### Arquivo: `relatorio/relatorio-contas-pagar.spec.js`

#### Suite: Relatorio de Contas a Pagar
- Deve exibir os filtros e acoes disponiveis para o relatorio de Contas a Pagar
- Deve permitir pesquisar o relatorio de Contas a Pagar com periodo diario

### Arquivo: `relatorio/relatorio-projecao-cartoes.spec.js`

#### Suite: Relatorio de Projecao de Cartoes
- Deve exibir os filtros e acoes disponiveis para o relatorio de Projecao de Cartoes
- Deve permitir pesquisar o relatorio de Projecao de Cartoes com periodo diario

### Arquivo: `relatorio/relatorio-exibir-estoque.spec.js`

#### Suite: Relatorio de Exibir Estoque
- Deve exibir os filtros e acoes disponiveis para o relatorio de Exibir Estoque
- Deve permitir pesquisar o relatorio de Exibir Estoque

### Arquivo: `relatorio/relatorio-tabela-preco.spec.js`

#### Suite: Relatorio de Tabela de Preco
- Deve exibir os filtros e acoes disponiveis para o relatorio de Tabela de Preco
- Deve permitir pesquisar o relatorio de Tabela de Preco

### Arquivo: `relatorio/relatorio-ficha-estoque.spec.js`

#### Suite: Relatorio de Ficha Estoque
- Deve exibir os filtros e acoes disponiveis para o relatorio de Ficha Estoque
- Deve permitir pesquisar o relatorio de Ficha Estoque com periodo diario

### Arquivo: `relatorio/relatorio-inventario.spec.js`

#### Suite: Relatorio de Inventario
- Deve exibir os filtros e acoes disponiveis para o relatorio de Inventario
- Deve permitir gerar o relatorio de Inventario

### Arquivo: `relatorio/relatorio-ncm.spec.js`

#### Suite: Relatorio de NCM
- Deve exibir os filtros e acoes disponiveis para o relatorio de NCM
- Deve permitir pesquisar o relatorio de NCM

### Arquivo: `relatorio/relatorio-movimentacao-estoque.spec.js`

#### Suite: Relatorio de Movimentacao de Estoque
- Deve exibir os filtros e acoes disponiveis para o relatorio de Movimentacao de Estoque
- Deve permitir pesquisar o relatorio de Movimentacao de Estoque com periodo diario

### Arquivo: `relatorio/relatorio-aniversariantes.spec.js`

#### Suite: Relatorio de Aniversariantes
- Deve exibir os filtros e acoes disponiveis para o relatorio de Aniversariantes
- Deve permitir pesquisar o relatorio de Aniversariantes com mes atual
- Deve permitir pesquisar o relatorio de Aniversariantes sem filtros

### Arquivo: `relatorio/relatorio-listagem-clientes.spec.js`

#### Suite: Relatorio de Listagem dos Clientes
- Deve exibir os filtros e acoes disponiveis para o relatorio de Listagem dos Clientes
- Deve permitir pesquisar o relatorio de Listagem dos Clientes sem filtros
- Deve permitir pesquisar o relatorio de Listagem dos Clientes com filtros basicos

### Arquivo: `relatorio/relatorio-ultimas-compras.spec.js`

#### Suite: Relatorio de Ultimas Compras
- Deve exibir os elementos basicos do relatorio de Ultimas Compras
- Deve exibir vendas no relatorio de Ultimas Compras
- Deve exibir paginacao quando houver multiplas paginas

## ??? setup

### ?? Arquivo: `setup/_beforeConfigPadrao.spec.js`

#### ?? Suite: _beforeAll
#### ?? Suite: cypress setup
- ? Configurar sistema Padrao com NFSe

## ??? compras

### Arquivo: `compras/cadastro-fornecedor.spec.js`

#### Suite: Cadastro de Fornecedor
- Deve cadastrar um novo fornecedor com sucesso

### Arquivo: `compras/cadastro-compra-xml.spec.js`

#### ?? Suite: Cadastro de compra - Importação XML
- Importando NFe pelo XML: executa fluxo completo de importacao de NFe via XML, preenchendo CFOP (1102) e vinculo fiscal (usa XML aleatorio da pasta comprasxml)
- Importando NFe pelo XML e excluindo: executa fluxo completo de importacao usando apenas XMLs sem faturas (pasta xmlSemFaturas) e em seguida exclui a NFe importada (regra de negocio: so e possivel excluir NFe sem tag <dup>)
- Deve aplicar grupo para todos os itens na importacao: prepara tela de importacao, aplica grupo para todos os itens, preenche CFOP, confirma natureza, informa vinculo fiscal, importa e valida sucesso
- Deve relacionar produto na importacao: prepara tela de importacao, relaciona produto no primeiro item, preenche CFOP, confirma natureza, informa vinculo fiscal, importa e valida sucesso
- Deve adicionar grupo na importacao: prepara tela de importacao, adiciona grupo, preenche CFOP, confirma natureza, informa vinculo fiscal, importa e valida sucesso
- Deve adicionar vinculo na importacao: prepara tela de importacao, adiciona vinculo, preenche CFOP, confirma natureza, importa e valida sucesso
- Deve alterar CFOP do item na importacao: prepara tela de importacao, altera CFOP do primeiro item para 5102, preenche CFOP geral, confirma natureza, informa vinculo fiscal, importa e valida sucesso
- Deve lancar categoria na importacao: prepara tela de importacao, lanca categoria no primeiro item, preenche CFOP, confirma natureza, informa vinculo fiscal, importa e valida sucesso

### Arquivo: `compras/cadastro-compra-manual.spec.js`

#### ?? Suite: Cadastro manual de compra
- realiza fluxo completo alterando fornecedor, adicionando item e gerando pagamento: seleciona fornecedor, adiciona produto e gera pagamento padrao
- adiciona tres itens, aplica desconto e gera pagamento: seleciona fornecedor, adiciona tres produtos distintos, aplica desconto de 5% e gera pagamento
- cria compra sem pagamentos e exclui o registro: seleciona fornecedor, adiciona dois produtos, salva compra e exclui o registro

### ?? Arquivo: `compras/listagem-movimentacoes.spec.js`

#### ?? Suite: Listagem de Movimentações
- Deve filtrar movimentações por operação: abre o formulario de pesquisa, preenche operacao ENTRADA, dispara a busca e valida que a tabela apresenta resultados

### ?? Arquivo: `compras/cadastro-movimentacoes.spec.js`

#### ?? Suite: Cadastro de Movimentações
- Deve abrir o formulario de novo cadastro de movimentacao para operacao Entrada: navega ate o formulario, valida campos principais, define operacao ENTRADA, preenche observacao, salva, adiciona item com quantidade 2,00 e preco 10,00, validando tabela e totalizadores
- Deve abrir o formulario de novo cadastro de movimentacao para operacao Saida: navega ate o formulario, valida campos principais, define operacao SAIDA, preenche observacao, salva, adiciona item com quantidade 1,00 e preco 5,00, validando tabela e totalizadores

### ?? Arquivo: `compras/importacao-compra-nuvem-fiscal.spec.js`

#### ?? Suite: Importação de Compra pela Nuvem Fiscal
- Deve importar compra pela Nuvem Fiscal filtrando por Ciência da Operação: acessa Nuvem Fiscal, filtra por tipo de manifestação "Ciência da Operação", pesquisa, seleciona primeiro item para importar, preenche natureza (1102 - COMPRA PARA COMERCIALIZAÇÃO), aplica vínculo fiscal para todos os itens, importa e valida sucesso

## vendas

### Arquivo: endas/listagem-vendas.spec.js

#### Suite: Listagem de vendas
- Exibe a tabela inicial, valida a paginacao e abre o painel de filtros
- Filtra por codigo e situacao, aguardando o retorno da listagem
- Mantem o periodo informado ao enviar a requisicao de busca
- Seleciona e desmarca todos os registros da tabela
- Valida os cenarios de exclusao em massa (com e sem selecao)
- Abre o dropdown de acoes e garante a visualizacao da opcao de clonar venda

### Arquivo: endas/cadastro-venda.spec.js

#### Suite: Cadastro de venda
- Exibe os botoes principais e o formulario base
- Permite pesquisar cliente e vendedor utilizando autocomplete
- Mantem o painel de itens pronto para preenchimento
- Exibe sugestoes ao pesquisar produtos
- Apresenta o painel de pagamentos com a mensagem padrao
- Realiza fluxo completo alterando cliente, vendedor, item e gerando pagamento



## venda-nfcenfe

### Arquivo: `venda-nfcenfe/venda-nfe.spec.js`

#### Suite: Realizar venda NFe
- Realizar venda com sucesso

### Arquivo: `venda-nfcenfe/venda-nfce.spec.js`

#### Suite: Realizar venda NFCe
- Realizar venda com sucesso

### ?? Arquivo: `venda-nfcenfe/cadastro-nfe.spec.js`

#### ?? Suite: Cadastro NFe - Validações Gerais
- Abre tela de novo cadastro com passos e tipo Avulsa pre-selecionados: valida tela inicial, passos, tabs e skeletons
- Permite alternar e exibe conteudos das abas de finalidade: valida navegacao entre as abas de finalidade (Normal, Devolucao, Ajuste, Complementar)

### ?? Arquivo: `venda-nfcenfe/cadastro-nfe-normal.spec.js`

#### ?? Suite: Cadastro NFe Normal
- Abre formulario de NFe normal avulsa apos continuar: navega ate o formulario e valida campos principais
- Preenche formulario com natureza e destinatario na NFe normal avulsa: preenche natureza (CFOP 5102), seleciona destinatario, aguarda salvamento, insere item, gera pagamento, emite a nota e valida o modal de sucesso
- Abre formulario de NFe normal venda apos pesquisar e selecionar: seleciona tipo Venda, pesquisa vendas disponiveis e seleciona a primeira, validando o formulario carregado
- Testa selecao de venda com cliente diferente de consumidor: seleciona tipo Venda, pesquisa vendas disponiveis, filtra e seleciona a primeira venda com cliente diferente de "CONSUMIDOR" e clica em continuar
- Realiza fluxo completo da NFe normal venda: pesquisa e seleciona uma venda, preenche natureza, insere item, gera pagamento, emite a nota e valida o modal de sucesso
- Abre formulario de NFe normal NFCe apos pesquisar e selecionar: seleciona tipo NFCe, pesquisa NFCes disponiveis e seleciona a primeira, validando o formulario carregado
- Realiza fluxo completo da NFe normal NFCe: pesquisa e seleciona uma NFCe, preenche natureza, insere item, gera pagamento, emite a nota e valida o modal de sucesso
- Abre formulario de NFe normal movimentacao apos pesquisar e selecionar: seleciona tipo Movimentacao, pesquisa movimentacoes disponiveis e seleciona a primeira, validando o formulario carregado
- Realiza fluxo completo da NFe normal movimentacao: pesquisa e seleciona uma movimentacao, preenche natureza, insere item, gera pagamento, emite a nota e valida o modal de sucesso

### ?? Arquivo: `venda-nfcenfe/cadastro-nfe-devolucao.spec.js`

#### ?? Suite: Cadastro NFe Devolução
- Realiza fluxo completo da NFe de devolucao avulsa: seleciona a finalidade devolucao, valida formulario (finalidade 4), preenche natureza (CFOP 1202) e destinatario, insere item, gera pagamento, emite a nota e valida o modal de sucesso
- Abre formulario de NFe devolucao compra apos pesquisar e selecionar: seleciona tipo Compra, pesquisa compras disponiveis e seleciona a primeira, validando o formulario carregado
- Realiza fluxo completo da NFe devolucao compra: pesquisa e seleciona uma compra, preenche natureza (CFOP 1202), insere item, gera pagamento, emite a nota e valida o modal de sucesso
- Abre formulario de NFe devolucao movimentacao apos pesquisar e selecionar: seleciona tipo Movimentacao, pesquisa movimentacoes disponiveis e seleciona a primeira, validando o formulario carregado
- Realiza fluxo completo da NFe devolucao movimentacao: pesquisa e seleciona uma movimentacao, preenche natureza (CFOP 1202), insere item, gera pagamento, emite a nota e valida o modal de sucesso
- Abre formulario de NFe devolucao nota fiscal saida apos pesquisar e selecionar: seleciona tipo Nota Fiscal Saida, pesquisa notas disponiveis e seleciona a primeira, validando o formulario carregado
- Realiza fluxo completo da NFe devolucao nota fiscal saida: pesquisa e seleciona uma nota fiscal de saida, preenche natureza (CFOP 1202), insere item, gera pagamento, emite a nota e valida o modal de sucesso
- Abre formulario de NFe devolucao trocas apos pesquisar e selecionar: seleciona tipo Trocas, pesquisa trocas disponiveis e seleciona a primeira, validando o formulario carregado
- Realiza fluxo completo da NFe devolucao trocas: pesquisa e seleciona uma troca, preenche natureza (CFOP 1202), insere item, gera pagamento, emite a nota e valida o modal de sucesso

### ?? Arquivo: `venda-nfcenfe/cadastro-nfe-ajuste.spec.js`

#### ?? Suite: Cadastro NFe Ajuste
- Realiza fluxo completo da NFe de ajuste avulsa: seleciona a finalidade ajuste, valida formulario (finalidade 3), preenche dados da nota de ajuste (numero e chave via autocomplete), preenche natureza (CFOP 5102) com tratamento de SweetAlert, valida destinatario preenchido automaticamente, insere item, gera pagamento, emite a nota e valida o modal de sucesso

### ?? Arquivo: `venda-nfcenfe/cadastro-nfe-complementar.spec.js`

#### ?? Suite: Cadastro NFe Complementar
- Realiza fluxo completo da NFe complementar avulsa: seleciona a finalidade complementar, valida formulario, preenche dados da nota complementar (numero e chave via autocomplete), preenche natureza (CFOP 5102) com tratamento de SweetAlert, valida destinatario preenchido automaticamente, insere item com quantidade e valores zerados (especifico para complementar), gera pagamento, emite a nota e valida o modal de sucesso

### ?? Arquivo: `venda-nfcenfe/listagem-nfe.spec.js`

#### ?? Suite: Listagem de NFe
- (Verificar testes ativos no arquivo)

### ?? Arquivo: `venda-nfcenfe/cancelamento-nfe-normal.spec.js`

#### ?? Suite: Cancelamento NFe Normal
- Emite e cancela NFe normal avulsa: realiza fluxo completo de emissao (natureza, destinatario, itens, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e cancela a NFe

### ?? Arquivo: `venda-nfcenfe/cancelamento-nfe-devolucao.spec.js`

#### ?? Suite: Cancelamento NFe Devolução
- Emite e cancela NFe devolucao avulsa: realiza fluxo completo de emissao de NFe devolucao avulsa (natureza CFOP 1202, destinatario, itens, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e cancela a NFe

### ?? Arquivo: `venda-nfcenfe/cancelamento-nfe-ajuste.spec.js`

#### ?? Suite: Cancelamento NFe Ajuste
- Emite e cancela NFe ajuste avulsa: realiza fluxo completo de emissao de NFe ajuste avulsa (preenchimento de nota de ajuste, natureza CFOP 5102, destinatario, itens, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e cancela a NFe

### ?? Arquivo: `venda-nfcenfe/cancelamento-nfe-complementar.spec.js`

#### ?? Suite: Cancelamento NFe Complementar
- Emite e cancela NFe complementar avulsa: realiza fluxo completo de emissao de NFe complementar avulsa (preenchimento de nota complementar, natureza CFOP 5102, destinatario, itens zerados, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e cancela a NFe

### ?? Arquivo: `venda-nfcenfe/carta-correcao-nfe-normal.spec.js`

#### ?? Suite: Carta de Correção NFe Normal
- Emite e gera carta de correção NFe normal avulsa: realiza fluxo completo de emissao (natureza, destinatario, itens, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e emite carta de correção

### ?? Arquivo: `venda-nfcenfe/carta-correcao-nfe-devolucao.spec.js`

#### ?? Suite: Carta de Correção NFe Devolução
- Emite e gera carta de correção NFe devolucao avulsa: realiza fluxo completo de emissao de NFe devolucao avulsa (natureza CFOP 1202, destinatario, itens, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e emite carta de correção

### ?? Arquivo: `venda-nfcenfe/carta-correcao-nfe-ajuste.spec.js`

#### ?? Suite: Carta de Correção NFe Ajuste
- Emite e gera carta de correção NFe ajuste avulsa: realiza fluxo completo de emissao de NFe ajuste avulsa (preenchimento de nota de ajuste, natureza CFOP 5102, destinatario, itens, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e emite carta de correção

### ?? Arquivo: `venda-nfcenfe/carta-correcao-nfe-complementar.spec.js`

#### ?? Suite: Carta de Correção NFe Complementar
- Emite e gera carta de correção NFe complementar avulsa: realiza fluxo completo de emissao de NFe complementar avulsa (preenchimento de nota complementar, natureza CFOP 5102, destinatario, itens zerados, pagamentos, emissao), retorna a listagem, abre edicao da primeira linha e emite carta de correção

## ??? consignacao

### ?? Arquivo: `consignacao/requisicao-consignacao-listagem.spec.js`

#### ?? Suite: Listagem de Requisições de Consignação
- Deve exibir a tabela de requisições e permitir abrir o formulário de pesquisa
- Deve permitir navegar para novo cadastro
- Deve aplicar filtros de pesquisa
- Deve selecionar e desmarcar todos os registros

### ?? Arquivo: `consignacao/requisicao-consignacao-cadastro.spec.js`

#### ?? Suite: Cadastro de Requisição de Consignação
- Deve abrir a tela de cadastro de requisição
- Deve realizar o cadastro de uma requisição com sucesso
- Deve adicionar um produto à requisição após o cadastro

### ?? Arquivo: `consignacao/devolucao-consignacao-listagem.spec.js`

#### ?? Suite: Listagem de Devoluções/Vendas de Consignação
- Deve exibir a tabela de devoluções e permitir abrir o formulário de pesquisa
- Deve permitir navegar para novo cadastro
- Deve aplicar filtros de pesquisa
- Deve selecionar e desmarcar todos os registros

### ?? Arquivo: `consignacao/devolucao-consignacao-cadastro.spec.js`

#### ?? Suite: Cadastro de Devolução/Venda de Consignação
- Deve abrir a tela de cadastro de devolução/venda
- Deve realizar o cadastro de uma devolução/venda com sucesso
- Deve adicionar um produto à devolução/venda após o cadastro

## ??? produtos

### ?? Arquivo: `produtos/gestor-precos-listagem.spec.js`

#### ?? Suite: Gestor de Preços - Listagem
- Deve exibir a listagem de preços
- Deve validar que a tabela contém dados
- Deve permitir acessar novo cadastro

### ?? Arquivo: `produtos/gestor-precos.spec.js`

#### ?? Suite: Gestor de Preços - Cadastro
- Deve exibir formulário de novo cadastro
- Deve cadastrar reajuste de preço com sucesso
- Deve permitir voltar para listagem
- Deve cadastrar reajuste com filtro de tipo NOTAS DE ENTRADA
- Deve cadastrar reajuste com operação FORMAR PREÇO
- Deve exibir tabela de itens afetados após salvar
- Deve cadastrar reajuste completo com filtros opcionais

### ?? Arquivo: `produtos/gestor-promocoes.spec.js`

#### ?? Suite: Gestor de Promoções
#### ?? Suite: Listagem de Promoções
- ? Deve exibir a listagem de promoções
- ? Deve permitir ordenar por código (crescente)
- ? Deve permitir ordenar por código (decrescente)
- ? Deve permitir ordenar por descrição (crescente)
- ? Deve permitir acessar novo cadastro

#### ?? Suite: Cadastro de Promoção
- ? Deve exibir formulário de novo cadastro
- ? Deve cadastrar promoção com sucesso
- ? Deve permitir voltar para listagem
- ? Deve cadastrar promoção com todos os dias da semana
- ? Deve exibir seção de produtos após salvar
- ? Deve adicionar produto à promoção
- ? Deve cadastrar promoção completa com produtos e ativar
- ? Deve ativar promoção após cadastro completo
- ? Deve permitir desativar promoção ativa

## ??? configuracoes

### ?? Arquivo: `configuracoes/empresa-listagem.spec.js`

#### ?? Suite: Listagem de empresas
- Exibe a listagem e permite abrir o formulario de filtros
- Valida paginacao inicial da listagem
- Navega para novo cadastro ao clicar no botao Novo Cadastro
- Aplica filtro por nome e limpa o campo apos a pesquisa
- Abre e fecha o formulario de pesquisa corretamente
- Aplica filtro por CNPJ e valida resultado
- Aplica filtro por Fantasia e valida resultado
- Aplica filtro por Razao Social e valida resultado
- Limpa todos os campos do formulario de pesquisa
- Seleciona e limpa todos os checkboxes da tabela
- Alerta quando tentar excluir sem selecionar registros
- Abre o modal de exclusao ao selecionar registros e cancela a acao
- Abre a edicao do primeiro registro da listagem

### ?? Arquivo: `configuracoes/empresa-cadastro.spec.js`

#### ?? Suite: Cadastro de empresa
- Deve exibir as abas e botoes principais do formulario
- Deve realizar cadastro completo de empresa
- Deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- Deve permitir navegar entre todas as abas do formulario
- Deve retornar para listagem ao clicar em Voltar
- Deve validar autocomplete de bairro
- Deve validar autocomplete de cidade
- Deve editar empresa existente e validar alteracao

### ?? Arquivo: `configuracoes/funcionario-listagem.spec.js`

#### ?? Suite: Listagem de funcionários
- Exibe a listagem e permite abrir o formulario de filtros
- Valida paginacao inicial da listagem
- Navega para novo cadastro ao clicar no botao Novo Cadastro
- Aplica filtro por nome e limpa o campo apos a pesquisa
- Abre e fecha o formulario de pesquisa corretamente
- Aplica filtro por codigo e valida resultado
- Seleciona e limpa todos os checkboxes da tabela
- Alerta quando tentar excluir sem selecionar registros
- Abre o modal de exclusao ao selecionar registros e cancela a acao

### ?? Arquivo: `configuracoes/funcionario-cadastro.spec.js`

#### ?? Suite: Cadastro de funcionário
- Deve exibir as abas e botoes principais do formulario
- Deve realizar cadastro completo de funcionario
- Deve exibir erro ao tentar salvar sem preencher campos obrigatorios
- Deve permitir navegar entre todas as abas do formulario
- Deve retornar para listagem ao clicar em Voltar
- Deve validar autocomplete de funcao
- Deve validar autocomplete de bairro
- Deve validar autocomplete de cidade
- Deve editar funcionario existente e validar alteracao

## ??? vinculo-fiscal

### ?? Arquivo: `vinculo-fiscal/novocadastrovinculofiscal.spec.js`

#### ?? Suite: Cadastro de Novo Vínculo Fiscal
- ? /
- ? Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas

### ?? Arquivo: `vinculo-fiscal/vinculo-fiscal-listagem.spec.js`

#### ?? Suite: Testes de Listagem de Vínculo Fiscal
- ? /
- ? Deve realizar cadastro de novo vínculo fiscal
- ? Deve excluir todos os itens selecionados
- ? Deve editar o primeiro vínculo fiscal da tabela






