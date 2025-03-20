import axios from 'axios'
import { setupCache } from "axios-cache-interceptor"
import Cookies from 'js-cookie'

const instance = axios.create({
    baseURL: 'https://publicdataapi.onrender.com',
    headers: {
        Authorization: Cookies.get('token')
    }
})

export const authUserAxios = axios.create({
    baseURL: 'https://publicdataapi.onrender.com/user/loginuser',
    method: "post",
})

export const createUserAxios = axios.create({
    baseURL: 'https://publicdataapi.onrender.com/user/createuser',
    method: "post",
})

export const deleteData = axios.create({
    baseURL: 'https://publicdataapi.onrender.com/set/deletesetdbanddataset',
    method: "delete",
    headers: {
        Authorization: Cookies.get('token')
    }
})

export const createData = axios.create({
    baseURL: 'https://publicdataapi.onrender.com/set/createsetanddataset',
    method: "delete",
    headers: {
        Authorization: Cookies.get('token')
    }
})

setupCache(instance, {
    ttl: 1000 * 60
})

export default instance