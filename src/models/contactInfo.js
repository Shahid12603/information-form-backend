const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    name : {
        type: 'String',
        required: true
    },

    email : {
        type: 'String',
        required: true
    },

    phone : {
        type: 'Number',
        required: true
    },

    gender : {
        type: 'String',
        required: true
    },
    address: {
        type: 'String',
        required: true
    }
})

module.exports = contactInfoSchema

module.exports = mongoose.model('contactInfo', contactInfoSchema)