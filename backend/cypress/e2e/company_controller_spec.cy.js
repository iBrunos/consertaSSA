// cypress/integration/company_controller_spec.js

// Variáveis para armazenar o ID da company e o token de autorização
let companyId;
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzkxZjQzZGE5YTY5MzNkMDJjMjg5YiIsImlhdCI6MTcwMDQ5NjQxNSwiZXhwIjoxNzAwNTgyODE1fQ.sDgtRHJK9gxjLPuYiCtSo1v24YPFp828KC-6UZh3AiQ";

// Testa a criação de uma company
describe('Company Controller - Create', () => {
  it('Should create a new company', () => {
    cy.request({
      method: 'POST',
      url: 'https://api-conserta-ssa.vercel.app/company',
      headers: {
        Authorization: `Bearer ${authToken}`, // Inclui o token no cabeçalho de autorização
      },
      body: {
        email: 'test@example.com',
        nome: 'Nome da Company',
        tipo: 'Tipo da Company',
        senha: 'senha123',
        cnpj: '99.999.999/0001-99',
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Company created successfully');
      expect(response.body.company.nome).to.equal('Nome da Company');
      expect(response.body.company.tipo).to.equal('Tipo da Company');

      // Armazena o ID da company para uso em outros testes
      companyId = response.body.company.id;
    });
  });
});

// Testa a listagem de todas as companies
describe('Company Controller - Find All', () => {
  it('Should retrieve all companies', () => {
    cy.request({
      method: 'GET',
      url: 'https://api-conserta-ssa.vercel.app/company',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});

// Testa a obtenção de uma company por ID
describe('Company Controller - Find By ID', () => {
  it('Should retrieve a company by ID', () => {
    cy.request({
      method: 'GET',
      url: `https://api-conserta-ssa.vercel.app/company/${companyId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});

// Testa a atualização de uma company
describe('Company Controller - Update', () => {
  it('Should update a company', () => {
    cy.request({
      method: 'PUT',
      url: `https://api-conserta-ssa.vercel.app/company/${companyId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        nome: 'Novo Nome',
        tipo: 'Novo Tipo',
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Company successfully updated');
    });
  });
});

// Testa a exclusão de uma company
describe('Company Controller - Delete', () => {
  it('Should delete a company', () => {
    cy.request({
      method: 'DELETE',
      url: `https://api-conserta-ssa.vercel.app/company/${companyId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });
});
