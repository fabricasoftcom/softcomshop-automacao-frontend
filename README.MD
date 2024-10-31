
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

### 1. Clone este repositório na sua máquina em um diretório de fácil acesso. Ex: ```C:\Projetos```
---
Acesse o diretório que foi criado e execute o seguinte comando:

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
Qualquer dependência instalada deve ser instalada dentro do ambiente virtual. Além disso, o desenvolvedor deve validar se a dependência foi corretamente adicionada no arquivo `requirements.txt`, que deve estar presente no seu repositório.
