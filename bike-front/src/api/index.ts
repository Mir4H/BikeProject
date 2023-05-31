import axios from 'axios'

export const BASE_URL: string = 'https://localhost:5001'

interface Endpoints {
  BikeRide: string
  BikeStation: string
}

export const ENDPOINTS: Endpoints = {
  BikeRide: 'bikeRide',
  BikeStation: 'bikeStation'
}

export const apiEndpoint = (endpoint: string) => {
  const url: string = `${BASE_URL}/${endpoint}`
  return {
    fetch: () => axios.get(url),
    fetchById: (id: number) => axios.get(`${url}/${id}`),
    post: (newRecord: string) => axios.post(url, newRecord)
  }
}
