const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();

// Enable CORS for all routes
app.use(cors()); // This allows all origins
app.use(express.json());
app.use('/api/rules', ruleRoutes);

module.exports = app;
