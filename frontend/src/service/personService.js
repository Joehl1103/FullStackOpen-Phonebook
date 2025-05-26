import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    try{
        const request = axios.post(baseUrl,newPerson)
        return request.then(response => response.data)
    } catch (error){
        console.log(`Error occurred while sending axio post request ${error.message}`)
    }
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id,updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`,updatedPerson)
    return request.then(response => response.data)
}

export default {create,getAll,deletePerson,updatePerson}