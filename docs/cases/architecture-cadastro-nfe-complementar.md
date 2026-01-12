# Arquitetura dos casos de teste: Cadastro NFe Complementar

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de NFe Complementar**, que valida o processo completo de criação de Notas Fiscais Eletrônicas do tipo Complementar no sistema, incluindo o preenchimento de dados da nota complementar e o fluxo completo de emissão com itens zerados.

**Funcionalidades cobertas:**
- Cadastro de NFe Complementar tipo Avulsa
- Preenchimento de dados da nota complementar (número e chave via autocomplete)
- Preenchimento de natureza (CFOP) com tratamento de SweetAlert
- Validação de destinatário preenchido automaticamente
- Adição de itens com quantidade e valores zerados (específico para complementar)
- Fluxo completo de emissão de NFe Complementar

**Cenários principais:**
- Realizar fluxo completo da NFe complementar avulsa

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/venda-nfcenfe/cadastro-nfe-complementar.spec.js` - Teste de cadastro de NFe Complementar

### Page Objects
- `cypress/support/pages/Venda/ListagemNfePage.js` - Navegação e acesso à listagem de NFe
- `cypress/support/pages/Venda/CadastroNfePage.js` - Métodos gerais de cadastro de NFe
- `cypress/support/pages/Venda/NFe/CadastroNfeComplementarPage.js` - Métodos específicos para NFe Complementar

### Locators
- `cypress/support/locators/Venda/CadastroNfeLocators.js` - Seletores do cadastro de NFe

---

## Imports e dependências

### Page Objects
```javascript
import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeComplementarPage from '../../support/pages/Venda/NFe/CadastroNfeComplementarPage';
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

### Suite: Cadastro NFe Complementar

**Tags:** `['@nfe', '@vendas', '@regressivo', '@nfe-complementar']` (ADR-0010)

#### `it('realiza fluxo completo da NFe complementar avulsa')`

**Fluxo completo:**
1. **Acesso:**
   - Desabilita tour da finalidade Normal
   - Visita listagem de NFe
   - Clica em novo cadastro
   - Avança para cadastro Complementar Avulsa

2. **Validação Inicial:**
   - Valida formulário de NFe Complementar Avulsa

3. **Preenchimento de Dados da Nota Complementar:**
   - Preenche dados da nota complementar (número e chave via autocomplete)

4. **Preenchimento de Natureza:**
   - Preenche natureza (CFOP 5102) com tratamento de SweetAlert
   - Aguarda SweetAlert de CFOP se necessário

5. **Preenchimento de Destinatário:**
   - Preenche destinatário ('SOFTCOM TECNOLOGIA')
   - Valida que destinatário foi preenchido automaticamente
   - Aguarda após SweetAlert se necessário

6. **Itens (Específico para Complementar):**
   - Valida tela de seleção de itens
   - Adiciona item complementar (com quantidade e valores zerados)

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
- Validação de destinatário preenchido automaticamente após preencher nota complementar
- Uso de método específico `adicionarItemComplementar()` para itens com valores zerados
- Uso de opções no método `preencherDestinatario` para controlar validações e aguardos
- Fluxo completo desde o preenchimento da nota complementar até a emissão

### Observações
- NFe Complementar requer preenchimento de dados da nota complementar (número e chave) antes de continuar
- O destinatário é preenchido automaticamente após preencher a nota complementar
- SweetAlert pode aparecer ao preencher CFOP, necessitando tratamento específico
- **Característica única:** Itens devem ter quantidade e valores zerados (específico para NFe Complementar)
- O fluxo é similar ao de NFe Ajuste, mas com diferença crucial nos itens (valores zerados)

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0011](../adr/0011-use-conditional-intercepts.md): Conditional Intercepts

### Documentação Relacionada
- `docs/cases/architecture-cadastro-nfe.md` - Cadastro de NFe (Geral) (tipo específico de NFe)
- `docs/cases/architecture-listagem-nfe.md` - Listagem de NFe (NFes Complementar podem ser listadas)
- `docs/cases/architecture-cadastro-nfe-normal.md` - Cadastro de NFe Normal (outro tipo específico)
- `docs/cases/architecture-cadastro-nfe-ajuste.md` - Cadastro de NFe Ajuste (outro tipo específico)
- `docs/cases/architecture-cadastro-nfe-devolucao.md` - Cadastro de NFe Devolução (outro tipo específico)
- `docs/cases/architecture-cancelamento-nfe.md` - Cancelamento de NFe (NFes Complementar podem ser canceladas)
- `docs/cases/architecture-carta-correcao-nfe.md` - Carta de Correção NFe (NFes Complementar podem receber carta de correção)

---

**Última atualização:** 2024-12-19

