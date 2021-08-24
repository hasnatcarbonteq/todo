const mongoose = require('mongoose')
const uuid = require('uuid')

const Schema = mongoose.Schema

const ListSchema = new Schema(
    {
        _id: { 
            type: String, 
            default: uuid.v1
        },
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
            type: String,
            ref: 'User',
        },
    }
)


module.exports = mongoose.model('List', ListSchema)