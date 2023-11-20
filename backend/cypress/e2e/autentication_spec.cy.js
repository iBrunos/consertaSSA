// cypress/integration/authentication_spec.js
let authToken;

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
  it('Should perform login and obtain JWT token', () => {
    // Substitua 'seu_usuario' e 'sua_senha' pelos valores reais
    performLogin('admin@example.com', 'adminpassword').then((token) => {
      authToken = token;

      // Adicione um teste para verificar se o token foi atribuído corretamente
      expect(authToken).to.be.a('string');
      expect(authToken).to.have.length.greaterThan(0);

      // Exibe o token no console
      //console.log('JWT Token:', authToken);
    });
  });

// Testa se o token atribuido é valido na regras do middleware
  it('Should perform login with valid credentials', () => {
    performLogin('admin@example.com', 'adminpassword').then((token) => {
      // Redefine a variável authToken para o segundo teste
      authToken = token;

      expect(authToken).to.be.a('string');
      expect(authToken).to.have.length.greaterThan(0);
    });
  });
});
