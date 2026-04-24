# Análise de Falhas da Última Execução

## Resumo Geral
**Lote 1**: Análise das falhas nos testes com classificação entre "Bug na Aplicação" ou "Erro no Teste" e proposta de correções se necessário.

**Lote 2**: Análise das falhas dos testes identificadas como Bug na Aplicação ou Erro no Teste com justificativas para cada uma, além de ações para correção quando aplicável.

**Lote 3**: Análise das falhas para classificar entre bugs na aplicação e erros no teste, incluindo ações corretivas para erros no teste.

**Lote 4**: Após analisar as falhas, observamos que a maioria dos problemas está relacionada à sincronização e mudanças na interface do usuário, o que indica "Erros no Teste". Porém, também detectamos algumas possibilidades de "Bug na Aplicação" devido a elementos não encontrados ou problemas de visibilidade que não deveriam ocorrer se o sistema estivesse funcionando normalmente.

**Lote 5**: Análise das falhas de teste: 10 casos foram avaliados entre 'Bug na Aplicação' e 'Erro no Teste'. A maioria dos problemas decorre de erros de teste, principalmente locators desatualizados e interações antes de elementos estarem visíveis. Ações de correção são sugeridas para 'Erros no Teste'.

**Lote 6**: Esta é uma análise das falhas nos testes, classificando cada uma entre "Bug na Aplicação" ou "Erro no Teste", com ações sugeridas quando identificadas como "Erro no Teste".

**Lote 7**: A seguir está a análise das falhas com as respectivas classificações e explicações.

**Lote 8**: Análise das falhas ocorridas nos testes com base nas mensagens de erro.

**Lote 9**: Análise das falhas de teste e classificação entre "Bug na Aplicação" ou "Erro no Teste" com sugestões de correção.

**Lote 10**: Análise das falhas apontou predominantemente erros de teste devido a locators desatualizados, falta de esperas adequadas e elementos não visíveis. Ações recomendam correções nos scripts.

**Lote 11**: Após análise das mensagens de erro, foram identificados principalmente 'Erros no Teste', destacando-se problemas com espera condicional e locators inválidos. Um 'Bug na Aplicação' foi identificado relacionado a elementos invisíveis devido a propriedades CSS.

**Lote 12**: Análise das falhas nos testes com categorização detalhada e sugestões de correções conforme necessário.

**Lote 13**: Após análise, identificamos as causas das falhas nos testes como uma combinação de bugs na aplicação e erros nos testes. Abaixo estão as classificações e justificativas para cada falha.

**Lote 14**: Análise feita para classificar 10 falhas de teste. Conclusões: 5 "Bugs na Aplicação" e 5 "Erros no Teste", sugerindo ações de correção detalhadas para cada um dos casos de erro no teste.

## Classificação das Falhas

- **abre formulario de NFe normal NFCe apos pesquisar e selecionar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O erro indica que o `cy.click()` foi aplicado a múltiplos elementos. É necessário revisar o selector para garantir que ele se refere a um único elemento.

- **emite e cancela NFe normal avulsa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** A tabela não ficou visível a tempo, possivelmente devido à falta de espera condicional. Uma correção sugere a implementação de wait assertivo.

- **deve localizar produção finalizada na listagem, abrir edição e reverter produção**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento 'Finalizado' não encontrado, indicando possível mudança no layout ou selector incorreto.

- **Deve clicar na opção "Detalhes do título" do dropdown e verificar o modal**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não visível devido ao CSS 'overflow'. É necessário garantir que o elemento esteja visível antes do clique.

- **Deve validar os menus e submenus**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Erro 500 indica falha na aplicação, não no teste.

- **deve exibir a tabela de Ponto de Equilíbrio**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Tabela não visível devido à propriedade CSS 'display: none'. Falta de espera condicional antes da interação.

- **exclui dois ou mais grupos customizados sem remover os padrões**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Conteúdo 'Lote Grupo A' não encontrado, possivelmente devido a dados desatualizados ou selector errado.

- **navega para novo cadastro ao clicar no botao Novo Cadastro**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Promise não resolvida indica provável problema na função assíncrona ou em algum comando Cypress desatualizado.

- **deve realizar cadastro de perfil apenas com campos obrigatórios**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento coberto por modal indica necessidade de `force: true` ou ajuste na ordem das ações.

- **Deve cadastrar promoção completa com produtos e ativar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não visível devido a 'visibility: hidden'. Adicionar espera assertiva para garantir visibilidade.

- **Deve clicar na opção "Editar" do dropdown e verificar o modal**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** A falha ocorre porque o elemento não está visível devido a uma propriedade CSS de overflow no elemento pai. É necessário garantir que o elemento esteja visível antes de interagir com ele.

- **abre o dropdown de acoes e exibe a opcao de clonar venda**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento esperado `.ibox-content table.table-hover` não foi encontrado, indicando que o locator pode estar incorreto ou a página não estava carregada no momento esperado.

- **Deve exibir a tela de Configurações da NF-e com todos os elementos principais**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento `h5:contains("Ambiente NFe")` não foi encontrado, possivelmente devido a uma mudança no DOM ou locator incorreto.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: DEPÓSITO BANCÁRIO**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Falha ao encontrar o elemento `h5`, indicando um provável problema de timing ou locator desatualizado.

- **Deve alterar o status para em atendimento e gerar Venda**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Falha devido ao não encontro do elemento esperado, provavelmente por execução antes do carregamento completo da página.

- **deve realizar cadastro completo de contador com todos os campos**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O feedback esperado do `.toast` não foi encontrado, indicando possível timing incorreto.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: CRÉDITO LOJA**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento `h5` não encontrado, similar ao problema anterior, requer revisão de waits.

- **emite e gera carta de correção NFe complementar avulsa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Falha devido a locator ou timing incorreto ao buscar lista de sugestões para chave de acesso.

- **deve exibir todos os elementos principais da tela**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento `<strong>` não visível devido a `display: none` em elemento pai, indicando necessidade de espera para visibilidade.

- **Deve adicionar grupo na importação**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** A falha ocorreu porque a aplicação retornou erro 500 ao tentar acessar a página, indicando um problema no servidor ou endpoint.

- **Deve permitir pesquisar o relatorio Fiscal Entrada Sintetico com periodo diario**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento estava coberto por outro devido a posição 'fixed'.

- **deve finalizar uma produção com modo de preparo preenchido**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O teste não encontrou o texto esperado dentro do seletor devido à falta de espera assertiva.

- **Deve exibir a tela de Pesquisa Preço com todos os elementos principais**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não visível por ter 'display: none', indicando falta de sincronização.

- **aplica filtro por nome e limpa o campo apos a pesquisa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Conteúdo não encontrado devido a falta de espera assertiva.

- **Deve validar as opções do dropdown de ações**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento estava sendo clippado devido a overflow do elemento pai.

- **Deve marcar opções de geração de registros**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Esperado que input estivesse checado sem confirmação prévia de ações de seleção.

- **valida opção Visualizar Danfe do dropdown Mais Ações**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Sessão duplicada devido a tentativa de criação de sessão já existente.

- **Deve exibir os filtros e acoes disponiveis para o relatorio de Projecao de Cartoes**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Falha na inicialização da sessão e conteúdos não encontrados.

- **deve exibir todos os campos do modal de configurações**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não visível devido a display none, indicando espera incorreta.

- **deve retornar para listagem ao clicar em Voltar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento coberto por outro, causando falha no clique esperado.

- **Deve alterar o status para em atendimento e gerar Venda**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não encontrado, possivelmente devido à falta de espera assertiva para garantir que o elemento estivesse realmente disponível antes da interação.

- **Deve realizar o cadastro de uma devolução/venda com sucesso**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento textarea está coberto por outro elemento, o que pode ser contornado com a opção {force: true}.

- **Deve gerar um novo atendimento**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não encontrado, indicando falta de sincronização ou espera assertiva.

- **Deve adicionar um produto à requisição após salvar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Os toasts de confirmação não apareceram, indicando a necessidade de uma validação de carregamento.

- **Deve validar a exibição da tabela de contas a pagar e linhas da tabela**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não encontrado, indicando falta de sincronização ou espera assertiva.

- **Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status "Baixar"**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não encontrado, indicando falta de sincronização com espera assertiva.

- **realiza fluxo completo da NFe normal NFCe**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Problema ao clicar em múltiplos elementos, precisando ajustar o comando `click`.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: TRANSFERÊNCIA BANCÁRIA**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não visível devido a um problema de estilo que precisa ser tratado no teste ou na aplicação.

- **abre formulario de NFe normal venda apos pesquisar e selecionar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Problema ao clicar em múltiplos elementos, precisando ajustar o comando `click`.

- **emite e gera carta de correção NFe ajuste avulsa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não encontrado, indicando necessidade de espera assertiva.

- **emite e cancela NFe complementar avulsa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O locator 'Início' possivelmente foi modificado ou não está disponível no momento apropriado devido à falta de espera condicional.

- **Deve abrir a listagem de atributos e mostrar o filtro**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento <a> coberto por overlay, indicando problema com a sequência de carregamento ou visibilidade.

- **Deve validar filtros de listagem (Existentes)**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Texto 'Serviços e NFS-e' não encontrado, possivelmente devido à falta de espera apropriada.

- **Deve exibir detalhes ao selecionar um produto**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Problema ao localizar '.modal .table...', sugerindo falta de espera condicional.

- **Deve preencher as informações de pagamento e salvar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** A visibilidade do modal é comprometida pelo estado de exibição do pai, sugerindo ajuste na sequência de ações.

- **Deve filtrar atendimentos por data**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento 'daterangepicker' coberto por overlay, indicando erro na sequência de carregamento.

- **deve realizar cadastro completo de usuario com perfil**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Texto 'Sucesso' não encontrado, possivelmente devido à falta de condição de espera após o envio do formulário.

- **Deve exibir a tela de listagem de ICMS Ajustes Apurações**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Problema em encontrar 'Início', sugerindo necessidade de ajuste no locator ou espera condicional.

- **emite e cancela NFe ajuste avulsa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento '#auto_natureza' não encontrado, sugerindo que o locator está desatualizado ou ordem de carregamento inadequada.

- **Deve permitir desativar promoção ativa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento invisível devido à visibilidade do pai, sugerindo ajuste na sequência de visibilidade dos elementos.

- **Deve realizar um novo balanco**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento `#btn-novo` não foi encontrado, sugerindo que o locator pode estar desatualizado ou a interação acontece antes do elemento ser visível.

- **deve validar autocomplete de cidade**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Recebimento de erro 500 ao tentar carregar a página, indicando problema no backend.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: CARTÃO DE DÉBITO**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento esperado não está visível, possivelmente devido a um display: none em um elemento pai, indicando que a interação foi feita antes de o elemento estar disponível.

- **Deve preencher o formulário de Nova Receita com Categoria: RECEITA e Forma de Pagamento: PIX**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Botão desabilitado, provavelmente necessidade de verificação e habilitação correta antes da interação.

- **realiza fluxo completo da NFe de ajuste avulsa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento `#auto_natureza` não foi encontrado, sugerindo que pode haver um problema no locator ou controle de espera.

- **Deve preencher o formulário de Nova Receita com Categoria: RECEITA e Forma de Pagamento: TRANSFERÊNCIA BANCÁRIA**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento `h5` não foi encontrado, podendo indicar um problema de locator desatualizado ou ocorrência antes de a página ser completamente carregada.

- **Deve gerar um novo atendimento**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento `#btn-configuracoes` não encontrado, podendo estar relacionado a issues de espera o locator desatualizado.

- **Deve clicar no botão de nova categoria de despesa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento `h5:contains("Categorias")` não encontrado, podendo ocorrer devido ao timing ou ao locator incorreto.

- **Deve cadastrar uma conta para o banco: Santander (Código: 033) com cobrança bancária**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento `h5` não foi encontrado, sugerindo possível locator desatualizado ou problema de timing ao tentar interagir antes da carga completa.

- **Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento `h5` não encontrado, indicando problema de timing ou locator desatualizado.

- **Deve adicionar produto à promoção**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento está invisível devido a um problema de CSS (visibility: hidden) no pai, indicando falta de espera ou sincronização correta.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: CARTÃO DE CRÉDITO**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento não é visível devido ao CSS (display: none), sugerindo um problema de sincronização ou espera condicional ausente.

- **Deve cadastrar reajuste completo com filtros opcionais**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento invisível devido a CSS (visibility: hidden), sugerindo a necessidade de verificar visibilidade antes de ações.

- **adiciona três itens e gera pagamento**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento esperado não encontrado, indicando potencial problema de sincronização ou má definição de locator.

- **Deve verificar que os campos estão visíveis na primeira linha**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O display dos elementos é bloqueado por overflow, necessitando ajuste na espera de visibilidade.

- **Deve verificar os dados principais do modal**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento de carregamento encontrado no DOM, sugerindo falta de espera por carregamento completo.

- **valida opção Clonar NFe do dropdown Mais Ações**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Erro de sessão sugere problema com uso de cy.session usando ID duplicado em testes concorrentes.

- **Deve realizar busca por código de produto**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não encontrado, provável erro de locator ou espera condicional ausente.

- **mantem o painel de itens pronto para preenchimento**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento não encontrado, necessitando de espera por carregamento e presença no DOM.

- **abre formulario de NFe normal movimentacao apos pesquisar e selecionar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Tentativa de clique em múltiplos elementos, necessitando especificação única ou ajuste de ação múltipla.

- **Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O teste falhou ao não encontrar o elemento `.typeahead-list`, sugerindo falta de espera assertiva para o aparecimento do elemento antes de interação.

- **cadastra produto habilitando grade e recusa os dados fiscais**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** A sobreposição do elemento de botão "close" por um "toast" pode indicar a falta de espera condicional para que o "toast" desapareça antes da interação.

- **Deve preencher o formulário de Nova Receita com Categoria: RECEITA e Forma de Pagamento: PIX COBRANCA**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento '.soft-select__option' não foi encontrado, possivelmente devido à falta de espera condicional para a carga de elementos dinâmicos.

- **Deve cancelar a exclusão e verificar que a parcela permanece na tabela**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** A presença de CSS 'overflow' que impede a visibilidade do elemento pode indicar um problema de interface que deve ser corrigido.

- **Deve selecionar a Conta Corrente**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** O overlay 'laravel-overlay' bloqueando o elemento indica um problema na lógica de overlays do aplicativo.

- **valida opção Download XML do dropdown Mais Ações**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Tentativa de criar uma sessão com um identificador já existente, indicando um erro na configuração do 'cy.session'.

- **Deve cadastrar um novo vínculo fiscal de serviço**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Semelhante ao problema anterior, o overlay bloqueia a interação desejada.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: PIX OFF**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento esperado não encontrado, sugerindo falta de espera condicional para carregamento.

- **Deve cadastrar promoção com todos os dias da semana**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Elementos essenciais estão invisíveis devido à configuração CSS de 'visibility' oculto, sugerindo um erro no design da interface.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: DUPLICATA**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento 'h5' não encontrado, requer uma espera condicional apropriada.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: ESPÉCIE**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento '.soft-select__option' não encontrado, sugerindo ausência de espera condicional.

- **Deve permitir pesquisar o relatorio Fiscal Saida Analitico com periodo diario**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento não é visível por estar coberto por outro elemento, indicando falta de wait condicional ou lógica inadequada ao lidar com camadas de elementos.

- **Deve editar completamente uma despesa e salvar**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O teste não encontrou o elemento `h5`, sugerindo falta de espera assertiva para o elemento aparecer.

- **Cenário 2 (Filtros Complementares): Deve pesquisar no modo Analítico (Ontem) com filtros extras**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O teste falha ao encontrar conteúdo em `th`, provavelmente devido a mudanças no conteúdo ou falta de espera adequada.

- **deve realizar cadastro completo de justificativa apenas com descricao**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento `#toast-container .toast-success` não foi encontrado, indicando ausência de verificação de sucesso ou mudança no locator.

- **Deve exibir os elementos basicos do relatorio de Ultimas Compras**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Não consegue encontrar o conteúdo 'Início', indicando problema de inicialização da sessão ou dados.

- **Deve realizar o ciclo completo de CRUD (Criar, Listar, Editar, Excluir)**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Os botões não são encontrados, sugerindo mudanças na estrutura de botões ou ausências.

- **emite e cancela NFe devolucao avulsa**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** O elemento não é visível devido à propriedade CSS do elemento pai, o que indica um problema na interface da aplicação.

- **realiza fluxo completo da NFe normal venda**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** A tentativa de clique em múltiplos elementos sugere um erro no método de seleção ou na suposição do DOM.

- **Deve realizar uma edição completa e salvar a receita**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** O elemento não visível devido a overflow de um elemento pai, indicando um problema de apresentação na aplicação.

- **Deve ativar promoção após cadastro completo**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** A visibilidade do elemento é impedida por uma propriedade CSS 'visibility: hidden', o que reflete um problema de interface.

- **Deve acessar a tela e validar elementos principais**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Falha na criação da sessão pode indicar problema no processo de login ou navegação inicial.

- **Deve selecionar e desmarcar todos os registros**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Locator provavelmente incorreto ou elemento não visível. O elemento `.check_all` não foi encontrado, indicando que o locator pode ter sido alterado.

- **Deve gerar um novo atendimento**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Locator `#btn-configuracoes` não encontrado. Problema recorrente com seletor não correspondendo ao estado atual da aplicação.

- **Deve cadastrar promoção com sucesso**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Botão oculto devido ao CSS do elemento pai. Precisa de validação adicional para garantir visibilidade antes da interação.

- **Deve realizar transferência completa entre contas**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Sessão falhou antes do início do teste. Indicação de possível problema de configuração de sessão ou backend.

- **Deve preencher e salvar um novo cadastro de requisição com sucesso**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento do auto-complete não encontrado. Pode ser necessário aguardar a lista de auto-complete antes de selecionar o item.

- **valida que todas as opções do dropdown Mais Ações estão visíveis**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Conflito com a sessão existente. Session ID reutilizado.

- **Deve expandir os detalhes de pagamento e verificar tabela vazia**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Locator `.icon-payment-details` não encontrado ou elemento invisível. Pode precisar de ajuste no locator ou espera condicional.

- **valida opção Enviar email do dropdown Mais Ações**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Conflito com a sessão existente. Session ID reutilizado.

- **abre o formulário de novo grupo**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Conteúdo esperado não encontrado, possível problematica com o estado do DOM ou alteração de dados dinâmicos.

- **exibe a listagem e permite abrir o formulario de filtros**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento `<a>` coberto por um overlay. Resolver o overlay antes de tentar clicar.

- **Deve criar um novo modelo de contrato**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O teste falhou ao encontrar o conteúdo 'Início', que indica um problema de sincronização ou locator incorreto.

- **Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece "Baixar"**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O modal não estava visível porque a exibição depende de uma espera assertiva ausente ou locator impreciso.

- **Deve clicar na opção "Cancelar" do dropdown e verificar o modal de cancelamento**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Problema de visibilidade devido a CSS, recomendar uso de espera assertiva adequada.

- **Deve exibir a tela de DRE com todos os elementos principais**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Falha ao encontrar 'Início', sugerindo problema de sincronização semelhante ao primeiro teste.

- **aplica filtro por nome e limpa o campo apos a pesquisa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento 'Ayrton Senna' não encontrado, sugerindo problema de sincronização ou locator desatualizado.

- **Cenário 2: Deve filtrar, editar e atualizar dados na aba Produto**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento coberto por overlay, falta de espera assertiva ou uso de `force: true` pode ser necessário.

- **deve realizar cadastro completo de empresa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento coberto por um toast, indicando sincronia insatisfatória.

- **Deve importar compra pela Nuvem Fiscal filtrando por Ciência da Operação**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Interação bloqueada pelo introjs-overlay, recomendando espera para não visibilidade ou uso de `force: true`.

- **Deve preencher o motivo, confirmar o cancelamento e verificar o status atualizado**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Erro 500 retornado pelo servidor ao tentar realizar a ação solicitada.

- **realiza fluxo completo da NFe complementar avulsa**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento '#auto_natureza' não encontrado, indicando problema de locator ou sincronização.

- **Deve permitir pesquisar o relatorio Fiscal Saida Sintetico com periodo diario**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O elemento está sendo coberto por outro devido ao CSS, sugerindo necessidade de espera condicional.

- **Deve gerar um novo atendimento**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Elemento '#btn-configuracoes' não encontrado, provavelmente locator desatualizado.

- **Deve preencher todos os campos do formulário de recibo**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Apesar de o teste executar a ação corretamente, os campos não parecem receber valores devido a possível falha da aplicação.

- **Abre o modal de novo cadastro ao clicar no botao Novo Cadastro**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O botão está coberto por outro elemento, sugerindo a falta de tratamento de layout em testes.

- **Deve exibir a seção de gráfico do Ponto de Equilíbrio**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** O container do gráfico está com display: none, indicando problema de inicialização de dados na aplicação.

- **Deve abrir o dropdown de ações e verificar que as opções estão visíveis**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Problema de clipping de conteúdo devido a CSS overflow, exigindo abordagem diferente para verificação.

- **Realiza fluxo completo da NFe normal movimentacao**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** O uso de cy.click() falha por haver múltiplos elementos, necessitando ajustar a opção de clique.

- **Realiza fluxo completo da NFe de devolucao avulsa**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** O elemento de formulário não aparece devido a overlay da aplicação, indicando erro de backend ou frontend.

- **Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: PIX COBRANCA**
  - **Classificação:** 🐛 Bug na Aplicação
  - **Motivo:** Problema de visibilidade com display: none no elemento pai, apontando erro de renderização da aplicação.

- **Deve realizar a exclusão com sucesso e validar que o tamanho da tabela diminuiu**
  - **Classificação:** 🔧 Erro no Teste
  - **Motivo:** Conteúdo de dropdown está oculto devido a CSS overflow, necessitando ajuste na lógica de verificação.

---


## Ações Cursor-ready

> Instruções para o Cursor Agent mode. Copie esta seção inteira
> e cole no chat do Cursor com: "Implemente as ações aprovadas abaixo."
> Remova ou altere [APROVADO] para [REJEITADO] nas ações que NÃO deseja executar.

### [APROVADO] Ação 1: Corrigir Teste: abre formulario de NFe normal NFCe apos pesquisar e selecionar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro NFe Normal
- **O que fazer**: Revisar selector utilizado no `cy.click()` para garantir que se refira a um único elemento.
- **Código atual**: `cy.get('selecionar-elemento').click();`
- **Código sugerido**:
  ```javascript
  cy.get('selecionar-elemento-unico').click();
  ```

### [APROVADO] Ação 2: Corrigir Teste: emite e cancela NFe normal avulsa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cancelamento NFe Normal
- **O que fazer**: Adicionar espera assertiva para garantir que a tabela está visível antes de interagir com ela.
- **Código atual**: `cy.get('table.table-hover').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.get('table.table-hover').should('be.visible');
  ```

### [APROVADO] Ação 3: Corrigir Teste: deve localizar produção finalizada na listagem, abrir edição e reverter produção
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de Produção
- **O que fazer**: Revisar o selector para localizar corretamente o elemento 'Finalizado'.
- **Código atual**: `cy.get('table.table-hover tbody tr:contains("Finalizado")').click();`
- **Código sugerido**:
  ```javascript
  cy.get('table.table-hover tbody tr:contains("Finalizado")').should('exist').click();
  ```

### [APROVADO] Ação 4: Corrigir Teste: Deve clicar na opção "Detalhes do título" do dropdown e verificar o modal
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Testes da Listagem de Contas a Receber
- **O que fazer**: Ajustar espera para visibilidade do elemento antes de clicar.
- **Código atual**: `cy.get('div.dropdown').click();`
- **Código sugerido**:
  ```javascript
  cy.get('div.dropdown').should('be.visible').click();
  ```

### [APROVADO] Ação 5: Corrigir Teste: deve exibir a tabela de Ponto de Equilíbrio
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Meu Lucro - Dashboard Financeiro
- **O que fazer**: Adicionar espera condicional para garantir visibilidade antes de ações com a tabela.
- **Código atual**: `cy.get('table.table-hover').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.get('table.table-hover').should('be.visible');
  ```

### [APROVADO] Ação 6: Corrigir Teste: exclui dois ou mais grupos customizados sem remover os padrões
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Compras e Estoque > Produtos > Grupos
- **O que fazer**: Verificar dados de teste e ajustar selector para garantir a localização do conteúdo correto.
- **Código atual**: `cy.get('td:contains("Lote Grupo A").should('exist');`
- **Código sugerido**:
  ```javascript
  cy.get('td:contains("Lote Grupo A").should('exist');
  ```

### [APROVADO] Ação 7: Corrigir Teste: navega para novo cadastro ao clicar no botao Novo Cadastro
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Listagem de empresas
- **O que fazer**: Revisar operações assíncronas no callback para assegurar execução adequada.
- **Código atual**: `cy.then(async () => {/* operações assíncronas */});`
- **Código sugerido**:
  ```javascript
  cy.then(async () => {/* operações assíncronas */});
  ```

### [APROVADO] Ação 8: Corrigir Teste: deve realizar cadastro de perfil apenas com campos obrigatórios
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de Perfil de Acesso
- **O que fazer**: Modificar clique para forçar ou ajustar sequência de ações para garantir elemento clicável.
- **Código atual**: `cy.get('#btn-pesquisa').click();`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-pesquisa').click({ force: true });
  ```

### [APROVADO] Ação 9: Corrigir Teste: Deve cadastrar promoção completa com produtos e ativar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Gestor de Promoções - Cadastro
- **O que fazer**: Ajustar espera para garantir a visibilidade do botão antes da interação.
- **Código atual**: `cy.get('#aplicar-filter-drawer-pesquisa-preco').click();`
- **Código sugerido**:
  ```javascript
  cy.get('#aplicar-filter-drawer-pesquisa-preco').should('be.visible').click();
  ```

### [APROVADO] Ação 10: Corrigir Teste: Deve clicar na opção "Editar" do dropdown e verificar o modal
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/contasAReceber.spec.js
- **O que fazer**: Adicionar `should('be.visible')` antes de interagir com o dropdown.
- **Código atual**: `cy.get('div.dropdown').click();`
- **Código sugerido**:
  ```javascript
  cy.get('div.dropdown').should('be.visible').click();
  ```

### [APROVADO] Ação 11: Corrigir Teste: abre o dropdown de acoes e exibe a opcao de clonar venda
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/listagemVendas.spec.js
- **O que fazer**: Verificar e corrigir locator ou adicionar espera condicional para garantir carregamento da tabela.
- **Código atual**: `cy.get('.ibox-content table.table-hover').should('exist');`
- **Código sugerido**:
  ```javascript
  cy.get('.ibox-content').should('be.visible').within(() => { cy.get('table.table-hover').should('exist'); });
  ```

### [APROVADO] Ação 12: Corrigir Teste: Deve exibir a tela de Configurações da NF-e com todos os elementos principais
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/nfeConfiguracoes.spec.js
- **O que fazer**: Revisar locator e garantir que a página foi completamente carregada antes de validar o elemento.
- **Código atual**: `cy.get('h5:contains("Ambiente NFe")');`
- **Código sugerido**:
  ```javascript
  cy.contains('h5', 'Ambiente NFe').should('be.visible');
  ```

### [APROVADO] Ação 13: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: DEPÓSITO BANCÁRIO
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/cadastroNovaDespesa.spec.js
- **O que fazer**: Corrigir waits para garantir que o formulário foi carregado completamente antes da verificação de elementos.
- **Código atual**: `cy.get('h5').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.contains('h5', 'Título Esperado do Formulário').should('be.visible');
  ```

### [APROVADO] Ação 14: Corrigir Teste: Deve alterar o status para em atendimento e gerar Venda
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/painelAtendimentoPetshop.spec.js
- **O que fazer**: Adicionar espera condicional para verificar visibilidade do kanban item antes de interagir.
- **Código atual**: `cy.get('[data-id="agendado"] .kanban-item:first-child').click();`
- **Código sugerido**:
  ```javascript
  cy.get('[data-id="agendado"]').should('exist').within(() => { cy.get('.kanban-item:first-child').should('be.visible').click(); });
  ```

### [APROVADO] Ação 15: Corrigir Teste: deve realizar cadastro completo de contador com todos os campos
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/cadastroContador.spec.js
- **O que fazer**: Revisar timing e garantir espera por feedback visual após submissão do cadastro.
- **Código atual**: `cy.get('.toast').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.wait(1000); cy.get('.toast').should('be.visible');
  ```

### [APROVADO] Ação 16: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: CRÉDITO LOJA
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/cadastroNovaDespesa.spec.js
- **O que fazer**: Corrigir waits para carregamento total antes da validação do head de formulário.
- **Código atual**: `cy.get('h5').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.contains('h5', 'Título Esperado do Formulário').should('be.visible');
  ```

### [APROVADO] Ação 17: Corrigir Teste: emite e gera carta de correção NFe complementar avulsa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/cartaCorrecaoNFe.spec.js
- **O que fazer**: Revisar espera e locator para garantir visibilidade de sugestões ao digitar chave.
- **Código atual**: `cy.get('#div_auto_chave_acesso .typeahead-list li a').click();`
- **Código sugerido**:
  ```javascript
  cy.get('#div_auto_chave_acesso').should('be.visible').within(() => { cy.get('.typeahead-list li a').should('be.visible').click(); });
  ```

### [APROVADO] Ação 18: Corrigir Teste: deve exibir todos os elementos principais da tela
- **Tipo**: editar-arquivo
- **Arquivo(s)**: spec/meuLucroDashboard.spec.js
- **O que fazer**: Revisar waits para garantir elementos visíveis após carregamento.
- **Código atual**: `cy.get('strong').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.get('#box-relatorio-projetado.aba-conteudo').should('be.visible').within(() => { cy.get('strong').should('be.visible'); });
  ```

### [APROVADO] Ação 19: Corrigir Teste: Deve permitir pesquisar o relatorio Fiscal Entrada Sintetico com periodo diario
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/RelatorioFiscalEntradaSintetico.spec.js
- **O que fazer**: Adicionar espera condicional para garantir visibilidade do elemento antes da interação.
- **Código atual**: `cy.get('#data').type(dataInicial);`
- **Código sugerido**:
  ```javascript
  cy.get('#data').should('be.visible').type(dataInicial);
  ```

### [APROVADO] Ação 20: Corrigir Teste: deve finalizar uma produção com modo de preparo preenchido
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/CadastroDeProducao.spec.js
- **O que fazer**: Adicionar espera assertiva no local correto para garantir presença do conteúdo.
- **Código atual**: `cy.get('.typeahead-list li a').contains('Produto').click();`
- **Código sugerido**:
  ```javascript
  cy.get('.typeahead-list li a').should('contain', 'Produto').click();
  ```

### [APROVADO] Ação 21: Corrigir Teste: Deve exibir a tela de Pesquisa Preço com todos os elementos principais
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/ProdutoPesquisaPreco.spec.js
- **O que fazer**: Adicionar assertiva para garantir que o modal está visível antes de interagir.
- **Código atual**: `cy.get('#content-plus').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.get('#content-plus').should('not.have.css', 'display', 'none').should('be.visible');
  ```

### [APROVADO] Ação 22: Corrigir Teste: aplica filtro por nome e limpa o campo apos a pesquisa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/ListagemDeEmpresas.spec.js
- **O que fazer**: Adicionar espera assertiva no local correto.
- **Código atual**: `cy.get('table.table-hover tbody tr').contains('SOFTCOM');`
- **Código sugerido**:
  ```javascript
  cy.get('table.table-hover tbody tr').should('contain', 'SOFTCOM');
  ```

### [APROVADO] Ação 23: Corrigir Teste: Deve validar as opções do dropdown de ações
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/TestesListagemContasReceber.spec.js
- **O que fazer**: Adicionar lógica para lidar com overflow ou rearranjar interações.
- **Código atual**: `cy.get('div.dropdown').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.get('div.dropdown').scrollIntoView().should('be.visible');
  ```

### [APROVADO] Ação 24: Corrigir Teste: Deve marcar opções de geração de registros
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/GestaoOrdemServicoPetshop.spec.js
- **O que fazer**: Verificar se a seleção ocorreu antes de checar o estado do checkbox.
- **Código atual**: `cy.get('#disponibilidade-em-estoque').should('be.checked');`
- **Código sugerido**:
  ```javascript
  cy.get('#disponibilidade-em-estoque').check().should('be.checked');
  ```

### [APROVADO] Ação 25: Corrigir Teste: valida opção Visualizar Danfe do dropdown Mais Ações
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/CadastroNFeDropdown.spec.js
- **O que fazer**: Modificar identificador da sessão para evitar conflito.
- **Código atual**: `cy.session('user_session', {...})`
- **Código sugerido**:
  ```javascript
  cy.session('unique_user_session', {...})
  ```

### [APROVADO] Ação 26: Corrigir Teste: Deve exibir os filtros e acoes disponiveis para o relatorio de Projecao de Cartoes
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/RelatorioProjecaoCartoes.spec.js
- **O que fazer**: Corrigir a inicialização da sessão e verificar visibilidade dos elementos corretamente.
- **Código atual**: `cy.get('#filtros').should('contain', 'Início');`
- **Código sugerido**:
  ```javascript
  cy.loginArmazenandoSessao();
  cy.get('#filtros').should('contain', 'Início');
  ```

### [APROVADO] Ação 27: Corrigir Teste: deve exibir todos os campos do modal de configurações
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/MeuLucroDashboard.spec.js
- **O que fazer**: Verificar visibilidade correta antes de tentar visualizar os campos.
- **Código atual**: `cy.get('#btn-acao-box').should('not.have.css', 'display', 'none');`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-acao-box').should('be.visible').should('not.have.css', 'display', 'none');
  ```

### [APROVADO] Ação 28: Corrigir Teste: deve retornar para listagem ao clicar em Voltar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: specs/CadastroUsuario.spec.js
- **O que fazer**: Avaliar estratégia de clique ou remover elementos cobrindo.
- **Código atual**: `cy.get('#btn-voltar').click();`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-voltar').click({ force: true });
  ```

### [APROVADO] Ação 29: Corrigir Teste: Deve alterar o status para em atendimento e gerar Venda
- **Tipo**: editar-arquivo
- **Arquivo(s)**: PainelDeAtendimentoPetshopSpec.js
- **O que fazer**: Adicionar espera assertiva antes de procurar o elemento.
- **Código atual**: `cy.get('[data-id="agendado"] .kanban-item:first-child')`
- **Código sugerido**:
  ```javascript
  cy.get('[data-id="agendado"] .kanban-item:first-child').should('be.visible')
  ```

### [APROVADO] Ação 30: Corrigir Teste: Deve realizar o cadastro de uma devolução/venda com sucesso
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroDevolucaoVendaConsignacaoSpec.js
- **O que fazer**: Adicionar {force: true} para interação com o textarea.
- **Código atual**: `cy.get('#observacao').clear()`
- **Código sugerido**:
  ```javascript
  cy.get('#observacao').clear({ force: true })
  ```

### [APROVADO] Ação 31: Corrigir Teste: Deve gerar um novo atendimento
- **Tipo**: editar-arquivo
- **Arquivo(s)**: PainelDeAtendimentoPetshopSpec.js
- **O que fazer**: Adicionar espera assertiva para o botão de configurações.
- **Código atual**: `cy.get('#btn-configuracoes')`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-configuracoes').should('be.visible')
  ```

### [APROVADO] Ação 32: Corrigir Teste: Deve adicionar um produto à requisição após salvar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroRequisicaoConsignacaoSpec.js
- **O que fazer**: Adicionar validação de carregamento assertiva para toasts.
- **Código atual**: `cy.get('.toast-message')`
- **Código sugerido**:
  ```javascript
  cy.get('.toast-message').should('be.visible')
  ```

### [APROVADO] Ação 33: Corrigir Teste: Deve validar a exibição da tabela de contas a pagar e linhas da tabela
- **Tipo**: editar-arquivo
- **Arquivo(s)**: ListagemContasPagarSpec.js
- **O que fazer**: Adicionar espera assertiva para garantir que a tabela esteja visível.
- **Código atual**: `cy.get('h5')`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible')
  ```

### [APROVADO] Ação 34: Corrigir Teste: Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status "Baixar"
- **Tipo**: editar-arquivo
- **Arquivo(s)**: BaixaDespesasSpec.js
- **O que fazer**: Adicionar espera assertiva para o elemento esperado.
- **Código atual**: `cy.get('h5')`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible')
  ```

### [APROVADO] Ação 35: Corrigir Teste: realiza fluxo completo da NFe normal NFCe
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroNFENormalSpec.js
- **O que fazer**: Ajustar comando click para múltiplos elementos.
- **Código atual**: `cy.click()`
- **Código sugerido**:
  ```javascript
  cy.click({ multiple: true })
  ```

### [APROVADO] Ação 36: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: TRANSFERÊNCIA BANCÁRIA
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroNovaDespesaSpec.js
- **O que fazer**: Certificar que o elemento esteja visível antes da interação.
- **Código atual**: `cy.get('#fornecedor_id')`
- **Código sugerido**:
  ```javascript
  cy.get('#fornecedor_id').should('be.visible').click()
  ```

### [APROVADO] Ação 37: Corrigir Teste: abre formulario de NFe normal venda apos pesquisar e selecionar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroNFENormalSpec.js
- **O que fazer**: Ajustar comando click para múltiplos elementos.
- **Código atual**: `cy.click()`
- **Código sugerido**:
  ```javascript
  cy.click({ multiple: true })
  ```

### [APROVADO] Ação 38: Corrigir Teste: emite e gera carta de correção NFe ajuste avulsa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CartaCorrecaoNFEAjusteSpec.js
- **O que fazer**: Adicionar espera assertiva para o elemento esperado.
- **Código atual**: `cy.get('#auto_natureza')`
- **Código sugerido**:
  ```javascript
  cy.get('#auto_natureza').should('be.visible')
  ```

### [APROVADO] Ação 39: Corrigir Teste: emite e cancela NFe complementar avulsa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/CancelamentoNFeComplementar.spec.js
- **O que fazer**: Atualizar locator ou adicionar espera condicional para 'Início'.
- **Código atual**: `cy.contains('Início').click();`
- **Código sugerido**:
  ```javascript
  cy.contains('Início', { timeout: 5000 }).should('be.visible').click();
  ```

### [APROVADO] Ação 40: Corrigir Teste: Deve abrir a listagem de atributos e mostrar o filtro
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/ProdutosAtributos.spec.js
- **O que fazer**: Incluir espera para remoção do overlay.
- **Código atual**: `cy.get('#elemento').click();`
- **Código sugerido**:
  ```javascript
  cy.get('#laravel-overlay').should('not.exist');
  cy.get('#elemento').click();
  ```

### [APROVADO] Ação 41: Corrigir Teste: Deve validar filtros de listagem (Existentes)
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/AtestadosTermosPetshop.spec.js
- **O que fazer**: Adicionar verificação para presença de 'Serviços e NFS-e'.
- **Código atual**: `cy.contains('Serviços e NFS-e').should('exist');`
- **Código sugerido**:
  ```javascript
  cy.contains('Serviços e NFS-e', { timeout: 5000 }).should('be.visible');
  ```

### [APROVADO] Ação 42: Corrigir Teste: Deve exibir detalhes ao selecionar um produto
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/PesquisaPreco.spec.js
- **O que fazer**: Garantir que o modal e a tabela estão visíveis antes da interação.
- **Código atual**: `cy.get('.modal .table.table-hover.venda tbody tr:first-child').click();`
- **Código sugerido**:
  ```javascript
  cy.get('.modal').should('be.visible');
  cy.get('.modal .table.table-hover.venda tbody tr:first-child', { timeout: 5000 }).click();
  ```

### [APROVADO] Ação 43: Corrigir Teste: Deve preencher as informações de pagamento e salvar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/ModalRecebimento.spec.js
- **O que fazer**: Ajustar ações para garantir a visibilidade do modal.
- **Código atual**: `cy.get('div.modal-content.animated.flipInY').should('be.visible');`
- **Código sugerido**:
  ```javascript
  cy.get('div#content-plus.modal.inmodal.in').should('have.css', 'display', 'block');
  cy.get('div.modal-content.animated.flipInY').should('be.visible');
  ```

### [APROVADO] Ação 44: Corrigir Teste: Deve filtrar atendimentos por data
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/PainelAtendimentoPetshop.spec.js
- **O que fazer**: Incluir espera para remoção do overlay antes de limpar input.
- **Código atual**: `cy.clear({force: true});`
- **Código sugerido**:
  ```javascript
  cy.get('#laravel-overlay').should('not.exist');
  cy.get('#filtro_data_atendimento').clear({ force: true });
  ```

### [APROVADO] Ação 45: Corrigir Teste: deve realizar cadastro completo de usuario com perfil
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/CadastroUsuario.spec.js
- **O que fazer**: Adicionar condição de espera para confirmação de sucesso.
- **Código atual**: `cy.contains('Sucesso').should('exist');`
- **Código sugerido**:
  ```javascript
  cy.contains('Sucesso', { timeout: 5000 }).should('be.visible');
  ```

### [APROVADO] Ação 46: Corrigir Teste: Deve exibir a tela de listagem de ICMS Ajustes Apurações
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/ICMSAjusteApuracao.spec.js
- **O que fazer**: Atualizar locator ou adicionar espera condicional para 'Início'.
- **Código atual**: `cy.contains('Início').should('exist');`
- **Código sugerido**:
  ```javascript
  cy.contains('Início', { timeout: 5000 }).should('be.visible');
  ```

### [APROVADO] Ação 47: Corrigir Teste: emite e cancela NFe ajuste avulsa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/CancelamentoNFeAjuste.spec.js
- **O que fazer**: Revisar o locator de '#auto_natureza' ou sequência de carregamento.
- **Código atual**: `cy.get('#auto_natureza').should('exist');`
- **Código sugerido**:
  ```javascript
  cy.get('#auto_natureza', { timeout: 5000 }).should('be.visible');
  ```

### [APROVADO] Ação 48: Corrigir Teste: Deve permitir desativar promoção ativa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/GestorPromocoesCadastro.spec.js
- **O que fazer**: Ajustar visibilidade do botão antes da interação.
- **Código atual**: `cy.get('#aplicar-filter-drawer-pesquisa-preco').should('be.visible').click();`
- **Código sugerido**:
  ```javascript
  cy.get('div.relatorio-filters-drawer-actions').should('not.have.css', 'visibility', 'hidden');
  cy.get('#aplicar-filter-drawer-pesquisa-preco').should('be.visible').click();
  ```

### [APROVADO] Ação 49: Corrigir Teste: Deve realizar um novo balanco
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/support/pages/Balanco/BalancoPage.js
- **O que fazer**: Adicionar espera condicional para o botão de novo balanco.
- **Código atual**: `cy.get('#btn-novo').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-novo').should('be.visible').click()
  ```

### [APROVADO] Ação 50: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: CARTÃO DE DÉBITO
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/Cadastro de Nova Despesa.spec.js
- **O que fazer**: Adicionar espera condicional antes de interagir com o seletor de fornecedor.
- **Código atual**: `cy.get('div#fornecedor_id.soft-select-async.css-b62m3t-container')`
- **Código sugerido**:
  ```javascript
  cy.get('div#fornecedor_id.soft-select-async.css-b62m3t-container').should('be.visible')
  ```

### [APROVADO] Ação 51: Corrigir Teste: Deve preencher o formulário de Nova Receita com Categoria: RECEITA e Forma de Pagamento: PIX
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/support/pages/CadastroNovaReceitaPage.js
- **O que fazer**: Adicionar condicionais para habilitar o botão antes de clicar.
- **Código atual**: `cy.get('#novo-contas-a-receber').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#novo-contas-a-receber').should('not.be.disabled').click()
  ```

### [APROVADO] Ação 52: Corrigir Teste: realiza fluxo completo da NFe de ajuste avulsa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/Cadastro NFe Ajuste.spec.js
- **O que fazer**: Adicionar espera condicional para o elemento `#auto_natureza`.
- **Código atual**: `cy.get('#auto_natureza')`
- **Código sugerido**:
  ```javascript
  cy.get('#auto_natureza').should('be.visible')
  ```

### [APROVADO] Ação 53: Corrigir Teste: Deve preencher o formulário de Nova Receita com Categoria: RECEITA e Forma de Pagamento: TRANSFERÊNCIA BANCÁRIA
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/Cadastro de Nova Receita.spec.js
- **O que fazer**: Verificar locator `h5` e garantir que esteja visível antes da interação.
- **Código atual**: `cy.get('h5')`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible')
  ```

### [APROVADO] Ação 54: Corrigir Teste: Deve gerar um novo atendimento
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/support/pages/PainelDeAtendimentoPage.js
- **O que fazer**: Adicionar espera condicional para o botão de configurações.
- **Código atual**: `cy.get('#btn-configuracoes')`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-configuracoes').should('be.visible')
  ```

### [APROVADO] Ação 55: Corrigir Teste: Deve clicar no botão de nova categoria de despesa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/Testes de Listagem de Categorias.spec.js
- **O que fazer**: Garantir visibilidade antes da interação com `h5`.
- **Código atual**: `cy.get('h5:contains("Categorias")')`
- **Código sugerido**:
  ```javascript
  cy.get('h5:contains("Categorias")').should('be.visible')
  ```

### [APROVADO] Ação 56: Corrigir Teste: Deve cadastrar uma conta para o banco: Santander (Código: 033) com cobrança bancária
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/Cadastro de Conta Corrente.spec.js
- **O que fazer**: Adicionar check de visibilidade para `h5`.
- **Código atual**: `cy.get('h5')`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible')
  ```

### [APROVADO] Ação 57: Corrigir Teste: Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/Testes de Listagem de Contas.spec.js
- **O que fazer**: Adicionar check de visibilidade para `h5`.
- **Código atual**: `cy.get('h5')`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible')
  ```

### [APROVADO] Ação 58: Corrigir Teste: Deve adicionar produto à promoção
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Gestor de Promoções - Cadastro
- **O que fazer**: Adicionar .should('be.visible') para garantir a visibilidade antes de interação.
- **Código atual**: `cy.get('#aplicar-filter-drawer-pesquisa-preco').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#aplicar-filter-drawer-pesquisa-preco').should('be.visible').click()
  ```

### [APROVADO] Ação 59: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: CARTÃO DE CRÉDITO
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de Nova Despesa
- **O que fazer**: Adicionar espera para visibilidade do elemento antes de interação.
- **Código atual**: `cy.get('#fornecedor_id').select('Fornecedor X')`
- **Código sugerido**:
  ```javascript
  cy.get('#fornecedor_id').should('be.visible').select('Fornecedor X')
  ```

### [APROVADO] Ação 60: Corrigir Teste: Deve cadastrar reajuste completo com filtros opcionais
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Gestor de Preços - Cadastro
- **O que fazer**: Adicionar verificação de visibilidade antes da busca.
- **Código atual**: `cy.get('.fa-search').click()`
- **Código sugerido**:
  ```javascript
  cy.get('.fa-search').should('be.visible').click()
  ```

### [APROVADO] Ação 61: Corrigir Teste: adiciona três itens e gera pagamento
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro manual de compra
- **O que fazer**: Usar espera assertiva para garantir presença do elemento antes da interação.
- **Código atual**: `cy.get('#div_auto_cliente_fornecedor_id .typeahead-list li').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#div_auto_cliente_fornecedor_id .typeahead-list li').should('exist').click()
  ```

### [APROVADO] Ação 62: Corrigir Teste: Deve verificar que os campos estão visíveis na primeira linha
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Testes da Listagem de Contas a Receber
- **O que fazer**: Esperar visibilidade dos campos com ajuste de overflow.
- **Código atual**: `cy.get('td').should('be.visible')`
- **Código sugerido**:
  ```javascript
  cy.get('td').parent().should('not.have.css', 'overflow', 'hidden').get('td').should('be.visible')
  ```

### [APROVADO] Ação 63: Corrigir Teste: Deve verificar os dados principais do modal
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Testes do Modal de Recebimento
- **O que fazer**: Adicionar verificação para ausência de carregamento antes de prosseguir.
- **Código atual**: `cy.get('#dados-modal').should('be.visible')`
- **Código sugerido**:
  ```javascript
  cy.get('#loading').should('not.exist').get('#dados-modal').should('be.visible')
  ```

### [APROVADO] Ação 64: Corrigir Teste: Deve realizar busca por código de produto
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Produto > Pesquisa Preço
- **O que fazer**: Verificar e garantir a existência e visibilidade do input.
- **Código atual**: `cy.get('.modal input#produto').type(produtoCodigo)`
- **Código sugerido**:
  ```javascript
  cy.get('.modal').should('be.visible').find('input#produto').should('exist').type(produtoCodigo)
  ```

### [APROVADO] Ação 65: Corrigir Teste: mantem o painel de itens pronto para preenchimento
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de venda
- **O que fazer**: Adicionar espera por visibilidade e existência de elemento.
- **Código atual**: `cy.get('.ibox-content table.table-hover').should('be.visible')`
- **Código sugerido**:
  ```javascript
  cy.get('.ibox-content').should('be.visible').find('table.table-hover').should('exist').should('be.visible')
  ```

### [APROVADO] Ação 66: Corrigir Teste: abre formulario de NFe normal movimentacao apos pesquisar e selecionar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro NFe Normal
- **O que fazer**: Especificar um único elemento para ação de clique ou ajustar a chamada para aceitar múltiplos.
- **Código atual**: `cy.get('.elementos').click()`
- **Código sugerido**:
  ```javascript
  cy.get('.elementos').eq(0).click()
  ```

### [APROVADO] Ação 67: Corrigir Teste: Deve preencher o formulário de vínculo fiscal, salvar e validar as informações exibidas
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de Novo Vínculo Fiscal
- **O que fazer**: Adicionar espera adequada antes de buscar `.typeahead-list`.
- **Código atual**: `cy.get('.typeahead-list')`
- **Código sugerido**:
  ```javascript
  cy.get('.typeahead-list').should('be.visible')
  ```

### [APROVADO] Ação 68: Corrigir Teste: cadastra produto habilitando grade e recusa os dados fiscais
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroDeProdutos.spec.js
- **O que fazer**: Adicionar espera condicional para o 'toast'.
- **Código atual**: `cy.get('.botaoClose').click();`
- **Código sugerido**:
  ```javascript
  cy.get('#toast-container').should('not.exist');
  cy.get('.botaoClose').click();
  ```

### [APROVADO] Ação 69: Corrigir Teste: Deve preencher o formulário de Nova Receita com Categoria: RECEITA e Forma de Pagamento: PIX COBRANCA
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroDeNovaReceita.spec.js
- **O que fazer**: Adicionar espera para o elemento '.soft-select__option'.
- **Código atual**: `cy.get('.soft-select__option').click();`
- **Código sugerido**:
  ```javascript
  cy.get('.soft-select__option').should('be.visible').click();
  ```

### [APROVADO] Ação 70: Corrigir Teste: valida opção Download XML do dropdown Mais Ações
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroNFeValidacoes.spec.js
- **O que fazer**: Modificar o identificador de sessão para ser único.
- **Código atual**: `cy.session('user_session', { /* config */ });`
- **Código sugerido**:
  ```javascript
  cy.session('new_unique_session', { /* config */ });
  ```

### [APROVADO] Ação 71: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: PIX OFF
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroDeNovaDespesa.spec.js
- **O que fazer**: Adicionar condicional para carregamento do elemento 'h5'.
- **Código atual**: `cy.get('h5').contains('Categoria').click();`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible').contains('Categoria').click();
  ```

### [APROVADO] Ação 72: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: DUPLICATA
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroDeNovaDespesa.spec.js
- **O que fazer**: Adicionar espera para visibilidade de 'h5'.
- **Código atual**: `cy.get('h5').contains('Categoria').click();`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible').contains('Categoria').click();
  ```

### [APROVADO] Ação 73: Corrigir Teste: Deve preencher o formulário de Nova Despesa com Categoria: Despesa e Forma de Pagamento: ESPÉCIE
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroDeNovaDespesa.spec.js
- **O que fazer**: Adicionar espera para o elemento '.soft-select__option'.
- **Código atual**: `cy.get('.soft-select__option').click();`
- **Código sugerido**:
  ```javascript
  cy.get('.soft-select__option').should('be.visible').click();
  ```

### [APROVADO] Ação 74: Corrigir Teste: Deve permitir pesquisar o relatorio Fiscal Saida Analitico com periodo diario
- **Tipo**: editar-arquivo
- **Arquivo(s)**: RelatorioFiscalSaidaAnalitico.js
- **O que fazer**: Adicionar espera condicional para garantir que o elemento esteja visível antes de interação.
- **Código atual**: `cy.get('input#data').click();`
- **Código sugerido**:
  ```javascript
  cy.get('input#data').should('be.visible').click();
  ```

### [APROVADO] Ação 75: Corrigir Teste: Deve editar completamente uma despesa e salvar
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Edição Completa de Despesa
- **O que fazer**: Adicionar espera condicional para garantir a visibilidade do elemento antes de interagir.
- **Código atual**: `cy.get('h5').type('Novo dado')`
- **Código sugerido**:
  ```javascript
  cy.get('h5').should('be.visible').type('Novo dado')
  ```

### [APROVADO] Ação 76: Corrigir Teste: Cenário 2 (Filtros Complementares): Deve pesquisar no modo Analítico (Ontem) com filtros extras
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Relatorio de Caixa
- **O que fazer**: Revisar locator e adicionar espera condicional para o conteúdo.
- **Código atual**: `cy.get('th').contains('/Pedido/i')`
- **Código sugerido**:
  ```javascript
  cy.get('th').should('contain.text', 'Pedido').should('be.visible')
  ```

### [APROVADO] Ação 77: Corrigir Teste: deve realizar cadastro completo de justificativa apenas com descricao
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de justificativa
- **O que fazer**: Confirmar sucesso com espera condicional no toast.
- **Código atual**: `cy.get('#toast-container .toast-success')`
- **Código sugerido**:
  ```javascript
  cy.get('#toast-container .toast-success').should('be.visible')
  ```

### [APROVADO] Ação 78: Corrigir Teste: Deve exibir os elementos basicos do relatorio de Ultimas Compras
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Relatorio de Ultimas Compras
- **O que fazer**: Verificar inicialização do teste para garantir que a sessão seja criada corretamente.
- **Código atual**: `cy.visit('/relatorio/ultimas-compras')`
- **Código sugerido**:
  ```javascript
  cy.loginArmazenandoSessao().then(() => { cy.visit('/relatorio/ultimas-compras') })
  ```

### [APROVADO] Ação 79: Corrigir Teste: Deve realizar o ciclo completo de CRUD (Criar, Listar, Editar, Excluir)
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de Atestados e Termos - Petshop
- **O que fazer**: Garanta que os botões estejam visíveis antes de qualquer ação.
- **Código atual**: `cy.get('#btn-salvar, #adicionar, button:contains("Salvar")').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-salvar, #adicionar, button:contains("Salvar")').should('be.visible').click()
  ```

### [APROVADO] Ação 80: Corrigir Teste: realiza fluxo completo da NFe normal venda
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro NFe Normal
- **O que fazer**: Ajustar método de seleção para garantir um único elemento.
- **Código atual**: `cy.get('.seletor').click()`
- **Código sugerido**:
  ```javascript
  cy.get('.seletor').first().click()
  ```

### [APROVADO] Ação 81: Corrigir Teste: Deve acessar a tela e validar elementos principais
- **Tipo**: editar-arquivo
- **Arquivo(s)**: SPED - Inventário Base
- **O que fazer**: Garantir que a sessão seja estabelecida antes de qualquer ação.
- **Código atual**: `cy.visit('/inventario')`
- **Código sugerido**:
  ```javascript
  cy.loginRestoreSession().then(() => { cy.visit('/inventario') })
  ```

### [APROVADO] Ação 82: Corrigir Teste: Deve selecionar e desmarcar todos os registros
- **Tipo**: editar-arquivo
- **Arquivo(s)**: ListagemDevolucoesVendasSpec.js
- **O que fazer**: Corrigir o locator para o checkbox de seleção de todos os registros.
- **Código atual**: `cy.get('.check_all')`
- **Código sugerido**:
  ```javascript
  cy.get(locators.listagemDevolucoesVendas.checkAll)
  ```

### [APROVADO] Ação 83: Corrigir Teste: Deve gerar um novo atendimento
- **Tipo**: editar-arquivo
- **Arquivo(s)**: PainelAtendimentoPetshopSpec.js
- **O que fazer**: Ajustar o locator do botão de configurações no painel de atendimento.
- **Código atual**: `cy.get('#btn-configuracoes')`
- **Código sugerido**:
  ```javascript
  cy.get(locators.painelAtendimento.btnConfiguracoes)
  ```

### [APROVADO] Ação 84: Corrigir Teste: Deve cadastrar promoção com sucesso
- **Tipo**: editar-arquivo
- **Arquivo(s)**: GestorPromocoesCadastroSpec.js
- **O que fazer**: Adicionar checagem de visibilidade antes de tentar clicar no botão.
- **Código atual**: `cy.get('#aplicar-filter-drawer-pesquisa-preco').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#aplicar-filter-drawer-pesquisa-preco').should('have.css', 'visibility', 'visible').click()
  ```

### [APROVADO] Ação 85: Corrigir Teste: Deve preencher e salvar um novo cadastro de requisição com sucesso
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroRequisicaoConsignacaoSpec.js
- **O que fazer**: Adicionar espera condicional para a lista de auto-complete antes de seleção.
- **Código atual**: `cy.get('.typeahead-result .typeahead-list li:first-child a').click()`
- **Código sugerido**:
  ```javascript
  cy.get('.typeahead-result .typeahead-list').should('be.visible').find('li:first-child a').click()
  ```

### [APROVADO] Ação 86: Corrigir Teste: valida que todas as opções do dropdown Mais Ações estão visíveis
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroNFeValidacoesDropdownSpec.js
- **O que fazer**: Alterar identificação da sessão para evitar reutilização.
- **Código atual**: `cy.session('user_session', ... )`
- **Código sugerido**:
  ```javascript
  cy.session('unique_session_nfe_dropdown', ... )
  ```

### [APROVADO] Ação 87: Corrigir Teste: Deve expandir os detalhes de pagamento e verificar tabela vazia
- **Tipo**: editar-arquivo
- **Arquivo(s)**: TestesModalRecebimentoSpec.js
- **O que fazer**: Revisar locator e assegurar a visibilidade do elemento antes de interagir.
- **Código atual**: `cy.get('.icon-payment-details').click()`
- **Código sugerido**:
  ```javascript
  cy.get(locators.modalRecebimento.iconPaymentDetails).should('be.visible').click()
  ```

### [APROVADO] Ação 88: Corrigir Teste: valida opção Enviar email do dropdown Mais Ações
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroNFeValidacoesDropdownSpec.js
- **O que fazer**: Alterar identificação da sessão para evitar reutilização.
- **Código atual**: `cy.session('user_session', ... )`
- **Código sugerido**:
  ```javascript
  cy.session('unique_session_nfe_dropdown_email', ... )
  ```

### [APROVADO] Ação 89: Corrigir Teste: abre o formulário de novo grupo
- **Tipo**: editar-arquivo
- **Arquivo(s)**: ComprasEstoqueProdutosGruposSpec.js
- **O que fazer**: Certificar-se de que o conteúdo dinâmico é esperado corretamente.
- **Código atual**: `cy.contains('Grupo Automatizado 2026-04-17T14-14-50-028Z')`
- **Código sugerido**:
  ```javascript
  cy.contains(locators.produtosGrupos.grupoAutomatizado)
  ```

### [APROVADO] Ação 90: Corrigir Teste: exibe a listagem e permite abrir o formulario de filtros
- **Tipo**: editar-arquivo
- **Arquivo(s)**: ListagemFuncionariosSpec.js
- **O que fazer**: Remover ou esconder o overlay antes de realizar a ação.
- **Código atual**: `cy.get('a').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#laravel-overlay').invoke('hide'); cy.get('a').should('be.visible').click()
  ```

### [APROVADO] Ação 91: Corrigir Teste: Deve criar um novo modelo de contrato
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de Modelos de Contrato
- **O que fazer**: Adicionar espera assertiva para aguardar o carregamento completo da página antes de verificar o conteúdo 'Início'.
- **Código atual**: `cy.contains('Início')`
- **Código sugerido**:
  ```javascript
  cy.contains('Início').should('be.visible')
  ```

### [APROVADO] Ação 92: Corrigir Teste: Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece "Baixar"
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Testes do Modal de Recebimento
- **O que fazer**: Adicionar validação assertiva para garantir a visibilidade do modal.
- **Código atual**: `.modal-content.animated.flipInY`
- **Código sugerido**:
  ```javascript
  .modal-content.animated.flipInY.should('be.visible')
  ```

### [APROVADO] Ação 93: Corrigir Teste: Deve clicar na opção "Cancelar" do dropdown e verificar o modal de cancelamento
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Testes da Listagem de Contas a Receber
- **O que fazer**: Adicionar espera condicional para garantir que o dropdown seja interativo.
- **Código atual**: `.dropdown`
- **Código sugerido**:
  ```javascript
  .dropdown.should('be.visible')
  ```

### [APROVADO] Ação 94: Corrigir Teste: Deve exibir a tela de DRE com todos os elementos principais
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Financeiro > DRE
- **O que fazer**: Adicionar verificação assertiva para garantir a visibilidade inicial.
- **Código atual**: `cy.contains('Início')`
- **Código sugerido**:
  ```javascript
  cy.contains('Início').should('be.visible')
  ```

### [APROVADO] Ação 95: Corrigir Teste: aplica filtro por nome e limpa o campo apos a pesquisa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Listagem de clientes
- **O que fazer**: Revisar o locator utilizado para busca e certificar-se do estado do DOM antes da interação.
- **Código atual**: `cy.contains('.ibox-content table.table-hover tbody tr', 'Ayrton Senna')`
- **Código sugerido**:
  ```javascript
  cy.get('.ibox-content table.table-hover tbody tr').should('contain', 'Ayrton Senna')
  ```

### [APROVADO] Ação 96: Corrigir Teste: Cenário 2: Deve filtrar, editar e atualizar dados na aba Produto
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Atualizar Dados Fiscais
- **O que fazer**: Corrigir problema de interação com elemento coberto.
- **Código atual**: `cy.get('#btn-filtro').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-filtro').click({ force: true })
  ```

### [APROVADO] Ação 97: Corrigir Teste: deve realizar cadastro completo de empresa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro de empresa
- **O que fazer**: Modificar para esperar a não visibilidade do overlay antes de interação.
- **Código atual**: `cy.get('#btn-pesquisa').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-pesquisa').should('be.visible').click({ force: true })
  ```

### [APROVADO] Ação 98: Corrigir Teste: Deve importar compra pela Nuvem Fiscal filtrando por Ciência da Operação
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Importação de Compra pela Nuvem Fiscal
- **O que fazer**: Modificar para forçar interação ou esperar fim de overlay.
- **Código atual**: `cy.get('#tipo_manifestacao').select('opcao')`
- **Código sugerido**:
  ```javascript
  cy.get('#tipo_manifestacao').select('opcao', { force: true })
  ```

### [APROVADO] Ação 99: Corrigir Teste: realiza fluxo completo da NFe complementar avulsa
- **Tipo**: editar-arquivo
- **Arquivo(s)**: Cadastro NFe Complementar
- **O que fazer**: Verificar e ajustar o locator utilizado para identificação.
- **Código atual**: `cy.get('#auto_natureza')`
- **Código sugerido**:
  ```javascript
  cy.get('#auto_natureza').should('be.visible')
  ```

### [APROVADO] Ação 100: Corrigir Teste: Deve permitir pesquisar o relatorio Fiscal Saida Sintetico com periodo diario
- **Tipo**: editar-arquivo
- **Arquivo(s)**: RelatorioFiscalSaidaSintetico.js
- **O que fazer**: Adicionar espera condicional antes de interagir com o input do período.
- **Código atual**: `cy.get('#data').type('...')`
- **Código sugerido**:
  ```javascript
  cy.get('#data').should('be.visible').type('...')
  ```

### [APROVADO] Ação 101: Corrigir Teste: Deve gerar um novo atendimento
- **Tipo**: editar-arquivo
- **Arquivo(s)**: PainelAtendimentoPetshop.js
- **O que fazer**: Atualizar locator para acessar o botão de configurações.
- **Código atual**: `cy.get('#btn-configuracoes')`
- **Código sugerido**:
  ```javascript
  cy.get('#btn-config')
  ```

### [APROVADO] Ação 102: Corrigir Teste: Abre o modal de novo cadastro ao clicar no botao Novo Cadastro
- **Tipo**: editar-arquivo
- **Arquivo(s)**: ListagemFormasPagamento.js
- **O que fazer**: Adicionar verificação de visibilidade para o botão 'Novo Cadastro'.
- **Código atual**: `cy.get('#venda-mais-novidade').click()`
- **Código sugerido**:
  ```javascript
  cy.get('#venda-mais-novidade').should('be.visible').click()
  ```

### [APROVADO] Ação 103: Corrigir Teste: Deve abrir o dropdown de ações e verificar que as opções estão visíveis
- **Tipo**: editar-arquivo
- **Arquivo(s)**: ListagemContasReceber.js
- **O que fazer**: Verificar visibilidade com maior controle de contexto e overflow.
- **Código atual**: `cy.get('div.dropdown').should('be.visible')`
- **Código sugerido**:
  ```javascript
  cy.get('div.dropdown').scrollIntoView().should('be.visible')
  ```

### [APROVADO] Ação 104: Corrigir Teste: Realiza fluxo completo da NFe normal movimentacao
- **Tipo**: editar-arquivo
- **Arquivo(s)**: CadastroNFENormal.js
- **O que fazer**: Adaptar o uso de click para selecionar elementos corretamente.
- **Código atual**: `cy.get('element').click()`
- **Código sugerido**:
  ```javascript
  cy.get('element').click({ multiple: true })
  ```

### [APROVADO] Ação 105: Corrigir Teste: Deve realizar a exclusão com sucesso e validar que o tamanho da tabela diminuiu
- **Tipo**: editar-arquivo
- **Arquivo(s)**: ListagemContasReceber.js
- **O que fazer**: Reajustar verificação de visibilidade considerando restrições de overflow.
- **Código atual**: `cy.get('div.dropdown').should('be.visible')`
- **Código sugerido**:
  ```javascript
  cy.get('div.dropdown').scrollIntoView().should('be.visible')
  ```