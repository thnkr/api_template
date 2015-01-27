var keys = require('../../data/auth.json'),
    mongoose = require('mongoose');
    mongoose.connect('mongodb://'+keys.mongo.user+':'+keys.mongo.password+'@'+keys.mongo.uri); //mongodb://<dbuser>:<dbpassword>@<ds063180.mongolab.com:63180/somenewdb>

var item = mongoose.Schema({
    ip: String,
    created: { type: Date, default: Date.now },
    hmac: String,
    tag: String,
    decrypted: { type: Boolean, default: false },
    uri: String,
    iv: String,
    message: String
});

var human = mongoose.Schema({

    id: { type: String, required: true, unique: true},
    created: { type: Date, default: Date.now },
    attributes: {
        hairColor: String,
        residence: String,
        gender: String
    },

    facts: {
        age: Number,
        weight: Number
    },

    meta: {
        agency: String
    }

});

var Human = mongoose.model('human', human);

var models = {};
    models.human = Human;

module.exports = models;


