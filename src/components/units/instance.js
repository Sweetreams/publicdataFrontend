import axios from 'axios'
import { setupCache } from "axios-cache-interceptor"
import Cookies from 'js-cookie'
const instance = axios.create({
    baseURL: 'https://publicdataapi.onrender.com',
    timeout: 1000,
    headers: {
        Authorization: Cookies.get('token')
    }
})
setupCache(instance, {
    ttl: 500 * 60
})

export default instance