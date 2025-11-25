# Arquitetura dos casos de teste: Cadastro NFe

## Objetivo
- Exercitar o fluxo completo de todas as finalidades e tipos de NFe no modulo de vendas, desde a tela inicial ate a confirmacao de emissao.
- **Aba Normal**: cobrir tipos Avulsa, Venda, NFCe e Movimentacao.
- **Aba Devolucao**: cobrir tipos Avulsa, Compra, Movimentacao, Nota Fiscal Saida e Trocas.
- **Aba Ajuste**: cobrir tipo Avulsa (com preenchimento de nota de ajuste).
- **Aba Complementar**: cobrir tipo Avulsa (com preenchimento de nota complementar e itens zerados).
- Garantir que passos, abas de finalidade e tipos estejam configurados e navegaveis.
- Validar o preenchimento dos dados principais (natureza CFOP e destinatario) com autocompletes e requisicoes monitoradas.
- Verificar a transicao para a etapa de itens, incluindo aguardo de carregamento, insercao de um item e confirmacao na tabela.
- Abrir o painel de pagamentos, cadastrar um novo pagamento "Sem Pagamento" via modal e confirmar a persistencia.
- Emitir a nota e validar o modal de sucesso (SweetAlert), escolhendo a acao de retorno em todos os fluxos.

## Estrutura de arquivos

### Arquivos de teste (specs)
Os testes foram separados por tipo de NFe para melhor organizacao e manutencao:

```
cypress/e2e/venda-nfcenfe/
├── cadastro-nfe.spec.js                  # Testes gerais (tela inicial, validacoes de navegacao)
├── cadastro-nfe-normal.spec.js           # Testes especificos NFe Normal
├── cadastro-nfe-devolucao.spec.js        # Testes especificos NFe Devolucao
├── cadastro-nfe-ajuste.spec.js           # Testes especificos NFe Ajuste
└── cadastro-nfe-complementar.spec.js     # Testes especificos NFe Complementar
```

### Page Objects
A arquitetura foi separada em classes especificas por tipo de NFe:

```
cypress/support/pages/Venda/
├── CadastroNfePage.js                    # Metodos gerais (tela inicial, navegacao)
└── NFe/
    ├── CadastroNfeBasePage.js            # Classe base com metodos comuns
    ├── CadastroNfeNormalPage.js          # Metodos especificos NFe Normal
    ├── CadastroNfeDevolucaoPage.js       # Metodos especificos NFe Devolucao
    ├── CadastroNfeAjustePage.js          # Metodos especificos NFe Ajuste
    └── CadastroNfeComplementarPage.js    # Metodos especificos NFe Complementar
```

Cada classe especifica herda de `CadastroNfeBasePage`, permitindo reutilizacao de metodos comuns (itens, pagamentos, emissao) enquanto mantem metodos especificos de cada finalidade isolados.

## Importacoes e dependencias
- `CadastroNfePage` (`cypress/support/pages/Venda/CadastroNfePage.js`): metodos gerais para tela inicial, validacao de passos/tabs e navegacao entre abas.
- `CadastroNfeBasePage` (`cypress/support/pages/Venda/NFe/CadastroNfeBasePage.js`): classe base com metodos comuns a todos os tipos de NFe (itens, pagamentos, emissao, natureza, destinatario).
- `CadastroNfeNormalPage` (`cypress/support/pages/Venda/NFe/CadastroNfeNormalPage.js`): metodos especificos para NFe Normal, incluindo:
  - Avulsa: `avancarParaCadastroNormalAvulsa()`, `validarFormularioNormalAvulsa()`
  - Venda: `avancarParaCadastroNormalVenda()`, `pesquisarVenda()`, `selecionarPrimeiraVenda()`, `selecionarVendaClienteDiferenteConsumidor()`, `validarFormularioNormalVenda()`
  - NFCe: `avancarParaCadastroNormalNfce()`, `pesquisarNfce()`, `selecionarPrimeiraNfce()`, `validarFormularioNormalNfce()`
  - Movimentacao: `avancarParaCadastroNormalMovimentacao()`, `pesquisarMovimentacao()`, `selecionarPrimeiraMovimentacao()`, `validarFormularioNormalMovimentacao()`
- `CadastroNfeDevolucaoPage` (`cypress/support/pages/Venda/NFe/CadastroNfeDevolucaoPage.js`): metodos especificos para NFe Devolucao, incluindo:
  - Avulsa: `avancarParaCadastroDevolucaoAvulsa()`, `validarFormularioDevolucaoAvulsa()`
  - Compra: `avancarParaCadastroDevolucaoCompra()`, `pesquisarDevolucaoCompra()`, `selecionarPrimeiraDevolucaoCompra()`, `validarFormularioDevolucaoCompra()`
  - Movimentacao: `avancarParaCadastroDevolucaoMovimentacao()`, `pesquisarDevolucaoMovimentacao()`, `selecionarPrimeiraDevolucaoMovimentacao()`, `validarFormularioDevolucaoMovimentacao()`
  - Nota Fiscal Saida: `avancarParaCadastroDevolucaoNotaFiscalSaida()`, `pesquisarDevolucaoNotaFiscalSaida()`, `selecionarPrimeiraDevolucaoNotaFiscalSaida()`, `validarFormularioDevolucaoNotaFiscalSaida()`
  - Trocas: `avancarParaCadastroDevolucaoTrocas()`, `pesquisarDevolucaoTrocas()`, `selecionarPrimeiraDevolucaoTrocas()`, `validarFormularioDevolucaoTrocas()`
- `CadastroNfeAjustePage` (`cypress/support/pages/Venda/NFe/CadastroNfeAjustePage.js`): metodos especificos para NFe Ajuste (avancar, validar formulario, preencher dados de nota de ajuste).
- `CadastroNfeComplementarPage` (`cypress/support/pages/Venda/NFe/CadastroNfeComplementarPage.js`): metodos especificos para NFe Complementar (avancar, validar formulario, preencher dados de nota complementar, adicionar item com quantidade e valores zerados).
- `ListagemNfePage` (`cypress/support/pages/Venda/ListagemNfePage.js`): abre a listagem e aciona "Novo Cadastro".
- `CadastroNfeLocators` (`cypress/support/locators/Venda/CadastroNfeLocators.js`): seletores de tabs, formulario, itens, pagamentos, painel final, SweetAlert e formularios de pesquisa para cada tipo (venda, nfce, movimentacao, devolucao com subsecoes para compra, movimentacao, nota fiscal saida, trocas).
- `cy.login()` (custom command) garante autenticacao antes de cada teste.
- Intercepts utilizados:
  - `POST **/nfe2/salvar*` (destinatario - aguardado antes de continuar, com logica condicional).
  - `GET **/nfe2/**/itens*` (carregamento da tela de itens, com flag condicional).
  - `POST **/nfe2/**/itens/salvar` (insercao de item).
  - `POST **/nfe2/**/pagamentos/salvar` (modal de pagamento).
  - `POST **/nfe-nfce/vinculos-fiscais/autocomplete/cfop` (autocomplete de natureza).
  - `GET /movimentacao*` (para pesquisa de movimentacoes na devolucao).

## Estrutura dos testes

### 1. `cadastro-nfe.spec.js` - Validações Gerais
**Suite**: `Cadastro NFe - Validações Gerais`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-geral`

1. **beforeEach**
   - `cy.login()` e `cy.visit('/')`.
   - `CadastroNfePage.desabilitarTourFinalidadeNormal()` para evitar tooltips.
   - `ListagemNfePage.visitar()` e `ListagemNfePage.clicarNovoCadastro()` para abrir o wizard.

2. **Testes**
   - `abre tela de novo cadastro com passos e tipo Avulsa pre-selecionados`: valida tela inicial, passos, tabs e skeletons.
   - `permite alternar e exibe conteudos das abas de finalidade`: valida navegacao entre as abas de finalidade.

### 2. `cadastro-nfe-normal.spec.js` - NFe Normal
**Suite**: `Cadastro NFe Normal`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-normal`

1. **beforeEach**: mesmo setup do arquivo geral.
2. **Testes**:
   - `abre formulario de NFe normal avulsa apos continuar`: navega ate o formulario e valida campos principais.
   - `preenche formulario com natureza e destinatario na NFe normal avulsa`:
     - Usa `CadastroNfeNormalPage.avancarParaCadastroNormalAvulsa()` para navegar ate o formulario.
     - `CadastroNfeNormalPage.preencherNatureza('5102')` preenche o CFOP.
     - `CadastroNfeNormalPage.preencherDestinatario('SOFTCOM TECNOLOGIA')` seleciona o destinatario, aguarda `POST /nfe2/salvar*` ser completado com sucesso.
     - Passa pelas etapas de itens, pagamentos e emissao.
   - `abre formulario de NFe normal venda apos pesquisar e selecionar`:
     - Usa `CadastroNfeNormalPage.avancarParaCadastroNormalVenda()` para selecionar tipo Venda.
     - `CadastroNfeNormalPage.pesquisarVenda()` pesquisa vendas disponiveis (pode receber cliente e pedido como parametros opcionais).
     - `CadastroNfeNormalPage.selecionarPrimeiraVenda()` seleciona a primeira venda da lista e aguarda o formulario carregar.
     - `CadastroNfeNormalPage.validarFormularioNormalVenda()` valida campos principais do formulario.
   - `testa selecao de venda com cliente diferente de consumidor`:
     - Usa `CadastroNfeNormalPage.avancarParaCadastroNormalVenda()` para selecionar tipo Venda.
     - `CadastroNfeNormalPage.pesquisarVenda()` pesquisa vendas disponiveis.
     - `CadastroNfeNormalPage.selecionarVendaClienteDiferenteConsumidor()` filtra a tabela de vendas, encontra a primeira linha com cliente diferente de "CONSUMIDOR", marca o checkbox correspondente e clica em "Continuar".
   - `realiza fluxo completo da NFe normal venda`: repete o fluxo de pesquisa e selecao, depois segue com natureza, itens, pagamentos e emissao.
   - `abre formulario de NFe normal NFCe apos pesquisar e selecionar`: similar ao fluxo de Venda, mas usando `avancarParaCadastroNormalNfce()`, `pesquisarNfce()` e `selecionarPrimeiraNfce()`.
   - `realiza fluxo completo da NFe normal NFCe`: repete o fluxo de pesquisa e selecao de NFCe, depois segue com natureza, itens, pagamentos e emissao.
   - `abre formulario de NFe normal movimentacao apos pesquisar e selecionar`: similar aos fluxos anteriores, mas usando `avancarParaCadastroNormalMovimentacao()`, `pesquisarMovimentacao()` e `selecionarPrimeiraMovimentacao()`.
   - `realiza fluxo completo da NFe normal movimentacao`: repete o fluxo de pesquisa e selecao de movimentacao, depois segue com natureza, itens, pagamentos e emissao.

### 3. `cadastro-nfe-devolucao.spec.js` - NFe Devolução
**Suite**: `Cadastro NFe Devolução`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-devolucao`

1. **beforeEach**: mesmo setup do arquivo geral.
2. **Testes**:
   - `realiza fluxo completo da NFe de devolucao avulsa`:
     - Usa `CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoAvulsa()` e `CadastroNfeDevolucaoPage.validarFormularioDevolucaoAvulsa()` (assegura finalidade `4`).
     - Usa CFOP `1202` e repete o fluxo completo de itens/pagamentos/emissao usando metodos da classe base.
   - `abre formulario de NFe devolucao compra apos pesquisar e selecionar`:
     - Usa `CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoCompra()` para selecionar tipo Compra.
     - `CadastroNfeDevolucaoPage.pesquisarDevolucaoCompra()` pesquisa compras disponiveis (pode receber fornecedor, cnpj, nota fiscal e chave de acesso como parametros opcionais).
     - `CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoCompra()` seleciona a primeira compra da lista e aguarda o formulario carregar.
     - `CadastroNfeDevolucaoPage.validarFormularioDevolucaoCompra()` valida campos principais do formulario (finalidade 4).
   - `realiza fluxo completo da NFe devolucao compra`: repete o fluxo de pesquisa e selecao, depois segue com natureza (CFOP 1202), itens, pagamentos e emissao.
   - `abre formulario de NFe devolucao movimentacao apos pesquisar e selecionar`: similar ao fluxo de Compra, mas usando `avancarParaCadastroDevolucaoMovimentacao()`, `pesquisarDevolucaoMovimentacao()` e `selecionarPrimeiraDevolucaoMovimentacao()`.
   - `realiza fluxo completo da NFe devolucao movimentacao`: repete o fluxo de pesquisa e selecao de movimentacao, depois segue com natureza, itens, pagamentos e emissao.
   - `abre formulario de NFe devolucao nota fiscal saida apos pesquisar e selecionar`: similar aos fluxos anteriores, mas usando `avancarParaCadastroDevolucaoNotaFiscalSaida()`, `pesquisarDevolucaoNotaFiscalSaida()` e `selecionarPrimeiraDevolucaoNotaFiscalSaida()`.
   - `realiza fluxo completo da NFe devolucao nota fiscal saida`: repete o fluxo de pesquisa e selecao de nota fiscal de saida, depois segue com natureza, itens, pagamentos e emissao.
   - `abre formulario de NFe devolucao trocas apos pesquisar e selecionar`: similar aos fluxos anteriores, mas usando `avancarParaCadastroDevolucaoTrocas()`, `pesquisarDevolucaoTrocas()` e `selecionarPrimeiraDevolucaoTrocas()`.
   - `realiza fluxo completo da NFe devolucao trocas`: repete o fluxo de pesquisa e selecao de troca, depois segue com natureza, itens, pagamentos e emissao.

### 4. `cadastro-nfe-ajuste.spec.js` - NFe Ajuste
**Suite**: `Cadastro NFe Ajuste`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-ajuste`

1. **beforeEach**: mesmo setup do arquivo geral.
2. **Testes**:
   - `realiza fluxo completo da NFe de ajuste avulsa`:
     - Usa `CadastroNfeAjustePage.avancarParaCadastroAjusteAvulsa()` e `CadastroNfeAjustePage.validarFormularioAjusteAvulsa()` (assegura finalidade `3`).
     - `CadastroNfeAjustePage.preencherDadosNotaAjuste()` expande os autocompletes de Nota Fiscal e Chave de Acesso, seleciona o primeiro resultado de cada e clica em continuar automaticamente.
     - Usa CFOP `5102` com `aguardarSweetAlertCfop: true` para tratar o modal de atualizacao de CFOP dos itens.
     - Preenche destinatario com `validarPreenchido: true` e `aguardarPosSweetAlert: true` para validar que o destinatario foi preenchido automaticamente apos o ajuste.
     - Repete o fluxo completo de itens/pagamentos/emissao.

### 5. `cadastro-nfe-complementar.spec.js` - NFe Complementar
**Suite**: `Cadastro NFe Complementar`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-complementar`

1. **beforeEach**: mesmo setup do arquivo geral.
2. **Testes**:
   - `realiza fluxo completo da NFe complementar avulsa`:
     - Usa `CadastroNfeComplementarPage.avancarParaCadastroComplementarAvulsa()` e `CadastroNfeComplementarPage.validarFormularioComplementarAvulsa()`.
     - `CadastroNfeComplementarPage.preencherDadosNotaComplementar()` expande os autocompletes de Nota Fiscal e Chave de Acesso, seleciona o primeiro resultado de cada e clica em continuar automaticamente.
     - Usa CFOP `5102` com `aguardarSweetAlertCfop: true` para tratar o modal de atualizacao de CFOP dos itens.
     - Preenche destinatario com `validarPreenchido: true` e `aguardarPosSweetAlert: true` para validar que o destinatario foi preenchido automaticamente apos a selecao da nota complementar.
     - `CadastroNfeComplementarPage.adicionarItemComplementar()` adiciona um item com quantidade e valores zerados (especifico para NFe complementar, onde os valores devem iniciar zerados).
     - Repete o fluxo completo de pagamentos/emissao.

## Tags e filtragem

Cada arquivo de teste possui tags especificas que permitem executar apenas os testes de um tipo de NFe:

- **`@nfe-geral`**: Testes gerais de validacao (tela inicial, navegacao)
- **`@nfe-normal`**: Testes especificos de NFe Normal
- **`@nfe-devolucao`**: Testes especificos de NFe Devolucao
- **`@nfe-ajuste`**: Testes especificos de NFe Ajuste
- **`@nfe-complementar`**: Testes especificos de NFe Complementar

Todas as suites tambem possuem as tags comuns: `@nfe`, `@vendas`, `@regressivo`.

### Exemplos de execucao

```bash
# Executar apenas testes de NFe Normal
npm run e2e -- --grep "@nfe-normal"

# Executar apenas testes de NFe Complementar
npm run e2e -- --grep "@nfe-complementar"

# Executar todos os testes de NFe
npm run e2e -- --grep "@nfe"

# Executar apenas testes gerais
npm run e2e -- --grep "@nfe-geral"
```

## Padroes e boas praticas
- **Arquitetura separada por tipo de NFe**: cada finalidade possui sua propria classe Page Object que herda de `CadastroNfeBasePage`, mantendo metodos comuns na classe base e metodos especificos em cada classe filha.
- **Separacao de specs por tipo**: cada tipo de NFe possui seu proprio arquivo de teste, facilitando manutencao e execucao seletiva.
- **Classe base reutilizavel**: `CadastroNfeBasePage` contem todos os metodos comuns (itens, pagamentos, emissao, natureza, destinatario), evitando duplicacao de codigo.
- **Aguardos obrigatorios**: o metodo `preencherDestinatario` sempre aguarda `POST /nfe2/salvar*` ser completado com sucesso antes de clicar em continuar, garantindo que o registro foi salvo.
- **Validacao simplificada de tela de itens**: `validarTelaSelecaoItens` aguarda diretamente que loading e skeleton desaparecam, e que o painel e tabela estejam visiveis, sem logica condicional complexa.
- **Intercepts condicionais**: flag `itensRequestInterceptada` evita `cy.wait` quando nao ha requisicao de itens.
- **Aguardos defensivos**: uso de timeouts adequados e verificacao de visibilidade antes de interagir.
- **Reuso de componentes**: botao "Continuar" e validacoes de modais centralizados na classe base.
- **Documentacao de tags**: tags especificas por tipo de NFe habilitam filtragem via `@cypress/grep`.
- **Selecao de checkboxes em tabelas**: quando e necessario selecionar um checkbox especifico em uma tabela (ex: selecionar venda com cliente diferente de "CONSUMIDOR"):
  - Use seletores especificos para as linhas da tabela (ex: `#table-form-body tr.table-vendas-checkbox`) e adicione ao arquivo de locators.
  - Use `.filter()` do Cypress para filtrar linhas baseado em conteudo de colunas especificas (ex: `Cypress.$(tr).find('td').eq(2).text().trim()`).
  - Use `.first()` apos o filtro para selecionar a primeira linha que atende ao criterio.
  - Use `.find('input[type="checkbox"]')` para localizar o checkbox dentro da linha filtrada.
  - Use `.check({ force: true })` para garantir que o checkbox seja marcado mesmo se houver overlay ou elementos ocultos.
  - Sempre valide com `.should('be.checked')` apos marcar o checkbox para confirmar que a acao foi bem-sucedida.
  - Mantenha a logica simples e direta, evitando loops complexos ou condicionais desnecessarias.

## Tipos de NFe cobertos

### Aba Normal
- ✅ **Avulsa**: Fluxo completo validado
- ✅ **Venda**: Pesquisa, selecao e fluxo completo validados
- ✅ **NFCe**: Pesquisa, selecao e fluxo completo validados
- ✅ **Movimentacao**: Pesquisa, selecao e fluxo completo validados

### Aba Devolucao
- ✅ **Avulsa**: Fluxo completo validado (CFOP 1202)
- ✅ **Compra**: Pesquisa (fornecedor, CNPJ, nota fiscal, chave de acesso), selecao e fluxo completo validados
- ✅ **Movimentacao**: Pesquisa, selecao e fluxo completo validados
- ✅ **Nota Fiscal Saida**: Pesquisa, selecao e fluxo completo validados
- ✅ **Trocas**: Pesquisa, selecao e fluxo completo validados

### Aba Ajuste
- ✅ **Avulsa**: Fluxo completo validado (com preenchimento de nota de ajuste via autocomplete)

### Aba Complementar
- ✅ **Avulsa**: Fluxo completo validado (com preenchimento de nota complementar via autocomplete e itens zerados)

## Padroes de pesquisa e selecao

### Tipos que requerem pesquisa (Normal: Venda, NFCe, Movimentacao)
1. Seleciona o tipo de NFe
2. Preenche formulario de pesquisa (campos opcionais: cliente, pedido)
3. Clica em "Pesquisar"
4. Seleciona o primeiro resultado da tabela
5. Aguarda formulario carregar
6. Continua com o fluxo padrao (natureza, itens, pagamentos, emissao)

### Tipos que requerem pesquisa (Devolucao: Compra, Movimentacao, Nota Fiscal Saida, Trocas)
1. Seleciona o tipo de NFe
2. Preenche formulario de pesquisa (campos opcionais: fornecedor, CNPJ, nota fiscal, chave de acesso)
3. Clica em "Pesquisar"
4. Seleciona o primeiro resultado da tabela
5. Aguarda formulario carregar
6. Continua com o fluxo padrao (natureza CFOP 1202, itens, pagamentos, emissao)

### Tipos Avulsa (todas as abas)
1. Seleciona o tipo Avulsa
2. Clica em "Continuar"
3. Preenche formulario diretamente (sem pesquisa)
4. Continua com o fluxo padrao

## Sugestoes futuras
1. Reativar os testes da tela inicial e tabs para aumentar cobertura.
2. Adicionar cenarios negativos (CFOP invalido, destinatario inexistente, falhas de emissao).
3. Cobrir outros tipos de nota nas abas Ajuste e Complementar (se houver tipos alem de Avulsa).
4. Validar se a nota emitida aparece na listagem ou gera DANFe em nova aba.
5. Parametrizar produtos/pagamentos via factory para diversificar dados de teste.
6. Adicionar testes de edicao de NFe a partir da listagem.
7. Validar comportamentos especificos de cada tipo (ex: validacoes de campos obrigatorios diferentes).

