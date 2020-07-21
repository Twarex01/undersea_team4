import axios from 'axios'
import {Config} from '../constants/config'
import AsyncStorage from '@react-native-community/async-storage'
import {Token} from '../constants/token'

const Network = axios.create({
  baseURL: Config.baseURL,
  timeout: 15000,
})

Network.interceptors.request.use(
  async reqConfig => {
    //Access token
    const accessToken = await AsyncStorage.getItem(Token.ACCESS_TOKEN)
    if (accessToken) {
      reqConfig.headers = {
        ...reqConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
    return reqConfig
  },
  error => {
    Promise.reject(error)
  },
)

export default Network
