const request = require('supertest');
const { ProductTaxWrapperTypes } = require('../../models');
const productTaxWrapperTypesRouter = require('../../routes/productTaxWrapperTypes'); 
const express = require('express')
const app = express();
app.use(express.json());
app.use('/api/product-tax-wrapper-types', productTaxWrapperTypesRouter);

describe('Product Tax Wrapper Types API', () => {
  let createdTypeId; // Variable to store the created type ID

  beforeAll(async () => {
    // Clear the database before all tests
    // await ProductTaxWrapperTypes.destroy({ where: {} });

    // Create a product tax wrapper type for use in other tests
    const newType = {
      name: 'Test Type',
      annual_accumulation_allowance: 1000.00,
      annual_decumulation_allowance: 500.00,
      income_tax_applicable: 'Y',
      capital_gains_tax_applicable: 'N',
      max_tax_free_withdrawal: 2000.00,
      max_tax_free_withdrawal_percent_annual: 50,
      min_withdraw_age: 18,
      min_contribute_age: 18,
      max_contribution_age: 65,
    };

    const createdType = await ProductTaxWrapperTypes.create(newType);
    createdTypeId = createdType.id; // Store the created type ID
  });

  it('POST / - Create Product Tax Wrapper Type', (done) => {
    const newType = {
      name: 'Test Type',
      annual_accumulation_allowance: 1000.00,
      annual_decumulation_allowance: 500.00,
      income_tax_applicable: 'Y',
      capital_gains_tax_applicable: 'N',
      max_tax_free_withdrawal: 2000.00,
      max_tax_free_withdrawal_percent_annual: 50,
      min_withdraw_age: 18,
      min_contribute_age: 18,
      max_contribution_age: 65,
    };

    request(app).post('/api/product-tax-wrapper-types').send(newType)
      .then(response => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id'); // Assuming the created object returns an id
        createdTypeId = response.body.id; // Store the created type ID
        done(); // Call done to indicate the test is complete
      })
      .catch(err => done(err)); // Handle errors
  });

  it('GET /:id - Get Product Tax Wrapper Type by ID', (done) => {
    request(app).get(`/api/product-tax-wrapper-types/${createdTypeId}`)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdTypeId);
        done();
      })
      .catch(err => done(err));
  });

  it('PUT /:id - Update Product Tax Wrapper Type', (done) => {
    const updatedType = {
      name: 'Updated Type',
      annual_accumulation_allowance: 1500.00,
      income_tax_applicable: 'N',
      capital_gains_tax_applicable: 'Y',
    };

    request(app).put(`/api/product-tax-wrapper-types/${createdTypeId}`).send(updatedType)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Type');
        done();
      })
      .catch(err => done(err));
  });

  it('DELETE /:id - Delete Product Tax Wrapper Type', (done) => {
    request(app).delete(`/api/product-tax-wrapper-types/${createdTypeId}`)
      .then(response => {
        expect(response.status).toBe(204);
        done();
      })
      .catch(err => done(err));
  });
});
