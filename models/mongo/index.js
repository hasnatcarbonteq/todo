const mongoose = require('mongoose')


const URL = 'mongodb+srv://hasnat:1234@cluster0.l5bbt.mongodb.net/test'

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( res => {
    console.log('DB connected')
}
).catch(err => console.log(err))