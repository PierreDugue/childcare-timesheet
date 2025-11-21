import axios from "axios";
import type { Credentials } from "../models/models";
import { BASE_URL } from "./utils";

const AUTH_PATH = `${BASE_URL}/api/token/`
const CREATE_PATH = `${BASE_URL}/api/register/`

export async function authAPI({ username, password }: Credentials) {
    try {
        return axios.post(AUTH_PATH, { username, password });
    } catch (err) {
        console.error("Failed to connect", err);
        throw err;
    }
}

export async function createUserAPI({ username, password, email }: Credentials) {
    try {
        return axios.post(CREATE_PATH, { username, password, email });
    } catch (err) {
        console.error("Failed to create user", err);
        throw err;
    }
}