// cypress/integration/order_controller_spec.js

// Variáveis para armazenar o ID da ordem e o token de autorização
let orderId;
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzkxZjQzZGE5YTY5MzNkMDJjMjg5YiIsImlhdCI6MTcwMDM1MDg1NiwiZXhwIjoxNzAwNDM3MjU2fQ.O4a6pDs6vUl-7gpuL-XxblTPS7jTGnkTNakg_kIQAUY"
// Testa a criação de uma ordem
describe('Order Controller - Create', () => {

  it('Should create a new order', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/order',
      headers: {
        Authorization: `Bearer ${authToken}`, // Inclui o token no cabeçalho de autorização
      },
      body: {
        type: 'Tipo da Ordem',
        status: 'Status da Ordem',
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Order created successfully');
      expect(response.body.user.type).to.equal('Tipo da Ordem');
      expect(response.body.user.status).to.equal('Status da Ordem');

      // Armazena o ID da ordem para uso em outros testes
      orderId = response.body.user.id;
    });
  });
});

// Testa a listagem de todas as ordens
describe('Order Controller - Find All', () => {
  it('Should retrieve all orders', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/order',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      // Adicione verificações conforme necessário
    });
  });
});

// Testa a obtenção de uma ordem por ID
describe('Order Controller - Find By ID', () => {
  it('Should retrieve an order by ID', () => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/order/${orderId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      // Adicione mais verificações conforme necessário
    });
  });
});

// Testa a atualização de uma ordem
describe('Order Controller - Update', () => {
  it('Should update an order', () => {
    cy.request({
      method: 'PUT',
      url: `http://localhost:3000/order/${orderId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        type: 'Novo Tipo',
        status: 'Novo Status',
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Order successfully updated');
    });
  });
});

// Testa a exclusão de uma ordem
describe('Order Controller - Delete', () => {
  it('Should delete an order', () => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/order/${orderId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });
});
