const request = require('supertest');
const express = require('express');
const contributionWithdrawalsRouter = require('../../routes/contributionWithdrawals');
const { ContributionWithdrawals } = require('../../models');

const app = express();
app.use(express.json());
app.use('/api/contribution-withdrawals', contributionWithdrawalsRouter);

beforeAll(async () => {
  // Clear the table before starting tests
  // await ContributionWithdrawals.destroy({ where: {} });
});

describe('Contribution Withdrawals API', () => {
  let createdWithdrawalId;

  test('Create Contribution Withdrawal', async () => {
    const response = await request(app)
      .post('/api/contribution-withdrawals')
      .send({
        person_id: 1,
        plan_id: 1,
        account_id: 1,
        start_date: '2023-01-01',
        end_date: '2023-12-31',
        amount: '100.00',
        currency: 'GBP',
        frequency: 'One Time',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdWithdrawalId = response.body.id; // Store the created ID for later tests
  });

  test('Get All Contribution Withdrawals', async () => {
    const response = await request(app).get('/api/contribution-withdrawals');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Get Contribution Withdrawal by ID', async () => {
    const response = await request(app).get(`/api/contribution-withdrawals/${createdWithdrawalId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdWithdrawalId);
  });

  test('Update Contribution Withdrawal', async () => {
    const response = await request(app)
      .put(`/api/contribution-withdrawals/${createdWithdrawalId}`)
      .send({
        amount: '150.00',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('amount', '150.00');
  });

  test('Delete Contribution Withdrawal', async () => {
    const response = await request(app).delete(`/api/contribution-withdrawals/${createdWithdrawalId}`);
    expect(response.status).toBe(204);
  });

  test('Get Contribution Withdrawal by ID after deletion', async () => {
    const response = await request(app).get(`/api/contribution-withdrawals/${createdWithdrawalId}`);
    expect(response.status).toBe(404);
  });
}); 