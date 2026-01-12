# Arquitetura dos casos de teste: Cancelamento NFe

## Objetivo
- Exercitar o fluxo completo de emissão e cancelamento de todas as finalidades de NFe no módulo de vendas.
- **Aba Normal**: cobrir tipo Avulsa.
- **Aba Devolução**: cobrir tipo Avulsa.
- **Aba Ajuste**: cobrir tipo Avulsa.
- **Aba Complementar**: cobrir tipo Avulsa.
- Garantir que após a emissão bem-sucedida, a NFe possa ser cancelada corretamente.
- Validar o preenchimento do motivo de cancelamento e a confirmação do cancelamento.

## Estrutura de arquivos

### Arquivos de teste (specs)
Os testes foram separados por tipo de NFe para melhor organização e manutenção:

```
cypress/e2e/venda-nfcenfe/
├── cancelamento-nfe-normal.spec.js           # Testes de cancelamento NFe Normal
├── cancelamento-nfe-devolucao.spec.js        # Testes de cancelamento NFe Devolução
├── cancelamento-nfe-ajuste.spec.js           # Testes de cancelamento NFe Ajuste
└── cancelamento-nfe-complementar.spec.js     # Testes de cancelamento NFe Complementar
```

### Page Objects
Os métodos de cancelamento foram adicionados à classe base `CadastroNfeBasePage`, permitindo reutilização em todos os tipos de NFe:

```
cypress/support/pages/Venda/NFe/
├── CadastroNfeBasePage.js                    # Métodos comuns incluindo cancelamento
└── ...
```

## Importações e dependências
- `CadastroNfeBasePage` (`cypress/support/pages/Venda/NFe/CadastroNfeBasePage.js`): classe base com métodos comuns incluindo cancelamento (`cancelarNFe`, `clicarCancelarNFe`, `preencherMotivoCancelamento`, `confirmarCancelamento`, `validarModalSucessoCancelamento`).
- `CadastroNfeNormalPage` (`cypress/support/pages/Venda/NFe/Normal/index.js`): facade que agrupa todas as classes específicas de normal.
- `CadastroNfeDevolucaoPage` (`cypress/support/pages/Venda/NFe/Devolucao/index.js`): facade que agrupa todas as classes específicas de devolução.
- `CadastroNfeAjustePage` (`cypress/support/pages/Venda/NFe/CadastroNfeAjustePage.js`): métodos específicos para NFe Ajuste.
- `CadastroNfeComplementarPage` (`cypress/support/pages/Venda/NFe/CadastroNfeComplementarPage.js`): métodos específicos para NFe Complementar.
- `ListagemNfePage` (`cypress/support/pages/Venda/ListagemNfePage.js`): abre a listagem e permite editar a primeira linha (`abrirEdicaoPrimeiraLinha`).
- `CadastroNfeLocators` (`cypress/support/locators/Venda/CadastroNfeLocators.js`): seletores de cancelamento incluindo botões, modais e campos de motivo.
- `cy.login()` (custom command) garante autenticação antes de cada teste.
- Intercepts utilizados:
  - `POST **/nfe2/salvar*` (destinatário - aguardado antes de continuar, com lógica condicional).
  - `GET **/nfe2/**/itens*` (carregamento da tela de itens, com flag condicional).
  - `POST **/nfe2/**/itens/salvar` (inserção de item - com intercept condicional para evitar timeouts quando a requisição não é interceptada ou já foi feita antes do intercept ser configurado).
  - `POST **/nfe2/**/pagamentos/salvar` (modal de pagamento).

## Estrutura dos testes

### 1. `cancelamento-nfe-normal.spec.js` - Cancelamento NFe Normal
**Suite**: `Cancelamento NFe Normal`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-normal`, `@cancelamento`

1. **beforeEach**
   - `cy.login()` e `cy.visit('/')`.
   - `CadastroNfePage.desabilitarTourFinalidadeNormal()` para evitar tooltips.
   - `ListagemNfePage.visitar()` e `ListagemNfePage.clicarNovoCadastro()` para abrir o wizard.

2. **Testes**
   - `emite e cancela NFe normal avulsa`: Emite uma NFe normal avulsa seguindo o fluxo completo (natureza, destinatário, itens, pagamentos, emissão). Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e cancela a NFe.

### 2. `cancelamento-nfe-devolucao.spec.js` - Cancelamento NFe Devolução
**Suite**: `Cancelamento NFe Devolução`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-devolucao`, `@cancelamento`

1. **beforeEach**: mesmo setup do arquivo normal.
2. **Testes**:
   - `emite e cancela NFe devolucao avulsa`: Emite uma NFe de devolução avulsa seguindo o fluxo completo. Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e cancela a NFe.

### 3. `cancelamento-nfe-ajuste.spec.js` - Cancelamento NFe Ajuste
**Suite**: `Cancelamento NFe Ajuste`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-ajuste`, `@cancelamento`

1. **beforeEach**: mesmo setup do arquivo normal.
2. **Testes**:
   - `emite e cancela NFe ajuste avulsa`: Emite uma NFe de ajuste avulsa seguindo o fluxo completo (preenchimento de nota de ajuste, natureza, destinatário, itens, pagamentos, emissão). Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e cancela a NFe.

### 4. `cancelamento-nfe-complementar.spec.js` - Cancelamento NFe Complementar
**Suite**: `Cancelamento NFe Complementar`  
**Tags**: `@nfe`, `@vendas`, `@regressivo`, `@nfe-complementar`, `@cancelamento`

1. **beforeEach**: mesmo setup do arquivo normal.
2. **Testes**:
   - `emite e cancela NFe complementar avulsa`: Emite uma NFe complementar avulsa seguindo o fluxo completo (preenchimento de nota complementar, natureza, destinatário, itens zerados, pagamentos, emissão). Após confirmação de emissão, retorna à listagem, abre a edição da primeira linha e cancela a NFe.

## Tags e filtragem

Cada arquivo de teste possui tags específicas que permitem executar apenas os testes de cancelamento de um tipo de NFe:

- **`@cancelamento`**: Testes de cancelamento (todos os tipos)
- **`@nfe-normal`**: Testes de cancelamento NFe Normal
- **`@nfe-devolucao`**: Testes de cancelamento NFe Devolução
- **`@nfe-ajuste`**: Testes de cancelamento NFe Ajuste
- **`@nfe-complementar`**: Testes de cancelamento NFe Complementar

Todas as suites também possuem as tags comuns: `@nfe`, `@vendas`, `@regressivo`.

### Exemplos de execução

```bash
# Executar apenas testes de cancelamento
npm run e2e -- --grep "@cancelamento"

# Executar apenas testes de cancelamento NFe Normal
npm run e2e -- --grep "@cancelamento.*@nfe-normal"

# Executar apenas testes de cancelamento NFe Devolução
npm run e2e -- --grep "@cancelamento.*@nfe-devolucao"

# Executar todos os testes de cancelamento de NFe
npm run e2e -- --grep "@nfe.*@cancelamento"
```

## Padrões e boas práticas
- **Reutilização de métodos de emissão**: os testes de cancelamento reutilizam os métodos existentes de emissão de NFe, garantindo consistência.
- **Fluxo completo**: cada teste realiza o fluxo completo de emissão antes de cancelar, garantindo que a NFe esteja realmente emitida.
- **Aguardos defensivos**: uso de `cy.wait(2000)` após retornar à listagem e após abrir a edição para garantir que a página carregou completamente.
- **Métodos centralizados**: todos os métodos de cancelamento estão na classe base `CadastroNfeBasePage`, permitindo reutilização.
- **Motivo de cancelamento**: cada teste utiliza um motivo específico que identifica o tipo de NFe sendo cancelada.
- **Validação de sucesso**: validação do modal de sucesso de cancelamento garante que a operação foi concluída corretamente.

## Métodos de cancelamento

### Métodos na classe base (`CadastroNfeBasePage`)

1. **`abrirMenuAcoes()`**: Abre o menu de ações (dropdown) na tela de edição da NFe.
2. **`clicarCancelarNFe()`**: Clica no botão de cancelar NFe (tenta primeiro botão direto, depois menu de ações).
3. **`preencherMotivoCancelamento(motivo)`**: Preenche o campo de motivo de cancelamento no modal.
4. **`confirmarCancelamento()`**: Confirma o cancelamento clicando no botão de confirmação do modal.
5. **`validarModalSucessoCancelamento()`**: Valida o modal de sucesso após o cancelamento e fecha o modal.
6. **`cancelarNFe(motivo)`**: Método completo que executa todo o fluxo de cancelamento (chama os métodos acima em sequência).

## Locators de cancelamento

Os locators de cancelamento foram adicionados em `CadastroNfeLocators.cancelamento`:

- `botaoCancelar`: Botão direto de cancelar ou opção no menu de ações
- `dropdownAcoes`: Menu dropdown de ações
- `opcaoCancelar`: Opção "Cancelar" no menu dropdown
- `modalCancelamento`: Locators do modal de confirmação de cancelamento
  - `container`: Container do modal
  - `titulo`: Título do modal
  - `campoMotivo`: Campo de texto para o motivo do cancelamento
  - `botaoConfirmar`: Botão de confirmação
  - `botaoCancelar`: Botão de cancelar a ação
- `modalSucessoCancelamento`: Locators do modal de sucesso
  - `container`: Container do modal
  - `titulo`: Título do modal
  - `descricao`: Descrição do modal
  - `botaoConfirmar`: Botão de confirmação

## Tipos de NFe cobertos

### Aba Normal
- ✅ **Avulsa**: Fluxo completo de emissão e cancelamento validado

### Aba Devolução
- ✅ **Avulsa**: Fluxo completo de emissão e cancelamento validado

### Aba Ajuste
- ✅ **Avulsa**: Fluxo completo de emissão e cancelamento validado

### Aba Complementar
- ✅ **Avulsa**: Fluxo completo de emissão e cancelamento validado

## Fluxo de cancelamento

1. **Emissão da NFe**: Realiza o fluxo completo de emissão (natureza, destinatário, itens, pagamentos, emissão).
2. **Confirmação de emissão**: Valida o modal de sucesso e escolhe "Voltar para a listagem".
3. **Aguardar carregamento**: Aguarda 2 segundos para garantir que a listagem carregou.
4. **Abrir edição**: Abre a edição da primeira linha da listagem (NFe recém-emitida).
5. **Aguardar carregamento**: Aguarda 2 segundos para garantir que a edição carregou.
6. **Cancelar NFe**: Executa o método `cancelarNFe()` que:
   - Clica no botão de cancelar (direto ou via menu de ações)
   - Preenche o motivo de cancelamento
   - Confirma o cancelamento
   - Valida o modal de sucesso

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.login()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas
- **ADR-0011:** Use Conditional Intercepts - Intercepts condicionais utilizados

### Documentação relacionada
- `docs/cases/architecture-cadastro-nfe.md` - Cadastro de NFe (Geral) (NFes cadastradas podem ser canceladas)
- `docs/cases/architecture-cadastro-nfe-normal.md` - Cadastro de NFe Normal (NFes Normal podem ser canceladas)
- `docs/cases/architecture-listagem-nfe.md` - Listagem de NFe (listagem permite cancelar NFes)
- `docs/cases/architecture-cadastro-nfe-ajuste.md` - Cadastro de NFe Ajuste (NFes Ajuste podem ser canceladas)
- `docs/cases/architecture-cadastro-nfe-complementar.md` - Cadastro de NFe Complementar (NFes Complementar podem ser canceladas)
- `docs/cases/architecture-cadastro-nfe-devolucao.md` - Cadastro de NFe Devolução (NFes Devolução podem ser canceladas)
- `docs/cases/architecture-carta-correcao-nfe.md` - Carta de Correção NFe (NFes podem receber carta de correção antes ou depois do cancelamento)
- `docs/testes.md` - Inventário de testes

### Arquivos relacionados
- `cypress/e2e/venda-nfcenfe/cancelamento-nfe-*.spec.js` - Specs de teste
- `cypress.config.js` - Configuração (specPattern)

---

## Sugestões futuras
1. Adicionar validação de status da NFe após cancelamento (verificar se aparece como cancelada na listagem).
2. Adicionar testes de cancelamento com diferentes motivos.
3. Adicionar validação de que a NFe cancelada não pode ser editada ou reemitida.
4. Adicionar testes de cancelamento de NFe já cancelada (deve falhar).
5. Adicionar intercepts para monitorar requisições de cancelamento.

