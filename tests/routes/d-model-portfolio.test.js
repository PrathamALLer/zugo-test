const request = require('supertest');
const express = require('express');
const modelPortfolioRouter = require('../../routes/modelPortfolio');
const app = express();

app.use(express.json());
app.use('/api/model-portfolios', modelPortfolioRouter);

describe('Model Portfolio API', () => {
  // Mock data for tests
  const validModelPortfolio = {
    name: 'Test Portfolio',
    description: 'A test model portfolio',
    risk_profile_id: 1,
  };

  const invalidModelPortfolio = {
    name: '', // Invalid: name is required
    description: null, // Invalid: description cannot be null
    risk_profile_id: -1, // Invalid: risk_profile_id must be positive
  };

  let createdPortfolioId; // Variable to store the ID of the created model portfolio

  it('should create a new model portfolio', async () => {
    console.log('Creating model portfolio:', validModelPortfolio);
    const response = await request(app)
      .post('/api/model-portfolios')
      .send(validModelPortfolio);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdPortfolioId = response.body.id; // Store the created portfolio ID
  });

  it('should return 400 for invalid model portfolio creation', async () => {
    console.log('Creating invalid model portfolio:', invalidModelPortfolio);
    const response = await request(app)
      .post('/api/model-portfolios')
      .send(invalidModelPortfolio);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should get all model portfolios', async () => {
    const response = await request(app).get('/api/model-portfolios');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a model portfolio by ID', async () => {
    const response = await request(app).get(`/api/model-portfolios/${createdPortfolioId}`); // Assuming ID 1 exists
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdPortfolioId);
  });

  it('should return 404 for non-existing model portfolio', async () => {
    const response = await request(app).get('/api/model-portfolios/999'); // Assuming ID 999 does not exist
    expect(response.status).toBe(404);
  });

  it('should update a model portfolio', async () => {
    const response = await request(app)
      .put(`/api/model-portfolios/${createdPortfolioId}`) // Use the created portfolio ID
      .send(validModelPortfolio);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdPortfolioId); // Check the ID matches
  });

  it('should return 404 for updating non-existing model portfolio', async () => {
    const response = await request(app)
      .put('/api/model-portfolios/999') // Assuming ID 999 does not exist
      .send(validModelPortfolio);
    expect(response.status).toBe(404);
  });

  it('should delete a model portfolio', async () => {
    const response = await request(app).delete(`/api/model-portfolios/${createdPortfolioId}`); // Use the created portfolio ID
    expect(response.status).toBe(204);
  });

  it('should return 404 for deleting non-existing model portfolio', async () => {
    const response = await request(app).delete('/api/model-portfolios/999'); // Assuming ID 999 does not exist
    expect(response.status).toBe(404);
  });
});
