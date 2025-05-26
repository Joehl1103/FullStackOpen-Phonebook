const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(response => {
        console.log("connected to database at the following url ",url)
    })
    .catch(error => {
        console.log("An error occurred while connecting ",error.message)
    })

// set the schema for the person object
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// configure the setter such that id is a string
mongoose.set('toJSON', {// something is here; what is the set acting on?
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
    }
)
// export the person schema
module.exports = mongoose.model('Person',personSchema)