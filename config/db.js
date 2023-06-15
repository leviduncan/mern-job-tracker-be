const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology: true})

        console.log('DB Connected...')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}


module.exports = connectDB