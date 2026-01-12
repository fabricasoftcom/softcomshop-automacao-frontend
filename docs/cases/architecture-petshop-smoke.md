# Arquitetura de Testes: Smoke Test Petshop (Multi-Tenant)

## 1. Objetivo
Validar a configuração de infraestrutura multi-tenant do segmento Petshop, garantindo que a execução seja isolada do ambiente Padrão e que a reutilização de Page Objects funcione corretamente.

## 2. Estrutura e Dependências

### Localização
- **Spec:** `cypress/e2e/petshop/smoke-petshop.spec.js`
- **Config:** `cypress.config.petshop.js`
- **Page Objects:** `cypress/support/pages/petshop/` (Futuro) e `cypress/support/pages/Login/LoginPage.js` (Reutilizado)

### Dependências
- **Configuração Multi-Tenant:** Utiliza `cypress.config.petshop.js` para definir `baseUrl` e `specPattern`.
- **Tags:** Utiliza a tag `@petshop` para categorização e execução seletiva.

## 3. Fluxo do Teste
1. **Configuração:** O teste é iniciado via script `npm run test:petshop`, que carrega a URL do ambiente Petshop.
2. **Navegação:** O teste invoca `LoginPage.visit()` (reutilizado do core).
3. **Validação:** Verifica se a aplicação carregou corretamente na URL esperada.

## 4. Padrões Aplicados
- **Isolamento de Ambiente:** Uso de arquivo de configuração dedicado.
- **Herança/Reutilização:** Importação direta de Page Objects do módulo Padrão.
- **Tagging:** Adoção de tags conforme ADR-0010.

## 5. Próximos Passos
- Implementar Page Objects específicos em `cypress/support/pages/petshop/` herdando das classes base quando houver divergência de regras de negócio.
- Expandir a cobertura para fluxos críticos (Agendamento, Banho e Tosa).

