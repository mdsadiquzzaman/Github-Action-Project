const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const brandRoutes = require('./routes/brandRoutes');

const app = express();

// Body parser
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js CRUD API',
            version: '1.0.0',
            description: 'A simple CRUD API with Authentication'
        },
        servers: [
            { url: 'http://localhost:3000' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'] // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
//app.use('/api/brands', brandRoutes);
module.exports = app;