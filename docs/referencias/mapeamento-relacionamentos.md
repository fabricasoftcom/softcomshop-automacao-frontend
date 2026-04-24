# Mapeamento de Relacionamentos entre Documentações

**Versão:** 1.0  
**Data:** 2025-01-30  
**Status:** ✅ Ativo

---

## 📊 Como Usar Este Mapa

Este documento mapeia **TODOS** os relacionamentos entre documentações arquiteturais. Use-o para:

- **Descobrir documentações relacionadas** ao criar nova documentação
- **Manter referências bidirecionais sincronizadas** entre documentações
- **Identificar fluxos end-to-end** que conectam múltiplas funcionalidades
- **Garantir consistência** nas referências cruzadas

**Estrutura:**
- Relacionamentos organizados por módulo
- Diagramas de relacionamento para visualização
- Checklist para uso ao criar nova documentação
- Busca rápida por tipo de relacionamento

---

## 🔄 Relacionamentos por Módulo

### Financeiro > Receitas

```
Nova Receita
    ├─→ Listagem Contas a Receber (abre modal a partir desta listagem)
    ├─→ Recebimento (receitas criadas podem ser recebidas)
    └─→ Editar Receita (receitas criadas podem ser editadas)

Listagem Contas a Receber
    ├─→ Nova Receita (abre modal a partir desta listagem)
    ├─→ Recebimento (abre modal a partir desta listagem)
    └─→ Editar Receita (acessa edição a partir desta listagem)

Recebimento
    ├─→ Nova Receita (receitas criadas podem ser recebidas)
    ├─→ Listagem Contas a Receber (abre modal a partir desta listagem)
    └─→ Editar Receita (receitas editadas podem ser recebidas)

Editar Receita
    ├─→ Nova Receita (receitas criadas podem ser editadas)
    ├─→ Listagem Contas a Receber (acessa edição a partir desta listagem)
    └─→ Recebimento (receitas editadas podem ser recebidas)
```

**Documentações relacionadas:**
- `architecture-nova-receita.md` ↔ `architecture-listagem-contas-a-receber.md`
- `architecture-nova-receita.md` ↔ `architecture-recebimento.md`
- `architecture-nova-receita.md` ↔ `architecture-editar-receita.md`
- `architecture-listagem-contas-a-receber.md` ↔ `architecture-recebimento.md`
- `architecture-listagem-contas-a-receber.md` ↔ `architecture-editar-receita.md`
- `architecture-recebimento.md` ↔ `architecture-editar-receita.md`

**Tipos de relacionamento:**
- **Abre modal:** Listagem → Nova Receita, Listagem → Recebimento
- **Acessa edição:** Listagem → Editar Receita
- **Pode ser recebida:** Nova Receita → Recebimento, Editar Receita → Recebimento
- **Pode ser editada:** Nova Receita → Editar Receita

---

### Financeiro > Despesas

```
Nova Despesa
    ├─→ Listagem Contas a Pagar (abre modal a partir desta listagem)
    ├─→ Baixar Despesa (despesas criadas podem ser baixadas)
    └─→ Editar Despesa (despesas criadas podem ser editadas)

Listagem Contas a Pagar
    ├─→ Nova Despesa (abre modal a partir desta listagem)
    ├─→ Baixar Despesa (abre modal a partir desta listagem)
    └─→ Editar Despesa (acessa edição a partir desta listagem)

Baixar Despesa
    ├─→ Nova Despesa (despesas criadas podem ser baixadas)
    ├─→ Listagem Contas a Pagar (abre modal a partir desta listagem)
    └─→ Editar Despesa (despesas editadas podem ser baixadas)

Editar Despesa
    ├─→ Nova Despesa (despesas criadas podem ser editadas)
    ├─→ Listagem Contas a Pagar (acessa edição a partir desta listagem)
    └─→ Baixar Despesa (despesas editadas podem ser baixadas)
```

**Documentações relacionadas:**
- `architecture-nova-despesa.md` ↔ `architecture-listagem-contas-a-pagar.md`
- `architecture-nova-despesa.md` ↔ `architecture-baixar-despesa.md`
- `architecture-nova-despesa.md` ↔ `architecture-editar-despesa.md`
- `architecture-listagem-contas-a-pagar.md` ↔ `architecture-baixar-despesa.md`
- `architecture-listagem-contas-a-pagar.md` ↔ `architecture-editar-despesa.md`
- `architecture-baixar-despesa.md` ↔ `architecture-editar-despesa.md`

**Tipos de relacionamento:**
- **Abre modal:** Listagem → Nova Despesa, Listagem → Baixar Despesa
- **Acessa edição:** Listagem → Editar Despesa
- **Pode ser baixada:** Nova Despesa → Baixar Despesa, Editar Despesa → Baixar Despesa
- **Pode ser editada:** Nova Despesa → Editar Despesa

---

### Produtos > Balanço

```
Balanço
    └─→ Reverter Balanço (balanços finalizados podem ser revertidos)

Reverter Balanço
    └─→ Balanço (balanços criados podem ser revertidos)
```

**Documentações relacionadas:**
- `architecture-balanco.md` ↔ `architecture-reverter-balanco.md`

**Tipos de relacionamento:**
- **Pode ser revertido:** Balanço → Reverter Balanço

---

### Clientes

```
Cadastro Cliente
    └─→ Listagem Clientes (clientes cadastrados podem ser listados)

Listagem Clientes
    └─→ Cadastro Cliente (listagem permite acesso ao cadastro)
```

**Documentações relacionadas:**
- `architecture-cadastro-cliente.md` ↔ `architecture-listagem-clientes.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** Clientes cadastrados podem ser listados; listagem permite acesso ao cadastro

---

### Orçamento

```
Orçamento Cadastro
    └─→ Orçamento Listagem (orçamentos cadastrados podem ser listados)

Orçamento Listagem
    └─→ Orçamento Cadastro (listagem permite acesso ao cadastro)
```

**Documentações relacionadas:**
- `architecture-orcamento-cadastro.md` ↔ `architecture-orcamento-listagem.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** Orçamentos cadastrados podem ser listados; listagem permite acesso ao cadastro

---

### Produção

```
Cadastro Produção
    └─→ Listagem Produção (produções cadastradas podem ser listadas)

Listagem Produção
    └─→ Cadastro Produção (listagem permite acesso ao cadastro)
```

**Documentações relacionadas:**
- `architecture-cadastro-producao.md` ↔ `architecture-producao-listagem.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** Produções cadastradas podem ser listadas; listagem permite acesso ao cadastro

---

### Vendas

```
Cadastro Venda
    ├─→ Listagem Vendas (vendas cadastradas podem ser listadas)
    ├─→ Venda NFe (vendas cadastradas podem gerar NFe)
    └─→ Venda NFCe (vendas cadastradas podem gerar NFCe)

Listagem Vendas
    ├─→ Cadastro Venda (listagem permite acesso ao cadastro)
    ├─→ Venda NFe (listagem permite acesso a vendas para emissão de NFe)
    └─→ Venda NFCe (listagem permite acesso a vendas para emissão de NFCe)
```

**Documentações relacionadas:**
- `architecture-cadastro-venda.md` ↔ `architecture-listagem-vendas.md`
- `architecture-cadastro-venda.md` ↔ `architecture-venda-nfe.md`
- `architecture-cadastro-venda.md` ↔ `architecture-venda-nfce.md`
- `architecture-listagem-vendas.md` ↔ `architecture-venda-nfe.md`
- `architecture-listagem-vendas.md` ↔ `architecture-venda-nfce.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** Vendas cadastradas podem ser listadas; listagem permite acesso ao cadastro
- **Cadastro → Emissão:** Vendas cadastradas podem gerar NFe ou NFCe
- **Listagem → Emissão:** Listagem permite acesso a vendas para emissão de NFe ou NFCe

---

### Produtos

```
Cadastro Produto
    └─→ Listagem Produtos (produtos cadastrados podem ser listados)

Listagem Produtos
    └─→ Cadastro Produto (listagem permite acesso ao cadastro)
```

**Documentações relacionadas:**
- `architecture-cadastro-produto.md` ↔ `architecture-listagem-produtos.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** Produtos cadastrados podem ser listados; listagem permite acesso ao cadastro

---

### Financeiro > Contas

```
Cadastro Conta
    ├─→ Listagem Conta (listagem permite acesso ao cadastro)
    └─→ Cadastro Conta Corrente (seleção de tipo "Conta Corrente" navega para cadastro específico)

Cadastro Conta Corrente
    ├─→ Listagem Conta (contas cadastradas podem ser listadas)
    └─→ Edição Conta Corrente (contas cadastradas podem ser editadas)

Listagem Conta
    ├─→ Cadastro Conta (listagem permite acesso ao cadastro)
    ├─→ Edição Conta Corrente (listagem permite acesso à edição)
    ├─→ Transferência Contas (listagem permite acesso à transferência)
    └─→ Lançamento Conta (listagem permite acesso ao lançamento)

Edição Conta Corrente
    ├─→ Cadastro Conta Corrente (contas editadas foram cadastradas)
    └─→ Listagem Conta (edição acessada a partir da listagem)
```

**Documentações relacionadas:**
- `architecture-cadastro-conta.md` ↔ `architecture-listagem-conta.md`
- `architecture-cadastro-conta.md` ↔ `architecture-cadastro-conta-corrente.md`
- `architecture-cadastro-conta-corrente.md` ↔ `architecture-edicao-conta-corrente.md`
- `architecture-listagem-conta.md` ↔ `architecture-edicao-conta-corrente.md`
- `architecture-listagem-conta.md` ↔ `architecture-transferencia-contas.md`
- `architecture-listagem-conta.md` ↔ `architecture-lancamento-conta.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** Contas cadastradas podem ser listadas; listagem permite acesso ao cadastro
- **Seleção → Cadastro Específico:** Cadastro de conta permite selecionar tipo e navegar para cadastro específico
- **Cadastro → Edição:** Contas correntes cadastradas podem ser editadas
- **Listagem → Ação:** Listagem permite acesso a edição, transferência e lançamento

---

### Consignação

```
Requisição Consignação
    └─→ Devolução Consignação (requisições podem gerar devoluções/vendas)

Devolução Consignação
    └─→ Requisição Consignação (devoluções referenciam requisições)
```

**Documentações relacionadas:**
- `architecture-requisicao-consignacao.md` ↔ `architecture-devolucao-consignacao.md`

**Tipos de relacionamento:**
- **Requisição ↔ Devolução:** Requisições de consignação podem gerar devoluções/vendas; devoluções referenciam requisições

---

### NFe

```
Cadastro NFe (Geral)
    ├─→ Listagem NFe (NFes cadastradas podem ser listadas)
    ├─→ Cadastro NFe Normal (tipo específico de NFe)
    ├─→ Cadastro NFe Ajuste (tipo específico de NFe)
    ├─→ Cadastro NFe Complementar (tipo específico de NFe)
    └─→ Cadastro NFe Devolução (tipo específico de NFe)

Cadastro NFe Normal
    ├─→ Cancelamento NFe (NFes Normal podem ser canceladas)
    ├─→ Carta Correção NFe (NFes Normal podem receber carta de correção)
    └─→ Dropdown Ações (NFes Normal têm dropdown de ações)

Listagem NFe
    ├─→ Cadastro NFe (Geral) (listagem permite acesso ao cadastro)
    ├─→ Cancelamento NFe (listagem permite cancelar NFes)
    ├─→ Carta Correção NFe (listagem permite emitir carta de correção)
    └─→ Dropdown Ações (listagem permite acessar ações via dropdown)
```

**Documentações relacionadas:**
- `architecture-cadastro-nfe.md` ↔ `architecture-listagem-nfe.md`
- `architecture-cadastro-nfe.md` ↔ `architecture-cadastro-nfe-normal.md`
- `architecture-cadastro-nfe.md` ↔ `architecture-cadastro-nfe-ajuste.md`
- `architecture-cadastro-nfe.md` ↔ `architecture-cadastro-nfe-complementar.md`
- `architecture-cadastro-nfe.md` ↔ `architecture-cadastro-nfe-devolucao.md`
- `architecture-cadastro-nfe-normal.md` ↔ `architecture-cancelamento-nfe.md`
- `architecture-cadastro-nfe-normal.md` ↔ `architecture-carta-correcao-nfe.md`
- `architecture-cadastro-nfe-normal.md` ↔ `architecture-cadastro-nfe-dropdown-acoes.md`
- `architecture-listagem-nfe.md` ↔ `architecture-cancelamento-nfe.md`
- `architecture-listagem-nfe.md` ↔ `architecture-carta-correcao-nfe.md`
- `architecture-listagem-nfe.md` ↔ `architecture-cadastro-nfe-dropdown-acoes.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** NFes cadastradas podem ser listadas; listagem permite acesso ao cadastro
- **Cadastro Geral → Tipo Específico:** Cadastro geral de NFe inclui tipos específicos (Normal, Ajuste, Complementar, Devolução)
- **Cadastro → Ação:** NFes Normal podem ser canceladas, receber carta de correção e ter ações via dropdown
- **Listagem → Ação:** Listagem permite cancelar NFes, emitir carta de correção e acessar ações via dropdown

---

### Configurações

**Padrão comum:** Múltiplas entidades seguem padrão cadastro ↔ listagem

```
Empresa Cadastro ↔ Empresa Listagem
Funcionário Cadastro ↔ Funcionário Listagem
Usuário Cadastro ↔ Usuário Listagem
Justificativa Cadastro ↔ Justificativa Listagem
Perfil Acesso Cadastro ↔ Perfil Acesso Listagem
```

**Documentações relacionadas:**
- `architecture-empresa-cadastro.md` ↔ `architecture-empresa-listagem.md`
- `architecture-funcionario-cadastro.md` ↔ `architecture-funcionario-listagem.md`
- `architecture-usuario-cadastro.md` ↔ `architecture-usuario-listagem.md`
- `architecture-justificativa-cadastro.md` ↔ `architecture-justificativa-listagem.md`
- `architecture-perfil-acesso-cadastro.md` ↔ `architecture-perfil-acesso.md`
- `architecture-cadastro-mensagem.md` - Cadastro de Mensagens (Venda Mais); relacionamento com listagem de mensagens quando documentação existir

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem (padrão):** Todas as entidades de configuração seguem este padrão - cadastros podem ser listados; listagens permitem acesso ao cadastro

---

### Fiscal

```
Cadastro Vínculo Fiscal
    └─→ Listagem Vínculo Fiscal (vínculos cadastrados podem ser listados)

Listagem Vínculo Fiscal
    └─→ Cadastro Vínculo Fiscal (listagem permite acesso ao cadastro)

SPED Configurações
    ├─→ SPED Gerar Arquivo (configurações são necessárias para gerar arquivo)
    ├─→ Plano Contas SPED (configurações incluem plano de contas)
    └─→ Valores Declaratórios (configurações incluem valores declaratórios)
```

**Documentações relacionadas:**
- `architecture-novocadastrovinculofiscal.md` ↔ `architecture-vinculo-fiscal-listagem.md`
- `architecture-sped-configuracoes.md` ↔ `architecture-sped-gerar-arquivo.md`
- `architecture-sped-configuracoes.md` ↔ `architecture-plano-contas-sped.md`
- `architecture-sped-configuracoes.md` ↔ `architecture-valores-declaratorios.md`

**Tipos de relacionamento:**
- **Cadastro ↔ Listagem:** Vínculos fiscais cadastrados podem ser listados; listagem permite acesso ao cadastro
- **Configuração → Ação:** Configurações do SPED são necessárias para gerar arquivo
- **Configuração → Dependência:** Configurações do SPED incluem plano de contas e valores declaratórios

---

### Compras

```
Cadastro Compra Manual
    ├─→ Cadastro Fornecedor (compras manuais requerem fornecedor)
    └─→ Nuvem Fiscal (compras podem ser cadastradas manualmente ou importadas)

Cadastro Compra
    └─→ Nuvem Fiscal (cadastro de compra pode usar importação de NFe da Nuvem Fiscal)
```

**Documentações relacionadas:**
- `architecture-cadastro-compra-manual.md` ↔ `architecture-cadastro-fornecedor.md`
- `architecture-cadastro-compra-manual.md` ↔ `architecture-nuvem-fiscal.md`
- `architecture-cadastro-compra.md` ↔ `architecture-nuvem-fiscal.md`

**Tipos de relacionamento:**
- **Cadastro → Dependência:** Cadastro de compra manual requer fornecedor
- **Cadastro → Alternativa:** Compras podem ser cadastradas manualmente ou importadas da Nuvem Fiscal

---

### Incidentes (regressão)

- `architecture-incidente-compras-nuvem-fiscal.md` ↔ `architecture-nuvem-fiscal.md` (fluxo Nuvem Fiscal existente)
- `architecture-incidente-compras-importar-nfe-chave.md` ↔ `architecture-cadastro-compra.md` (importação em `/compra`)
- `architecture-incidente-importacao-nf-compra-multipla.md` ↔ `architecture-cadastro-compra.md`
- `architecture-incidente-financeiro-recebimento-calendario.md` ↔ `architecture-recebimento.md`
- `architecture-incidente-relatorios-caixa-pdf-longo.md` ↔ `architecture-relatorio-caixa.md`
- `ai-reports/incidents-analysis.md` → cada `architecture-incidente-*.md` (origem dos cenários)

---

### Ecossistema AI Toolkit

| Documentação | Relaciona-se com | Tipo de Relação |
|-------------|------------------|-----------------|
| `ecossistema-ai-toolkit-melhoria-continua.md` | `ADR-0017` | Implementa decisão arquitetural |
| `ecossistema-ai-toolkit-melhoria-continua.md` | `architeture.mdc` | Define fluxo de melhoria contínua |
| `ecossistema-ai-toolkit-melhoria-continua.md` | `guia-uso-ai-toolkit.md` | Guia prático de uso das ferramentas |
| `guia-uso-ai-toolkit.md` | `ecossistema-ai-toolkit-melhoria-continua.md` | Detalha uso prático do ecossistema |
| `guia-uso-ai-toolkit.md` | `ADR-0017` | Operacionaliza decisão arquitetural |

---

## 📋 Checklist ao Criar Nova Documentação

Ao criar `docs/cases/architecture-[novo].md`:

1. [ ] **Consultar este mapa para identificar relacionamentos**
   - **Por quê:** Garante que todos os relacionamentos são identificados
   - **Como:** Revisar seções de módulos relacionados neste mapa
   - **Validação:** Confirmar que relacionamentos foram identificados

2. [ ] **Adicionar referências bidirecionais em TODAS as documentações relacionadas**
   - **Por quê:** Referências bidirecionais facilitam navegação
   - **Como:** 
     - Adicionar referência em `architecture-[novo].md` para cada documentação relacionada
     - Adicionar referência em cada documentação relacionada para `architecture-[novo].md`
   - **Validação:** Confirmar que todas as referências foram adicionadas

3. [ ] **Atualizar este mapa com o novo relacionamento**
   - **Por quê:** Mantém mapa atualizado como fonte única de verdade
   - **Como:** 
     - Adicionar novo relacionamento na seção apropriada
     - Atualizar diagrama de relacionamento se necessário
   - **Validação:** Confirmar que mapa foi atualizado

4. [ ] **Validar que todas as referências estão corretas**
   - **Por quê:** Referências incorretas quebram navegação
   - **Como:** 
     - Verificar que links estão corretos
     - Verificar que descrições de relacionamento estão corretas
   - **Validação:** Confirmar que todas as referências estão funcionando

---

## 🔍 Busca Rápida

### Por Tipo de Relacionamento

#### Fluxo de Criação → Listagem → Ação

**Padrão:** Criar registro → Listar registros → Executar ação sobre registro

**Exemplos:**
- Nova Receita → Listagem Contas a Receber → Recebimento
- Nova Despesa → Listagem Contas a Pagar → Baixar Despesa

**Documentações relacionadas:**
- `architecture-nova-receita.md` → `architecture-listagem-contas-a-receber.md` → `architecture-recebimento.md`
- `architecture-nova-despesa.md` → `architecture-listagem-contas-a-pagar.md` → `architecture-baixar-despesa.md`

---

#### Fluxo de Edição

**Padrão:** Listar registros → Editar registro → Validar edição

**Exemplos:**
- Listagem Contas a Receber → Editar Receita
- Listagem Contas a Pagar → Editar Despesa

**Documentações relacionadas:**
- `architecture-listagem-contas-a-receber.md` → `architecture-editar-receita.md`
- `architecture-listagem-contas-a-pagar.md` → `architecture-editar-despesa.md`

---

#### Fluxo de Reversão

**Padrão:** Criar/Executar ação → Reverter ação

**Exemplos:**
- Balanço → Reverter Balanço

**Documentações relacionadas:**
- `architecture-balanco.md` → `architecture-reverter-balanco.md`

---

#### Fluxo de Cadastro ↔ Listagem

**Padrão:** Cadastrar registro → Listar registros → Acessar cadastro a partir da listagem

**Exemplos:**
- Cadastro Cliente ↔ Listagem Clientes
- Cadastro Produto ↔ Listagem Produtos
- Cadastro Venda ↔ Listagem Vendas
- Orçamento Cadastro ↔ Orçamento Listagem
- Produção Cadastro ↔ Produção Listagem

**Documentações relacionadas:**
- `architecture-cadastro-cliente.md` ↔ `architecture-listagem-clientes.md`
- `architecture-cadastro-produto.md` ↔ `architecture-listagem-produtos.md`
- `architecture-cadastro-venda.md` ↔ `architecture-listagem-vendas.md`
- `architecture-orcamento-cadastro.md` ↔ `architecture-orcamento-listagem.md`
- `architecture-cadastro-producao.md` ↔ `architecture-producao-listagem.md`

---

#### Fluxo de Cadastro → Edição

**Padrão:** Cadastrar registro → Editar registro

**Exemplos:**
- Cadastro Conta Corrente → Edição Conta Corrente

**Documentações relacionadas:**
- `architecture-cadastro-conta-corrente.md` → `architecture-edicao-conta-corrente.md`

---

#### Fluxo de Cadastro Geral → Tipo Específico

**Padrão:** Cadastro geral → Selecionar tipo específico → Cadastro específico

**Exemplos:**
- Cadastro NFe → NFe Normal/Ajuste/Complementar/Devolução
- Cadastro Conta → Conta Corrente

**Documentações relacionadas:**
- `architecture-cadastro-nfe.md` → `architecture-cadastro-nfe-normal.md`
- `architecture-cadastro-nfe.md` → `architecture-cadastro-nfe-ajuste.md`
- `architecture-cadastro-conta.md` → `architecture-cadastro-conta-corrente.md`

---

#### Fluxo de Configuração → Ação/Dependência

**Padrão:** Configurar → Executar ação ou usar dependência

**Exemplos:**
- SPED Configurações → SPED Gerar Arquivo
- SPED Configurações → Plano Contas SPED

**Documentações relacionadas:**
- `architecture-sped-configuracoes.md` → `architecture-sped-gerar-arquivo.md`
- `architecture-sped-configuracoes.md` → `architecture-plano-contas-sped.md`

---

#### Fluxo de Requisição ↔ Devolução

**Padrão:** Criar requisição → Gerar devolução/venda

**Exemplos:**
- Requisição Consignação ↔ Devolução Consignação

**Documentações relacionadas:**
- `architecture-requisicao-consignacao.md` ↔ `architecture-devolucao-consignacao.md`

---

#### Fluxo de Cadastro → Emissão

**Padrão:** Cadastrar → Emitir documento fiscal

**Exemplos:**
- Cadastro Venda → Venda NFe
- Cadastro Venda → Venda NFCe

**Documentações relacionadas:**
- `architecture-cadastro-venda.md` → `architecture-venda-nfe.md`
- `architecture-cadastro-venda.md` → `architecture-venda-nfce.md`

---

## 📝 Exemplo de Uso

### Cenário: Criar nova documentação `architecture-nova-conta.md`

1. **Consultar mapa:**
   - Verificar seção "Financeiro > Contas" (se existir)
   - Identificar relacionamentos potenciais (Listagem, Edição, etc.)

2. **Identificar relacionamentos:**
   - Nova Conta pode ser listada → `architecture-listagem-conta.md`
   - Nova Conta pode ser editada → `architecture-edicao-conta-corrente.md`
   - Listagem pode abrir modal de nova conta → `architecture-nova-conta.md`

3. **Adicionar referências bidirecionais:**
   - Em `architecture-nova-conta.md`: adicionar referências para listagem e edição
   - Em `architecture-listagem-conta.md`: adicionar referência para nova conta
   - Em `architecture-edicao-conta-corrente.md`: adicionar referência para nova conta

4. **Atualizar mapa:**
   - Adicionar Nova Conta na seção "Financeiro > Contas"
   - Atualizar diagrama de relacionamento

5. **Validar:**
   - Verificar que todos os links estão corretos
   - Confirmar que descrições estão corretas

---

## 🔄 Manutenção

Este mapa deve ser atualizado sempre que:
- Nova documentação é criada com relacionamentos
- Relacionamentos existentes mudam
- Novos tipos de relacionamento são identificados

**Última atualização:** 2025-01-30  
**Mantido por:** Equipe de Automação

---

## 📚 Referências

- [Processo de Documentação](./processo-documentacao.md) - Processo completo de criação de documentações
- [ADR-0006: Mandatory Documentation](../adr/0006-mandatory-documentation-for-new-tests.md) - Documentação obrigatória
- [ADR-0014: Standardized Architectural Documentation Process](../adr/0014-standardized-architectural-documentation-process.md) - Processo padronizado
- [ADR-0017: Use AI SDK for Continuous Improvement](../adr/0017-use-ai-sdk-for-continuous-improvement.md) - AI Toolkit para análise de regras, geração de cenários e detecção de flaky
- [Ecossistema AI Toolkit e Melhoria Contínua](./ecossistema-ai-toolkit-melhoria-continua.md) - Fluxo completo, exemplos dos três usos da IA e passo a passo com Cursor-ready

