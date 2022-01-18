import axios from 'axios'
const baseUrl = 'https://mighty-atoll-71806.herokuapp.com/api/persons'


const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const createPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then(res => res.data)
}

const removePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

const updatePerson = (personObject) => {
  const request = axios.put(`${baseUrl}/${personObject.id}`, personObject)
  return request.then(res => res.data)
}

const personsService = { getAll, createPerson, removePerson, updatePerson }

export default personsService