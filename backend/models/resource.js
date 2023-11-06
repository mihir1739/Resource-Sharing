const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Resources = mongoose.model('resources', resourceSchema);
module.exports = Resources;
