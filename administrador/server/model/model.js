const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    titulo : {
        type : String,
        required: true
    },
    ano : {
        type: String,
        required: true
    },
    director : {
        type : String,
        required: true
    },
    actores : {
        type : String,
        required: true
    },
    resena : {
        type : String,
        required: true
    },
    portada : {
        type : String,
        required: true
    },
    link : {
        type : String,
        required: true
    }
})

const Userdb = mongoose.model('usersdb', schema);

module.exports = Userdb;