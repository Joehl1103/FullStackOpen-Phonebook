const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log("Give password as an argument")
    process.exit(1)
}
const processArgsLength = process.argv.length
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (processArgsLength > 3 && (!name || !number)){
    console.log("Name or number missing")
    process.exit(1)
}

const url = `mongodb+srv://jkhloomis:${password}@cluster0.z1gftkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String // note that I could likely use RegEx to validate it as a phone number
})

const Person = mongoose.model('Person',personSchema)

const person = new Person({
    name: name,
    number: number
})

if (processArgsLength === 3){
    // code for displaying all entries
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

} else {
    // code for adding one person

    person.save().then(result => {
        console.log("Person added to phonebook")
        mongoose.connection.close()
    })

}
