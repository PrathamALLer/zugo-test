const express = require('express');
const request = require('supertest');
const personAccountsRouter = require('../../routes/personAccounts'); // Adjust the path as necessary
const { PersonAccounts } = require('../../models');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/personAccounts', personAccountsRouter); // Mount the person accounts routes

beforeAll(async () => {
  // Clear the PersonAccounts table before tests
//   await PersonAccounts.destroy({ where: {} });
});

describe('Person Accounts API', () => {
  let createdPersonAccount;

  it('should create a person account (POST /personAccounts)', async () => {
    const response = await request(app)
      .post('/personAccounts')
      .send({
        person_id: 1,
        account_id: 1,
        role: 'Owner',
        role_percentage: 100
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // Assuming the response includes the created ID
    createdPersonAccount = response.body; // Store the created account for later tests
  });

  it('should get all person accounts (GET /personAccounts)', async () => {
    const response = await request(app).get('/personAccounts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a person account by ID (GET /personAccounts/:id)', async () => {
    const response = await request(app).get(`/personAccounts/${createdPersonAccount.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: createdPersonAccount.id,
      person_id: createdPersonAccount.person_id,
      account_id: createdPersonAccount.account_id,
      role: createdPersonAccount.role,
      role_percentage: createdPersonAccount.role_percentage,
    }));
  });

  it('should update a person account (PUT /personAccounts/:id)', async () => {
    const response = await request(app)
      .put(`/personAccounts/${createdPersonAccount.id}`)
      .send({
        role: 'Advisor',
        role_percentage: 50
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: createdPersonAccount.id,
      person_id: createdPersonAccount.person_id,
      account_id: createdPersonAccount.account_id,
      role: 'Advisor',
      role_percentage: "50",
    }));
  });

  it('should delete a person account (DELETE /personAccounts/:id)', async () => {
    const response = await request(app).delete(`/personAccounts/${createdPersonAccount.id}`);
    expect(response.status).toBe(204);
  });
});
