const request = require('supertest');
const express = require('express');
const transactionsRouter = require('../../routes/transactions');
const { Transactions } = require('../../models');

const app = express();
app.use(express.json());
app.use('/transactions', transactionsRouter);

beforeAll(async () => {
  // Clear the transactions table before running tests
//   await Transactions.destroy({ where: {} });
});

let createdTransactionId;

describe('Transactions API', () => {
  it('should create a transaction', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        description: 'Test Transaction',
        trade_date: new Date(),
        completed_date: new Date(),
        account_id: 1,
        total_amount: 100.00,
        category: 'Invest Cash',
        trade_currency: 'GBP',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTransactionId = response.body.id; // Store the created transaction ID for later tests
  });

  it('should get all transactions', async () => {
    const response = await request(app).get('/transactions');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a transaction by ID', async () => {
    const response = await request(app).get(`/transactions/${createdTransactionId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTransactionId);
  });

  it('should update a transaction', async () => {
    const response = await request(app)
      .put(`/transactions/${createdTransactionId}`)
      .send({
        description: 'Updated Transaction',
        total_amount: 150.00,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTransactionId);
    expect(response.body).toHaveProperty('description', 'Updated Transaction');
  });

  it('should delete a transaction', async () => {
    const response = await request(app).delete(`/transactions/${createdTransactionId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for deleted transaction', async () => {
    const response = await request(app).get(`/transactions/${createdTransactionId}`);
    expect(response.status).toBe(404);
  });
});
