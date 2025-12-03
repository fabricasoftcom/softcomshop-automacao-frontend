# 📚 Índice de Documentações Arquiteturais

Este diretório contém a documentação arquitetural detalhada de todos os casos de teste do projeto.

**Última atualização:** 2024-12-19  
**Total de documentações:** 51

---

## 📋 Organização

As documentações estão organizadas por módulo/funcionalidade e seguem o padrão de nomenclatura:
- `architecture-<nome-do-spec>.md`

Cada documentação contém:
- **Objetivo** - Descrição clara do que o teste valida
- **Estrutura de arquivos** - Specs, Page Objects, Locators, Factories
- **Imports e dependências** - Todas as dependências utilizadas
- **Estrutura do teste** - Detalhamento de cada `it` e seus passos
- **Padrões e boas práticas** - Técnicas e padrões aplicados
- **Referências** - ADRs relacionadas e documentação adicional

---

## 📂 Documentações por Módulo

### 💰 Financeiro (14 documentações)

#### Contas a Pagar
- `architecture-baixar-despesa.md` - Baixa completa, parcial e desfazer baixa
- `architecture-editar-despesa.md` - Edição completa de despesa
- `architecture-listagem-contas-a-pagar.md` - Listagem e filtragem de contas a pagar
- `architecture-nova-despesa.md` - Cadastro de nova despesa

#### Contas a Receber
- `architecture-editar-receita.md` - Edição completa de receita
- `architecture-listagem-contas-a-receber.md` - Listagem e ações de contas a receber
- `architecture-nova-receita.md` - Cadastro de nova receita
- `architecture-recebimento.md` - Modal de recebimento (completo, parcial, desfazer)

#### Contas
- `architecture-cadastro-conta-corrente.md` - Cadastro de conta corrente com integração bancária
- `architecture-cadastro-conta.md` - Seleção de tipo de conta
- `architecture-edicao-conta-corrente.md` - Edição e ativação/desativação de contas
- `architecture-listagem-conta.md` - Listagem de contas

#### Balanço
- `architecture-balanco.md` - Realização de novo balanço
- `architecture-reverter-balanco.md` - Reversão de balanço em andamento

---

### 🛒 Vendas e NFe/NFCe (12 documentações)

#### Vendas
- `architecture-cadastro-venda.md` - Cadastro completo de venda
- `architecture-listagem-vendas.md` - Listagem e filtragem de vendas
- `architecture-venda-nfe.md` - Venda completa com emissão de NFe
- `architecture-venda-nfce.md` - Venda completa com emissão de NFCe

#### NFe
- `architecture-cadastro-nfe.md` - Cadastro geral de NFe (validações e abas)
- `architecture-cadastro-nfe-normal.md` - Cadastro de NFe Normal (Avulsa, Venda, NFCe, Movimentação)
- `architecture-cadastro-nfe-ajuste.md` - Cadastro de NFe Ajuste
- `architecture-cadastro-nfe-complementar.md` - Cadastro de NFe Complementar
- `architecture-cadastro-nfe-devolucao.md` - Cadastro de NFe de devolução
- `architecture-cadastro-nfe-dropdown-acoes.md` - Validações do dropdown "Mais Ações"
- `architecture-cancelamento-nfe.md` - Cancelamento de NFe (múltiplos tipos)
- `architecture-carta-correcao-nfe.md` - Carta de correção de NFe (múltiplos tipos)
- `architecture-listagem-nfe.md` - Listagem de NFe

---

### 📦 Produtos e Compras (6 documentações)

#### Produtos
- `architecture-cadastro-produto.md` - Cadastro completo de produto (grade, combo, vínculo fiscal)
- `architecture-listagem-produtos.md` - Listagem e filtragem de produtos
- `architecture-atributos.md` - Cadastro e listagem de atributos
- `architecture-grupos.md` - Cadastro e listagem de grupos

#### Compras
- `architecture-cadastro-compra.md` - Cadastro de compra com importação de NFe
- `architecture-cadastro-fornecedor.md` - Cadastro de fornecedor com Faker

---

### 👥 Clientes (2 documentações)

- `architecture-cadastro-cliente.md` - Cadastro completo de cliente (física/jurídica)
- `architecture-listagem-clientes.md` - Listagem e filtragem de clientes

---

### 📊 Relatórios (2 documentações)

- `architecture-relatorio-caixa.md` - Relatório de caixa (analítico e sintético)
- `architecture-relatorios.md` - Validação iterativa de todos os relatórios

---

### 📋 Orçamento (2 documentações)

- `architecture-orcamento-cadastro.md` - Cadastro completo de orçamento com Faker
- `architecture-orcamento-listagem.md` - Listagem de orçamento

---

### 🏭 Produção (2 documentações)

- `architecture-cadastro-producao.md` - Cadastro completo de produção
- `architecture-producao-listagem.md` - Listagem de produção

---

### 📄 Fiscal (3 documentações)

- `architecture-novocadastrovinculofiscal.md` - Cadastro completo de vínculo fiscal (entrada, saída NFe/NFCe)
- `architecture-vinculo-fiscal-listagem.md` - Listagem de vínculo fiscal
- `architecture-sped-gerar-arquivo.md` - Geração de arquivo SPED
- `architecture-sintegra-gerar-arquivo.md` - Geração de arquivo Sintegra

---

### 🔧 Movimentações (1 documentação)

- `architecture-movimentacoes.md` - Cadastro de movimentações (entrada/saída)

---

### 🔐 Autenticação e Setup (2 documentações)

- `architecture-login.md` - Login com credenciais válidas
- `architecture-before-config-padrao.md` - Setup padrão do sistema (módulos e configurações)

---

### 🎯 Navegação e Menu (1 documentação)

- `architecture-menu-lateral.md` - Validação iterativa de menus e submenus

---

### 🐾 Petshop (1 documentação)

- `architecture-painel-atendimento.md` - Painel de atendimento (petshop) com múltiplas configurações

---

## 📊 Estatísticas

### Por Prioridade
- **Prioridade Alta:** 10 documentações (100% concluído)
- **Prioridade Média:** 17 documentações (94% concluído)
- **Total:** 51 documentações (91% do total de specs)

### Por Semana de Criação
- **Semana 1:** 6 documentações (Financeiro - Contas a Pagar/Receber)
- **Semana 2:** 4 documentações (Financeiro - Contas)
- **Semana 3:** 5 documentações (Compras, Produtos, Login, Setup, Menu)
- **Semana 4:** 9 documentações (Orçamento, Relatórios, Vínculo Fiscal, Vendas, Painel)
- **Documentações Adicionais:** 4 documentações (NFe Normal, Ajuste, Complementar, Dropdown)
- **Anteriores:** 23 documentações

---

## 🔗 Referências

### ADRs Relacionadas
Todas as documentações referenciam as seguintes ADRs quando aplicável:

- **ADR-0002:** Use Page Object Pattern
- **ADR-0003:** Separate Locators from Page Objects
- **ADR-0004:** Use cy.session for Login Persistence
- **ADR-0005:** Use Allure for Test Reporting
- **ADR-0006:** Mandatory Documentation for New Tests
- **ADR-0007:** Separate Specs by Functionality and Type
- **ADR-0008:** Use Page Object Hierarchy
- **ADR-0009:** Use Faker for Dynamic Test Data
- **ADR-0010:** Use Tags for Test Filtering
- **ADR-0011:** Use Conditional Intercepts

### Documentação Relacionada
- `docs/testes.md` - Inventário completo de todos os testes
- `docs/adr/` - Architecture Decision Records
- `docs/referencias/` - Referências e guias do projeto

---

## 📝 Como Usar

### Para Desenvolvedores
1. Consulte a documentação antes de modificar um teste existente
2. Use como referência ao criar novos testes
3. Siga os padrões e boas práticas documentados

### Para Revisores
1. Valide que novos testes seguem os padrões documentados
2. Verifique referências a ADRs
3. Confirme que a estrutura está completa

### Para Novos Membros
1. Leia as documentações dos módulos que você vai trabalhar
2. Entenda os padrões estabelecidos
3. Consulte as ADRs para contexto arquitetural

---

## 🔄 Manutenção

### Atualização de Documentações
- Sempre atualize a documentação ao modificar testes significativamente
- Adicione novas seções se necessário
- Mantenha referências a ADRs atualizadas

### Criação de Novas Documentações
- Siga o template estabelecido
- Inclua todas as seções obrigatórias
- Referencie ADRs relacionadas
- Adicione ao índice após criação

---

**Última atualização:** 2024-12-19  
**Mantido por:** Equipe de Automação

