# Descobertas: Incidentes - Importar NFe (por chave / múltiplas importações)

**Data:** 2026-04-20  
**Explorado por:** Evidência indireta (código existente + execução planejada)

---

## Cenários do incidente

- **Consulta por chave**: acessar `/compras/importarNFe` e consultar a chave `26260402870737000190550010009283401601726108` sem erro 500.
- **Múltiplas importações**: executar 2 importações/consultas sequenciais e garantir que a segunda operação não causa erro 500.

---

## Referências reutilizáveis no projeto

- **Importação por XML (Compra)**:\n  - Spec: `cypress/e2e/compras/cadastro-compra-xml.spec.js`\n  - Page facade: `cypress/support/pages/Compra/CompraPage.js`\n  - Observação: esses fluxos usam `cy.wait()` em vários pontos; **não copiar** para novos specs. Para o incidente de “múltiplas importações”, a intenção é reaproveitar o Page Object existente e validar ausência de erro 500 visual.\n+
---

## Locators a descobrir/confirmar na execução

Para `/compras/importarNFe`, confirmar na UI:\n- Input da chave (id/name)\n- Botão de consultar/importar\n- Toast/alerta de erro\n- Container de carregamento\n+
Enquanto não houver mapeamento definitivo via inspeção, o Page Object de incidente usará estratégia de locação por:\n- IDs contendo `chave`, `acesso`, `nfe`\n- Labels contendo “Chave”/“Chave de acesso” e busca do input mais próximo\n+
