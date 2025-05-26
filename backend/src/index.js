require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('../models/person')
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
// const personData = require('./db.json')
// let persons = [...personData]

// HELPER METHODS
const todayInfo = new Date(Date.now())

// HTTP METHODS

app.get('/',(request,response) => {
    response.send("<h1>Hello guys</h1><br/><p>What is uuuuuuuuuuup?!")
})

app.get('/api/persons',(request,response) => {
    Person.find({})
        .then(persons => {
            response.send(persons)
        })

})

app.get('/info',(request,response) => {
    const nPerson =  returnNPersons
    Person.find({})
        .then(persons => {
            return [...persons.map(n => n._id)].length

        })
        .then(nPersons => {
            response.send(`<p>Phonebook as info for ${nPersons} persons</p><br>${todayInfo}`)
        })
    
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

// function generateId(){
//     const max = 10000
//     const min = 5
//     const newId = Math.floor(Math.random() * (max-min) + min)
//     return newId 
// }

// function generateRandomNumber(min,max){
//     return 
// }

// function createNewPerson(newName,newNumber){
//     const newPerson = {
//         id: `${generateId()}`,
//         name: newName,
//         number: newNumber,
//     }
//     return newPerson
// }

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
    // const nameAlreadyExists = searchForExisting(body.name)
    // if (nameAlreadyExists){
    //     response.status(400).send("name already exists")
    // }
    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

app.delete('/api/persons/:id',(request,response) => {
    console.log("attempting to delete person")
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            console.log("delete response",result)
            if(response){
                response.status(204).end()
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.error(error.message)
        })
    })

app.put('/api/persons/:id',(request,response)=> {
    const id = request.params.id
    const body = request.body
    const newPhoneNumber = body.number
    const personFound = persons.find(p => p.id === id)
    if (!personFound){
        response.status(404).send("Person not found")
    }
    personFound.number = body.number
    persons.forEach(p => {
        if(p.id === id){
            p = personFound
            response.status(200).send("Person's number updated")
        }
        response.status(404).send("Person not found. Something happened")

    })




    // figure out the update method
})

// POST REQUEST MIDDLEWARE

// executes if no existing route is called
const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

// Set up Port
const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})