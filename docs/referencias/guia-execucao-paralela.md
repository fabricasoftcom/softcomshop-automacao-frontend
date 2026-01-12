# Guia de Execução Paralela de Testes

> **Resumo**: Instruções para utilizar o script de execução paralela (`executar-paralelo.ps1`), reduzindo drasticamente o tempo total de execução da suíte de testes utilizando múltiplos núcleos do processador.

## 1. Visão Geral

O projeto possui um script PowerShell (`executar-paralelo.ps1`) capaz de orquestrar a execução de múltiplos processos do Cypress simultaneamente. Isso permite utilizar todo o potencial do hardware (16+ cores) para rodar testes que levariam horas em poucos minutos.

### Benefícios
- **Velocidade**: Executa em **14 threads simultâneas** (otimizado para alta performance).
- **Isolamento**: Cada grupo roda em um processo independente, garantindo sessões limpas.
- **Granularidade**: Módulos grandes (Financeiro, Relatórios, Configurações) divididos em subgrupos para balanceamento de carga.
- **Anti-Duplicidade**: Lógica inteligente para garantir que nenhum teste rode duas vezes.
- **Relatório Unificado**: Gera um único Allure Report ao final de todas as execuções.
- **Multi-Segmento**: Suporta configurações personalizadas por segmento (ex: Petshop com URL e ambiente próprios).

---

## 2. Como Utilizar

### Pré-requisitos
No PowerShell (apenas na primeira vez):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Comandos de Execução

#### 🚀 Execução Completa (Padrão)
Executa **todos** os testes do projeto.
```powershell
./executar-paralelo.ps1
```

#### 🔍 Execução Filtrada (Ex: Regressivo)
Executa apenas testes com uma tag específica (ex: `@regressivo`), mantendo a distribuição paralela.
**Importante:** Use o sinal `+` para indicar adição ao filtro base.
```powershell
./executar-paralelo.ps1 "+@regressivo"
```

#### 💨 Execução de Smoke Test
```powershell
./executar-paralelo.ps1 "+@smoke"
```

---

## 3. Arquitetura dos Grupos

O script divide os testes em **14 grupos** baseados em pastas do filesystem para evitar conflitos de dados e garantir performance otimizada através de granularidade fina.

### Estrutura de Grupos (Baseada em Pastas)

| Grupo | Pastas Incluídas | Descrição |
| :--- | :--- | :--- |
| **Fiscal_Geral** | `sped/`, `sintegra/`, `nfce/`, `nfe/` | Testes fiscais gerais e SPED |
| **Fiscal_Vendas** | `venda-nfcenfe/` | Volume alto de vendas com NFCe/NFe |
| **Vendas_Completo** | `vendas/`, `orcamento/`, `consignacao/`, `cadastro-clientes/` | Módulo de vendas e clientes |
| **Financeiro_Mov** | `financeiro/` (Movimentações) | Nova Receita/Despesa, Baixas, Transf. |
| **Financeiro_Gestao** | `financeiro/` (Gestão) | Relatórios, Contas, Cadastros básicos |
| **Estoque_Produtos** | `produtos/`, `cadastro-produto/`, `producao/` | Cadastro de produtos e produção |
| **Estoque_Gestao** | `compras/`, `estoque/`, `Balanco/`, `vinculo-fiscal/` | Gestão de estoque e compras |
| **Config_Entidades** | `configuracoes/` (Entidades) | Empresa, Funcionário, Usuário, Contador |
| **Config_Geral** | `configuracoes/` (Geral) | Restante das configurações |
| **Relatorios_Fiscal** | `relatorio/` (Fiscal) | Relatórios fiscais, contas e caixa |
| **Relatorios_Vendas** | `relatorio/` (Vendas/Estoque) | Comissões, Mais Vendidos, Estoque |
| **Relatorios_Diversos** | `relatorio/` (Diversos) | Outros relatórios |
| **Sistema_Servicos** | `sistema/`, `servicos/`, `contratos/`, `ta-em-ordem/` | Login, Setup, Serviços e Contratos |
| **Segmento_Petshop** | `petshop/` | Segmento Petshop (config personalizada) |

### Configurações Multi-Segmento

O script suporta grupos com configurações personalizadas através da propriedade `Config`. Quando um grupo possui `Config` definida:

- **Usa Cypress CLI diretamente**: `npx cypress run --browser chrome --config-file [arquivo]`
- **Respeita specPattern do config**: O arquivo de configuração define quais testes executar
- **URL e ambiente isolados**: Cada segmento pode ter sua própria URL e variáveis de ambiente

**Exemplo**: O grupo `Segmento_Petshop` usa `cypress.config.petshop.js`, que define:
- `baseUrl`: URL específica do ambiente Petshop
- `specPattern`: Apenas testes em `cypress/e2e/petshop/**/*.spec.js`
- `env.segmento`: Identificador do segmento

Para mais detalhes sobre configurações multi-segmento, consulte [Guia de Configurações Multi-Segmento](./guia-configuracoes-multi-segmento.md).

### Lógica de Exclusão

Os grupos marcados como "Geral" ou "Gestão" utilizam exclusões explícitas para garantir que nenhum teste seja executado duas vezes. Por exemplo, `Financeiro_Gestao` executa tudo de financeiro **EXCETO** o que já roda em `Financeiro_Mov`.

---

## 4. Monitoramento e Logs

Durante a execução:
1.  O terminal principal fica em espera (`AGUARDANDO TERMINO DOS TESTES`).
2.  Janelas minimizadas do PowerShell processam os testes.

### Em caso de Falhas
Os logs de execução de cada grupo são salvos individualmente em arquivos de texto para fácil debug:

- `logs/Fiscal_Geral.txt`
- `logs/Fiscal_Vendas.txt`
- `logs/Vendas_Completo.txt`
- `logs/Financeiro_Mov.txt`
- `logs/Financeiro_Gestao.txt`
- `logs/Estoque_Produtos.txt`
- `logs/Estoque_Gestao.txt`
- `logs/Config_Entidades.txt`
- `logs/Config_Geral.txt`
- `logs/Relatorios_Fiscal.txt`
- `logs/Relatorios_Vendas.txt`
- `logs/Relatorios_Diversos.txt`
- `logs/Sistema_Servicos.txt`
- `logs/Segmento_Petshop.txt`

Consulte esses arquivos para ver a saída do console do Cypress de cada grupo.

---

## 5. Relatórios

Ao final da execução (quando todas as janelas se fecham), o script automaticamente:
1.  Consolida os resultados da pasta `allure-results`.
2.  Executa `npm run report:allure`.
3.  Abre o navegador com o relatório HTML unificado.
