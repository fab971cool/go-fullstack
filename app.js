const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept,\
    Content, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.post('/api/stuff', (req, res, next) =>{
    console.log(req.body);
    res.status(201).json({
        message: 'Object created'
    });
})

app.use("/api/stuff", (req, res, next) =>{
    const stuff = [
        {
            _id :"fueozf",
            title: "My first object",
            description : "Information of the object",
            price: 4900,
            imageUrl :'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            userId : "vdnzjkvzn"

        },
        {
            _id :"fezfefféfvrg",
            title: "My second object",
            description : "Information of the second object",
            price: 4900,
            imageUrl :'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            userId : "fzefezfefze"

        }
    ];
    res.status(200).json(stuff);
})

module.exports = app;