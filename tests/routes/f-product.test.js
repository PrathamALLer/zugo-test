const request = require('supertest');
const { Product } = require('../../models');
const express = require('express'); // Import express
const productsRouter = require('../../routes/product'); // Import the products router

// Create a new Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use('/products', productsRouter); // Use the products router

beforeAll(async () => {
  // Clear the Product table before running tests
//   await Product.destroy({ where: {} });
});

describe('Product API', () => {
  let createdProductId;

  test('POST /products - Create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        category: 'ISA',
        sub_category: 'Stocks and Shares ISA',
        provider: 'Fidelity',
        product_tax_wrapper_categories_id: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdProductId = response.body.id; // Store the created product ID for later tests
  });

  test('GET /products - Get all products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /products/:id - Get product by ID', async () => {
    const response = await request(app).get(`/products/${createdProductId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProductId);
  });

  test('PUT /products/:id - Update product', async () => {
    const response = await request(app)
      .put(`/products/${createdProductId}`)
      .send({
        category: 'Pension',
        sub_category: 'Workplace Pension',
        provider: 'AJ Bell',
        product_tax_wrapper_categories_id: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProductId);
    expect(response.body).toHaveProperty('category', 'Pension');
  });

  test('DELETE /products/:id - Delete product', async () => {
    const response = await request(app).delete(`/products/${createdProductId}`);
    expect(response.status).toBe(204);
  });

  test('GET /products/:id - Get product by ID after deletion', async () => {
    const response = await request(app).get(`/products/${createdProductId}`);
    expect(response.status).toBe(404);
  });
});
