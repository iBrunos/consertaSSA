// cypress/integration/authentication_spec.js

// Função para realizar login e obter o token JWT
function performLogin(email, password) {
    return cy.request('POST', 'https://api-conserta-ssa.vercel.app/auth', { email, password })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        return response.body.token;
      });
  }
  
  // Testa apenas o processo de autenticação (login)
  describe('Authentication Flow - Login', () => {
    let authToken;
  
    it('Should perform login and obtain JWT token', () => {
      // Substitua 'seu_usuario' e 'sua_senha' pelos valores reais
      performLogin('admin@example.com', 'adminpassword').then((token) => {
        authToken = token;
      });
    });
  
    // Adicione mais testes conforme necessário
    // por exemplo, testes de autorização usando o token
  });
  