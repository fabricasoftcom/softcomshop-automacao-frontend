class ContaCadastroLocator {
    // Seletor para o título da página de cadastro de contas
    tituloPagina = 'h5:contains("Conta")';

    // Seletor para os tipos de contas disponíveis
    btnContaCorrente = 'a[href="/integracao-bancaria/conta/novo/conta-corrente"]';
    btnCaixinha = 'a[href="/integracao-bancaria/conta/novo/caixinha"]';
    btnCartaoCredito = 'a[href="/integracao-bancaria/conta/novo/cartao-credito"]';
    btnAdministradoraCartoes = 'a[href="/integracao-bancaria/conta/novo/administradora-cartoes"]';
    btnContaPoupanca = 'a[href="/integracao-bancaria/conta/novo/conta-poupanca"]';
    btnContaEmprestimo = 'a[href="/integracao-bancaria/conta/novo/conta-emprestimo"]';
    btnSoftcompay = 'a[href="/integracao-bancaria/conta/novo/softcompay"]';
    btnCarteiraVirtual = 'a[href="/integracao-bancaria/conta/novo/carteira-virtual"]';
    btnCrediarioCarne = 'a[href="/integracao-bancaria/conta/novo/crediario-carne"]';

    // Seletor para o botão Voltar
    btnVoltar = 'button:contains("Voltar")';
  }

  export default new ContaCadastroLocator();
