import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjdjMGRjZTgyYTU2ZWIxY2M1OTU5ZTc5NmM1YzAzNSIsInN1YiI6IjY1MDQ2ODU2ZDdkY2QyMDExYzYyNWY1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8puNVRJ6RM5WE79D5Frpe2e_gw_jy-RfTOhlwTc_rYw`
  }
})

export default api