// This folder contains our "routes" logic 

const express = require('express');
const router = express.Router();

const Thing = require('../models/thing');

// creation d'une route API pour une requete POST afin de confirmer la creation d'un objet
router.post('/', (req, res, next) =>{
    delete req.body._id;
    console.log(req.body);

    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    thing.save()
    .then(() => res.status(201).json({message: 'Post saved successfully'}))
    .catch((error)=> res.status(400).json({error : error}));

})

router.get("/:id", (req, res, next) =>{
    Thing.findOne({ _id : req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({error : error}));
})

router.put("/:id", (req, res, next) =>{
    Thing.updateOne({ _id : req.params.id}, {...req.body, _id: req.params.id })
    .then(() => res.status(200).json({message: "Thing updated successfully"}))
    .catch(error => res.status(400).json({error : error}));
})

router.delete("/api/stuff/:id", (req, res, next) =>{
    Thing.deleteOne({ _id : req.params.id})
    .then(() => res.status(200).json({message: "Deleted"}))
    .catch(error => res.status(400).json({error : error}));
})

// creation d'une route API pour une req GET afin de renvoyer le type d'objet demandé
router.get('/' + '', (req, res, next) =>{
    Thing.find().then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error : error}));
})


module.exports = router;