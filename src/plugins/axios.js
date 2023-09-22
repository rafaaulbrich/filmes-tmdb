import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer 6f7c0dce82a56eb1cc5959e796c5c035`
  }
})

export default api