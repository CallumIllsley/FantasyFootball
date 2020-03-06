import axios from 'axios'

const api = axios.create({ 
    baseURL: 'http://localhost:5656'
})

export const signUp = (payload:any) => api.post('/users', payload)
export const login = (payload:any) => api.post('/users/login', payload)
export const logout = (payload:any) => api.post('/users/logout', payload)
export const logoutall = (payload:any) => api.post('/users/logoutall', payload)
export const signIn = (payload: any) => api.post('/users/me', payload)

export const createPlayer = (payload:any) => api.post('/players', payload)
export const deletePlayer = (id:string, payload:any) => api.post(`/players/${id}`, payload)
export const updatePlayer = (id:string, payload:any) => api.post(`/players/${id}`, payload)