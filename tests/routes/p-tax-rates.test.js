const request = require('supertest');
const express = require('express');
const taxRatesRouter = require('../../routes/taxRates');
const { TaxRates } = require('../../models');

const app = express();
app.use(express.json());
app.use('/api/tax-rates', taxRatesRouter);

beforeAll(async () => {
  // Clear the TaxRates table before running tests
//   await TaxRates.destroy({ where: {} });
});

describe('Tax Rates API', () => {
  let createdTaxRate;

  test('POST /api/tax-rates - create a new tax rate', async () => {
    const response = await request(app)
      .post('/api/tax-rates')
      .send({
        band: 'A',
        taxable_income_min: 10000,
        taxable_income_max: 20000,
        tax_rate: 0.15,
        jurisdiction_code: 'US'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTaxRate = response.body; // Store created tax rate for later tests
  });

  test('GET /api/tax-rates - get all tax rates', async () => {
    const response = await request(app).get('/api/tax-rates');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/tax-rates/:id - get tax rate by ID', async () => {
    const response = await request(app).get(`/api/tax-rates/${createdTaxRate.id}`);
    
    console.log("respons body ------------->", response.body)
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: createdTaxRate.id,
      band: createdTaxRate.band,
      taxable_income_min: createdTaxRate.taxable_income_min,
      taxable_income_max: createdTaxRate.taxable_income_max,
      tax_rate: createdTaxRate.tax_rate,
      jurisdiction_code: createdTaxRate.jurisdiction_code,
    }));
  });

  test('PUT /api/tax-rates/:id - update tax rate', async () => {
    const response = await request(app)
      .put(`/api/tax-rates/${createdTaxRate.id}`)
      .send({
        band: 'A+',
        taxable_income_min: "15000",
        taxable_income_max: "25000",
        tax_rate: "0.20",
        jurisdiction_code: 'US'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: createdTaxRate.id,
      band: 'A+',
      taxable_income_min: "15000",
      taxable_income_max: "25000",
      tax_rate: "0.20",
      jurisdiction_code: 'US',
    }));
  });

  test('DELETE /api/tax-rates/:id - delete tax rate', async () => {
    const response = await request(app).delete(`/api/tax-rates/${createdTaxRate.id}`);
    
    expect(response.status).toBe(204);
  });
});
