const express = require('express');

const app = express();
const mongoose = require('mongoose');
const stuffRoutes = require("./routes/stuff");

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept,\
    Content, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/stuff', stuffRoutes);

mongoose.connect("mongodb+srv://admin:admin@db-fullstack.y3lfz.mongodb.net/myFirstDatabase?\
retryWrites=true&w=majority", 
{
    useNewUrlParser : true,
    useUnifiedTopology : true
})  .then(() => console.log("Connection success to MongoDB\n"))
    .catch(() => console.log("Failed to connect to MongoDB \n"));



module.exports = app;