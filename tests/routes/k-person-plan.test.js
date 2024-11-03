const express = require('express');
const request = require('supertest');
const personPlanRouter = require('../../routes/personPlan');
const { PersonPlan } = require('../../models');

const app = express();
app.use(express.json());
app.use('/personPlan', personPlanRouter);

beforeAll(async () => {
  // Clear the PersonPlan table before tests
//   await PersonPlan.destroy({ where: {} });
});

describe('Person Plan API', () => {
  let createdPersonPlanId;

  it('should create a person plan (POST /personPlan)', async () => {
    const response = await request(app)
      .post('/personPlan')
      .send({
        relationship: 'Owner',
        plan_id: 1,
        person_id: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    createdPersonPlanId = response.body.id; // Store the created ID for later tests
  });

  it('should get all person plans (GET /personPlan)', async () => {
    const response = await request(app).get('/personPlan');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a person plan by ID (GET /personPlan/:id)', async () => {
    const response = await request(app).get(`/personPlan/${createdPersonPlanId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdPersonPlanId);
  });

  it('should update a person plan (PUT /personPlan/:id)', async () => {
    const response = await request(app)
      .put(`/personPlan/${createdPersonPlanId}`)
      .send({
        relationship: 'Adviser',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('relationship', 'Adviser');
  });

  it('should delete a person plan (DELETE /personPlan/:id)', async () => {
    const response = await request(app).delete(`/personPlan/${createdPersonPlanId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for getting deleted person plan (GET /personPlan/:id)', async () => {
    const response = await request(app).get(`/personPlan/${createdPersonPlanId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'PersonPlan not found');
  });
});
