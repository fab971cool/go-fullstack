const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    title : { type : String, required : true},
    description : { type : String, required : true},
    imageUrl : { type : String, required : true},
    userId : { type : String, required : true},
    price : { type : Number, required : true},
});

// exportation du model en tant que mongoose + pour Express 
module.exports = mongoose.model('Thing', thingSchema);
