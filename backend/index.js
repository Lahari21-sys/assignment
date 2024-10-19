const express = require('express');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => console.log(err));
