const express = require('express');
const request = require('supertest');
const accountValueRouter = require('../../routes/accountValue'); // Adjust the path to your router
const { AccountValue } = require('../../models');

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use('/account-value', accountValueRouter); // Use the account value router

beforeAll(async () => {
  // Clear the AccountValue table before tests
//   await AccountValue.destroy({ where: {} });
});

describe('Account Value Routes', () => {
  let createdAccountValueId;

  test('Create Account Value', async () => {
    const response = await request(app)
      .post('/account-value')
      .send({
        bookvalue: 100.00,
        account_id: 1,
        currency: 'GBP',
        iscurrent: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdAccountValueId = response.body.id; // Store the ID for later tests
  });

  test('Get All Account Values', async () => {
    const response = await request(app).get('/account-value');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // Ensure there's at least one entry
  });

  test('Get Account Value by ID', async () => {
    const response = await request(app).get(`/account-value/${createdAccountValueId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdAccountValueId);
  });

  test('Update Account Value', async () => {
    const response = await request(app)
      .put(`/account-value/${createdAccountValueId}`)
      .send({
        bookvalue: 150.00,
        account_id: 1,
        currency: 'GBP',
        iscurrent: false,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('bookvalue', "150");
  });

  test('Delete Account Value', async () => {
    const response = await request(app).delete(`/account-value/${createdAccountValueId}`);
    expect(response.status).toBe(204);
  });

  test('Get Account Value by ID after deletion', async () => {
    const response = await request(app).get(`/account-value/${createdAccountValueId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'AccountValue not found');
  });
});
