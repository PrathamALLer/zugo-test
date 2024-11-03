const request = require('supertest');
const express = require('express');
const riskProfileRouter = require('../../routes/riskProfile');
const app = express();

app.use(express.json());
app.use('/api/risk-profiles', riskProfileRouter);

describe('Risk Profile API', () => {
  // Mock data for tests
  const validRiskProfile = {
    name: 'Test Profile',
    description: 'A test risk profile',
    min_score: 0,
    score: 50,
    max_score: 100,
  };

  const invalidRiskProfile = {
    // Example of an invalid profile (e.g., missing required fields)
    description: 'An invalid risk profile', // Missing 'name'
    min_score: 100, // min_score greater than max_score
    score: 150, // score out of bounds
    max_score: 100,
  };

  let createdProfileId; // Variable to store the created profile ID

  it('should create a new risk profile', async () => {
    console.log('Creating risk profile:', validRiskProfile);
    const response = await request(app)
      .post('/api/risk-profiles')
      .send(validRiskProfile);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdProfileId = response.body.id; // Store the created profile ID
  });

  it('should return 400 for invalid risk profile creation', async () => {
    console.log('Creating invalid risk profile:', invalidRiskProfile);
    const response = await request(app)
      .post('/api/risk-profiles')
      .send(invalidRiskProfile);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should get all risk profiles', async () => {
    const response = await request(app).get('/api/risk-profiles');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a risk profile by ID', async () => {
    const response = await request(app).get(`/api/risk-profiles/${createdProfileId}`); // Use created profile ID
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProfileId);
  });

  it('should return 404 for non-existing risk profile', async () => {
    const response = await request(app).get('/api/risk-profiles/999'); // Assuming ID 999 does not exist
    expect(response.status).toBe(404);
  });

  it('should update a risk profile', async () => {
    const response = await request(app)
      .put(`/api/risk-profiles/${createdProfileId}`) // Use created profile ID
      .send(validRiskProfile);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProfileId);
  });

  it('should return 404 for updating non-existing risk profile', async () => {
    const response = await request(app)
      .put('/api/risk-profiles/999') // Assuming ID 999 does not exist
      .send(validRiskProfile);
    expect(response.status).toBe(404);
  });

  it('should delete a risk profile', async () => {
    const response = await request(app).delete(`/api/risk-profiles/${createdProfileId}`); // Use created profile ID
    expect(response.status).toBe(204);
  });

  it('should return 404 for deleting non-existing risk profile', async () => {
    const response = await request(app).delete('/api/risk-profiles/999'); // Assuming ID 999 does not exist
    expect(response.status).toBe(404);
  });
});
