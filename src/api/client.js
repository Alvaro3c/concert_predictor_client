import axios from 'axios'

const client = axios.create({
  baseURL: 'https://concert-predictor-server.onrender.com',
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail ?? error.message
    const err = new Error(message)
    err.response = error.response
    return Promise.reject(err)
  }
)

export default client
