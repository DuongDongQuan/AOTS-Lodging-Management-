const mongoose = require('mongoose')

const connect = async () => {
    try {
        const uri = "mongodb+srv://tnkhanh2909:%3CKhanh%402909%3E@cluster0.isguzub.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(uri)
        console.log('connect successfully')
    }
    catch (error) {
        console.log('connect failure')
        console.log(error)
    }
}

module.exports = { connect }