const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const swaggerDocs = require('./config/swagger-docs.js');
const swaggerUi = require('swagger-ui-express');

// Import the initialized Sequelize instance and models
const db = require("./models");

// Middleware for parsing JSON
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import routes
const modelPortfolioRoutes = require('./routes/modelPortfolio');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const planRoutes = require('./routes/plan');
const productRoutes = require('./routes/product');
const personRoutes = require('./routes/person');
const riskProfileRoutes = require('./routes/riskProfile');
const settingsRoutes = require('./routes/settings');
const personAccountsRoutes = require('./routes/personAccounts');
const taxRatesRoutes = require('./routes/taxRates');
const personPlanRoutes = require('./routes/personPlan');
const incomeExpenseRoutes = require('./routes/incomeExpense');
const contributionWithdrawalsRoutes = require('./routes/contributionWithdrawals');
const transactionsRoutes = require('./routes/transactions');
const accountValueRoutes = require('./routes/accountValue');
const productTaxWrapperTypesRoutes = require('./routes/productTaxWrapperTypes');

// Use routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/model-portfolios', modelPortfolioRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/products', productRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/risk-profiles', riskProfileRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/person-accounts', personAccountsRoutes);
app.use('/api/tax-rates', taxRatesRoutes);
app.use('/api/person-plans', personPlanRoutes);
app.use('/api/income-expenses', incomeExpenseRoutes);
app.use('/api/contribution-withdrawals', contributionWithdrawalsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/account-values', accountValueRoutes);
app.use('/api/product-tax-wrapper-types', productTaxWrapperTypesRoutes);

// Export the app
module.exports = { app, db };
