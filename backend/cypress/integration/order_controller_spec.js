// cypress/integration/order_controller_spec.js

// Testa a criação de uma ordem
describe('Order Controller - Create', () => {
    it('Should create a new order', () => {
      cy.request('POST', 'http://localhost:3000/order', {
        type: 'Tipo da Ordem',
        status: 'Status da Ordem',
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Order created successfully');
        expect(response.body.user.type).to.equal('Tipo da Ordem');
        expect(response.body.user.status).to.equal('Status da Ordem');
      });
    });
  });
  
  // Testa a listagem de todas as ordens
  describe('Order Controller - Find All', () => {
    it('Should retrieve all orders', () => {
      cy.request('GET', 'http://localhost:3000/order').then((response) => {
        expect(response.status).to.equal(200);
        // Adicione mais verificações conforme necessário
      });
    });
  });
  
  // Testa a obtenção de uma ordem por ID
  describe('Order Controller - Find By ID', () => {
    it('Should retrieve an order by ID', () => {
      // Substitua {ID} pelo ID real da ordem
      cy.request('GET', `http://localhost:3000/order{ID}`).then((response) => {
        expect(response.status).to.equal(200);
        // Adicione mais verificações conforme necessário
      });
    });
  });
  
  // Testa a atualização de uma ordem
  describe('Order Controller - Update', () => {
    it('Should update an order', () => {
      // Substitua {ID} pelo ID real da ordem
      cy.request('PUT', `http://localhost:3000/order`, {
        type: 'Novo Tipo',
        status: 'Novo Status',
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Order successfully updated');
      });
    });
  });
  
  // Testa a exclusão de uma ordem
  describe('Order Controller - Delete', () => {
    it('Should delete an order', () => {
      // Substitua {ID} pelo ID real da ordem
      cy.request('DELETE', `http://localhost:3000/order`).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });