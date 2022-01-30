const express = require('express');

const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/thing');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept,\
    Content, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

mongoose.connect("mongodb+srv://admin:admin@db-fullstack.y3lfz.mongodb.net/myFirstDatabase?\
retryWrites=true&w=majority", 
{
    useNewUrlParser : true,
    useUnifiedTopology : true}).then(() => console.log("Connection success to MongoDB\n"))
    .catch(() => console.log("Failed to connect to MongoDB \n"));

// creation d'une route API pour une requete POST afin de confirmer la creation d'un objet
app.post('/api/stuff', (req, res, next) =>{
    delete req.body._id;
    console.log(req.body);
    const thing = new Thing({
        ...req.body
    });
    thing.save().then(() => res.status(201).json({message: 'Object created'}))
    .catch((error)=> res.status(400).json({error}));

})

app.get("/api/stuff/:id", (req, res, next) =>{
    Thing.findOne({ _id : req.params.id})
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
})

app.put("/api/stuff/:id", (req, res, next) =>{
    Thing.updateOne({ _id : req.params.id}, {...req.body, _id: req.params.id })
    .then(() => res.status(200).json({message: "Object updated"}))
    .catch(error => res.status(400).json({error}));
})

app.delete("/api/stuff/:id", (req, res, next) =>{
    Thing.deleteOne({ _id : req.params.id})
    .then(() => res.status(200).json({message: "Object deleted"}))
    .catch(error => res.status(400).json({error}));
})

// creation d'une route API pour une req GET afin de renvoyer le type d'objet demandé
app.use("/api/stuff/", (req, res, next) =>{
    Thing.find().then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
})



module.exports = app;