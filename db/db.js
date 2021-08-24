const mongoose = require('mongoose');
require('dotenv').config()

const Uri = process.env.MONGO_URL   // mongodb://localhost/test

const InitiateMongoServer = async () => {
    try{
        await mongoose.connect(Uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
          console.log("Connected to DB !!");
    }catch (error){
        console.log(error);
        throw error;
    }
}

module.exports = InitiateMongoServer;