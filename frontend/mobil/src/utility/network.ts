import axios from 'axios'
import {Config} from '../constants/config'

const Network = axios.create({
  baseURL: Config.baseUrl,
  timeout: 15000,
})

Network.interceptors.request.use(
  async reqConfig => {
    //Access token
    return reqConfig
  },
  error => {
    Promise.reject(error)
  },
)

export default Network
