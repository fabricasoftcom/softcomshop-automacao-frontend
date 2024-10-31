
# Automação de Testes Frontend do Softcomshop

Este guia descreve como executar e escrever testes para o Frontend do Softcomshop

## Pré-requisitos
---
- **Node** (recomendado uso da versão LTS) [Link para download](https://nodejs.org/pt/download/prebuilt-installer)
- **NPM** Normalmente, já é instalado junto ao Node. Para confirmação, basta executar o comando:

  ```bash
  npm --version
  ```
---
## Passo a Passo

### 1. Clonando o repositorio
---
Acesse um diretório de fácil acesso no seu disco (Ex: ```C:\Projetos```) e clone o repositório executando o seguinte comando:

  ```bash
  git clone https://github.com/fabricasoftcom/softcomshop-automacao-frontend.git
  ```

### 2. Instale as dependências do projeto
---
Execute o seguinte comando no terminal, estando na raíz do diretório criado após realizar o clone do repositório:

  ```bash
  npm install
  ```

### 3. Validando instalação do Cypress
---
Para validar a instalação do Cypress, basta executar o seguinte comando no terminal após instalação das dependências do projeto:

  ```bash
  npx cypress open
  ```

Deve ser aberto um browser onde serão exibidos todos os testes que foram criados no diretório ```cypress\e2e```

### 4. Executando os testes
---
Para executar todos os testes, basta executar o seguinte comando no terminal:

  ```bash
  npx cypress run
  ```

### 5. Estrutura do Projeto
---



### OBS: 
