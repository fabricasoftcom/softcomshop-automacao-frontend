const LoginLocators = {
    // Ajuste para compatibilidade com Petshop (IDs genéricos ou específicos)
    // O sistema Petshop usa IDs diferentes ou ausentes, precisamos usar seletores mais robustos
    usernameInput: '#login-email, #email, [name="email"]', // Tenta ID padrão, depois ID petshop, depois name
    passwordInput: '#login-senha, #password, [name="password"]',
    loginButton: '#login-acessar, button[type="submit"]',
    errorMessage: '#login-erro, .alert-danger'
};

export default LoginLocators;
