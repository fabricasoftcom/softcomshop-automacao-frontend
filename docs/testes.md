## 🐾 Petshop

### 🐶 Arquivo: `petshop/painel-atendimento.spec.js`

#### 🧪 Suite: Painel de Atendimento - Petshop
- ✅ Deve acessar o Painel de Atendimento e validar elementos principais
- ✅ Deve filtrar atendimentos por data
- ✅ Deve filtrar atendimentos por status
- ✅ Deve navegar entre as abas (Painel de Atendimentos e Vacinação)
- ✅ Deve acessar a página de pesquisa de animal
- ✅ Deve validar contadores de status estão presentes
- ✅ Deve limpar filtros aplicados

### 🐶 Arquivo: `petshop/vacinas.spec.js`

#### 🧪 Suite: Vacinas - Petshop
- ✅ Deve acessar a tela de listagem de Vacinas
- ✅ Deve filtrar vacinas por grupo
- ✅ Deve filtrar vacinas por status
- ✅ Deve acessar a página de cadastro de vacina
- ✅ Deve preencher formulário de cadastro de vacina
- ✅ Deve voltar da página de cadastro para listagem

### 🐶 Arquivo: `petshop/tipos-atendimento.spec.js`

#### 🧪 Suite: Tipos de Atendimento - Petshop
- ✅ Deve acessar a tela de listagem de Tipos de Atendimento
- ✅ Deve filtrar tipos de atendimento por nome
- ✅ Deve acessar a página de cadastro de tipo de atendimento
- ✅ Deve preencher formulário de cadastro de tipo de atendimento
- ✅ Deve voltar da página de cadastro para listagem
- ✅ Deve validar estrutura da tabela de listagem

### 🐶 Arquivo: `petshop/gestao-ordem-servico.spec.js`

#### 🧪 Suite: Gestão de Ordem de Serviço - Petshop
- ✅ Deve acessar o Painel de Gestão de OS
- ✅ Deve filtrar ordens de serviço por período
- ✅ Deve filtrar ordens de serviço por número da OS
- ✅ Deve filtrar ordens de serviço por vendas geradas
- ✅ Deve validar seção de geração de registros
- ✅ Deve validar resumo de quantidades e valores
- ✅ Deve marcar opções de geração de registros

### 🐶 Arquivo: `petshop/modelos-prescricoes.spec.js`

#### 🧪 Suite: Modelos de Prescrições - Petshop
- ✅ Deve acessar a tela de listagem de Modelos de Prescrições
- ✅ Deve filtrar modelos de prescrições por descrição
- ✅ Deve filtrar modelos de prescrições por status
- ✅ Deve acessar a página de cadastro de modelo de prescrição
- ✅ Deve preencher formulário de cadastro de modelo de prescrição
- ✅ Deve voltar da página de cadastro para listagem
- ✅ Deve validar estrutura da tabela de listagem

### 🐶 Arquivo: `petshop/atestados-termos.spec.js`

#### 🧪 Suite: Cadastro de Atestados e Termos - Petshop
- ✅ Deve acessar a tela de listagem de Atestados e Termos
- ✅ Deve filtrar atestados e termos por descrição
- ✅ Deve filtrar atestados e termos por tipo
- ✅ Deve filtrar atestados e termos por status
- ✅ Deve acessar a página de cadastro de atestado/termo
- ✅ Deve preencher formulário de cadastro de atestado/termo
- ✅ Deve voltar da página de cadastro para listagem
- ✅ Deve validar estrutura da tabela de listagem

---

## 📊 Relatórios

### 📄 Arquivo: `relatorio/relatorios.spec.js`

#### 🧪 Suite: Acessar relatorios
- ✅ Deve validar os relatorios (valida acesso a todos os 30 relatórios do fixture)

### 📄 Arquivo: `relatorio/relatorio-periodo.spec.js`

#### 🧪 Suite: Relatorio de Periodo
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Periodo
- ✅ Deve permitir pesquisar o relatorio de Periodo com periodo diario
- ✅ Deve exibir tabela de resultados após pesquisa com periodo diario
- ✅ Deve exibir estrutura da tabela com colunas após pesquisa
- ✅ Deve exibir botões de exportação PDF e Excel após pesquisa
- ✅ Deve exibir dados na tabela quando houver resultados

### 📄 Arquivo: `relatorio/relatorio-caixa.spec.js`

#### 🧪 Suite: Relatorio de Caixa
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Caixa
- ✅ Deve permitir pesquisar o relatorio de Caixa com periodo diario
- ✅ Deve gerar o relatorio de Caixa do tipo sintetico
- ✅ Deve pesquisar o periodo atual sem turno e exibir dados em tela
- ✅ Deve listar vendas no relatorio analitico sem informar turno
- ✅ Deve exibir estrutura da tabela com colunas após pesquisa
- ✅ Deve exibir botões de exportação PDF e Imprimir 80mm após pesquisa

### 📄 Arquivo: `relatorio/relatorio-forma-pagamento.spec.js`

#### 🧪 Suite: Relatorio de Forma Pagamento
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Forma Pagamento
- ✅ Deve permitir pesquisar o relatorio de Forma Pagamento com periodo diario
- ✅ Deve exibir tabela de resultados após pesquisa com periodo diario
- ✅ Deve exibir estrutura da tabela com colunas após pesquisa
- ✅ Deve exibir botões de exportação PDF e Excel após pesquisa
- ✅ Deve exibir dados na tabela quando houver resultados

### 📄 Arquivo: `relatorio/relatorio-exibir-estoque.spec.js`

#### 🧪 Suite: Relatorio de Exibir Estoque
- ✅ Deve exibir os filtros e acoes disponiveis para o relatorio de Exibir Estoque
- ✅ Deve permitir pesquisar o relatorio de Exibir Estoque
- ✅ Deve exibir tabela de resultados após pesquisa
- ✅ Deve exibir estrutura da tabela com colunas após pesquisa
- ✅ Deve exibir botões de exportação PDF e Excel após pesquisa
- ✅ Deve exibir dados na tabela quando houver resultados

**Nota:** Testes de relatórios foram atualizados após reformulação de layout (2026-01-27). Estrutura mudou de links para cards, filtros agora estão em drawer lateral, e algumas URLs mudaram (`/relatorio-v2/` para Caixa e Forma Pagamento). Atualização adicional (2026-01-28): Relatórios de Caixa, Forma Pagamento e Exibir Estoque atualizados para usar método compartilhado do drawer e novos testes de validação após pesquisa.

**Status de Validação:** 24 de 26 specs passando completamente (92%). Especificamente:
- ✅ 24 specs validados e passando completamente
- ⚠️ 2 specs precisam de ajustes finais menores (Caixa - loop de iteração, Forma Pagamento - drawer)

**Specs Validados:**
- ✅ Período, Fiscal (Saída/Entrada Analítico/Sintético), Pis/Cofins, NFSe
- ✅ Mais Vendidos, Comissão, Evolução, Gerente de Vendas
- ✅ Contas a Receber, Contas a Pagar, Projeção de Cartões
- ✅ Exibir Estoque, Ficha Estoque, Inventário, NCM, Tabela de Preço
- ✅ Movimentação de Estoque, Últimas Compras, Listagem de Clientes, Aniversariantes
