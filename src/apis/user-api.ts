import axios from "axios";
import type { Credentials } from "../models/models";

const AUTH_PATH = "http://127.0.0.1:8000/api/token/"

export async function authAPI(credentials: Credentials) {
    try {
        console.log("Connexion", credentials);

        return axios.post(AUTH_PATH, { username: credentials.username, password: credentials.password });
    } catch (err) {
        console.error("Failed to connect", err);
        throw err;
    }
}