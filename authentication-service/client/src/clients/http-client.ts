import axios from "axios"

export const httpClient = axios.create({
  // TODO change this to an env var
  baseURL: "http://localhost:3001/",
  withCredentials: true,
})
