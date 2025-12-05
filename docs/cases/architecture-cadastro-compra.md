# Arquitetura do caso de teste: `compras/cadastro-compra-xml.spec.js`

## Objetivo
- Exercitar o fluxo completo de importação de NFe pelo XML no módulo de compras.
- Validar o processo de importação desde o upload do arquivo XML até a confirmação da importação.
- Garantir que os campos obrigatórios (CFOP e vínculo fiscal) sejam preenchidos corretamente.
- Validar a exclusão da NFe importada após o processo completo.

## Importações e dependências
- `CompraPage` (`cypress/support/pages/Compra/CompraPage.js`): encapsula navegação, importação de XML, preenchimento de campos obrigatórios e exclusão.
- `CompraLocators` (`cypress/support/locators/CompraLocators.js`): concentra seletores da tela de compras (campos de CFOP, vínculo fiscal, botões de importação e exclusão).
- `cy.loginArmazenandoSessao()` (custom command): garante autenticação antes de cada teste (não é funcionalidade fiscal, então usa login padrão).
- Fixture: `cypress/fixtures/comprasxml/nfe_importacao.xml` - arquivo XML da NFe para importação.
- Hooks globais em `cypress/support/e2e.js` continuam ativos (Allure, interceptação HTTP 500, Percy, grep).

## Estrutura do teste

### Suite: Cadastro de compra
**Tags**: `@cadastro-compra-xml`, `@regressivo`, `@compras`

1. **beforeEach**
   - `cy.loginArmazenandoSessao()` para autenticação.
   - `cy.visit('/')` para garantir navegação inicial.
   - `CompraPage.acessarPaginaCompra()` navega até a página de compras e aguarda carregamento.

2. **Teste: Importando NFe pelo XML**
   - `CompraPage.importarNFePorXML()`: executa o fluxo completo de importação:
     - Clica no botão de importar NFe.
     - Seleciona a opção XML.
     - Anexa um arquivo XML aleatório (seleciona entre os 67 disponíveis).
     - Clica em importar e aguarda carregamento.
     - Preenche CFOP (padrão: '1102').
     - Confirma a natureza selecionada.
     - Informa vínculo fiscal (seleciona primeiro resultado e lança).
     - Clica em importar XML e aguarda conclusão.

3. **Teste: Importando NFe pelo XML e excluindo**
   - `CompraPage.importarNFePorXML(null, true)`: executa o fluxo de importação usando apenas XMLs sem faturas:
     - Usa `usarApenasSemFaturas = true` para selecionar apenas entre os 7 XMLs em `xmlSemFaturas/`
     - Isso é necessário porque pela regra de negócio, só é possível excluir NFe importada se ela não tiver a tag `<dup>` (faturas)
     - Repete o mesmo fluxo de importação do teste anterior
   - `CompraPage.excluirNFeImportada()`: executa a exclusão:
     - Seleciona a primeira linha da tabela (compra mais recente).
     - Clica no botão "Excluir Selecionados".
     - Confirma a exclusão no SweetAlert.
     - Aguarda o modal desaparecer e o carregamento finalizar.

4. **Teste: Deve aplicar grupo para todos os itens na importação**
   - `CompraPage.prepararTelaImportacao()`: prepara a tela de importação (anexa XML e clica em importar).
   - `CompraPage.aplicarGrupoParaTodosItens()`: aplica grupo para todos os itens da importação.
   - Preenche CFOP, confirma natureza, informa vínculo fiscal e importa.
   - Valida que o grupo foi aplicado e verifica mensagem de sucesso.

5. **Teste: Deve relacionar produto na importação**
   - `CompraPage.prepararTelaImportacao()`: prepara a tela de importação.
   - `CompraPage.relacionarProduto(0)`: relaciona produto no primeiro item da tabela.
   - Preenche CFOP, confirma natureza, informa vínculo fiscal e importa.
   - Valida que o produto foi relacionado e verifica mensagem de sucesso.

6. **Teste: Deve adicionar grupo na importação**
   - `CompraPage.prepararTelaImportacao()`: prepara a tela de importação.
   - `CompraPage.adicionarGrupo()`: adiciona grupo na importação.
   - Preenche CFOP, confirma natureza, informa vínculo fiscal e importa.
   - Valida que o grupo foi adicionado e verifica mensagem de sucesso.

7. **Teste: Deve adicionar vínculo na importação**
   - `CompraPage.prepararTelaImportacao()`: prepara a tela de importação.
   - `CompraPage.adicionarVinculo()`: adiciona vínculo na importação.
   - Preenche CFOP, confirma natureza e importa (sem informar vínculo fiscal padrão).
   - Valida que o vínculo foi adicionado e verifica mensagem de sucesso.

8. **Teste: Deve alterar CFOP do item na importação**
   - `CompraPage.prepararTelaImportacao()`: prepara a tela de importação.
   - `CompraPage.alterarCFOPItem(0, '5102')`: altera CFOP do primeiro item para '5102'.
   - Preenche CFOP geral, confirma natureza, informa vínculo fiscal e importa.
   - Valida que o CFOP foi alterado e verifica mensagem de sucesso.

9. **Teste: Deve lançar categoria na importação**
   - `CompraPage.prepararTelaImportacao()`: prepara a tela de importação.
   - `CompraPage.lancarCategoria(0)`: lança categoria no primeiro item da tabela.
   - Preenche CFOP, confirma natureza, informa vínculo fiscal e importa.
   - Valida que a categoria foi lançada e verifica mensagem de sucesso.

## Métodos do Page Object

### Navegação
- `acessarPaginaCompra()`: visita `/compra` e aguarda carregamento.
- `aguardarCarregamento()`: verifica se `#loading` existe e aguarda desaparecer.

### Importação de XML
- `clicarBotaoImportarNFe()`: clica no botão de importar NFe (`.btn-info > .hidden-xs`).
- `selecionarOpcaoXML()`: seleciona a opção XML no modal.
- `anexarArquivoXML(nomeArquivo = null, usarApenasSemFaturas = false)`: anexa o arquivo XML usando `attachFile`.
  - Se `nomeArquivo` não for especificado, seleciona aleatoriamente um XML:
    - Se `usarApenasSemFaturas = false` (padrão): seleciona entre os 58 XMLs disponíveis em `cypress/fixtures/comprasxml/` (todos com tag `<dup>`)
    - Se `usarApenasSemFaturas = true`: seleciona entre os 7 XMLs sem a tag `<dup>` em `cypress/fixtures/comprasxml/xmlSemFaturas/`
  - Isso garante que diferentes XMLs sejam usados em cada execução, já que cada XML só pode ser importado uma vez no sistema
  - **Importante**: XMLs sem faturas (sem tag `<dup>`) são necessários para testes de exclusão, pois pela regra de negócio só é possível excluir NFe importada se ela não tiver faturas
  - **Organização**: XMLs sem faturas estão exclusivamente na pasta `xmlSemFaturas/`, separados dos XMLs com faturas
- `clicarImportar()`: clica no botão de importar após anexar o arquivo.

### Preenchimento de campos
- `preencherCFOP(cfop = '1102')`: preenche o campo CFOP com o valor especificado e seleciona do autocomplete.
- `clicarConfirmarNatureza()`: confirma a natureza selecionada.
- `informarVinculoFiscal()`: abre o autocomplete de vínculo fiscal, seleciona o primeiro resultado e lança.

### Finalização
- `clicarImportarXML()`: clica no botão final de importar XML.
- `aguardarImportacaoCompleta()`: aguarda o carregamento finalizar após a importação.

### Exclusão
- `clicarExcluir()`: localiza e clica no botão de excluir.
- `confirmarExclusao()`: valida o SweetAlert de confirmação e confirma a exclusão.

### Métodos compostos
- `prepararTelaImportacao(nomeArquivoXML = null, usarApenasSemFaturas = false)`: prepara a tela de importação executando o fluxo até chegar na tela de configuração (anexar XML, clicar importar, aguardar carregamento).
  - Evita duplicação de código nos testes que precisam executar ações na tela de importação
  - Aguarda o formulário `#form-importacao` estar visível antes de retornar
- `importarNFePorXML(nomeArquivoXML = null, usarApenasSemFaturas = false)`: executa todo o fluxo de importação em sequência.
  - Se `nomeArquivoXML` não for especificado, usa seleção aleatória de XML
  - Se `usarApenasSemFaturas = true`, usa apenas XMLs da pasta `xmlSemFaturas` (sem tag `<dup>`)
  - **Regra de negócio**: XMLs sem faturas são obrigatórios para testes que incluem exclusão, pois só é possível excluir NFe importada se ela não tiver a tag `<dup>`
- `excluirNFeImportada()`: executa todo o fluxo de exclusão em sequência.
  - Seleciona automaticamente a primeira linha da tabela (compra mais recente) e exclui

### Ações na tela de importação
- `aplicarGrupoParaTodosItens(grupoId = null)`: aplica grupo para todos os itens da importação.
  - Procura pelo botão de aplicar grupo e clica
  - Se `grupoId` for especificado, pode ser usado para selecionar grupo específico (implementação futura)
- `relacionarProduto(itemIndex = 0, termoProduto = null)`: relaciona produto em um item específico da tabela.
  - `itemIndex`: índice do item na tabela (0 = primeiro item)
  - `termoProduto`: termo para buscar produto (se não especificado, seleciona primeiro disponível)
- `adicionarGrupo(grupoId = null)`: adiciona grupo na importação.
  - Abre autocomplete de grupo e seleciona primeiro disponível ou grupo específico
  - Se houver botão de salvar grupo, clica automaticamente
- `adicionarVinculo(vinculoId = null)`: adiciona vínculo na importação.
  - Se houver campo específico para adicionar novo vínculo, usa ele
  - Caso contrário, usa o método existente `informarVinculoFiscal()`
- `alterarCFOPItem(itemIndex = 0, novoCFOP = '1102')`: altera CFOP de um item específico.
  - `itemIndex`: índice do item na tabela
  - `novoCFOP`: novo CFOP a ser aplicado
  - Preenche campo CFOP do item e seleciona do autocomplete
- `lancarCategoria(itemIndex = 0, categoriaId = null)`: lança categoria para um item específico.
  - `itemIndex`: índice do item na tabela
  - `categoriaId`: ID da categoria (se não especificado, seleciona primeira disponível)
  - Se houver botão de lançar categoria, clica automaticamente

### Validações
- `validarMensagemSucesso()`: valida mensagem de sucesso "Pronto, tudo organizado.".
- `validarMensagemErro()`: valida mensagem de erro de campo obrigatório.
- `validarGrupoAplicado()`: valida que o grupo foi aplicado aos itens (verifica tabela de itens).
- `validarProdutoRelacionado(itemIndex = 0)`: valida que o produto foi relacionado no item específico.
- `validarGrupoAdicionado()`: valida que o grupo foi adicionado (verifica formulário de importação).
- `validarVinculoAdicionado()`: valida que o vínculo foi adicionado (verifica formulário de importação).
- `validarCFOPAlterado(itemIndex = 0, cfopEsperado = '1102')`: valida que o CFOP foi alterado no item específico.
- `validarCategoriaLancada(itemIndex = 0)`: valida que a categoria foi lançada no item específico.

## Padrões e boas práticas
- **Page Object completo**: métodos com responsabilidade clara e retorno de `this` para encadeamento.
- **Aguardos defensivos**: `aguardarCarregamento()` verifica ausência de `#loading` antes de prosseguir.
- **Timeouts adequados**: todos os elementos aguardam visibilidade com timeout de 10-20 segundos.
- **Métodos compostos**: `importarNFePorXML()` e `excluirNFeImportada()` facilitam reutilização e manutenção.
- **Validação de modais**: `confirmarExclusao()` valida o conteúdo do SweetAlert antes de confirmar.
- **Documentação de tags**: suite anotada com tags específicas (`@cadastro-compra-xml`, `@compras`, `@regressivo`) para filtros via `@cypress/grep`.
- **Uso de fixtures**: arquivo XML centralizado em `cypress/fixtures/comprasxml/` para facilitar manutenção.

## Fluxo de execução

1. **Login e navegação**
   - Autenticação via `cy.loginArmazenandoSessao()`.
   - Navegação até `/compra`.

2. **Importação**
   - Abertura do modal de importação.
   - Seleção da opção XML.
   - Upload do arquivo XML.
   - Preenchimento de CFOP (1102).
   - Seleção e lançamento de vínculo fiscal.
   - Finalização da importação.

3. **Exclusão**
   - Localização da NFe importada.
   - Abertura do modal de exclusão.
   - Confirmação da exclusão.
   - Validação do fechamento do modal.

## Dados de teste
- **Arquivo XML**: 
  - **Padrão**: Seleção automática de um arquivo aleatório do diretório `cypress/fixtures/comprasxml/` (58 arquivos disponíveis - todos com tag `<dup>`)
  - **Para exclusão**: Quando `usarApenasSemFaturas = true`, seleciona entre os 7 arquivos em `cypress/fixtures/comprasxml/xmlSemFaturas/` (XMLs sem a tag `<dup>`)
  - Pode ser especificado manualmente passando o nome do arquivo como parâmetro: `importarNFePorXML('nome-arquivo.xml')`
  - Cada XML só pode ser importado uma vez no sistema, por isso a seleção aleatória garante que diferentes XMLs sejam usados em cada execução
  - **Regra de negócio**: Apenas NFe sem a tag `<dup>` (sem faturas) podem ser excluídas após importação
  - **Organização**: XMLs sem faturas estão separados na pasta `xmlSemFaturas/` para facilitar identificação e uso específico em testes de exclusão
- **CFOP padrão**: `1102` (configurável via parâmetro)
- **Vínculo fiscal**: primeiro resultado do autocomplete

## Sugestões futuras
1. Parametrizar CFOP e vínculo fiscal via factory para diversificar dados de teste.
2. Validar se a NFe importada aparece corretamente na listagem antes de excluir.
3. Adicionar cenários negativos (XML inválido, CFOP inexistente, vínculo fiscal obrigatório não preenchido).
4. Testar importação de múltiplas NFe em sequência.
5. Validar campos preenchidos automaticamente após importação do XML.
6. Expandir validações específicas para cada ação (verificar se grupo foi realmente aplicado, se produto foi relacionado, etc.).
7. Adicionar testes combinando múltiplas ações na mesma importação.

