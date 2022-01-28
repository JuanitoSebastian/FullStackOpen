import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}



const setToken = tokenToSet => {
  token = `bearer ${tokenToSet}`
}

const exportedObjects = {
  getAll,
  setToken,
  create
}

export default exportedObjects