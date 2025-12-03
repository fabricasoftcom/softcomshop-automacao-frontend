# Arquitetura dos casos de teste: Cadastro NFe Ajuste

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de NFe Ajuste**, que valida o processo completo de criação de Notas Fiscais Eletrônicas do tipo Ajuste no sistema, incluindo o preenchimento de dados da nota de ajuste e o fluxo completo de emissão.

**Funcionalidades cobertas:**
- Cadastro de NFe Ajuste tipo Avulsa
- Preenchimento de dados da nota de ajuste (número e chave via autocomplete)
- Preenchimento de natureza (CFOP) com tratamento de SweetAlert
- Validação de destinatário preenchido automaticamente
- Fluxo completo de emissão de NFe Ajuste

**Cenários principais:**
- Realizar fluxo completo da NFe de ajuste avulsa

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/venda-nfcenfe/cadastro-nfe-ajuste.spec.js` - Teste de cadastro de NFe Ajuste

### Page Objects
- `cypress/support/pages/Venda/ListagemNfePage.js` - Navegação e acesso à listagem de NFe
- `cypress/support/pages/Venda/CadastroNfePage.js` - Métodos gerais de cadastro de NFe
- `cypress/support/pages/Venda/NFe/CadastroNfeAjustePage.js` - Métodos específicos para NFe Ajuste

### Locators
- `cypress/support/locators/Venda/CadastroNfeLocators.js` - Seletores do cadastro de NFe

---

## Imports e dependências

### Page Objects
```javascript
import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeAjustePage from '../../support/pages/Venda/NFe/CadastroNfeAjustePage';
```

### Locators
Os locators são importados internamente nos Page Objects:
```javascript
import CadastroNfeLocators from "../../locators/Venda/CadastroNfeLocators";
```

### Commands
- `cy.login()` - Login com usuário fiscal (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial

### Intercepts (Conditional - ADR-0011)
- `POST **/nfe2/salvar*` - Salvamento de destinatário (aguardado antes de continuar, com lógica condicional)
- `GET **/nfe2/**/itens*` - Carregamento da tela de itens (com flag condicional)
- `POST **/nfe2/**/itens/salvar` - Inserção de item (com intercept condicional)
- `POST **/nfe2/**/pagamentos/salvar` - Modal de pagamento

---

## Estrutura do teste

### Suite: Cadastro NFe Ajuste

**Tags:** `['@nfe', '@vendas', '@regressivo', '@nfe-ajuste']` (ADR-0010)

#### `it('realiza fluxo completo da NFe de ajuste avulsa')`

**Fluxo completo:**
1. **Acesso:**
   - Desabilita tour da finalidade Normal
   - Visita listagem de NFe
   - Clica em novo cadastro
   - Avança para cadastro Ajuste Avulsa

2. **Validação Inicial:**
   - Valida formulário de NFe Ajuste Avulsa

3. **Preenchimento de Dados da Nota de Ajuste:**
   - Preenche dados da nota de ajuste (número e chave via autocomplete)

4. **Preenchimento de Natureza:**
   - Preenche natureza (CFOP 5102) com tratamento de SweetAlert
   - Aguarda SweetAlert de CFOP se necessário

5. **Preenchimento de Destinatário:**
   - Preenche destinatário ('SOFTCOM TECNOLOGIA')
   - Valida que destinatário foi preenchido automaticamente
   - Aguarda após SweetAlert se necessário

6. **Itens:**
   - Valida tela de seleção de itens
   - Adiciona item (quantidade 1)

7. **Pagamentos:**
   - Valida tela de pagamentos
   - Adiciona pagamento básico

8. **Emissão:**
   - Clica em continuar no rodapé
   - Valida tela de emitir nota
   - Emite a nota
   - Valida modal de sucesso (retorno para listagem)

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002)
- ✅ **Separate Locators** (ADR-0003)
- ✅ **Session Persistence** (ADR-0004) - Usa `cy.login()` para funcionalidade fiscal
- ✅ **Tags for Filtering** (ADR-0010)
- ✅ **Conditional Intercepts** (ADR-0011) - Intercepts condicionais para evitar timeouts

### Boas Práticas
- Tratamento específico de SweetAlert ao preencher CFOP
- Validação de destinatário preenchido automaticamente após preencher nota de ajuste
- Uso de opções no método `preencherDestinatario` para controlar validações e aguardos
- Fluxo completo desde o preenchimento da nota de ajuste até a emissão

### Observações
- NFe Ajuste requer preenchimento de dados da nota de ajuste (número e chave) antes de continuar
- O destinatário é preenchido automaticamente após preencher a nota de ajuste
- SweetAlert pode aparecer ao preencher CFOP, necessitando tratamento específico
- O fluxo é similar ao de outras NFe, mas com etapa adicional de preenchimento da nota de ajuste

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0011](../adr/0011-use-conditional-intercepts.md): Conditional Intercepts

### Documentação Relacionada
- `architecture-cadastro-nfe.md` - Documentação geral de cadastro de NFe
- `architecture-cadastro-nfe-normal.md` - Documentação de NFe Normal
- `architecture-cadastro-nfe-devolucao.md` - Documentação de NFe Devolução
- `architecture-cancelamento-nfe.md` - Documentação de cancelamento de NFe
- `architecture-carta-correcao-nfe.md` - Documentação de carta de correção de NFe

---

**Última atualização:** 2024-12-19

