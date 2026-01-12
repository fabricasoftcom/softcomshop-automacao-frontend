# Arquitetura dos casos de teste: Carta de Correção NFe

## Objetivo
- Exercitar o fluxo completo de emissão e geração de carta de correção (CCe) para todas as finalidades de NFe no módulo de vendas.
- **Aba Normal**: cobrir tipo Avulsa.
- **Aba Devolução**: cobrir tipo Avulsa.
- **Aba Ajuste**: cobrir tipo Avulsa.
- **Aba Complementar**: cobrir tipo Avulsa.
- Garantir que após a emissão bem-sucedida, a NFe possa ter uma carta de correção emitida corretamente.
- Validar o preenchimento da correção e a confirmação da emissão da carta de correção.

## Estrutura de arquivos

### Arquivos de teste (specs)
Os testes foram separados por tipo de NFe para melhor organização e manutenção:

```
cypress/e2e/venda-nfcenfe/
├── carta-correcao-nfe-normal.spec.js           # Testes de carta de correção NFe Normal
├── carta-correcao-nfe-devolucao.spec.js        # Testes de carta de correção NFe Devolução
├── carta-correcao-nfe-ajuste.spec.js           # Testes de carta de correção NFe Ajuste
└── carta-correcao-nfe-complementar.spec.js     # Testes de carta de correção NFe Complementar
```

### Page Objects
Os métodos de carta de correção foram adicionados à classe base `CadastroNfeBasePage`, permitindo reutilização em todos os tipos de NFe:

```
cypress/support/pages/Venda/NFe/
├── CadastroNfeBasePage.js                    # Métodos comuns incluindo carta de correção
└── ...
```

## Importações e dependências
- `CadastroNfeBasePage` (`cypress/support/pages/Venda/NFe/CadastroNfeBasePage.js`): classe base com métodos comuns incluindo carta de correção (`emitirCartaCorrecaoNFe`, `clicarCartaCorrecaoNFe`, `preencherCorrecaoCartaCorrecao`, `confirmarCartaCorrecaoModal`, `validarAlertaSucessoCartaCorrecao`).
- `CadastroNfeNormalPage` (`cypress/support/pages/Venda/NFe/Normal/index.js`): facade que agrupa todas as classes específicas de normal.
- `CadastroNfeDevolucaoPage` (`cypress/support/pages/Venda/NFe/Devolucao/index.js`): facade que agrupa todas as classes específicas de devolução.
- `CadastroNfeAjustePage` (`cypress/support/pages/Venda/NFe/CadastroNfeAjustePage.js`): métodos específicos para NFe Ajuste.
- `CadastroNfeComplementarPage` (`cypress/support/pages/Venda/NFe/CadastroNfeComplementarPage.js`): métodos específicos para NFe Complementar.
- `ListagemNfePage` (`cypress/support/pages/Venda/ListagemNfePage.js`): abre a listagem e permite editar a primeira linha (`abrirEdicaoPrimeiraLinha`).
- `CadastroNfeLocators` (`cypress/support/locators/Venda/CadastroNfeLocators.js`): seletores de carta de correção incluindo botões, modais e campos de correção.
- `cy.login()` (custom command) garante autenticação antes de cada teste.
- Intercepts utilizados:
  - `POST **/nfe2/salvar*` (destinatário - aguardado antes de continuar, com lógica condicional).
  - `GET **/nfe2/**/itens*` (carregamento da tela de itens, com flag condicional).
  - `POST **/nfe2/**/itens/salvar` (inserção de item - com intercept condicional para evitar timeouts quando a requisição não é interceptada ou já foi feita antes do intercept ser configurado).
  - `POST **/nfe2/**/pagamentos/salvar` (modal de pagamento).

## Estrutura dos testes

### 1. `carta-correcao-nfe-normal.spec.js` - Carta de Correção NFe Normal
**Suite**: `Carta de Correção NFe Normal`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-normal`, `@carta-correcao`

1. **beforeEach**
   - `cy.login()` e `cy.visit('/')`.
   - `CadastroNfePage.desabilitarTourFinalidadeNormal()` para evitar tooltips.
   - `ListagemNfePage.visitar()` e `ListagemNfePage.clicarNovoCadastro()` para abrir o wizard.

2. **Testes**
   - `emite e gera carta de correção NFe normal avulsa`: Emite uma NFe normal avulsa seguindo o fluxo completo (natureza, destinatário, itens, pagamentos, emissão). Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e emite carta de correção.

### 2. `carta-correcao-nfe-devolucao.spec.js` - Carta de Correção NFe Devolução
**Suite**: `Carta de Correção NFe Devolução`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-devolucao`, `@carta-correcao`

1. **beforeEach**: mesmo setup do arquivo normal.
2. **Testes**:
   - `emite e gera carta de correção NFe devolucao avulsa`: Emite uma NFe de devolução avulsa seguindo o fluxo completo. Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e emite carta de correção.

### 3. `carta-correcao-nfe-ajuste.spec.js` - Carta de Correção NFe Ajuste
**Suite**: `Carta de Correção NFe Ajuste`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-ajuste`, `@carta-correcao`

1. **beforeEach**: mesmo setup do arquivo normal.
2. **Testes**:
   - `emite e gera carta de correção NFe ajuste avulsa`: Emite uma NFe de ajuste avulsa seguindo o fluxo completo (preenchimento de nota de ajuste, natureza, destinatário, itens, pagamentos, emissão). Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e emite carta de correção.

### 4. `carta-correcao-nfe-complementar.spec.js` - Carta de Correção NFe Complementar
**Suite**: `Carta de Correção NFe Complementar`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-complementar`, `@carta-correcao`

1. **beforeEach**: mesmo setup do arquivo normal.
2. **Testes**:
   - `emite e gera carta de correção NFe complementar avulsa`: Emite uma NFe complementar avulsa seguindo o fluxo completo (preenchimento de nota complementar, natureza, destinatário, itens zerados, pagamentos, emissão). Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e emite carta de correção.

## Tags e filtragem

Cada arquivo de teste possui tags específicas que permitem executar apenas os testes de carta de correção de um tipo de NFe:

- **`@carta-correcao`**: Testes de carta de correção (todos os tipos)
- **`@nfe-normal`**: Testes de carta de correção NFe Normal
- **`@nfe-devolucao`**: Testes de carta de correção NFe Devolução
- **`@nfe-ajuste`**: Testes de carta de correção NFe Ajuste
- **`@nfe-complementar`**: Testes de carta de correção NFe Complementar

Todas as suites também possuem as tags comuns: `@nfe`, `@vendas`, `@regressivo`.

### Exemplos de execução

```bash
# Executar apenas testes de carta de correção
npm run e2e -- --grep "@carta-correcao"

# Executar apenas testes de carta de correção NFe Normal
npm run e2e -- --grep "@carta-correcao.*@nfe-normal"

# Executar apenas testes de carta de correção NFe Devolução
npm run e2e -- --grep "@carta-correcao.*@nfe-devolucao"

# Executar todos os testes de carta de correção de NFe
npm run e2e -- --grep "@nfe.*@carta-correcao"
```

## Padrões e boas práticas
- **Reutilização de métodos de emissão**: os testes de carta de correção reutilizam os métodos existentes de emissão de NFe, garantindo consistência.
- **Fluxo completo**: cada teste realiza o fluxo completo de emissão antes de emitir a carta de correção, garantindo que a NFe esteja realmente emitida.
- **Aguardos defensivos**: uso de `cy.wait(2000)` após retornar à listagem e após abrir a edição para garantir que a página carregou completamente.
- **Métodos centralizados**: todos os métodos de carta de correção estão na classe base `CadastroNfeBasePage`, permitindo reutilização.
- **Texto de correção**: cada teste utiliza um texto de correção específico que identifica o tipo de NFe sendo corrigida.
- **Validação de sucesso**: validação do alerta de sucesso garante que a carta de correção foi emitida corretamente.

## Métodos de carta de correção

### Métodos na classe base (`CadastroNfeBasePage`)

1. **`clicarCartaCorrecaoNFe()`**: Clica no botão de carta de correção NFe (tenta primeiro botão direto, depois menu de ações).
2. **`preencherCorrecaoCartaCorrecao(correcao)`**: Preenche o campo de correção no modal de carta de correção.
3. **`confirmarCartaCorrecaoModal()`**: Confirma a carta de correção clicando no botão de confirmação do modal.
4. **`validarAlertaSucessoCartaCorrecao()`**: Valida o alerta de sucesso após a emissão da carta de correção.
5. **`validarBadgeCartaCorrecao()`**: Valida que há indicador de carta de correção emitida (se disponível).
6. **`emitirCartaCorrecaoNFe(correcao)`**: Método completo que executa todo o fluxo de carta de correção (chama os métodos acima em sequência).

## Locators de carta de correção

Os locators de carta de correção foram adicionados em `CadastroNfeLocators.cartaCorrecao`:

- `botaoCartaCorrecao`: Botão direto de carta de correção ou opção no menu de ações
- `dropdownAcoes`: Menu dropdown de ações
- `opcaoCartaCorrecao`: Opção "Carta de Correção" no menu dropdown
- `modalCartaCorrecao`: Locators do modal de carta de correção
  - `container`: Container do modal
  - `titulo`: Título do modal
  - `campoCorrecao`: Campo de texto para a correção
  - `botaoConfirmar`: Botão de confirmação
  - `botaoVoltar`: Botão de cancelar a ação
- `alertaSucesso`: Locators do alerta de sucesso
  - `container`: Container do alerta
  - `titulo`: Título do alerta
  - `mensagem`: Mensagem do alerta
- `badgeCartaCorrecao`: Badge ou indicador de carta de correção emitida

## Tipos de NFe cobertos

### Aba Normal
- ✅ **Avulsa**: Fluxo completo de emissão e carta de correção validado

### Aba Devolução
- ✅ **Avulsa**: Fluxo completo de emissão e carta de correção validado

### Aba Ajuste
- ✅ **Avulsa**: Fluxo completo de emissão e carta de correção validado

### Aba Complementar
- ✅ **Avulsa**: Fluxo completo de emissão e carta de correção validado

## Fluxo de carta de correção

1. **Emissão da NFe**: Realiza o fluxo completo de emissão (natureza, destinatário, itens, pagamentos, emissão).
2. **Confirmação de emissão**: Valida o modal de sucesso e escolhe "Voltar para a listagem".
3. **Aguardar carregamento**: Aguarda 2 segundos para garantir que a listagem carregou.
4. **Abrir edição**: Abre a edição da primeira linha da listagem (NFe recém-emitida).
5. **Aguardar carregamento**: Aguarda 2 segundos para garantir que a edição carregou.
6. **Emitir Carta de Correção**: Executa o método `emitirCartaCorrecaoNFe()` que:
   - Clica no botão de carta de correção (direto ou via menu de ações)
   - Preenche o texto de correção
   - Confirma a emissão da carta de correção
   - Valida o alerta de sucesso
   - Valida indicador de carta de correção (se disponível)

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.login()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas
- **ADR-0011:** Use Conditional Intercepts - Intercepts condicionais utilizados

### Documentação relacionada
- `docs/cases/architecture-cadastro-nfe.md` - Cadastro de NFe (Geral) (NFes cadastradas podem receber carta de correção)
- `docs/cases/architecture-cadastro-nfe-normal.md` - Cadastro de NFe Normal (NFes Normal podem receber carta de correção)
- `docs/cases/architecture-listagem-nfe.md` - Listagem de NFe (listagem permite emitir carta de correção)
- `docs/cases/architecture-cadastro-nfe-ajuste.md` - Cadastro de NFe Ajuste (NFes Ajuste podem receber carta de correção)
- `docs/cases/architecture-cadastro-nfe-complementar.md` - Cadastro de NFe Complementar (NFes Complementar podem receber carta de correção)
- `docs/cases/architecture-cadastro-nfe-devolucao.md` - Cadastro de NFe Devolução (NFes Devolução podem receber carta de correção)
- `docs/cases/architecture-cancelamento-nfe.md` - Cancelamento de NFe (NFes podem receber carta de correção antes ou depois do cancelamento)
- `docs/testes.md` - Inventário de testes

### Arquivos relacionados
- `cypress/e2e/venda-nfcenfe/carta-correcao-nfe-*.spec.js` - Specs de teste
- `cypress.config.js` - Configuração (specPattern)

---

## Sugestões futuras
1. Adicionar validação de status da NFe após carta de correção (verificar se aparece indicador na listagem).
2. Adicionar testes de carta de correção com diferentes textos de correção.
3. Adicionar validação de múltiplas cartas de correção para a mesma NFe.
4. Adicionar intercepts para monitorar requisições de carta de correção.
5. Adicionar validação de que a carta de correção foi registrada corretamente no sistema.
