import axios from "axios";

export const API = axios.create({
    baseURL:"http://34.101.66.76:5050/api/v1",
})