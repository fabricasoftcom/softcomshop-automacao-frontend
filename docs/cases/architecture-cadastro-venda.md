# Arquitetura do caso de teste: `vendas/cadastro-venda.spec.js`

## Objetivo
- Validar o fluxo inicial do **cadastro de vendas**, garantindo que os botões principais, formulários e painéis (itens e pagamentos) sejam carregados corretamente ao abrir `Vendas e NF-e > Vendas > Novo Cadastro`.
- Exercitar os autocompletes de **cliente, vendedor e produto** usando respostas controladas (stubs), assegurando que o front-end trate as sugestões corretamente sem depender de dados reais.
- Confirmar que o painel de itens inicia com valores padrão (`quantidade 1,00`, `preço 0,00`, totalizadores zerados) e que o painel de pagamentos informa a ausência de registros antes de gerar parcelas.
- Cobrir um fluxo completo alterando cliente (quando disponível), selecionando o primeiro vendedor do autocomplete real, adicionando item e gerando pagamento pelo modal padrão.
- Exercitar um fluxo com múltiplos itens, aplicação de desconto e geração de pagamento para validar as regras do modal de desconto e a disponibilidade do botão de pagamento.

## Importações e dependências
- `CadastroVendaPage` (`cypress/support/pages/Venda/CadastroVendaPage.js`) encapsula navegação via `MenulateralVendaPage`, valida botões, interage com autocompletes/story e verifica os painéis.
- `CadastroVendaLocators` (`cypress/support/locators/Venda/CadastroVendaLocators.js`) concentra os seletores do cabeçalho, formulário principal, tabela de itens e painel de pagamentos.
- `ListagemVendasLocators` é reutilizado para clicar no botão **Novo Cadastro** da listagem antes de chegar ao formulário.
- O spec usa `cy.intercept` para mockar os endpoints:
  - `POST **/vendas/autocomplete/cliente`
  - `POST **/vendas/autocomplete-vendedor`
  - `POST **/vendas-itens/autocomplete`
  Isso evita dependência do ambiente e garante previsibilidade ao validar os autocompletes.
- O último teste reutiliza os dados reais do ambiente (sem intercepts) para validar a troca de cliente, a seleção do primeiro vendedor disponível, a inclusão de itens e a geração de pagamentos.
- O fluxo com desconto utiliza intercept específico para garantir sugestão estável de produtos antes de acionar o modal de desconto.

## Estrutura do teste
1. `beforeEach`: login com `cy.loginArmazenandoSessao()`, `cy.visit('/')`, navegação pelo menu até `Vendas > Novo`.
2. Primeiro `it` valida botões (`Voltar`, `Novo`, `Salvar`, `Excluir`, `Mais ações`) e campos principais do formulário.
3. Segundo `it` aplica intercepts para cliente/vendedor, digita textos nos inputs e garante que as listas de sugestões apareçam com pelo menos um item.
4. Terceiro `it` valida o painel “Adicione os Itens na Venda”, conferindo tabela, campos visíveis e totalizadores zerados.
5. Quarto `it` intercepta `vendas-itens/autocomplete`, digita no campo de produto e verifica que a lista de sugestões é exibida.
6. Quinto `it` confirma que o painel de pagamentos apresenta a mensagem padrão (“Nenhum resultado foi localizado...”) antes de gerar parcelas.
7. Sexto `it` executa o fluxo completo com dados reais:
8. Sétimo `it` adiciona três itens, aplica desconto e gera pagamento:
   - Utiliza intercept dedicado para garantir o autocomplete de produtos antes de cada inclusão.
   - Valida que o botão de Desconto/Acréscimo fica disponível e que o modal aceita o percentual informado.
   - Reexecuta o fluxo de pagamento confirmando que a tabela deixa de exibir "Nenhum resultado..." após a parcela ser criada.
   - Seleciona um cliente diferente do atual (quando disponível) e valida a alteração do campo oculto.
   - Escolhe o primeiro vendedor retornado pelo autocomplete.
   - Adiciona o primeiro produto disponível na lista e aguarda o item salvo na tabela.
   - Gera um pagamento usando o modal padrão, selecionando a primeira forma de pagamento e validando que a tabela de pagamentos deixa de exibir a mensagem "Nenhum resultado...".

## Integração com a arquitetura global
- O spec foi registrado em `cypress.config.js` logo após os testes de listagem de venda, mantendo a ordenação temática no `specPattern`.
- Tags `{ tags: ['@vendas', '@cadastro-venda', '@regressivo'] }` permitem filtrar rapidamente os testes relacionados ao módulo.
- O fluxo respeita a camada de navegação existente (`menulateralvendapage`) e compartilha locators de listagem para acionar o botão “Novo Cadastro”.
- Não há dependência de fixtures físicas; os mocks são definidos inline dentro do spec, favorecendo isolamento e evitando manutenção adicional.

## Sugestões para evolução
1. Simular a submissão completa de uma venda interceptando `POST /vendas/salvar` e `POST /vendas-itens/salvar`, garantindo que botões como **Salvar**, **Gerar Pagamento** e **Gerar Nota** mudem de estado após o novo ID ser gerado.
2. Cobrir a inclusão de itens com descontos/ acréscimos e validar o recalculo do totalizador usando respostas mockadas de `updateTotalizador`.
3. Expandir o fluxo de pagamento para cobrir múltiplas formas (dinheiro, cartão, PIX) e cenários de parcelas, combinando dados reais e intercepts direcionados conforme necessário.
4. Adicionar variações para clientes/vendedores com dados incompletos (ex.: sem telefone) garantindo que o template do autocomplete continue resiliente.