const mongoose = require('mongoose')

const connect = async () => {
    try {
        const uri = "mongodb://127.0.0.1:27017/test";
        await mongoose.connect(uri)
        console.log('Connect mongoose successfully!!!');
    } catch (error) {
        console.log('Connect mongoose failure!!!');
        console.log(error);
    }
}

module.exports = { connect }