# Arquitetura dos casos de teste: Cadastro de Produto

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Produto**, que valida o processo completo de cadastro, edição e exclusão de produtos no sistema, incluindo funcionalidades avançadas como grade, combo e vínculo fiscal.

**Funcionalidades cobertas:**
- Cadastro de produto básico
- Cadastro com venda desativada
- Edição de produto pela listagem
- Cadastro com vínculo fiscal
- Cadastro com grade habilitada
- Cadastro com combo habilitado
- Exclusão de produto
- Validação de abas do formulário

**Cenários principais:**
- Cadastrar produto com venda desativada e validar estado
- Editar produto pela listagem e validar alteração
- Exibir abas principais do formulário
- Cadastrar produto com vínculo fiscal
- Cadastrar produto habilitando grade
- Cadastrar produto habilitando combo
- Cadastrar e excluir produto

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/cadastro-produto/cadastro-produto.spec.js` - Teste de cadastro de produto

### Page Objects
- `cypress/support/pages/Produto/ProdutoPage.js` - Métodos para cadastro de produto
- `cypress/support/pages/Produtos/ProdutosListPage.js` - Métodos para listagem de produtos
- `cypress/support/pages/VinculoFiscal/VinculoFiscalPage.js` - Métodos para vínculo fiscal
- `cypress/support/pages/Produto/listagemprodutopage.js` - Navegação para listagem

### Locators
- `cypress/support/locators/ProdutoLocators.js` - Seletores do cadastro de produto
- `cypress/support/locators/Produtos/ProdutosListLocators.js` - Seletores da listagem

### Factory
- `cypress/support/factory/generateRandomData.js` - Função `generateRandomProduct()` para gerar dados aleatórios

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralProdutoPage.js` - Navegação para módulo de produtos

---

## Imports e dependências

### Page Objects
```javascript
import ProdutoPage from "../../support/pages/Produto/ProdutoPage";
import VinculoFiscalPage from "../../support/pages/VinculoFiscal/VinculoFiscalPage";
import ProdutosListPage from "../../support/pages/Produtos/ProdutosListPage";
```

### Factory
```javascript
import { generateRandomProduct } from "../../support/factory/generateRandomData";
```

### Locators
Os locators são importados internamente nos Page Objects.

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Cadastro de produtos

**Tags:** `['@cadastro-produto', '@regressivo']` (ADR-0010)

#### `it('cadastra produto com venda desativada e valida o estado apos salvar')`

**Fluxo:**
1. Acessa cadastro de novo produto
2. Gera dados aleatórios do produto
3. Preenche detalhes do produto
4. Desabilita venda
5. Cadastra produto
6. Verifica alerta de dados fiscais
7. Verifica tela de dados cadastrais
8. Verifica que venda está desativada

---

#### `it('edita um produto pela listagem e valida a alteracao')`

**Fluxo:**
1. Acessa listagem de produtos
2. Verifica tabela visível
3. Obtém primeiro produto da tabela
4. Clica em editar pelo código
5. Valida redirecionamento para página de edição
6. Atualiza observação com timestamp
7. Salva alterações
8. Cancela alerta de atualização de grupo
9. Verifica tela de dados cadastrais
10. Valida que observação foi atualizada

---

#### `it('exibe as abas principais do formulario antes de cadastrar')`

**Fluxo:**
1. Acessa cadastro de novo produto
2. Verifica que todas as abas principais estão visíveis:
   - Dados Cadastrais
   - Detalhes Fiscais
   - Produto Empresa
   - Composição
   - Fotos

---

#### `it('Realizar cadastro de produto valido informando o vinculo fiscal')`

**Fluxo:**
1. Acessa cadastro de novo produto
2. Gera dados aleatórios do produto
3. Preenche detalhes do produto
4. Cadastra produto
5. Verifica alerta de dados fiscais
6. Verifica tela de dados cadastrais
7. Acessa menu detalhes fiscais
8. Seleciona vínculo fiscal
9. Preenche NCM e CEST
10. Salva vínculo fiscal
11. Confirma cadastro do vínculo fiscal

---

#### `it('cadastra produto habilitando grade e recusa os dados fiscais')`

**Fluxo:**
1. Acessa cadastro de novo produto
2. Gera dados aleatórios do produto
3. Preenche detalhes do produto
4. Habilita grade
5. Cadastra produto
6. Verifica alerta de dados fiscais
7. Verifica tela de dados cadastrais
8. Valida redirecionamento para página de edição
9. Acessa aba Grade
10. Verifica grade sem itens
11. Monta grade
12. Preenche grade simplificada (3 itens)
13. Verifica grade com itens (1 item)

---

#### `it('cadastra produto habilitando combo e valida a aba sem itens')`

**Fluxo:**
1. Acessa cadastro de novo produto
2. Gera dados aleatórios do produto
3. Preenche detalhes do produto
4. Habilita combo
5. Cadastra produto
6. Verifica alerta de dados fiscais
7. Verifica tela de dados cadastrais
8. Valida redirecionamento para página de edição
9. Acessa aba Combo
10. Verifica combo sem itens
11. Verifica quantidade de itens (0)
12. Adiciona item ao combo
13. Verifica combo com itens (1)
14. Verifica quantidade de itens (1)

---

#### `it('cadastra e exclui o produto depois de recusar preencher os dados fiscais')`

**Fluxo:**
1. Acessa cadastro de novo produto
2. Gera dados aleatórios do produto
3. Preenche detalhes do produto
4. Cadastra produto
5. Verifica alerta de dados fiscais
6. Verifica tela de dados cadastrais
7. Exclui produto

---

## Padrões e boas práticas

### Uso de Faker para Dados Dinâmicos
- Uso de `generateRandomProduct()` que utiliza Faker
- Dados únicos para cada execução
- Valores realistas (preços, dimensões, etc.)

### Validação de Estado
- Verificação de estado de switches antes de alterar
- Validação de estado após operações
- Verificação de campos desabilitados

### Navegação e Redirecionamento
- Validação de URL após cadastro/edição
- Uso de `cy.location("pathname")` para validar rota
- Timeout de 40000ms para redirecionamento

### Alerta de Dados Fiscais
- Verificação condicional de alerta
- Normalização de texto para comparação (remove acentos)
- Cancelamento de alerta quando necessário

### Validação de Abas
- Verificação de todas as abas principais
- Validação de existência e visibilidade

### Grade e Combo
- Habilitação condicional (verifica estado antes)
- Validação de quantidade de itens
- Montagem e preenchimento de grade/combo

### Tags aplicadas
- `@cadastro-produto` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ProdutoPage

**Navegação:**
- `visit()` - Acessa cadastro de novo produto

**Validações:**
- `verificarAbas()` - Verifica todas as abas principais
- `verificarTelaDadosCadastrais()` - Verifica tela de dados cadastrais
- `verificarVendaDesativada()` - Verifica que venda está desativada
- `validarObservacao(texto)` - Valida observação

**Preenchimento:**
- `preencherDetalhesDoProduto(produto)` - Preenche todos os detalhes do produto
- `atualizarObservacao(texto)` - Atualiza observação

**Switches:**
- `desabilitarVenda()` - Desabilita venda (verifica estado antes)
- `habilitarGrade()` - Habilita grade (verifica estado antes)
- `habilitarCombo()` - Habilita combo (verifica estado antes)

**Ações:**
- `cadastrar()` - Salva produto
- `excluir()` - Exclui produto
- `cancelarAlertaAtualizacaoGrupo()` - Cancela alerta de atualização de grupo

**Alertas:**
- `verificarAlertaDadosFiscais()` - Verifica e cancela alerta de dados fiscais

**Grade:**
- `acessarAbaGrade()` - Acessa aba Grade
- `verificarGradeSemItens()` - Verifica grade sem itens
- `montarGrade()` - Monta grade
- `preencherGradeSimplificada(quantidade)` - Preenche grade simplificada
- `verificarGradeComItens(quantidade)` - Verifica grade com itens

**Combo:**
- `acessarAbaCombo()` - Acessa aba Combo
- `verificarComboSemItens()` - Verifica combo sem itens
- `verificarComboQuantidadeItens(quantidade)` - Verifica quantidade de itens
- `adicionarItemCombo()` - Adiciona item ao combo (usa alias `@comboItensAdicionados`)
- `verificarComboComItens(quantidade)` - Verifica combo com itens

---

### ProdutosListPage

**Navegação:**
- `acessarListagem()` - Acessa listagem de produtos

**Validações:**
- `verificarTabelaVisivel()` - Verifica que tabela está visível

**Seleção:**
- `obterPrimeiroProdutoDaTabela()` - Obtém dados do primeiro produto (código, descrição)
- `clicarEditarProdutoPeloCodigo(codigo)` - Clica em editar pelo código

---

### VinculoFiscalPage

**Navegação:**
- `acessarMenuDetalhesFiscais()` - Acessa menu detalhes fiscais

**Preenchimento:**
- `selecionarVinculoFiscal()` - Seleciona vínculo fiscal
- `preencherNcmECest()` - Preenche NCM e CEST

**Ações:**
- `salvarVinculoFiscal()` - Salva vínculo fiscal
- `confirmacaoCadastroVinculoFiscal()` - Confirma cadastro do vínculo fiscal

---

## Locators utilizados

### ProdutoLocators

**Abas:**
- `abaDadosCadastrais` - Aba dados cadastrais
- `abaDetalhesFiscais` - Aba detalhes fiscais
- `abaProdutoEmpresa` - Aba produto empresa
- `abasComposicao` - Aba composição
- `abasFotos` - Aba fotos

**Campos:**
- `nomeInput` - Campo nome
- `referenciaInput` - Campo referência
- `codigoBarrasInput` - Campo código de barras
- `grupoDropdownIcon` - Ícone dropdown grupo
- `grupoOpcaoPadrao` - Opção padrão do grupo
- `unidadeDropdownIcon` - Ícone dropdown unidade
- `unidadeOpcaoPrimeira` - Primeira opção de unidade
- `precoCompraInput` - Campo preço de compra
- `margemLucroInput` - Campo margem de lucro
- `precoVendaInput` - Campo preço de venda
- `percentualComissaoInput` - Campo percentual de comissão
- `pesoInput` - Campo peso
- `alturaInput` - Campo altura
- `larguraInput` - Campo largura
- `comprimentoInput` - Campo comprimento
- `observacaoTextarea` - Campo observação
- `informacaoAdicionalTextarea` - Campo informação adicional

**Switches:**
- `venderHidden` - Campo hidden de vender
- `venderToggle` - Toggle de vender
- `venderCheckbox` - Checkbox de vender
- `habilitarGradeHidden` - Campo hidden de habilitar grade
- `switcherHabilitarGradeToggle` - Toggle de habilitar grade
- `habilitarComboHidden` - Campo hidden de habilitar combo
- `switcherHabilitarComboToggle` - Toggle de habilitar combo

**Botões:**
- `btnSalvar` - Botão salvar
- `btnExcluir` - Botão excluir

**Alertas:**
- `alertaDadosFiscais` - Alerta de dados fiscais
- `alertaDadosFiscaisTitulo` - Título do alerta
- `alertaDadosFiscaisMensagem` - Mensagem do alerta
- `alertaDadosFiscaisCancelar` - Botão cancelar do alerta

---

## Factory de Dados

### generateRandomProduct()

Função que gera dados aleatórios de produto usando Faker:

```javascript
{
  nome: faker.commerce.productName(),
  referencia: faker.string.alphanumeric({ length: 8 }),
  codigo_barras: faker.string.numeric(13),
  preco_compra: faker.commerce.price(),
  margem_lucro: 1000,
  preco_venda: faker.commerce.price(),
  percentual_comissao: 10,
  observacao: faker.lorem.sentence(),
  informacao_adicional: faker.lorem.sentences(2),
  peso: faker.number.float({ min: 0.1, max: 10, precision: 0.001 }),
  altura: faker.number.float({ min: 5, max: 100, precision: 0.1 }),
  largura: faker.number.float({ min: 5, max: 100, precision: 0.1 }),
  comprimento: faker.number.float({ min: 5, max: 100, precision: 0.1 }),
  estoque_inicial: faker.number.int({ min: 1, max: 20 })
}
```

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0009:** Use Faker for Dynamic Test Data - Faker usado para dados dinâmicos
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-cadastro-fornecedor.md` - Documentação de cadastro de fornecedor
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste usa `cy.loginArmazenandoSessao()` para login eficiente
- Dados são gerados dinamicamente usando Faker
- Validação de estado de switches antes de alterar
- Normalização de texto para comparação (remove acentos)
- Uso de aliases para comunicação entre testes (`@comboItensAdicionados`)
- Validação de redirecionamento com timeout de 40000ms
- Verificação condicional de alertas

---

**Última atualização:** 2024-12-19
