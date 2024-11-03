const request = require('supertest');
const express = require('express');
const incomeExpenseRouter = require('../../routes/incomeExpense');
const { IncomeExpense } = require('../../models');

const app = express();
app.use(express.json());
app.use('/income-expense', incomeExpenseRouter);

beforeAll(async () => {
  // Clear the IncomeExpense table before tests
//   await IncomeExpense.destroy({ where: {} });
});

let createdIncomeExpenseId;

describe('Income Expense Routes', () => {
  it('should create a new income expense', async () => {
    const response = await request(app)
      .post('/income-expense')
      .send({
        category: 'Salary',
        subcategory: 'Employment',
        source: 'Company',
        bookvalue: 1000.00,
        currency: 'GBP',
        income_or_expense: 'Income',
        salary_sacrifice: null,
        external_contribution: null,
        person_id: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdIncomeExpenseId = response.body.id; // Store the created ID for later tests
  });

  it('should get all income expenses', async () => {
    const response = await request(app).get('/income-expense');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get the created income expense by ID', async () => {
    const response = await request(app).get(`/income-expense/${createdIncomeExpenseId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdIncomeExpenseId);
  });

  it('should update the created income expense', async () => {
    const response = await request(app)
      .put(`/income-expense/${createdIncomeExpenseId}`)
      .send({
        category: 'Bonus',
        bookvalue: 1200.00,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdIncomeExpenseId);
    expect(response.body).toHaveProperty('category', 'Bonus');
  });

  it('should delete the created income expense', async () => {
    const response = await request(app).delete(`/income-expense/${createdIncomeExpenseId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for the deleted income expense', async () => {
    const response = await request(app).get(`/income-expense/${createdIncomeExpenseId}`);
    expect(response.status).toBe(404);
  });
});
