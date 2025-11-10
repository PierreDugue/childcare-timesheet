import axios from "axios";
import type { Credentials } from "../models/models";

const AUTH_PATH = "http://127.0.0.1:8000/api/token/"

axios.get("http://127.0.0.1:8000/api/families/")
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

export async function authAPI(credentials: Credentials) {
    try {
        console.log("Connexion");
        // Temporary dev 
        return axios.post(AUTH_PATH, { username: credentials.username, password: credentials.password });
    } catch (err) {
        console.error("Failed to connect", err);
        throw err;
    }
}