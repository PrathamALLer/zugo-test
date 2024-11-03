const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js project',
    },
    servers: [
      {
        url: 'http://localhost:8000/api', // Replace with your server URL
      },
    ],
  },
  apis: ['./docs/*.yaml'], // Adjust the path as necessary
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
