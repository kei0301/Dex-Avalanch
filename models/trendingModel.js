const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TrendingOptionSchema = mongoose.Schema({
    optionId: {
        type: ObjectId,
        ref: 'option'
    },
    tokenName: {
        type: String,
    },
    address: {
        type: String
    },
    network: {
        type: String
    }
},
    {
        timestamps: true
    });

const TrendingOption = mongoose.model('TrendingOption', TrendingOptionSchema)

module.exports = TrendingOption;
