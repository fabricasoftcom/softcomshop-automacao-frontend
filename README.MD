# 🚀 Automação de Testes Frontend do Softcomshop

Este guia descreve como executar e escrever testes para o Frontend do Softcomshop, utilizando ferramentas modernas para garantir qualidade e eficiência.

---

## 🛠 Pré-requisitos

Para configurar o ambiente de testes, você precisará dos seguintes componentes:

- **Node.js** (recomendamos a versão LTS): [Link para download](https://nodejs.org/pt/download/prebuilt-installer)
- **NPM**: Geralmente já é instalado com o Node.js. Para confirmar, execute:
  ```bash
  npm --version
  ```

---

## 📋 Passo a Passo de Configuração

### 1. 🌐 Clonando o Repositório

Escolha um diretório de fácil acesso no seu disco (ex: `C:\Projetos`) e clone o repositório executando:

  ```bash
  git clone https://github.com/fabricasoftcom/softcomshop-automacao-frontend.git
  ```

---

### 2. 📦 Instalando Dependências

No terminal, navegue até o diretório do projeto e execute o comando abaixo para instalar as dependências:

  ```bash
  npm install
  ```

---

### 3. ✅ Validando a Instalação do Cypress

Para confirmar a instalação do Cypress, execute:

  ```bash
  npx cypress open
  ```

Isso abrirá uma janela do Cypress onde você poderá visualizar e executar todos os testes armazenados no diretório `cypress/e2e`.

---

### 4. 🏃 Executando os Testes

Para executar todos os testes de uma vez, basta rodar o comando:

  ```bash
  npx cypress run
  ```

---

### 🎉 Pronto para Automatizar!

Agora que seu ambiente está configurado, você está pronto para executar e criar testes no Softcomshop. Caso tenha alguma dúvida ou precise de ajuda, consulte a documentação do Cypress ou entre em contato com a equipe.

---
## 📁 Estrutura do Projeto

### **cypress/e2e**
   - **Descrição**: Esta pasta contém os testes de ponta a ponta, onde cada arquivo representa um cenário ou conjunto de cenários que validam funcionalidades específicas da aplicação.
   - **Exemplo de Estrutura**:
     - `login.spec.js`: Cenários de teste para login.
     - `cadastro.spec.js`: Cenários de teste para cadastro de usuários.
   
### **cypress/support/pages**
   - **Descrição**: Esta pasta organiza as classes que representam cada página da aplicação, centralizando as interações com elementos da interface. Aqui, aplicamos o padrão Page Objects, encapsulando as ações de cada página para que os testes no Cypress chamem esses métodos em vez de comandos repetidos.
   - **Função**: Facilita a reutilização de interações comuns e separa a lógica dos testes das ações específicas da interface.
   - **Exemplo de Estrutura**:
     - `LoginPage.js`: Métodos de login como `preencherUsuario()`, `preencherSenha()` e `clicarLogin()`.
     - `CadastroPage.js`: Métodos para preenchimento e submissão do formulário de cadastro.

### **cypress/support/locators**
   - **Descrição**: Local de mapeamento dos elementos de cada página. Para cada página da aplicação, criamos uma classe que define e exporta os seletors dos elementos de forma centralizada, facilitando o gerenciamento de mudanças na interface.
   - **Função**: Permite uma modificação centralizada dos locators quando necessário, sem impacto direto nas classes de página ou testes.
   - **Exemplo de Estrutura**:
     - `LoginLocators.js`: Exporta seletors como `usuarioInput`, `senhaInput`, e `botaoLogin`.
     - `CadastroLocators.js`: Exporta seletors para os campos do formulário de cadastro.

### **cypress/support/factory**
   - **Descrição**: Responsável pela geração e manipulação de dados de teste para os cenários de automação. Este diretório armazena as fábricas de dados, facilitando a criação de dados dinâmicos, como usuários, produtos, e outras entidades necessárias para a execução dos testes.
   - **Função**: Permite a configuração e geração de dados personalizados para diferentes cenários de teste, aumentando a flexibilidade e robustez dos testes.
   - **Exemplo de Estrutura**:
     - `UserFactory.js`: Gera dados de usuários com atributos aleatórios para testes de cadastro.
     - `ProductFactory.js`: Cria dados de produtos com propriedades variáveis para testes de fluxo de compras.

---

## 📘 Guia de GitFlow para Nomenclatura de Branches
Este projeto utiliza uma convenção de nomenclatura de branches para manter o repositório organizado e facilitar o entendimento do propósito de cada branch. Seguindo essas diretrizes, você contribuirá para um desenvolvimento mais organizado e acessível para toda a equipe.

🔄 Estrutura de Branches
---
### 1. Branches Principais:

- **`main`**  
  - É a branch principal e contém a versão estável do projeto.
  - Esta branch deve refletir o código em produção.
  - **Merges**: Somente `feature`, `chore`, `bugfix`, e `release`.

- **`develop`**  
  - É a branch de desenvolvimento onde todas as novas implementações e correções são integradas.
  - **Merges**: Recebe branches de `feature`, `chore` e `bugfix`.

---

### 2. Branches de Trabalho

Para diferenciar as áreas de trabalho, utilizamos as seguintes convenções:

#### 🧩 Configuração e Tarefas Convencionais (`chore/`)
   - Usadas para tarefas de configuração e manutenção geral, como ajustes em configurações, documentação, CI/CD, dependências e outras atividades que não alteram funcionalidades do sistema.
   - Prefixo: `chore/`
   - **Exemplo**: `chore/atualizar-ci-pipeline` ou `chore/configurar-eslint`

#### ⚙️ Implementação de Testes (`feature/`)
   - Utilizadas para desenvolver novas implementações de testes, seja para novas funcionalidades ou cobertura de testes existente.
   - Prefixo: `feature/`
   - **Exemplo**: `feature/teste-login` ou `feature/teste-validacao-pagamento`

#### 🐛 Correção de Bug na Automação (`bugfix/`)
   - Criadas para corrigir bugs encontrados nos scripts de automação.
   - Prefixo: `bugfix/`
   - **Exemplo**: `bugfix/corrigir-teste-login` ou `bugfix/ajuste-flaky-test`

#### ♻ Refatoração na Automação (`refactor/`)
   - Criadas para refatorar funcionalidades/scripts de automação.
   - Prefixo: `refactor/`
   - **Exemplo**: `refactor/implementar-reutilizacao-funcoes-genericas`

---

## 📌 Exemplo Prático de Uso

```bash
# Criando uma nova branch para uma tarefa de configuração
git checkout develop
git checkout -b chore/ajustar-config-ci

# Criando uma nova branch para implementação de um teste de funcionalidade
git checkout develop
git checkout -b feature/teste-funcionalidade-pagamento

# Criando uma branch de correção de bug na automação
git checkout develop
git checkout -b bugfix/ajustar-teste-autenticacao
```

---

## 🎯 Dicas para um GitFlow Eficiente

- Sempre inicie suas branches a partir da branch `develop`.
- Use **nomes descritivos** para as branches, facilitando o entendimento do propósito da tarefa.
- Após concluir a tarefa, faça **abertura de PR para a branch `develop`** para manter o fluxo contínuo de desenvolvimento.

Seguindo esse padrão, garantimos um fluxo de trabalho eficiente, seguro e organizado 😉!
---
## 🚀 Qualidade de Código com ESLint + Husky

Este repositório utiliza **ESLint** integrado com **Husky** para garantir que todo o código commitado siga as boas práticas de desenvolvimento. 🔍✨

### 🔒 Como funciona?
Sempre que você tentar fazer um `git commit`, o Husky irá executar o ESLint automaticamente:
1. O Husky inicia o processo de verificação.
2. O ESLint analisa os arquivos `.js` modificados.
3. Se houver **erros**, o commit será bloqueado e os problemas serão exibidos no terminal. ❌
4. Você precisará corrigir os erros antes de tentar novamente. 🛠️
5. Se não houver erros, o commit será realizado com sucesso! ✅🎉

### 💡 O que fazer se o commit for bloqueado?
Se o commit não for permitido, revise os erros exibidos e corrija-os antes de tentar novamente. Você pode rodar o ESLint manualmente com:
  ```bash
  npm run lint-html
  ```
Ou, para output dos erros direto no terminal:
  ```bash
  npm run lint
  ```
Isso verificará todos os arquivos `.js` no projeto.

### 🛠️ Como instalar as dependências?
Caso você ainda não tenha as dependências instaladas, basta rodar:
  ```bash
  npm install
  ```
Isso garantirá que o ESLint e o Husky estejam funcionando corretamente.

---

## 🏷️ Uso de Tags nos Testes

Este projeto utiliza **tags** para organizar e executar cenários de teste específicos. 🔖✨

### 📌 Como adicionar tags nos testes?
As tags são definidas diretamente no `describe` do Cypress, conforme o exemplo:
  ```javascript
  describe('Balanco', { tags: ["@balanco", "@regressivo"] }, () => {
    it('Deve validar o saldo', () => {
      // Teste aqui
    });
  });
  ```
Isso permite que os testes sejam filtrados na execução. 🔎

### 🚀 Como executar testes filtrando por tags?
Você pode rodar testes específicos utilizando a flag `--env grep="@tag"`, por exemplo:
  ```bash
  npx cypress run --env grep="@balanco"
  ```
Isso executará apenas os cenários que possuem a tag `@balanco`.

Se quiser rodar múltiplas tags, use `--env grepTags="all"` para combinar múltiplas tags:
  ```bash
  npx cypress run --env grep="@balanco" --env grepTags="all"
  ```

---
### Comandos de Login

O projeto utiliza diferentes comandos de login dependendo do tipo de funcionalidade:

- **Funcionalidades Fiscais** (NFe, NFCe, SPED, Sintegra): Use `cy.login()`
- **Funcionalidades Gerais** (Vendas, Compras, Financeiro, etc.): Use `cy.loginArmazenandoSessao()`
- **Testes Iterativos** (loops): Use `cy.loginRestoreSession()`

Para detalhes completos, consulte:
- [Guia de Decisões Rápidas](docs/referencias/guia-decisoes-rapidas.md) - Seção "Qual comando de login usar?"
- [Referência de Comandos Customizados](docs/referencias/referencia-comandos-customizados.md) - Seção "Comandos de Autenticação"
- [ADR-0004](docs/adr/0004-use-cy-session-for-login-persistence.md) - Session Persistence

---

## 🐾 Execução de Testes por Segmento

O projeto suporta execução isolada de testes por segmento (petshop, e-commerce, etc.) através de configurações específicas.

### Executando Testes do Petshop

**Modo Interativo (Cypress UI):**
```bash
npm run cypress:open:petshop
```

**Modo Headless (CI/CD):**
```bash
# Execução básica
npm run test:petshop

# Execução com Allure
npm run test:petshop:allure
```

**Comando direto:**
```bash
npx cypress open --config-file cypress.config.petshop.js
npx cypress run --config-file cypress.config.petshop.js
```

### Criando Nova Configuração de Segmento

Para criar uma nova configuração de segmento, consulte:
- [Guia de Configurações Multi-Segmento](docs/referencias/guia-configuracoes-multi-segmento.md) - Documentação completa com template e exemplos

---

## 📚 Documentação Oficial
Para mais detalhes, consulte a documentação oficial das ferramentas utilizadas:
- [ESLint](https://eslint.org/docs/latest/user-guide/) 🛠️
- [Husky](https://typicode.github.io/husky/#/) 🔗
- [Cypress Grep Plugin (Tags)](https://github.com/cypress-io/cypress-grep) 📌

Com isso, garantimos que todo o código do projeto segue um padrão de qualidade e que os testes podem ser organizados e executados de forma eficiente! 🚀🔥

