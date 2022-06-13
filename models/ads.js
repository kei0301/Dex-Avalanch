const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Adsschema = mongoose.Schema({
    optionId: {
        type: ObjectId,
        ref: 'option'
    },
    network: {
        type: String,
    },
    file1: {
        type: String
    },
    file2: {
        type: String
    },
    file3: {
        type: String
    }
},
    {
        timestamps: true
    });

const Ads = mongoose.model('Ads', Adsschema)

module.exports = Ads;
