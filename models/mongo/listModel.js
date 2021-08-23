const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ListSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            
            trim: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        dueDate: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    }
)


module.exports = mongoose.model('List', ListSchema)