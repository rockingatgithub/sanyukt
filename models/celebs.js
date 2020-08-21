const mongoose = require('mongoose')

const celebsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        description: {
            type: String,
        },
        location: {
            type: String,
        },
        profession: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Celebs = mongoose.model('Celebs', celebsSchema)
module.exports = Celebs
