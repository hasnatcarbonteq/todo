const mongoose = require('mongoose')
const uuid = require('uuid')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        _id: { 
            type: String, 
            default: uuid.v1 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
    }
)


module.exports = mongoose.model('User', UserSchema)