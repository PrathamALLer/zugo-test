const request = require('supertest');
const express = require('express');
const personRoutes = require('../../routes/person');
const { Person } = require('../../models');
const { validatePerson } = require('../../validators/personValidator');

// Mock the Person model and validators
jest.mock('../../models', () => ({
  Person: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

jest.mock('../../validators/personValidator', () => ({
  validatePerson: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api/persons', personRoutes);

describe('Person Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/persons', () => {
    it('should return all persons', async () => {
      const mockPersons = [
        { id: 1, firstname: 'John2', lastname: 'Doe' },
        { id: 2, firstname: 'Jane2', lastname: 'Doe' },
      ];
      Person.findAll.mockResolvedValue(mockPersons);

      const res = await request(app).get('/api/persons');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockPersons);
    });
  });

  describe('GET /api/persons/:id', () => {
    it('should return a person by ID', async () => {
      const person = { id: 1, firstname: 'John2', lastname: 'Doe' };
      Person.findByPk.mockResolvedValue(person);

      const res = await request(app).get('/api/persons/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(person);
    });

    it('should return 404 if person not found', async () => {
      Person.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/persons/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Person not found' });
    });
  });

  describe('POST /api/persons', () => {
    it('should create a new person', async () => {
      const newPerson = { id: 1, firstname: 'John2', lastname: 'Doe' };
      Person.create.mockResolvedValue(newPerson);

      // Ensure validatePerson allows this request
      validatePerson.mockReturnValue({ error: null });

      const res = await request(app)
        .post('/api/persons')
        .send({ firstname: 'John2', lastname: 'Doe' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newPerson);
    });

    // it('should return 400 if validation fails', async () => {
    //   const res = await request(app)
    //     .post('/api/persons')
    //     .send({ firstname: 'Pratham' });

    //   console.log('res status', res.statusCode)
    //   expect(res.status).toBe(400);
    //   expect(res.body).toHaveProperty('error');
    // });
  });

  describe('PUT /api/persons/:id', () => {
    it('should update a person', async () => {
      const updatedPerson = { id: 1, firstname: 'John2', lastname: 'Doe' };
      Person.update.mockResolvedValue([1]);
      Person.findByPk.mockResolvedValue(updatedPerson);

      // Ensure validatePerson allows this request
      validatePerson.mockReturnValue({ error: null });

      const res = await request(app)
        .put('/api/persons/1')
        .send({ firstname: 'John2', lastname: 'Doe' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedPerson);
    });

    it('should return 404 if person not found', async () => {
      Person.update.mockResolvedValue([0]);

      const res = await request(app)
        .put('/api/persons/999')
        .send({ firstname: 'John2', lastname: 'Doe' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Person not found' });
    });
  });

  describe('DELETE /api/persons/:id', () => {
    it('should delete a person', async () => {
      Person.destroy.mockResolvedValue(1);

      const res = await request(app).delete('/api/persons/1');
      expect(res.statusCode).toBe(204);
    });

    it('should return 404 if person not found', async () => {
      Person.destroy.mockResolvedValue(0);

      const res = await request(app).delete('/api/persons/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Person not found' });
    });
  });
});
