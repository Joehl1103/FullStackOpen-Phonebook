import { useState,useEffect } from 'react'
import PersonDisplay from './components/PersonDisplay'
import Search from './components/Search'
import Add from './components/Add'
import personService from './service/personService'
import Notification from './components/Notification'

function App() {
 const [persons,setPersons] = useState([])
 const [newName,setNewName] = useState('')
 const [newPhone,setNewPhone] = useState('')
 const [searchTerm,setSearchTerm] = useState('')
 const [notification,setNotification] = useState(null)
 const [notificationType, setNotificationType] = useState(null)
 // Display current items in database
 const hook = () => {
  // console.log('effect')
  personService
    .getAll()
    .then(displayedPersons => setPersons(displayedPersons))
    .catch(error => {
      console.error(error.message)
    })
  
 }

 useEffect(hook,[])
 
 // Add a person to the list
 function addPersonToList(event){
  // prevent default form behavior: re-rendering the page
  event.preventDefault()

    // console.log("Does newName exist? ",newNameExists)
  const newNameExists = checkForExistingName(newName)

  if(newNameExists){
    updatePerson(newName)
  }

    // create the new object using newName, set by the onChange event handler
  const newPerson = {name: newName,number: newPhone}

  personService
    .create(newPerson)
    .then(hook)
    .then(() => {
        setNotificationType("added")
        setNotification(`Added ${newPerson.name}`)
        timeout()
        })
        // catches the general axio error object and passes it to the error handling function
    .catch(error => errorMessage(error))
}

function updatePerson(newName){

      if(window.confirm(`${newName} already exists in the phonebook. Replace the old number with the new one?`)){
        const personToBeUpdatedArray = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
        const personToBeUpdateId = personToBeUpdatedArray[0].id
        const updatedPerson = {name: newName,number: newPhone}
        personService
          .updatePerson(personToBeUpdateId,updatedPerson)
          .then(hook)
          .then(() => {
            setNotificationType('modified');
            setNotification(`Modified ${personToBeUpdatedArray[0].name}`)
            timeout()
          })
          .catch(error => {
            errorMessage(error)
        })

      }
      return
    }

function checkForExistingName(newName){
  const existingName = persons.filter(person =>  person.name.toLowerCase() === newName.toLowerCase())
  return existingName.length !== 0 ? true : false
}

function deletePerson(id,personToBeDeleted){
  if(window.confirm(`Are you sure you want to delete ${personToBeDeleted.name}?`)){
    personService
    .deletePerson(id,personToBeDeleted)
    .then(() => {
      setNotificationType('deleted')
      setNotification(`Deleted ${personToBeDeleted.name}`)
      timeout()
    }) // hits the API endpoint and deletes the person on the server
    .then(hook)
    .then(() => {
      setNotificationType("deleted")
      setNotification(`Deleted ${personToBeDeleted.name}`)
      timeout()
      })
    .catch(error => errorMessage(error))
  } else {
    return
  }
  
}

function timeout(){
   setTimeout(() => {
        setNotificationType(null)
        setNotification(null)
        },5000)
}

function errorMessage(error){
  // console.log("Error caught on the front end",error)
  // receives the general axios error object
  setNotificationType("error")
  // checks whether or not the response object of the error object contains 
  // the specific error object returned by the server
  if (error.response.data.error.includes('Person validation failed')){
    const validationErrorMessage = error.response.data.error
    setNotification(`${validationErrorMessage}`)
    timeout()
  } else {
    setNotification(`${error.message}`)
    timeout()
  }
  
}


  return (
    <>
      <h2>Phonebook</h2>
      <Notification 
        notificationType={notificationType}
        notification={notification}/>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/>
      <Add
        persons={persons}
        setPersons={setPersons}
        addPersonToList={addPersonToList}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        />
        <h3>List</h3>
      <PersonDisplay 
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}/>
    </>
  )

}

export default App
