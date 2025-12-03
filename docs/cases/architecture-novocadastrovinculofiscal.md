# Arquitetura dos casos de teste: Novo Cadastro de Vínculo Fiscal

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Novo Cadastro de Vínculo Fiscal**, que valida o processo completo de criação de vínculos fiscais, incluindo configurações de entrada, saída NFe e saída NFCe.

**Funcionalidades cobertas:**
- Cadastro de novo vínculo fiscal
- Configuração de entrada
- Configuração de saída NFe
- Configuração de saída NFCe
- Validação de salvamento e tabela de configurações

**Cenários principais:**
- Preencher formulário de vínculo fiscal, salvar e validar informações
- Configurar entrada com CFOP, PIS, COFINS e IPI
- Configurar saída NFe com ICMS, IPI, PIS e COFINS
- Configurar saída NFCe com ICMS, PIS e COFINS

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/vinculo-fiscal/novocadastrovinculofiscal.spec.js` - Teste de cadastro de vínculo fiscal

### Page Objects
- `cypress/support/pages/VinculoFiscal/NovoCadastroVinculoFiscalPage.js` - Métodos para cadastro de vínculo fiscal
- `cypress/support/pages/VinculoFiscal/VinculoConfiguracaoEntradaPage.js` - Métodos para configuração de entrada
- `cypress/support/pages/VinculoFiscal/VinculoConfiguracaoSaidaPage.js` - Métodos para configuração de saída NFe
- `cypress/support/pages/VinculoFiscal/ConfiguracaoSaidaNFcePage.js` - Métodos para configuração de saída NFCe
- `cypress/support/pages/VinculoFiscal/VinculoFiscalListagemPage.js` - Navegação para listagem

### Locators
- `cypress/support/locators/NovoCadastroVinculoFiscalLocators.js` - Seletores do cadastro
- `cypress/support/locators/VinculoConfiguracaoEntradaLocators.js` - Seletores de configuração de entrada
- `cypress/support/locators/VinculoConfiguracaoSaidaLocators.js` - Seletores de configuração de saída
- `cypress/support/locators/ConfiguracaoSaidaNFceLocators.js` - Seletores de configuração NFCe

---

## Imports e dependências

### Page Objects
```javascript
import NovoCadastroVinculoFiscalPage from "../../support/pages/VinculoFiscal/NovoCadastroVinculoFiscalPage";
import VinculoConfiguracaoEntradaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoEntradaPage";
import VinculoConfiguracaoSaidaPage from "../../support/pages/VinculoFiscal/VinculoConfiguracaoSaidaPage";
import ConfiguracaoSaidaNFcePage from "../../support/pages/VinculoFiscal/ConfiguracaoSaidaNFcePage";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Cadastro de Novo Vínculo Fiscal

**Tags:** `['@cadastro-vinculo-fiscal', '@regressivo']` (ADR-0010)

#### `it('Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas')`

**Fluxo completo em 5 etapas:**

**1. Cadastro do Vínculo Fiscal:**
- Gera nome único com timestamp
- Preenche nome do vínculo
- Seleciona tipo de item ('00')
- Salva vínculo
- Valida toast de sucesso
- Valida título do vínculo criado
- Valida botão voltar
- Valida tabela de configurações

**2. Configuração de Entrada:**
- Abre modal de entrada
- Valida modal aberto
- Preenche formulário de entrada:
  - CFOP: '1102 - COMPRA PARA COMERCIALIZAÇÃO'
  - PIS: '98' com aliquota '3,50'
  - COFINS: '98' com aliquota '7,60'
  - IPI: '49'
- Salva formulário

**3. Configuração de Saída NFe:**
- Abre modal de saída NFe
- Valida modal aberto
- Preenche formulário de saída:
  - CFOP NFe e NFCe: '5102 - VENDA DE MERCADORIA'
  - CST/CSOSN: '00'
  - ICMS (modalidade base, acréscimo, redução, origem, ST)
  - IPI: '53'
  - PIS: '99' com aliquota '1,65'
  - COFINS: '99' com aliquota '7,60'
- Salva formulário
- Valida tabela de configurações

**4. Configuração de Saída NFCe:**
- Abre modal de saída NFCe
- Valida modal aberto
- Preenche formulário:
  - CFOP NFCe: '5102 - VENDA DE MERCADORIA'
  - CST/CSOSN: '00'
  - PIS: '99' com aliquota '1,65'
  - COFINS: '99' com aliquota '7,60'
  - ICMS modalidade base: '3'
- Salva configuração

**5. Adição de Produto (Comentado):**
- Selecionar primeiro produto
- Adicionar produto
- Verificar toast de sucesso

---

## Padrões e boas práticas

### Dados Dinâmicos
- Nome do vínculo com timestamp para garantir unicidade
- Dados fixos para configurações fiscais (padrões do sistema)

### Page Objects Especializados
- Separação de responsabilidades por tipo de configuração
- Cada configuração tem seu próprio Page Object

### Validações Incrementais
- Validação após cada etapa importante
- Validação de toast de sucesso
- Validação de tabela de configurações

### Uso de Autocomplete
- Seleção de valores via autocomplete
- Espera de lista de resultados antes de clicar

### Comentários no Código
- Código comentado para adição de produto (funcionalidade futura)
- Validações comentadas (podem ser reativadas)

### Tags aplicadas
- `@cadastro-vinculo-fiscal` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### NovoCadastroVinculoFiscalPage

**Navegação:**
- `visit()` - Acessa página via listagem e novo cadastro

**Preenchimento:**
- `preencherNomeVinculo(nome)` - Preenche nome do vínculo
- `selecionarTipoItem(tipo)` - Seleciona tipo de item via autocomplete

**Ações:**
- `salvarVinculo()` - Salva vínculo fiscal
- `voltar()` - Volta para listagem

**Validações:**
- `verificarFormularioVisivel()` - Verifica formulário visível
- `verificarToastSucesso()` - Verifica toast de sucesso
- `verificarTituloVinculoCriado(nomeVinculo)` - Valida título
- `verificarBotaoVoltar()` - Valida botão voltar
- `verificarTabelaConfiguracoes()` - Valida tabela com linhas

**Produtos (comentado):**
- `selecionarPrimeiroProduto()` - Seleciona primeiro produto
- `adicionarProduto()` - Adiciona produto ao vínculo

---

### VinculoConfiguracaoEntradaPage

**Ações:**
- `abrirModalEntrada()` - Abre modal de entrada (primeira linha)
- `validarModalAberto()` - Valida modal aberto com título correto

**Preenchimento:**
- `preencherFormularioEntrada(dados)` - Preenche formulário completo:
  - CFOP via autocomplete
  - Expande seção PIS/COFINS
  - Preenche PIS e aliquota
  - Preenche COFINS e aliquota
  - Expande seção IPI
  - Preenche IPI

**Ações:**
- `salvarFormulario()` - Salva formulário de entrada

---

### VinculoConfiguracaoSaidaPage

**Ações:**
- `abrirModalSaidaNFe()` - Abre modal de saída NFe (linha com "NFE")
- `abrirModalSaidaNFCe()` - Abre modal de saída NFCe (linha com "NFCe")
- `validarModalAberto()` - Valida modal aberto

**Preenchimento:**
- `preencherFormularioSaida(dadosSaida)` - Preenche formulário completo:
  - CFOP NFe e NFCe
  - Expande seção ICMS
  - Preenche ICMS (modalidade base, acréscimo, redução, origem)
  - Preenche ICMS ST (modalidade base, MVA, aliquota, redução, valor pauta)
  - Expande seção IPI
  - Preenche IPI
  - Expande seção PIS/COFINS
  - Preenche PIS e aliquota
  - Preenche COFINS e aliquota

**Ações:**
- `salvarFormulario()` - Salva formulário de saída

---

### ConfiguracaoSaidaNFcePage

**Validações:**
- `validarModalAberto()` - Valida modal aberto

**Preenchimento:**
- `preencherCampos(dadosSaida)` - Preenche formulário completo:
  - CFOP NFCe
  - Expande seção ICMS
  - Preenche ICMS (CST/CSOSN, modalidade base)
  - Expande seção PIS/COFINS
  - Preenche PIS e aliquota
  - Preenche COFINS e aliquota

**Ações:**
- `salvarConfiguracao()` - Salva configuração
- `validarSucesso()` - Valida toast de sucesso (comentado)

---

## Estrutura de Dados

### Dados de Entrada
```javascript
{
  cfop: '1102 - COMPRA PARA COMERCIALIZAÇÃO',
  pis: '98',
  pisAliquota: '3,50',
  cofins: '98',
  cofinsAliquota: '7,60',
  ipi: '49'
}
```

### Dados de Saída NFe
```javascript
{
  cfopNfe: '5102 - VENDA DE MERCADORIA',
  cfopNfce: '5102 - VENDA DE MERCADORIA',
  cstCsosn: '00',
  icmsModalidadeBase: '3 - Valor da operação',
  icmsAcrescimo: '2,50',
  icmsReducao: '10,00',
  icmsOrigem: '0',
  icmsStModalidadeBase: '4 - Margem Valor Agregado (%)',
  icmsStMva: '20,00',
  icmsStAliquota: '18,00',
  icmsStReducao: '5,00',
  icmsValorPauta: '500,00',
  ipi: '53',
  pis: '99',
  pisAliquota: '1,65',
  cofins: '99',
  cofinsAliquota: '7,60'
}
```

### Dados de Saída NFCe
```javascript
{
  cfopNfce: '5102 - VENDA DE MERCADORIA',
  cstCsosn: '00',
  pis: '99',
  pisAliquota: '1,65',
  cofins: '99',
  cofinsAliquota: '7,60',
  icmsModalidadeBase: '3'
}
```

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-vinculo-fiscal-listagem.md` - Documentação de listagem
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Teste complexo com múltiplas etapas e configurações
- Uso de Page Objects especializados por tipo de configuração
- Validações incrementais após cada etapa
- Dados fixos para configurações fiscais (padrões do sistema)
- Funcionalidade de adição de produto comentada (futura)
- Nome único gerado com timestamp para evitar conflitos

---

**Última atualização:** 2024-12-19

