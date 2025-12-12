# Descobertas - Exploração de Relatórios

Este documento registra as descobertas da exploração manual dos relatórios para implementação de validação completa.

## Relatório: Período (Vendas)

**URL:** `/relatorio/periodo`

### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Período")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Empresa:** `#empresa_id` (select)
- **Dispositivo:** `#auto_api_device_id` (input autocomplete)
- **Vendedor:** `#auto_funcionario_id` (input autocomplete)
- **Indicador:** `#auto_indicador_id` (input autocomplete)
- **Cliente:** `#auto_cliente_id` (input autocomplete)
- **Tipo:** `#tipo` (select) - opções: Pedido, Diario, Mensal, Dispositivo
- **Situação:** `#situacao` (select) - opções: [selecione], Aberta, Fechada, Faturada, Cancelada
- **Período:** `#data` (input text) - formato: "01/12/2025 00:00:00 - 31/12/2025 23:59:59"
- **Origem Venda:** `#auto_origem_venda` (input autocomplete)
- **Usuário do Caixa:** `#auto_usuario_caixa` (input autocomplete)
- **Turno:** `#turno` (select) - opções: [selecione], 1, 2, 3, 4, 5, 6
- **TAGs de Classificação:** Campo de lista/tags

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link)
- **Personalizar:** Botão "Personalizar"
- **Voltar:** Link com ícone (ref=e86)

### Observações:
- Relatório tem muitos filtros opcionais
- Período já vem preenchido com mês atual
- Campos de autocomplete precisam de digitação para abrir sugestões

---

## Relatório: Mais Vendidos (Vendas)

**URL:** `/relatorio/mais-vendidos`

### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Mais Vendidos")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Empresa:** `#empresa_id` (select)
- **Período:** `#data` (input text) - formato: "01/12/2025 00:00:00 - 31/12/2025 23:59:59"
- **Dispositivo:** `#auto_dispositivo` (input autocomplete)
- **Turno:** `#turno` (select) - opções: [selecione], 1, 2, 3, 4, 5, 6
- **Origem Venda:** `#auto_origem_venda` (input autocomplete)
- **Produto:** `#auto_produto_id` (input autocomplete)

#### Abas/Tabs
- **Container:** `tablist` com múltiplas abas: Clientes, Vendedor, Indicador, Tipo De Cliente, Uf, Cidade, Bairro, Área, Horários, Produtos, Combo

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link)
- **Personalizar:** Botão "Personalizar"
- **Voltar:** Link com ícone

### Observações:
- Relatório tem sistema de abas para diferentes visualizações
- Menos filtros que o relatório Período
- Foco em produtos mais vendidos

---

## Relatório: Forma Pagamento (Vendas)

**URL:** `/relatorio/forma-pagamento`

### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Forma de Pagamento")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Empresa:** `#empresa_id` (select)
- **Vendedor:** `#auto_funcionario_id` (input autocomplete)
- **Cliente:** `#auto_cliente_id` (input autocomplete)
- **Status:** `#status` (select)
- **NF-e/NFC-e Faturada:** `#nfe_nfce_faturada` (select)
- **Período:** `#data` (input text)
- **Usuário do Caixa:** `#auto_usuario_caixa` (input autocomplete)
- **Turno:** `#turno` (select)

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link - verificar se existe)

### Observações:
- Filtros focados em forma de pagamento
- Campos de status e NF-e/NFC-e faturada

---

## Relatório: Gerente de Vendas (Vendas)

**URL:** `/relatorio/gerente-vendas`

### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Gerente de Vendas")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Período:** `#data` (input text)
- **Classificação:** `#classificacao` (select) - opções: Código, Nome, Quantidade, Valor Venda (R$), Valor Lucro (R$)
- **Tipo Cliente:** `#auto_tipo_cliente_id` (input autocomplete)
- **Cliente:** `#auto_cliente_id` (input autocomplete)
- **Bairro:** `#auto_bairro_id` (input autocomplete)
- **UF:** `#cidade_uf` (select) - opções: [selecione], AC, AL, AM, AP, BA, CE, DF, ES, EX, GO, MA, MG, MS, MT, PA, PB, PE, PI, PR, RJ, RN, RO, RR, RS, SC, SE, SP, TO
- **Cidade:** `#auto_cidade_id` (input autocomplete)
- **Vendedor:** `#auto_vendedor_id` (input autocomplete)
- **Indicador:** `#auto_indicador_id` (input autocomplete)
- **Produto:** `#auto_produto_id` (input autocomplete)
- **Turno:** `#turno` (select) - opções: [selecione], 1, 2, 3, 4, 5, 6
- **Origem Venda:** `#auto_origem_venda` (input autocomplete)
- **Empresa:** Campo de lista (select2)
- **Grupo:** Campo de lista (select2)
- **Fabricante:** `#auto_fabricante_id` (input autocomplete)
- **Fornecedor:** `#auto_fornecedor_id` (input autocomplete)
- **TAGs de Classificação:** Campo de lista (select2)

#### Abas/Tabs
- **Container:** `tablist` com múltiplas abas: Clientes, Produto, Serviço, Venda, Vendedores, Indicadores, Tipo De Cliente, Cidade, Uf, Clientes Não Compraram

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link)
- **Venda Mais:** Link "Venda Mais"

#### Tabela de Resultados
- **Container:** `table` com resultados de clientes
- **Colunas:** Código, Nome, Cidade, UF, Tipo de Cliente, Ticket Médio (R$), Quantidade de Vendas, Quantidade de Itens, Valor Venda (R$), Acrescimos (R$), Desconto (R$), Total (R$)

#### Totalizadores
- **Quantidade de Clientes:** `h5:contains("Quantidade de Clientes")`
- **Quantidade de Vendas Total:** `h5:contains("Quantidade de Vendas Total")`
- **Valor Total (R$):** `h5:contains("Valor Total (R$)")`

### Observações:
- Relatório muito completo com múltiplas abas e filtros
- Possui sistema de classificação (Código, Nome, Quantidade, Valor Venda, Valor Lucro)
- Tabela de resultados com múltiplas colunas
- Totalizadores no final da tabela

---

## Relatório: Evolução (Vendas)

**URL:** `/relatorio/evolucao`

### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Evolução")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Empresa:** `#empresa_id` (select)
- **Tipo Evolução:** `#tipo_evolucao` (select) - opções: Vendas, Despesas, Recebimentos
- **Valor:** `#valor` (select) - opções: Valor, Quantidade, Lucro Bruto
- **Vendedor:** `#auto_funcionario_id` (input autocomplete)
- **Ano:** `#ano` (input text)
- **Dia:** `#dia` (input text)

#### Abas/Tabs
- **Container:** `tablist` com múltiplas abas: Clientes, Vendedor, Produtos, Fornecedores, Fabricantes, Grupos, Cidades, Tipos de Cliente

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Personalizar:** Link "Personalizar"

### Observações:
- Relatório focado em evolução temporal
- Campos de Ano e Dia para filtro temporal
- Múltiplas abas para diferentes visualizações

---

## Relatório: Comissão (Vendas)

**URL:** `/relatorio/comissao`

### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Comissão")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Empresa:** `#empresa_id` (select)
- **Tipo:** `#tipo` (select) - opções: Sintético, Analítico
- **Vendedor:** `#auto_vendedor_id` (input autocomplete)
- **Período:** `#data` (input text) - formato: "01/12/2025 00:00:00 - 31/12/2025 23:59:59"

#### Abas/Tabs
- **Container:** `tablist` com múltiplas abas: Vendedor, Indicador, Entregador, Atendente, Produto

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)

#### Tabela de Resultados
- **Container:** `table` com resultados de comissões
- **Colunas:** Vendedor, Pedidos, Total Venda R$ (+), Total Troca R$ (-), Base de Cálculo, Comissão(R$)
- **Totalizadores:** Linha "Total" com totais agregados

### Observações:
- Relatório focado em comissões de vendedores
- Tipo pode ser Sintético ou Analítico
- Tabela mostra cálculos de comissão

---

## Grupo 1 - Vendas: ✅ COMPLETO

Todos os 6 relatórios de Vendas foram explorados:
- ✅ Período
- ✅ Mais Vendidos
- ✅ Forma Pagamento
- ✅ Gerente de Vendas
- ✅ Evolução
- ✅ Comissão

---

---

## Grupo 2 - Fiscal: Relatórios Explorados

### Relatório: Fiscal Saída Analítico

**URL:** `/relatorio/relatorio-fiscal`

#### Elementos Identificados:
- **Título:** `h5:contains("Relatório Fiscal Analítico")`
- **Empresa:** `#empresa_id` (select)
- **Período:** `#data` (input) - formato: "01/12/2025 - 31/12/2025"
- **Tipo Documento:** `#tipo` (select) - opções: TODOS, NFE, NFCE
- **Status:** `#status` (select) - opções: TODAS, AUTORIZADAS, CANCELADAS, CONTINGÊNCIA
- **Série:** Campo numérico (spinbutton)
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)

### Relatório: Fiscal Saída Sintético

**URL:** `/relatorio/relatorio-fiscal-sintetico`

#### Elementos Identificados:
- **Título:** `h5:contains("Relatório Fiscal Sintético")`
- Estrutura idêntica ao Analítico (mesmos campos)

### Relatório: Fiscal Entrada Analítico

**URL:** `/relatorio/relatorio-fiscal-entrada`

#### Elementos Identificados:
- **Título:** `h5:contains("Relatório Fiscal Entrada Analítico")`
- **Período:** `#data` (input)
- **Série:** Campo numérico (spinbutton)
- **Empresa:** `#empresa_id` (select)
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Observação:** Não possui campos Tipo Documento e Status como os de Saída

### Relatório: Fiscal Entrada Sintético

**URL:** `/relatorio/relatorio-fiscal-entrada-sintetico`

#### Elementos Identificados:
- **Título:** `h5:contains("Relatório Fiscal Entrada Sintético")`
- Estrutura idêntica ao Entrada Analítico (mesmos campos)

### Relatório: Pis/Cofins

**URL:** `/relatorio/relatorio-fiscal-pis-cofins`

#### Elementos Identificados:
- **Título:** `h5:contains("Relatório Fiscal Pis/Cofins")`
- **Empresa:** `#empresa_id` (select)
- **Período:** `#data` (input)
- **Tipo Documento:** `#tipo` (select) - opções: TODOS, NFE, NFCE
- **Status:** `#status` (select) - opções: TODAS, AUTORIZADAS, CANCELADAS, CONTINGÊNCIA
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Tabela:** Mostra Código, Descrição, Valor Operação, Valor PIS, Valor COFINS
- **Totalizadores:** Subtotal e Total com totais agregados

### Relatório: NFSe

**URL:** `/relatorio/relatorio-nfse`

#### Elementos Identificados:
- **Título:** `h5:contains("NFSe")`
- **Cliente:** `#auto_cliente_id` (input autocomplete)
- **Período:** `#periodo` (input) - formato: "01/12/2025 - 31/12/2025"
- **Status:** `#status` (select) - opções: Todos, Em Elaboração, Cancelada, Rejeitada, Interação, Autorizada, Outros
- **Pesquisar:** `#btn-pesquisar` (button)
- **Novo Cadastro:** Link "Novo Cadastro"
- **Totalizadores:** `h5:contains("Quantidade de notas")` e `h5:contains("Valor total das notas")`

---

## Grupo 2 - Fiscal: ✅ COMPLETO

Todos os 6 relatórios Fiscais foram explorados:
- ✅ Fiscal Saída Analítico
- ✅ Fiscal Saída Sintético
- ✅ Fiscal Entrada Analítico
- ✅ Fiscal Entrada Sintético
- ✅ Pis/Cofins
- ✅ NFSe

---

## Grupo 3 - Financeiro: Relatórios Explorados

### Relatório: Contas a Receber

**URL:** `/relatorio/contas-a-receber`

#### Elementos Identificados:
- **Título:** `h5:contains("Contas a Receber")`
- **Empresa:** `#empresa_id` (select)
- **Cliente:** `#auto_cliente_id` (input autocomplete)
- **UF:** `#cidade_uf` (select) - todas as UFs
- **Cidade:** `#auto_cidade_id` (input autocomplete)
- **Bairro:** `#auto_bairro_id` (input autocomplete)
- **Status:** `#tipo` (select) - opções: TODOS, ABERTO, PAGO
- **Tipo Data:** `#tipo_data` (select) - opções: VENCIMENTO, PAGAMENTO, EMISSÃO
- **Período:** `#data` (input) - formato: "01/12/2025 - 31/12/2025"
- **Formas de Pagamento:** Campo de lista (select2)
- **Pesquisar:** `#btn-pesquisar` (button)
- **Personalizar:** Botão "Personalizar"
- **Gerar PDF:** `#gerar-pdf` (link)

### Relatório: Contas a Pagar

**URL:** `/relatorio/contas-a-pagar`

#### Elementos Identificados:
- **Título:** `h5:contains("Contas a Pagar")`
- **Empresa:** `#empresa_id` (select)
- **Fornecedor:** `#auto_fornecedor_id` (input autocomplete)
- **UF:** `#cidade_uf` (select) - todas as UFs
- **Cidade:** `#auto_cidade_id` (input autocomplete)
- **Bairro:** `#auto_bairro_id` (input autocomplete)
- **Status:** `#tipo` (select) - opções: TODOS, ABERTO, PAGO
- **Tipo Data:** `#tipo_data` (select) - opções: VENCIMENTO, PAGAMENTO, EMISSÃO
- **Período:** `#data` (input) - formato: "01/12/2025 - 31/12/2025"
- **Formas de Pagamento:** Campo de lista (select2)
- **N° documento:** `#documento` (input text)
- **Categoria:** `#auto_categoria` (input autocomplete)
- **Exibir Despesas Caixa:** Checkbox
- **Pesquisar:** `#btn-pesquisar` (button)
- **Personalizar:** Botão "Personalizar"
- **Gerar PDF:** `#gerar-pdf` (link)

### Relatório: Projeção de Cartões

**URL:** `/relatorio/projecao-de-cartoes`

#### Elementos Identificados:
- **Título:** `h5:contains("Projeção de Cartões")`
- **Empresa:** `#empresa_id` (select)
- **Bandeira:** `#auto_cartao_credito_id` (input autocomplete)
- **Status:** `#status` (select) - opções: Todos, Abertos
- **Período:** `#data` (input) - formato: "01/12/2025 - 31/12/2025"
- **Pesquisar:** `#btn-pesquisar` (button)
- **Tabela Resumo:** Bandeira, Valor Bruto, Taxa Adm (%), Valor Líquido
- **Totalizador:** `h3:contains("Total:")`
- **Gráfico:** Gráfico de barras com valores por bandeira
- **Tabela Detalhada:** Código, Origem, Nº Doc, Cliente, Bandeira, Parcela, Vencimento, Valor Bruto, Taxa Adm (%), Valor Líquido
- **Paginação:** Sistema de paginação para tabela detalhada

---

## Grupo 3 - Financeiro: ✅ COMPLETO

Todos os 3 relatórios Financeiros foram explorados:
- ✅ Contas a Receber
- ✅ Contas a Pagar
- ✅ Projeção de Cartões

---

## Grupo 4 - Produtos: Relatórios Explorados

### Relatório: Exibir Estoque

**URL:** `/relatorio/exibir-estoque`

#### Elementos Identificados:
- **Título:** `h5:contains("Exibir Estoque")`
- **Empresa:** `#empresa_id` (select)
- **Produto:** `#auto_produto_empresa_grade_id` (input autocomplete)
- **Fabricante:** `#auto_fabricante_id` (input autocomplete)
- **Grupo:** `#auto_grupo_id` (input autocomplete)
- **Fornecedor:** `#auto_fornecedor_id` (input autocomplete)
- **Condição:** `#condicao` (select)
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link)

### Relatório: Tabela de Preço

**URL:** `/relatorio/tabela-preco`

#### Elementos Identificados:
- **Título:** `h5:contains("Tabela Preço")`
- **Empresa:** `#empresa_id` (select)
- **Produto:** `#auto_produto_empresa_grade_id` (input autocomplete)
- **Fabricante:** `#auto_fabricante_id` (input autocomplete)
- **Grupo:** `#auto_grupo_id` (input autocomplete)
- **Fornecedor:** `#auto_fornecedor_id` (input autocomplete)
- **Condição:** `#condicao` (select)
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link)

### Relatório: Ficha Estoque

**URL:** `/relatorio/ficha-estoque`

#### Elementos Identificados:
- **Título:** Não possui título h5 visível (pode ser dinâmico)
- **Empresa:** `#empresa_id` (select)
- **Produto:** `#auto_produto_id` (input autocomplete)
- **Período:** `#periodo` (input) - formato: "01/12/2025 - 31/12/2025"
- **Pesquisar:** `#btn-pesquisar` (button)

### Relatório: Inventário

**URL:** `/relatorio/inventario`

#### Elementos Identificados:
- **Título:** `h5:contains("Inventário")`
- **Empresa:** `#empresa_id` (select)
- **Até a Data:** `#periodo_ate` (input) - formato: "30/11/2025"
- **Exibir Código:** Checkbox
- **Uso e Consumo:** Checkbox
- **Valor Inventário:** `#valor_inventario` (input) - valor numérico
- **Gerar Inventário:** Botão "Gerar Inventário" (não é `#btn-pesquisar`)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link)

### Relatório: NCM

**URL:** `/relatorio/ncm`

#### Elementos Identificados:
- **Título:** `h5:contains("NCM")`
- **Empresa:** `#empresa_id` (select)
- **Produto:** `#auto_produto_empresa_grade_id` (input autocomplete)
- **Grupo:** `#auto_grupo_id` (input autocomplete)
- **Possui NCM:** `#possui_ncm` (select)
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)

### Relatório: Movimentação de Estoque

**URL:** `/relatorios/movimentacao-estoque` (note: `/relatorios/` não `/relatorio/`)

#### Elementos Identificados:
- **Título:** `h5:contains("Movimentação de Estoque")`
- **Empresa:** `#empresa` (select) - opções: Todos, SOFTCOM PB (Normal), etc.
- **Tipo:** `#tipo` (select) - opções: Todos, AVULSO, TROCA, PRODUÇÃO, AJUSTE ESTOQUE, DESPERDÍCIO
- **Operação:** `#operacao` (select) - opções: Todos, Entrada, Saída
- **Data:** `#data` (input) - formato: "01/12/2025 - 31/12/2025"
- **Usuário do Caixa:** `#auto_usuario_caixa` (input autocomplete)
- **Turno:** `#turno` (select) - opções: [selecione], 1-6
- **Exibição:** Radio buttons - Resumido, Detalhado
- **Pesquisar:** Link "Pesquisar" (não é `#btn-pesquisar`)
- **Novo Cadastro:** Link "Novo Cadastro"
- **Gerar PDF:** `#gerar-pdf` (link)
- **Gerar Excel:** `#gerar-excel` (link)
- **Totalizadores:** Total de Entradas, Total de Saídas, Total de Saldo

---

## Grupo 4 - Produtos: ✅ COMPLETO

Todos os 6 relatórios de Produtos foram explorados:
- ✅ Exibir Estoque
- ✅ Tabela de Preço
- ✅ Ficha Estoque
- ✅ Inventário
- ✅ NCM
- ✅ Movimentação de Estoque

---

## Grupo 5 - Clientes

### Relatório: Aniversariantes

**URL:** `/relatorio/aniversariante`

#### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Aniversariantes")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Mês:** `#data` (input text) - campo de data para selecionar mês
- **Cidade:** `#auto_cidade_id` (input autocomplete)

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Voltar:** Link com ícone

#### Observações:
- Relatório simples com apenas 2 filtros (Mês e Cidade)
- O campo Mês é um input de data
- Cidade é um autocomplete
- Pode exibir mensagem "Este relatório ainda não possui dados" quando não há dados

---

### Relatório: Listagem dos Clientes

**URL:** `/relatorio/dados-clientes`

#### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Listagem dos Clientes")` ou `h5`

#### Filtros/Formulário
- **Container:** `form`
- **Tipo Cliente:** `#auto_tipo_cliente_id` (input autocomplete)
- **Atendente:** `#auto_funcionario_id` (input autocomplete)
- **Período de Cadastro:** `#data_cadastro` (input text) - campo de data
- **Tipo Pessoa:** `#tipo_pessoa` (select) - opções: [selecione], Física, Jurídica
- **Bloqueado:** `#bloqueado` (select) - opções: [selecione], Sim, Não
- **Desativado:** `#desativado` (select) - opções: [selecione], Sim, Não
- **Bairro:** `#auto_bairro_id` (input autocomplete)
- **UF:** `#uf` (select) - opções: [selecione], AC, AL, AM, AP, BA, CE, DF, ES, EX, GO, MA, MG, MS, MT, PA, PB, PE, PI, PR, RJ, RN, RO, RR, RS, SC, SE, SP, TO
- **Cidade:** `#auto_cidade_id` (input autocomplete)
- **CEP:** `#cep` (input text)
- **TAGs de Classificação:** Campo de lista/tags (select2)

#### Botões/Ações
- **Pesquisar:** `#btn-pesquisar` (button)
- **Gerar PDF:** `#gerar-pdf` (link)
- **Venda Mais:** Link "Venda Mais"
- **Voltar:** Link com ícone

#### Tabela de Resultados
- **Colunas:** Código, Nome, Endereço, CPF/CNPJ, RG, Telefone/Celular, Última Compra
- **Container:** `table`

#### Observações:
- Relatório com muitos filtros opcionais
- Possui múltiplos campos de autocomplete
- O campo "TAGs de Classificação" é um select2
- Exibe tabela com dados dos clientes quando há resultados

---

### Relatório: Últimas Compras

**URL:** `/cliente/relatorio/ultimas-compras`

#### Elementos Identificados:

#### Título
- **Seletor:** `h5:contains("Relatório de Últimas Compras")` ou `h5`

#### Botões/Ações
- **Gerar PDF:** `#gerar-pdf` (button)
- **Voltar:** Link com ícone

#### Estrutura de Exibição
- **Container de Vendas:** Lista de vendas (compras) exibidas diretamente
- **Banner de Venda:** Cada venda tem um banner com:
  - Venda Nº
  - Cliente
  - Vendedor
  - Data
  - Status (ABERTA/FECHADA)
  - Links: "Venda" e "Repetir"
- **Tabela de Itens:** Cada venda tem uma tabela com:
  - Colunas: Código, Referência, Descrição, Quantidade, Preço, Desconto, Acréscimo, Total
- **Totalizador:** "Valor Compra (R$)" exibido no final
- **Paginação:** Navegação entre páginas quando há múltiplas páginas

#### Observações:
- Este relatório não possui filtros visíveis - exibe as últimas compras diretamente
- Exibe vendas de forma cronológica (mais recentes primeiro)
- Cada venda mostra detalhes completos incluindo itens e valores
- Possui paginação para navegar entre múltiplas páginas de resultados

---

## Resumo da Exploração

### ✅ Relatórios Explorados com Sucesso: 25/25

**Grupo 1 - Vendas (6/6):**
- ✅ Período
- ✅ Mais Vendidos
- ✅ Forma Pagamento
- ✅ Gerente de Vendas
- ✅ Evolução
- ✅ Comissão

**Grupo 2 - Fiscal (6/6):**
- ✅ Fiscal Saída Analítico
- ✅ Fiscal Saída Sintético
- ✅ Fiscal Entrada Analítico
- ✅ Fiscal Entrada Sintético
- ✅ Pis/Cofins
- ✅ NFSe

**Grupo 3 - Financeiro (3/3):**
- ✅ Contas a Receber
- ✅ Contas a Pagar
- ✅ Projeção de Cartões

**Grupo 4 - Produtos (6/6):**
- ✅ Exibir Estoque
- ✅ Tabela de Preço
- ✅ Ficha Estoque
- ✅ Inventário
- ✅ NCM
- ✅ Movimentação de Estoque

**Grupo 5 - Clientes (3/3):**
- ✅ Aniversariantes
- ✅ Listagem dos Clientes
- ✅ Últimas Compras

### Próximos Passos

1. **Identificar padrões comuns** entre os relatórios explorados
2. **Criar Locators** para cada relatório
3. **Criar Page Objects** seguindo o padrão de `RelatorioCaixaPage`
4. **Criar Specs** seguindo o padrão de `relatorio-caixa.spec.js`
5. **Documentar** cada relatório conforme ADR-0006
6. **Resolver acesso** aos relatórios de Clientes (verificar permissões do usuário)

