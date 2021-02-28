const mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST
const connectDB = async () => {
    mongoose.connect(DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log('connection is successful');
    }).catch((e) => {
        console.log(`there is a problem in connection ERROR : ${e}`)
    });
}

module.exports = connectDB