const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

// MIDDLEWARE
const morgan = require('morgan')

morgan.token('user-info',function(req,res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] -:response-time ms :user-info'))



app.use(express.json())
app.use(express.static('dist'))

// DATA
const personData = require('./db.json')
let persons = [...personData]

// HELPER METHODS
const nPersons = [...persons.map(n => n.id)].length
const todayInfo = new Date(Date.now())

// HTTP METHODS

app.get('/',(request,response) => {
    response.send("<h1>Hello guys</h1><br/><p>What is uuuuuuuuuuup?!")
})

app.get('/info',(request,response) => {
    response.send(`<p>Phonebook as info for ${nPersons} persons</p><br>${todayInfo}`)
})

app.get('/api/persons',(request,response) => {
    response.send(persons)
})

app.get('/api/persons/:id',(request,response)=> {
    // console.log(request)
    const id = request.params.id
    const person = persons.find(p => p.id === id) // find return an individual element in an array as opposed to an array of items
    if (person){
        response.send(person)
    } else {
        response.status(404).send("Person does not exist.")
    }
})

function generateId(){
    const max = 10000
    const min = 5
    const newId = Math.floor(Math.random() * (max-min) + min)
    return newId 
}

function generateRandomNumber(min,max){
    return 
}

function createNewPerson(newName,newNumber){
    const newPerson = {
        id: `${generateId()}`,
        name: newName,
        number: newNumber,
    }
    return newPerson
}

function searchForExisting(name){
    const existingNameArray = [...persons.map(n => n.name)]
    console.log("Existing name array",existingNameArray)
    const exists = existingNameArray.find(n => n === name) ? true : false
    console.log("Exists",exists)
    return exists
}

app.post('/api/persons',(request,response) => {
    console.log(request.params)
    const body = request.body
    console.log("body",body)
    const name = body.name
    const number = body.number
    if (name === '' || number === ''){
        response.status(400).send("name or number missing")
    }
    const nameAlreadyExists = searchForExisting(body.name)
    if (nameAlreadyExists){
        response.status(400).send("name already exists")
    }
    const newPerson = createNewPerson(name,number)
    persons = persons.concat(newPerson)
    response.status(201).end()

})

app.delete('/api/persons/:id',(request,response) => {
    console.log("attempting to delete person")
    try {  
    const id = request.params.id
    let personFound = persons.find(p => p.id === id)
    if(personFound){
        persons = persons.filter(p => p.id !== id)
        response.status(204).end()
    } else {
        response.send("Person not found")
    }
    } catch (error){
        console.error(error.message)
    }
})

// POST REQUEST MIDDLEWARE

// executes if no existing route is called
const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

// Set up Port
const PORT = 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})