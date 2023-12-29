import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
})

export function retrieveTodosByUsername(username){
    return apiClient.get(`/todos/${username}`)
}

export function retrieveHello(username){
    return apiClient.get(`/helloworld/${username}`)
}