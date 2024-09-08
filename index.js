const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const { OpenAI } = require('openai');
const routes = require('./routes/index');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB'ye bağlan
connectDB();
app.use(bodyParser.json());
// Genel rotalar
app.use('/api',function(req,res,next){console.log(req.url,'asd');next();}, routes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
