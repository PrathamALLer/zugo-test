const request = require('supertest');
const express = require('express');
const accountRoutes = require('../../routes/account');
const { Account } = require('../../models');
const { validateCreateAccount, validateUpdateAccount } = require('../../validators/accountValidator');

// Mock the Account model and validators
jest.mock('../../models', () => ({
  Account: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

jest.mock('../../validators/accountValidator', () => ({
  validateCreateAccount: jest.fn(),
  validateUpdateAccount: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api/accounts', accountRoutes);

describe('Account Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/accounts', () => {
    it('should return all accounts', async () => {
      const mockAccounts = [
        { id: 1, accountnumber: 12345, accounttype: 'Savings', currency: 'GBP' },
        { id: 2, accountnumber: 67890, accounttype: 'Checking', currency: 'GBP' },
      ];
      Account.findAll.mockResolvedValue(mockAccounts);

      const res = await request(app).get('/api/accounts');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockAccounts);
    });
  });

  describe('GET /api/accounts/:id', () => {
    it('should return a single account', async () => {
      const mockAccount = { id: 1, accountnumber: 12345, accounttype: 'Savings', currency: 'GBP' };
      Account.findByPk.mockResolvedValue(mockAccount);

      const res = await request(app).get('/api/accounts/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockAccount);
    });

    it('should return 404 if account not found', async () => {
      Account.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/accounts/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Account not found' });
    });
  });

  describe('POST /api/accounts', () => {
    it('should create a new account', async () => {
      const newAccount = {
        accountnumber: 12345,
        accounttype: 'Savings',
        currency: 'GBP',
        dateopened: '2023-01-01',
        accountstatus: 'Active',
        Custided: 'Y',
        asset_or_liability: 'Asset',
      };
      validateCreateAccount.mockReturnValue({ error: null });
      Account.create.mockResolvedValue({ id: 1, ...newAccount });

      const res = await request(app).post('/api/accounts').send(newAccount);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ id: 1, ...newAccount });
    });

    it('should return 400 if validation fails', async () => {
      const invalidAccount = { accountnumber: 'invalid' };
      validateCreateAccount.mockReturnValue({ error: { details: [{ message: 'Validation error' }] } });

      const res = await request(app).post('/api/accounts').send(invalidAccount);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/accounts/:id', () => {
    it('should update an account', async () => {
      const updatedAccount = {
        accountnumber: 12345,
        accounttype: 'Checking',
        currency: 'GBP',
      };
      validateUpdateAccount.mockReturnValue({ error: null });
      Account.update.mockResolvedValue([1]);
      Account.findByPk.mockResolvedValue({ id: 1, ...updatedAccount });

      const res = await request(app).put('/api/accounts/1').send(updatedAccount);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ id: 1, ...updatedAccount });
    });

    it('should return 404 if account not found', async () => {
      validateUpdateAccount.mockReturnValue({ error: null });
      Account.update.mockResolvedValue([0]);

      const res = await request(app).put('/api/accounts/999').send({ accounttype: 'Checking' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Account not found' });
    });
  });

  describe('DELETE /api/accounts/:id', () => {
    it('should delete an account', async () => {
      Account.destroy.mockResolvedValue(1);

      const res = await request(app).delete('/api/accounts/1');
      expect(res.statusCode).toBe(204);
    });

    it('should return 404 if account not found', async () => {
      Account.destroy.mockResolvedValue(0);

      const res = await request(app).delete('/api/accounts/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Account not found' });
    });
  });
});
