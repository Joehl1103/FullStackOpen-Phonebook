require('dotenv').config()
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

// HELPER METHODS
const todayInfo = new Date(Date.now())

// HTTP METHODS

app.get('/',(request,response) => {
    response.send('<h1>Hello guys</h1><br/><p>What is uuuuuuuuuuup?!')
})

app.get('/api/persons',(request,response,next) => {
    Person.find({})
        .then(persons => {
            console.log(persons)
            response.send(persons)
        })
        .catch(error => {
            next(error)
        })

})

app.get('/info',(request,response,next) => {
    console.log('fetching general info')
    Person.find({})
        .then(persons => {
            return [...persons.map(n => n._id)].length

        })
        .then(nPersons => {
            response.send(`<p>Phonebook has info for ${nPersons} persons</p><br>${todayInfo}`)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id',(request,response,next) => {
    // console.log(request)
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if (person){
                response.json(person)
            } else {
                response.status(404).send('Person does not exist.')
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons',(request,response,next) => {
    console.log('Post request parameters',request.params)
    const body = request.body
    console.log('Post body',body)
    const name = body.name
    const number = body.number
    if (name === '' || number === ''){
        response.status(400).send('name or number missing')
    }
    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
    // catches the error and passes it to the error handling middleware
        .catch(error => next(error))

})

app.delete('/api/persons/:id',(request,response,next) => {
    console.log('attempting to delete person')
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            console.log('delete response',result)
            if(response){
                response.status(204).end()
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id',(request,response,next) => {
    console.log(request.params)
    const id = request.params.id
    const body = request.body
    Person.findById(id)
        .then(person => {
            if (!person){
                response.status(404).send('Person not found')
            }
            person.name = body.name
            person.number = body.number

            return person.save().then((updatedPerson => {
                response.json(updatedPerson)
            }))

        })
        .catch(error => next(error))
})

// POST REQUEST MIDDLEWARE

// executes if no existing route is called

const errorHandler = (error,request,response,next) => {
    console.log('error message:',error.message)
    if (error.message.includes('Person validation failed')){
        console.log('Validation error')
        console.log('HTTP status response',response.status(400))
        console.log(`Error message ${error.message}`)
        // returns a bad request status as well as a jsonified version of the error as a response object
        // within the bad request object
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

// Set up Port
const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})