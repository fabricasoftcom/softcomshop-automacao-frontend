# Arquitetura de Testes: Mapeamento de Menus Exclusivos do Petshop

## 1. Objetivo
Documentar os menus e funcionalidades exclusivas do segmento Petshop identificados durante a exploração autônoma do sistema, para orientar a implementação futura de testes automatizados.

## 2. Resumo Executivo

Durante a exploração do ambiente Petshop (`https://automacaopetshop.meusoftcom.com.br`), foram identificados **6 menus exclusivos** que não existem no módulo Padrão (Varejo):

- **1 menu principal** exclusivo
- **5 submenus exclusivos** dentro do menu "Serviços e NFS-e"

## 3. Menus Exclusivos Identificados

### 3.1 Menu Principal: Painel de Atendimento

**Características:**
- **Texto do Menu:** "Painel de Atendimento"
- **URL:** `/petshop/painel-de-atendimento`
- **Ícone:** `fa-columns`
- **ID no DOM:** Não possui ID específico
- **Seletor:** `a[href*="painel-de-atendimento"]`

**Funcionalidades:**
A página possui duas abas principais:
1. **Painel de Atendimentos** - Gerencia atendimentos com status:
   - Agendados
   - Em Espera
   - Em Atendimento
   - Concluído
2. **Vacinação** - Gerencia vacinações

**Estrutura da Página:**
- Filtro por data de atendimento
- Botões de ação (Buscar, Novo)
- Cards com contadores por status de atendimento
- Link para pesquisar animal: `/petshop/painel-de-atendimento/pesquisar-animal`

**Prioridade para Testes:** ALTA (funcionalidade core do Petshop)

---

### 3.2 Submenus em "Serviços e NFS-e" > "CADASTROS"

#### 3.2.1 Vacinas

**Características:**
- **Texto:** "Vacinas"
- **URL:** `/vacinas`
- **ID:** `vacinas`
- **Seletor:** `#vacinas`

**Descrição:** Cadastro de vacinas para animais. Permite gerenciar tipos de vacinas, doses, validade e histórico de vacinação.

**Prioridade para Testes:** ALTA

#### 3.2.2 Modelos de Prescrições

**Características:**
- **Texto:** "Modelos de Prescrições"
- **URL:** `/prescricao`
- **ID:** `modelos_de_prescrições`
- **Seletor:** `#modelos_de_prescrições`

**Descrição:** Cadastro de modelos de prescrições veterinárias reutilizáveis.

**Prioridade para Testes:** MÉDIA

#### 3.2.3 Tipos de Atendimento

**Características:**
- **Texto:** "Tipos de Atendimento"
- **URL:** `/tipo-atendimento`
- **ID:** `tipos_de_atendimento`
- **Seletor:** `#tipos_de_atendimento`

**Descrição:** Cadastro de tipos de atendimento (ex: Consulta, Cirurgia, Banho e Tosa, Vacinação, Exame).

**Prioridade para Testes:** ALTA (usado em múltiplos fluxos)

#### 3.2.4 Cadastro de Atestados e Termos

**Características:**
- **Texto:** "Cadastro de Atestados e Termos"
- **URL:** `/atestados-termos`
- **ID:** `cadastro_de_atestados_e_termos`
- **Seletor:** `#cadastro_de_atestados_e_termos`

**Descrição:** Cadastro de modelos de atestados e termos veterinários (ex: Atestado de Saúde, Termo de Responsabilidade).

**Prioridade para Testes:** MÉDIA

---

### 3.3 Submenu em "Serviços e NFS-e" > "LANÇAMENTOS"

#### 3.3.1 Gestão de Ordem de Serviço

**Características:**
- **Texto:** "Gestão de Ordem de Serviço"
- **URL:** `/ordem-servico/painel`
- **ID:** `gestão_de_ordem_de_serviço`
- **Seletor:** `#gestão_de_ordem_de_serviço`

**Descrição:** Painel de gestão completo de ordens de serviço veterinárias, permitindo criar, gerenciar e acompanhar o ciclo de vida dos atendimentos.

**Prioridade para Testes:** ALTA (funcionalidade core)

---

## 4. Comparação com Módulo Padrão

### 4.1 Menus Comuns

Os seguintes menus existem tanto no Padrão quanto no Petshop (podem ter comportamentos diferentes):

- Compras e Estoque (e submenus)
- Vendas e NF-e (e submenus)
- Financeiro (e submenus)
- Fiscal (e submenus)
- Configurações (e submenus)
- Relatórios
- Tá em ordem

### 4.2 Menus Exclusivos do Petshop

Todos os menus listados na seção 3 são **exclusivos** do Petshop e não existem no módulo Padrão.

---

## 5. Estrutura de Locators Necessária

### 5.1 Locators para Menu Lateral

**Arquivo:** `cypress/support/locators/Petshop/MenuLateralPetshopLocators.js`

```javascript
const MenuLateralPetshopLocators = {
    // Menu Principal Exclusivo
    menuPainelAtendimento: 'a[href*="painel-de-atendimento"]',
    
    // Submenus Exclusivos em Serviços e NFS-e
    menuVacinas: '#vacinas',
    menuModelosPrescricoes: '#modelos_de_prescrições',
    menuTiposAtendimento: '#tipos_de_atendimento',
    menuAtestadosTermos: '#cadastro_de_atestados_e_termos',
    menuGestaoOrdemServico: '#gestão_de_ordem_de_serviço'
};

export default MenuLateralPetshopLocators;
```

---

## 6. Page Objects Recomendados

### 6.1 Estrutura de Herança (ADR-0008)

Para módulos que compartilham funcionalidade com o padrão mas têm diferenças, usar herança:

```
cypress/support/pages/petshop/
├── PainelAtendimentoPage.js         # Novo (exclusivo)
├── VacinasPage.js                    # Novo (exclusivo)
├── TiposAtendimentoPage.js          # Novo (exclusivo)
├── GestaoOrdemServicoPage.js        # Novo (exclusivo)
└── [Outros conforme necessário]
```

### 6.2 Reutilização

Os seguintes Page Objects do módulo Padrão podem ser **reutilizados diretamente**:

- `LoginPage.js`
- `MenuPage.js` (para navegação base)
- Page Objects de módulos comuns (Financeiro, Fiscal, etc.)

---

## 7. Próximos Passos para Implementação

### 7.1 Fase 1: Infraestrutura (COMPLETO)
- [x] Configuração multi-tenant (`cypress.config.petshop.js`)
- [x] Estrutura de diretórios
- [x] Smoke test básico

### 7.2 Fase 2: Locators e Mapeamento (COMPLETO)
- [x] Mapeamento completo dos menus exclusivos
- [x] Documentação arquitetural
- [x] Arquivo `menuOptionsPetshop.json`

### 7.3 Fase 3: Implementação de Testes (PENDENTE)

**Prioridade Alta:**
1. Criar `MenuLateralPetshopLocators.js`
2. Criar `MenuLateralPetshopPage.js` (herdando de `MenuPage` base se necessário)
3. Implementar teste para "Painel de Atendimento"
4. Implementar teste para "Gestão de Ordem de Serviço"
5. Implementar teste para "Tipos de Atendimento"

**Prioridade Média:**
6. Implementar teste para "Vacinas"
7. Implementar teste para "Modelos de Prescrições"
8. Implementar teste para "Atestados e Termos"

### 7.4 Fase 4: Validação e Documentação (PENDENTE)
- Criar testes de validação para cada menu exclusivo
- Atualizar `docs/testes.md` com novos testes do Petshop
- Atualizar `docs/cases/README.md`

---

## 8. Notas Técnicas

### 8.1 Estrutura de IDs

Os IDs dos menus seguem o padrão `snake_case` (ex: `tipos_de_atendimento`, `cadastro_de_atestados_e_termos`).

### 8.2 URLs

As URLs exclusivas do Petshop começam com `/petshop/` ou são rotas específicas sem prefixo compartilhado (ex: `/vacinas`, `/prescricao`).

### 8.3 Dependências entre Menus

Alguns menus podem ter dependências:
- **Tipos de Atendimento** é usado no **Painel de Atendimento**
- **Modelos de Prescrições** pode ser usado em **Ordem de Serviço**
- **Vacinas** pode ter integração com **Painel de Atendimento**

Considerar essas dependências ao criar os testes.

---

## 9. Referências

- [Arquitetura Smoke Test Petshop](./architecture-petshop-smoke.md)
- [ADR-0008: Page Object Hierarchy](../adr/0008-use-page-object-hierarchy.md)
- [ADR-0007: Separate Specs](../adr/0007-separate-specs-by-functionality-and-type.md)
- [Mapeamento de Menus (JSON)](../../cypress/fixtures/menuOptionsPetshop.json)

---

**Última Atualização:** 08/01/2026  
**Versão:** 1.0

