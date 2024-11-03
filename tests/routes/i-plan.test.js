const request = require('supertest');
const express = require('express');
const planRoutes = require('../../routes/plan');
const { Plan } = require('../../models');

// Mock the Plan model
jest.mock('../../models', () => ({
  Plan: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/api/plans', planRoutes);

describe('Plan Routes', () => {
  describe('GET /api/plans', () => {
    it('should return all plans', async () => {
      const plans = [{ id: 1, plan_name: 'Plan A' }];
      Plan.findAll.mockResolvedValue(plans);

      const res = await request(app).get('/api/plans');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(plans);
    });
  });

  describe('GET /api/plans/:id', () => {
    it('should return a plan by ID', async () => {
      const plan = { id: 1, plan_name: 'Plan A' };
      Plan.findByPk.mockResolvedValue(plan);

      const res = await request(app).get('/api/plans/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(plan);
    });

    it('should return 404 if plan not found', async () => {
      Plan.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/plans/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Plan not found' });
    });
  });

  describe('POST /api/plans', () => {
    it('should create a new plan', async () => {
      const newPlan = { id: 1, plan_name: 'Plan A' };
      Plan.create.mockResolvedValue(newPlan);

      const res = await request(app)
        .post('/api/plans')
        .send({ plan_name: 'Plan A', plan_description: 'Description', category: 'Discretionary', subcategory: 'Sapphire', risk_profile_id: 1, model_portfolio_id: 1, status: 'Active' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newPlan);
    });

    it('should return 400 if validation fails', async () => {
      const res = await request(app)
        .post('/api/plans')
        .send({ plan_name: 'Plan A' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/plans/:id', () => {
    it('should update a plan', async () => {
      const updatedPlan = { id: 1, plan_name: 'Plan A' };
      Plan.update.mockResolvedValue([1]);
      Plan.findByPk.mockResolvedValue(updatedPlan);

      const res = await request(app)
        .put('/api/plans/1')
        .send({ plan_name: 'Plan A', status: 'Completed' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedPlan);
    });

    it('should return 404 if plan not found', async () => {
      Plan.update.mockResolvedValue([0]);

      const res = await request(app)
        .put('/api/plans/999')
        .send({ plan_name: 'Plan A' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Plan not found' });
    });
  });

  describe('DELETE /api/plans/:id', () => {
    it('should delete a plan', async () => {
      Plan.destroy.mockResolvedValue(1);

      const res = await request(app).delete('/api/plans/1');
      expect(res.statusCode).toBe(204);
    });

    it('should return 404 if plan not found', async () => {
      Plan.destroy.mockResolvedValue(0);

      const res = await request(app).delete('/api/plans/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Plan not found' });
    });
  });
});
