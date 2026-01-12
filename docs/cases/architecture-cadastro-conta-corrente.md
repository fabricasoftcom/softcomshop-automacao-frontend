# Arquitetura dos casos de teste: Cadastro de Conta Corrente

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Conta Corrente**, que valida o processo completo de cadastro de contas correntes bancárias com integração bancária e cobrança.

**Funcionalidades cobertas:**
- Cadastro de conta corrente para múltiplos bancos
- Configuração de dados básicos da conta (agência, conta, saldo inicial)
- Ativação de cobrança bancária
- Configuração de integração bancária (API ou Arquivo)
- Configuração de campos específicos por banco
- Validação de sucesso do cadastro

**Cenários principais:**
- Cadastrar conta corrente para cada banco da lista (7 bancos)
- Configurar integração bancária com dados aleatórios
- Validar que popup de erro não aparece ao ativar cobrança bancária
- Validar mensagem de sucesso após cadastro

**Bancos testados:**
- Banco do Brasil (001)
- Santander (033)
- Caixa Econômica (104)
- Bradesco S.A. (237)
- Itaú Unibanco S (341)
- Sicredi S.A. (748)
- BANCOOB/SICOOB (756)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/cadastro-conta-corrente.spec.js` - Teste de cadastro de conta corrente

### Page Objects
- `cypress/support/pages/Financeiro/ContaCorrenteCadastroPage.js` - Métodos para cadastro de conta corrente
- `cypress/support/pages/Financeiro/ContaCadastroPage.js` - Métodos para seleção de tipo de conta
- `cypress/support/pages/Financeiro/ListagemContasPage.js` - Navegação para listagem de contas

### Locators
- `cypress/support/locators/ContaCorrenteCadastroLocator.js` - Seletores do cadastro de conta corrente
- `cypress/support/locators/ContaCadastroLocator.js` - Seletores da seleção de tipo de conta

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import contaCorrenteCadastroPage from "../../support/pages/Financeiro/ContaCorrenteCadastroPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import contaCorrenteCadastroLocator from '../../locators/ContaCorrenteCadastroLocator';
```

### Commands
- `cy.loginArmazenandoSessaoCobranca()` - Login com usuário de cobrança bancária
- `cy.visit("/")` - Navegação para página inicial

### Funções auxiliares (no spec)
- `gerarDadosConta(nome, codigo)` - Gera dados aleatórios da conta
- `gerarNumeroAleatorio(min, max)` - Gera número aleatório
- `obterDataHoraAtual()` - Obtém data e hora atual formatada
- `gerarChave16Bits()` - Gera chave aleatória de 16 bits
- `gerarChavePix()` - Gera chave Pix aleatória

---

## Estrutura do teste

### Suite: Cadastro de Conta Corrente

**Tags:** `['@cadastro-conta-corrente', '@financeiro', '@regressivo']` (ADR-0010)

#### Teste Iterativo por Banco

O teste utiliza `forEach` para iterar sobre uma lista de bancos, criando um teste dinâmico para cada banco:

```javascript
bancos.forEach(({ codigo, nome }) => {
  it(`Deve cadastrar uma conta para o banco: ${nome} (Código: ${codigo}) com cobrança bancária`, () => {
    // ... fluxo completo
  });
});
```

**Fluxo completo para cada banco:**

1. **Seleção do Banco:**
   - Preenche banco por nome usando autocomplete
   - Valida passo atual: "2. Cadastrar Dados"

2. **Preenchimento de Dados Básicos:**
   - Gera dados aleatórios da conta (agência, conta, saldo inicial, etc.)
   - Preenche formulário com dados gerados
   - Descrição inclui nome do banco, código e timestamp

3. **Ativação de Cobrança Bancária:**
   - Alterna switch de cobrança bancária para ativo
   - Aguarda 5345ms para garantir que alerta não apareça
   - Verifica que popup de erro não aparece

4. **Avanço para Integração Bancária:**
   - Avança para próximo passo

5. **Configuração de Integração Bancária:**
   - Determina tipo de integração (API para BB/Itaú, Arquivo para outros)
   - Gera dados de integração com valores aleatórios:
     - Convênio, último nosso número, último número remessa
     - Variação carteira, posto, código transmissão
     - Valores de juros, multa, desconto
     - Dias de protesto e baixa
     - Mensagens personalizadas
   - Para integração API: Client ID, Client Secret, Chave Pix
   - Preenche campos de integração bancária

6. **Finalização:**
   - Avança para próximo passo
   - Verifica mensagem de sucesso

---

## Padrões e boas práticas

### Teste Iterativo Dinâmico
- Uso de `forEach` para criar testes dinâmicos por banco
- Cada banco gera um teste único com dados específicos
- Título do teste inclui nome e código do banco

### Geração de Dados Aleatórios
- Dados únicos para cada execução (agência, conta, valores)
- Timestamp na descrição para garantir unicidade
- Valores aleatórios para integração bancária

### Validação de Passos
- Validação de passo atual antes de preencher
- Verificação de que popup de erro não aparece
- Validação de mensagem de sucesso final

### Tratamento de Campos Desabilitados
- Verificação se campo está habilitado antes de preencher
- Ignora campos desabilitados sem erro
- Log informativo para campos ignorados

### Integração Bancária Condicional
- Tipo de integração determinado pelo banco
- Campos específicos para integração API (Client ID, Secret, PIX)
- Campos comuns para todos os tipos

### Aguardos Estratégicos
- Aguardo de 5345ms após ativar cobrança bancária
- Aguardo de `#loading` desaparecer quando necessário

### Tags aplicadas
- `@cadastro-conta-corrente` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ContaCorrenteCadastroPage

**Navegação:**
- `visit()` - Acessa página de cadastro e seleciona "Conta Corrente"

**Validações:**
- `validarPassoAtual(nomePasso)` - Valida passo atual do wizard

**Preenchimento:**
- `preencherBancoPorNome(nomeBanco)` - Preenche banco usando autocomplete
- `preencherFormulario(dadosConta)` - Preenche formulário com dados da conta
- `preencherIntegracaoBancaria(dadosIntegracao)` - Preenche campos de integração bancária

**Switches:**
- `alternarCobrancaBancaria(estado)` - Alterna switch de cobrança bancária
- `alternarSwitch(switchLocator, estado)` - Alterna qualquer switch

**Navegação entre passos:**
- `avancarParaProximoPasso()` - Avança para próximo passo do wizard

**Validações:**
- `verificarMensagemSucesso()` - Verifica mensagem de sucesso
- `verificarCampoHabilitado(campoLocator)` - Verifica se campo está habilitado

---

## Locators utilizados

### ContaCorrenteCadastroLocator

**Wizard:**
- `stepAtivo` - Passo ativo do wizard

**Banco:**
- `bancoAutocomplete` - Autocomplete de banco
- `bancoListaResultados` - Lista de resultados do autocomplete

**Campos básicos:**
- `descricao` - Campo descrição
- `agencia` - Campo agência
- `agenciaDV` - Campo agência DV
- `contaCorrente` - Campo conta corrente
- `contaDV` - Campo conta DV
- `saldoInicial` - Campo saldo inicial
- `dataSaldoInicial` - Campo data saldo inicial
- `limiteCredito` - Campo limite de crédito
- `observacao` - Campo observação

**Switches:**
- `contaPadraoSwitch` - Switch conta padrão
- `cobrancaBancariaSwitch` - Switch cobrança bancária

**Integração bancária:**
- `recipientCode` - Convênio
- `lastOurNumber` - Último nosso número
- `lastDispatch` - Último número remessa
- `walletVariation` - Variação da carteira
- `companyCode` - Código transmissão
- `posto` - Posto
- `interestAmount` - Valor de juros
- `fineAmount` - Valor da multa
- `protestDays` - Dias de protesto
- `lowDays` - Dias de baixa
- `discountAmount` - Valor do desconto
- `integrationType` - Tipo da integração
- `printLayout` - Tipo do layout
- `message1` - Mensagem 1
- `message2` - Mensagem 2
- `clientId` - Client ID (API)
- `clientSecret` - Client Secret (API)
- `typeKeyPix` - Tipo da Chave Pix
- `keyPix` - Chave Pix

**Botões:**
- `botaoProximo` - Botão próximo
- `botaoVoltar` - Botão voltar

**Mensagens:**
- `mensagemSucesso` - Mensagem de sucesso

---

## Funções Auxiliares

### Geração de Dados

**gerarDadosConta(nome, codigo)**
```javascript
{
  descricao: `Banco:${nome} (${codigo}) - ${dataHoraAtual}`,
  agencia: agenciaAleatoria,
  agenciaDV: agenciaDVAleatorio,
  conta: contaAleatoria,
  contaDV: contaDVAleatorio,
  saldoInicial: '1000,00',
  dataSaldo: '01/01/2024',
  limiteCredito: '5000,00',
  observacao: `...`
}
```

**gerarChave16Bits()**
```javascript
Math.random().toString(36).substring(2, 18).toUpperCase();
```

**gerarChavePix()**
- Gera chave Pix aleatória baseada em tipo (CNPJ, CPF, CELULAR, EMAIL)

**gerarNumeroAleatorio(min, max)**
```javascript
Math.floor(Math.random() * (max - min + 1)) + min;
```

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/cases/architecture-cadastro-conta.md` - Cadastro de conta (seleção de tipo "Conta Corrente" navega para cadastro específico)
- `docs/cases/architecture-listagem-conta.md` - Listagem de contas (contas cadastradas podem ser listadas)
- `docs/cases/architecture-edicao-conta-corrente.md` - Edição de conta corrente (contas cadastradas podem ser editadas)
- `docs/testes.md` - Inventário de testes
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste usa `cy.loginArmazenandoSessaoCobranca()` para usuário com permissões de cobrança bancária
- Teste iterativo cria 7 testes dinâmicos (um por banco)
- Dados são gerados aleatoriamente para evitar conflitos
- Aguardo de 5345ms após ativar cobrança bancária para garantir que alerta não apareça
- Tipo de integração (API/Arquivo) é determinado pelo código do banco
- Campos desabilitados são ignorados sem erro
- Validação de popup de erro garante que configuração bancária é válida

---

## Estrutura de Dados de Integração

```javascript
{
  convênio: '12345',
  ultimoNossoNumero: '1234',
  ultimoNumeroRemessa: '5678',
  variacaoCarteira: '1-99',
  posto: '04',
  codigoTransmissao: '1-10',
  valorJuros: '1-10',
  valorMulta: '1-10',
  diasProtesto: '1-30',
  diasBaixa: '1-30',
  valorDesconto: '1-10',
  tipoIntegracao: 'api' | 'arquivo',
  tipoLayout: 'A4',
  mensagem1: '...',
  mensagem2: '...',
  clientId: '16 bits',
  clientSecret: '16 bits',
  tipoChavePix: 'CNPJ',
  chavePix: '...'
}
```

---

**Última atualização:** 2024-12-19

