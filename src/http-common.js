import axios from 'axios'

const axiosObj = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
})

export default axiosObj