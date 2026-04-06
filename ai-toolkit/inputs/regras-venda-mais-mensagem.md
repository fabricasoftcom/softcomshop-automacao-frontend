# Regras de Negócio: Exemplo de Validação

## Funcionalidade
Cadsatro de mensagens do menu venda mais, estilo crud, assim como funcionalidades da listagem de criar, pesquisar e excluir selecionados, e edição de mensagens

## Modulo
Configuração > venda mais

## Regras
1. Ao criar uma nova mensagem deverá preencher todos os campos incluindo o anexo de arquivos e informações de tags
2. Mensagem criada deverá ser uma mensagem expirada em um cenario real como mensagem com promoções com prazos e validades e indicações de retorno
3. Não permite salvar sem preencher obrigatórios
4. Na edição deverá ser possivel editar todos os dados ja preenchidos, incluindo excluir
5. Na listagem deverá ser validado todos as funcionalidades como pesquisa, criação e exclusão de cadastro

## Campos do formulário
- Assunto (texto, obrigatório)
- Titulo (texto, obrigatório)
- Mensagem(texto)
- Canal(select)
- Tipo (select)
-tags: Empresa, Cliente, Datas (tags)
-Anexo ( arquivos .jpeg e .pdf)

## URL da tela
/configuracao/mensagem
/configuracao/mensagem/novo
/configuracao/mensagem/id/editar
