const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/userRoutes');
const { User } = require('../../models');

// Mock the User model
jest.mock('../../models', () => ({
  User: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User Routes', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      User.findAll.mockResolvedValue(users);

      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(users);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
      User.findByPk.mockResolvedValue(user);

      const res = await request(app).get('/api/users/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(user);
    });

    it('should return 404 if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/users/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'User not found' });
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' };
      User.create.mockResolvedValue(newUser);

      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newUser);
    });

    it('should return 400 if validation fails', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'invalid-email', password: '123' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const updatedUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      User.update.mockResolvedValue([1]);
      User.findByPk.mockResolvedValue(updatedUser);

      const res = await request(app)
        .put('/api/users/1')
        .send({ name: 'John Doe', email: 'john@example.com' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedUser);
    });

    it('should return 404 if user not found', async () => {
      User.update.mockResolvedValue([0]);

      const res = await request(app)
        .put('/api/users/999')
        .send({ name: 'John Doe', email: 'john@example.com' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'User not found' });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      User.destroy.mockResolvedValue(1);

      const res = await request(app).delete('/api/users/1');
      expect(res.statusCode).toBe(204);
    });

    it('should return 404 if user not found', async () => {
      User.destroy.mockResolvedValue(0);

      const res = await request(app).delete('/api/users/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'User not found' });
    });
  });
});
