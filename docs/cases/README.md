# 📚 Índice de Documentações Arquiteturais

Este diretório contém a documentação arquitetural detalhada de todos os casos de teste do projeto.

**Última atualização:** 22/04/2026  
**Total de documentações:** 119

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

### ⚖️ Balanço (2 documentações)

- [`architecture-balanco.md`](architecture-balanco.md) — Este documento descreve a arquitetura dos testes relacionados ao módulo de **Balanço**, que valida o processo completo de criação e finalização de balanços de estoque.
- [`architecture-reverter-balanco.md`](architecture-reverter-balanco.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Reverter Balanço**, que valida o processo de reverter um balanço finalizado para o status "Aguardando Finalização".

### ⚙️ Configurações (11 documentações)

- [`architecture-empresa-cadastro.md`](architecture-empresa-cadastro.md) — Validar a funcionalidade de cadastro de empresa, incluindo:
- [`architecture-empresa-listagem.md`](architecture-empresa-listagem.md) — Validar a funcionalidade de listagem de empresas, incluindo:
- [`architecture-forma-pagamento.md`](architecture-forma-pagamento.md) — Validar a funcionalidade de cadastro e listagem de formas de pagamento, incluindo:
- [`architecture-funcionario-cadastro.md`](architecture-funcionario-cadastro.md) — Validar a funcionalidade de cadastro de funcionário, incluindo:
- [`architecture-funcionario-listagem.md`](architecture-funcionario-listagem.md) — Validar a funcionalidade de listagem de funcionários, incluindo:
- [`architecture-justificativa-cadastro.md`](architecture-justificativa-cadastro.md) — Validar a funcionalidade de cadastro de justificativa, incluindo:
- [`architecture-justificativa-listagem.md`](architecture-justificativa-listagem.md) — Validar a funcionalidade de listagem de justificativas, incluindo:
- [`architecture-perfil-acesso-cadastro.md`](architecture-perfil-acesso-cadastro.md) — Validar a funcionalidade de cadastro de perfis de acesso, incluindo:
- [`architecture-perfil-acesso.md`](architecture-perfil-acesso.md) — Validar a funcionalidade de listagem de perfis de acesso, incluindo:
- [`architecture-usuario-cadastro.md`](architecture-usuario-cadastro.md) — Validar a funcionalidade de cadastro de usuário, incluindo:
- [`architecture-usuario-listagem.md`](architecture-usuario-listagem.md) — Validar a funcionalidade de listagem de usuários, incluindo:

### ✅ Tá em Ordem (1 documentações)

- [`architecture-ta-em-ordem.md`](architecture-ta-em-ordem.md) — Validar a funcionalidade do dashboard "Tá em ordem", incluindo:

### 🐾 Petshop (8 documentações)

- [`architecture-atestados-termos-petshop.md`](architecture-atestados-termos-petshop.md) — Documentação arquitetural do caso de teste.
- [`architecture-gestao-ordem-servico-petshop.md`](architecture-gestao-ordem-servico-petshop.md) — Documentação arquitetural do caso de teste.
- [`architecture-modelos-prescricoes-petshop.md`](architecture-modelos-prescricoes-petshop.md) — Documentação arquitetural do caso de teste.
- [`architecture-painel-atendimento-petshop.md`](architecture-painel-atendimento-petshop.md) — Documentação arquitetural do caso de teste.
- [`architecture-petshop-menu-mapping.md`](architecture-petshop-menu-mapping.md) — Documentação arquitetural do caso de teste.
- [`architecture-petshop-smoke.md`](architecture-petshop-smoke.md) — Documentação arquitetural do caso de teste.
- [`architecture-tipos-atendimento-petshop.md`](architecture-tipos-atendimento-petshop.md) — Documentação arquitetural do caso de teste.
- [`architecture-vacinas-petshop.md`](architecture-vacinas-petshop.md) — Documentação arquitetural do caso de teste.

### 👥 Cadastro de Clientes (2 documentações)

- [`architecture-cadastro-cliente.md`](architecture-cadastro-cliente.md) — Validar que o formulário de cliente apresenta as abas e botões principais logo após a navegação a partir da listagem.
- [`architecture-listagem-clientes.md`](architecture-listagem-clientes.md) — Garantir que a tela **Vendas e NF-e > Clientes** apresenta a tabela inicial paginada, permite pesquisa por nome e mantém os botões principais funcionais.

### 💰 Financeiro (16 documentações)

- [`architecture-baixar-despesa.md`](architecture-baixar-despesa.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Baixar Despesa**, que valida o processo completo de baixa de despesas no módulo financeiro, incluindo baixa completa, parcial e desfazer baixa.
- [`architecture-cadastro-conta-corrente.md`](architecture-cadastro-conta-corrente.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Conta Corrente**, que valida o processo completo de cadastro de contas correntes bancárias com integração bancária e cobrança.
- [`architecture-cadastro-conta.md`](architecture-cadastro-conta.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Contas**, que valida a seleção de tipo de conta e navegação para páginas de cadastro específicas.
- [`architecture-cadastro-contador.md`](architecture-cadastro-contador.md) — Validar a funcionalidade de cadastro de contador, incluindo:
- [`architecture-edicao-conta-corrente.md`](architecture-edicao-conta-corrente.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Edição de Conta Corrente**, que valida o processo de edição e ativação/desativação de contas correntes.
- [`architecture-editar-despesa.md`](architecture-editar-despesa.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Editar Despesa**, que valida o processo completo de edição de despesas no módulo financeiro.
- [`architecture-editar-receita.md`](architecture-editar-receita.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Editar Receita**, que valida o processo completo de edição de receitas no módulo financeiro.
- [`architecture-fluxo-caixa.md`](architecture-fluxo-caixa.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Fluxo de Caixa**, que valida a exibição do fluxo financeiro, cards de resumo, tabela de períodos e funcionalidade de pesquisa por período.
- [`architecture-lancamento-conta.md`](architecture-lancamento-conta.md) — Este documento descreve a arquitetura dos testes relacionados ao **Lançamento Conta**, que valida o processo completo de criação de lançamentos contábeis no módulo financeiro.
- [`architecture-listagem-conta.md`](architecture-listagem-conta.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Contas**, que valida a navegação e acesso à página de cadastro de contas.
- [`architecture-listagem-contas-a-pagar.md`](architecture-listagem-contas-a-pagar.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Contas a Pagar**, que valida a exibição, filtragem e validação de dados na listagem de despesas do módulo financeiro.
- [`architecture-listagem-contas-a-receber.md`](architecture-listagem-contas-a-receber.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Contas a Receber**, que valida a exibição, filtragem, ações e validação de dados na listagem de receitas do módulo financeiro.
- [`architecture-nova-despesa.md`](architecture-nova-despesa.md) — Este documento descreve a arquitetura dos testes relacionados ao cadastro de **Nova Despesa**, que valida o processo completo de criação de despesas no módulo financeiro.
- [`architecture-nova-receita.md`](architecture-nova-receita.md) — Este documento descreve a arquitetura dos testes relacionados ao cadastro de **Nova Receita**, que valida o processo completo de criação de receitas no módulo financeiro.
- [`architecture-plano-contas-sped.md`](architecture-plano-contas-sped.md) — Validar o cadastro de planos de contas do SPED através do menu Fiscal > SPED > Plano de Contas, garantindo que todos os campos obrigatórios sejam preenchidos corretamente e que o cadastro seja realizado com sucesso.
- [`architecture-transferencia-contas.md`](architecture-transferencia-contas.md) — Este documento descreve a arquitetura dos testes relacionados à **Transferência Entre Contas**, que valida o processo completo de transferência de valores entre contas no módulo financeiro.

### 📁 SPED (5 documentações)

- [`architecture-sped-configuracoes.md`](architecture-sped-configuracoes.md) — Validar a tela de Configurações do SPED através do menu Fiscal > SPED > Configurações, garantindo que todos os elementos principais sejam exibidos corretamente e que as configurações possam ser alteradas e salvas com sucesso.
- [`architecture-sped-gerar-arquivo.md`](architecture-sped-gerar-arquivo.md) — Validar a geração do arquivo SPED pelo menu Fiscal > SPED > Gerar Arquivo, assegurando que inventário e valor informado estejam ativos e que a requisição para `/sped/arquivo` seja bem-sucedida.
- [`architecture-sped-icms-ajuste.md`](architecture-sped-icms-ajuste.md) — Documentação arquitetural do caso de teste.
- [`architecture-sped-inventario.md`](architecture-sped-inventario.md) — Documentação arquitetural do caso de teste.
- [`architecture-sped-ipi-ajuste.md`](architecture-sped-ipi-ajuste.md) — Documentação arquitetural do caso de teste.

### 📁 Sintegra (1 documentações)

- [`architecture-sintegra-gerar-arquivo.md`](architecture-sintegra-gerar-arquivo.md) — Validar a geração do arquivo Sintegra via menu Fiscal › Sintegra › Gerar Arquivo, garantindo que período, inventário e valor sejam preenchidos corretamente e que o POST `sintegra/arquivo/consultar` retorne sucesso.

### 📂 Outros (26 documentações)

- [`architecture-atributos.md`](architecture-atributos.md) — Garantir que o menu Compras e Estoque › Produtos › Atributos abra a listagem com os filtros, permita realizar uma pesquisa e acessar o formulário de novo cadastro.
- [`architecture-atualizar-dados-fiscais.md`](architecture-atualizar-dados-fiscais.md) — Documentação arquitetural do caso de teste.
- [`architecture-before-config-padrao.md`](architecture-before-config-padrao.md) — Este documento descreve a arquitetura do teste de **Configuração Padrão do Sistema**, que valida a configuração inicial do sistema antes da execução dos demais testes.
- [`architecture-cadastro-fornecedor.md`](architecture-cadastro-fornecedor.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Fornecedor**, que valida o processo completo de cadastro de fornecedores no sistema.
- [`architecture-cadastro-mensagem.md`](architecture-cadastro-mensagem.md) — Validar a funcionalidade de cadastro de mensagens do menu Venda Mais (Configuração), incluindo:
- [`architecture-cadastro-modelos.md`](architecture-cadastro-modelos.md) — Documentação arquitetural do caso de teste.
- [`architecture-cadastro-producao.md`](architecture-cadastro-producao.md) — Validar o fluxo completo de finalização de uma produção com modo de preparo preenchido.
- [`architecture-cartoes.md`](architecture-cartoes.md) — Validar a funcionalidade de cadastro e listagem de cartões, incluindo:
- [`architecture-categorias.md`](architecture-categorias.md) — Validar o fluxo completo de gerenciamento de categorias financeiras (Receita e Despesa), incluindo:
- [`architecture-dre.md`](architecture-dre.md) — Este documento descreve a arquitetura dos testes automatizados para a tela de **DRE (Demonstração do Resultado do Exercício)** do módulo Financeiro.
- [`architecture-extrato.md`](architecture-extrato.md) — Este documento descreve a arquitetura dos testes automatizados para a tela de **Extrato** do módulo Financeiro.
- [`architecture-grupos.md`](architecture-grupos.md) — Garantir o acesso à listagem de grupos via menu “Compras e Estoque › Produtos › Grupos”, validar o filtro por código/nome e a navegação para o cadastro de um novo grupo.
- [`architecture-login.md`](architecture-login.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Login**, que valida o processo de autenticação no sistema.
- [`architecture-menu-lateral.md`](architecture-menu-lateral.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Menu Lateral**, que valida a navegação e acessibilidade de todos os menus e submenus do sistema.
- [`architecture-movimentacoes.md`](architecture-movimentacoes.md) — Validar o filtro "Operação" na listagem de Movimentações dentro do menu Compras e Estoque, assegurando que a requisição GET a `/movimentacao` retorne com sucesso e apresente resultados na tabela.
- [`architecture-nuvem-fiscal.md`](architecture-nuvem-fiscal.md) — Validar o fluxo completo de importação de compra através da Nuvem Fiscal, desde a listagem e filtro por tipo de manifestação até a finalização da importação com preenchimento de campos obrigatórios.
- [`architecture-orcamento-cadastro.md`](architecture-orcamento-cadastro.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Orçamento**, que valida o processo completo de criação de orçamentos no sistema, incluindo preenchimento de dados do cliente, informações adicionais, produtos e condições de pagamento.
- [`architecture-orcamento-listagem.md`](architecture-orcamento-listagem.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Orçamento**, que valida a navegação e ações básicas na listagem de orçamentos.
- [`architecture-ordem-fornecimento.md`](architecture-ordem-fornecimento.md) — Documentação arquitetural do caso de teste.
- [`architecture-painel-atendimento.md`](architecture-painel-atendimento.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Painel de Atendimento**, que valida o processo completo de criação de atendimentos, alteração de status e geração de vendas no contexto de petshop.
- [`architecture-pesquisa-preco.md`](architecture-pesquisa-preco.md) — Documentação arquitetural do caso de teste.
- [`architecture-producao-listagem.md`](architecture-producao-listagem.md) — Garantir que o menu **Compras e Estoque > Produção** apresenta a tela de listagem com título, formulário de pesquisa e tabela de resultados.
- [`architecture-recebimento.md`](architecture-recebimento.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Recebimento**, que valida o processo completo de recebimento de contas a receber no módulo financeiro, incluindo recebimento completo, parcial e desfazer baixa.
- [`architecture-recibo.md`](architecture-recibo.md) — Este documento descreve a arquitetura dos testes relacionados ao módulo **Recibo** no Financeiro, que valida o processo completo de criação e gerenciamento de recibos.
- [`architecture-sincronizacao.md`](architecture-sincronizacao.md) — Validar a funcionalidade de sincronização de dados do responsável técnico, incluindo:
- [`architecture-valores-declaratorios.md`](architecture-valores-declaratorios.md) — Validar a tela de Valores Declaratórios do SPED através do menu Fiscal > SPED > Valores Declaratórios, garantindo que a listagem seja exibida corretamente, que seja possível navegar para o cadastro e preencher o formulário com os campos obrigatórios.

### 📈 Gestor (3 documentações)

- [`architecture-gestor-precos-listagem.md`](architecture-gestor-precos-listagem.md) — Validar o fluxo de **listagem de preços** no módulo Gestor de Preços, cobrindo:
- [`architecture-gestor-precos.md`](architecture-gestor-precos.md) — Validar o fluxo completo do módulo **Gestor de Preços**, cobrindo:
- [`architecture-gestor-promocoes.md`](architecture-gestor-promocoes.md) — Validar o fluxo completo do módulo **Gestor de Promoções**, cobrindo:

### 📊 Relatórios (6 documentações)

- [`architecture-relatorio-caixa.md`](architecture-relatorio-caixa.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Relatório de Caixa**, que valida a geração e visualização de relatórios de caixa com diferentes tipos (analítico e sintético), períodos e turnos.
- [`architecture-relatorios-financeiro.md`](architecture-relatorios-financeiro.md) — Este documento descreve a arquitetura dos testes relacionados aos **Relatórios Financeiros**, que validam a geração e visualização de 3 relatórios do módulo financeiro.
- [`architecture-relatorios-fiscal.md`](architecture-relatorios-fiscal.md) — Este documento descreve a arquitetura dos testes relacionados aos **Relatórios Fiscais**, que validam a geração e visualização de 6 relatórios do módulo fiscal.
- [`architecture-relatorios-produtos.md`](architecture-relatorios-produtos.md) — Este documento descreve a arquitetura dos testes relacionados aos **Relatórios de Produtos**, que validam a geração e visualização de 6 relatórios do módulo de produtos.
- [`architecture-relatorios-vendas.md`](architecture-relatorios-vendas.md) — Este documento descreve a arquitetura dos testes relacionados aos **Relatórios de Vendas**, que validam a geração e visualização de 6 relatórios do módulo de vendas.
- [`architecture-relatorios.md`](architecture-relatorios.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Relatórios Gerais**, que valida o acesso e navegação para todos os relatórios disponíveis no sistema através de um teste iterativo baseado em fixture.

### 📦 Cadastro de Produto (2 documentações)

- [`architecture-cadastro-produto.md`](architecture-cadastro-produto.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Produto**, que valida o processo completo de cadastro, edição e exclusão de produtos no sistema, incluindo funcionalidades avançadas como grade, combo e vínculo fiscal.
- [`architecture-listagem-produtos.md`](architecture-listagem-produtos.md) — Garantir que o menu de **Compras e Estoque > Produtos > Produto** apresenta corretamente os filtros, realiza pesquisas e controla os seletores de linha na listagem principal.

### 📦 Compras (2 documentações)

- [`architecture-cadastro-compra-manual.md`](architecture-cadastro-compra-manual.md) — Validar o fluxo completo de **cadastro manual de compras**, garantindo que o formulário seja carregado corretamente ao acessar `Compras e Estoque > Gestão de Compras > Compras > Novo Cadastro`.
- [`architecture-cadastro-compra.md`](architecture-cadastro-compra.md) — Exercitar o fluxo completo de importação de NFe pelo XML no módulo de compras.

### 📦 Estoque (1 documentações)

- [`architecture-dashboard-estoque.md`](architecture-dashboard-estoque.md) — Documentação arquitetural do caso de teste.

### 🔄 Consignação (3 documentações)

- [`architecture-consignacao-extrato.md`](architecture-consignacao-extrato.md) — Documentação arquitetural do caso de teste.
- [`architecture-devolucao-consignacao.md`](architecture-devolucao-consignacao.md) — Implementar testes automatizados para o módulo Devolução/Venda de Consignação, cobrindo:
- [`architecture-requisicao-consignacao.md`](architecture-requisicao-consignacao.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Requisição de Consignação**, que valida o processo completo de listagem e cadastro de requisições de consignação no sistema.

### 🔗 Vínculo Fiscal (2 documentações)

- [`architecture-novocadastrovinculofiscal.md`](architecture-novocadastrovinculofiscal.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Novo Cadastro de Vínculo Fiscal**, que valida o processo completo de criação de vínculos fiscais, incluindo configurações de entrada, saída NFe e saída NFCe.
- [`architecture-vinculo-fiscal-listagem.md`](architecture-vinculo-fiscal-listagem.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Vínculo Fiscal**, que valida a navegação, ações de cadastro, edição e exclusão na listagem de vínculos fiscais.

### 🔧 Incidentes (6 documentações)

- [`architecture-incidente-85857-nfe-fcpst.md`](architecture-incidente-85857-nfe-fcpst.md) — Regressão do incidente **85857**: NFe com **FCPST** no resumo de emissão, autorização sem rejeição e **XML** (Mais ações > Download XML) contendo **tags FCP com valores**.
- [`architecture-incidente-compras-importar-nfe-chave.md`](architecture-incidente-compras-importar-nfe-chave.md) — Regressão do erro 500 ao consultar/importar NFe pela chave de acesso na jornada **Compras > Importar NFe**.
- [`architecture-incidente-compras-nuvem-fiscal.md`](architecture-incidente-compras-nuvem-fiscal.md) — Regressão do incidente de falha ao acessar/consultar notas na Nuvem Fiscal (erro de host/DNS ou 500). Garante que a listagem carrega, a pesquisa executa e a UI não exibe página de erro.
- [`architecture-incidente-financeiro-recebimento-calendario.md`](architecture-incidente-financeiro-recebimento-calendario.md) — Regressão do bug em que o calendário (datepicker) da data de recebimento abria atrás do modal.
- [`architecture-incidente-importacao-nf-compra-multipla.md`](architecture-incidente-importacao-nf-compra-multipla.md) — Regressão do erro 500 ao importar a segunda NF de compra e ao importar pelo XML em sequência.
- [`architecture-incidente-relatorios-caixa-pdf-longo.md`](architecture-incidente-relatorios-caixa-pdf-longo.md) — Regressão de timeout/504 ou 500 ao gerar PDF do relatório de caixa com período maior (≈15 dias).

### 🛒 Venda-NFCe/NFe (15 documentações)

- [`architecture-cadastro-nfe-ajuste.md`](architecture-cadastro-nfe-ajuste.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de NFe Ajuste**, que valida o processo completo de criação de Notas Fiscais Eletrônicas do tipo Ajuste no sistema, incluindo o preenchimento de dados da nota de ajuste e o fluxo completo de emissão.
- [`architecture-cadastro-nfe-complementar.md`](architecture-cadastro-nfe-complementar.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de NFe Complementar**, que valida o processo completo de criação de Notas Fiscais Eletrônicas do tipo Complementar no sistema, incluindo o preenchimento de dados da nota complementar e o fluxo completo de emissão com itens zerados.
- [`architecture-cadastro-nfe-devolucao.md`](architecture-cadastro-nfe-devolucao.md) — Exercitar o fluxo completo de todas as finalidades de NFe Devolução no módulo de vendas, desde a tela inicial até a confirmação de emissão.
- [`architecture-cadastro-nfe-dropdown-acoes.md`](architecture-cadastro-nfe-dropdown-acoes.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Validação do Dropdown Mais Ações** no cadastro de NFe, que valida todas as opções disponíveis no dropdown de ações adicionais após a emissão de uma NFe.
- [`architecture-cadastro-nfe-normal.md`](architecture-cadastro-nfe-normal.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de NFe Normal**, que valida o processo completo de criação de Notas Fiscais Eletrônicas do tipo Normal no sistema, incluindo diferentes tipos de origem (Avulsa, Venda, NFCe e Movimentação).
- [`architecture-cadastro-nfe.md`](architecture-cadastro-nfe.md) — Exercitar o fluxo completo de todas as finalidades e tipos de NFe no modulo de vendas, desde a tela inicial ate a confirmacao de emissao.
- [`architecture-cancelamento-nfe.md`](architecture-cancelamento-nfe.md) — Exercitar o fluxo completo de emissão e cancelamento de todas as finalidades de NFe no módulo de vendas.
- [`architecture-carta-correcao-nfe.md`](architecture-carta-correcao-nfe.md) — Exercitar o fluxo completo de emissão e geração de carta de correção (CCe) para todas as finalidades de NFe no módulo de vendas.
- [`architecture-listagem-nfe.md`](architecture-listagem-nfe.md) — Garantir que a navegaçao pelo menu **Vendas e NF-e > NF-e > Listagem NF-e** abre a tela com o titulo visivel e a tabela carregada.
- [`architecture-nfce-configuracoes.md`](architecture-nfce-configuracoes.md) — Documentação arquitetural do caso de teste.
- [`architecture-nfce-download-xml.md`](architecture-nfce-download-xml.md) — Validar a tela de Download do XML da NFC-e através do menu Vendas e NF-e > NFC-e > Download XML, garantindo que a tela seja exibida corretamente e que seja possível preencher o formulário de download.
- [`architecture-nfce-inutilizar.md`](architecture-nfce-inutilizar.md) — Validar a tela de Inutilizar Faixas da NFC-e através do menu Vendas e NF-e > NFC-e > Inutilizar, garantindo que a tela seja exibida corretamente e que os elementos principais estejam presentes.
- [`architecture-nfe-configuracoes.md`](architecture-nfe-configuracoes.md) — Documentação arquitetural do caso de teste.
- [`architecture-nfe-download-xml.md`](architecture-nfe-download-xml.md) — Documentação arquitetural do caso de teste.
- [`architecture-nfe-inutilizar.md`](architecture-nfe-inutilizar.md) — Documentação arquitetural do caso de teste.

### 🛒 Vendas (5 documentações)

- [`architecture-cadastro-venda.md`](architecture-cadastro-venda.md) — Validar o fluxo inicial do **cadastro de vendas**, garantindo que os botões principais, formulários e painéis (itens e pagamentos) sejam carregados corretamente ao abrir `Vendas e NF-e > Vendas > Novo Cadastro`.
- [`architecture-listagem-vendas.md`](architecture-listagem-vendas.md) — Garantir que o menu **Vendas e NF-e > Vendas** apresenta a tabela principal com dados, paginação e form de filtros, permitindo alternar o painel de busca sem recarregar.
- [`architecture-venda-nfce.md`](architecture-venda-nfce.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Venda com NFCe**, que valida o processo completo de realização de uma venda e emissão de Nota Fiscal de Consumidor Eletrônica (NFCe).
- [`architecture-venda-nfe.md`](architecture-venda-nfe.md) — Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Venda com NFe**, que valida o processo completo de realização de uma venda e emissão de Nota Fiscal Eletrônica (NFe).
- [`architecture-venda-nfse.md`](architecture-venda-nfse.md) — Validar o fluxo **happy path** de geração/emissão de **NFSe** a partir de uma **Venda**, garantindo que:

### 🛠️ Serviços (2 documentações)

- [`architecture-servico.md`](architecture-servico.md) — Documentação arquitetural do caso de teste.
- [`architecture-vinculo-fiscal-servico.md`](architecture-vinculo-fiscal-servico.md) — Documentação arquitetural do caso de teste.

