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

## 🎉 Pronto para Automatizar!
---
Agora que seu ambiente está configurado, você está pronto para executar e criar testes no Softcomshop. Caso tenha alguma dúvida ou precise de ajuda, consulte a documentação do Cypress ou entre em contato com a equipe.
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

## 🎯 Dicas para um Git Flow Eficiente

- Sempre inicie suas branches a partir da branch `develop`.
- Use **nomes descritivos** para as branches, facilitando o entendimento do propósito da tarefa.
- Após concluir a tarefa, faça **merge na branch `develop`** para manter o fluxo contínuo de desenvolvimento.

Seguindo esse padrão, garantimos um fluxo de trabalho eficiente, seguro e organizado 😉!

### 5. Estrutura do Projeto
---



### OBS: 
