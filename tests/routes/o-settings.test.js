const request = require('supertest');
const express = require('express');
const settingsRouter = require('../../routes/settings');
const { Settings } = require('../../models');

const app = express();
app.use(express.json());
app.use('/settings', settingsRouter);

beforeAll(async () => {
  // Clear the settings table before running tests
//   await Settings.destroy({ where: {} });
});

let createdSettingId;

describe('Settings API', () => {
  it('should create settings', async () => {
    const response = await request(app)
      .post('/settings')
      .send({
        setting_name: 'Test Setting',
        setting_value: 'Test Value',
        Priority: 1,
        product_tax_wrapper_categories_id: null,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdSettingId = response.body.id; // Store the created setting ID for later tests
  });

  it('should get all settings', async () => {
    const response = await request(app).get('/settings');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get settings by ID', async () => {
    const response = await request(app).get(`/settings/${createdSettingId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdSettingId);
  });

  it('should update settings', async () => {
    const response = await request(app)
      .put(`/settings/${createdSettingId}`)
      .send({
        setting_name: 'Updated Setting',
        setting_value: 'Updated Value',
        Priority: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('setting_name', 'Updated Setting');
  });

  it('should delete settings', async () => {
    const response = await request(app).delete(`/settings/${createdSettingId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for deleted settings', async () => {
    const response = await request(app).get(`/settings/${createdSettingId}`);
    expect(response.status).toBe(404);
  });
});
