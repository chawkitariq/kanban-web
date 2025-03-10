import { API_BASE_URL } from '@/constants'
import axios from 'axios'

const api = axios.create({
    baseURL: API_BASE_URL
})

export {
    api
}