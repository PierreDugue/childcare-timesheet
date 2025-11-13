import axios from "axios";
import { store } from "../app/store";
import type { Family, FamilyLogs } from "../models/models";
import { getCurrentUser } from "../slices/userSlice";

const FAMILY_PATH = 'http://127.0.0.1:8000/api/families/';
const LOGS_PATH = 'http://127.0.0.1:8000/api/logs/';

const HEADER = () => {
  const state = store.getState();
  const user = getCurrentUser(state);
  return { headers: { Authorization: `Bearer ${user.token}` } }
}

export async function saveFamilyAPI(data: Family) {
  try {
    console.log("Saving family", data);
    return axios.post(FAMILY_PATH, data, HEADER());
  } catch (err) {
    console.error("Failed to save family", err);
    throw err;
  }
}

export async function fecthAllFamiliesAPI() {
  try {
    return axios.get(FAMILY_PATH, HEADER());
  } catch (err) {
    console.error("Failed to fetch families", err);
    throw err;
  }
}

export async function removeFamilyAPI(familyId: string) {
  try {
    return axios.delete(`${FAMILY_PATH}${familyId}/`, HEADER());
  } catch (err) {
    console.error("Failed to delete families", err);
    throw err;
  }
}

export async function updateFamilyNameAPI(familyId: string, name: string) {
  try {
    return axios.patch(`${FAMILY_PATH}${familyId}/`, { name }, HEADER());
  } catch (err) {
    console.error("Failed to update families", err);
    throw err;
  }
}

export async function addLogsAPI(family: Family, logs: FamilyLogs) {
  try {
    return axios.post(`${LOGS_PATH}`, { family: family.familyId, ...logs }, HEADER());
  } catch (err) {
    console.error("Failed to add logs", err);
    throw err;
  }
}

export async function updateLogAPI(family: Family, logs: FamilyLogs) {
  try {
    return axios.patch(`${LOGS_PATH}`, { family: family.familyId, ...logs }, HEADER());
  } catch (err) {
    console.error("Failed to add logs", err);
    throw err;
  }
}

export async function removeLogAPI(logId: number) {
  try {
    return axios.delete(`${LOGS_PATH}${logId}/`, HEADER());
  } catch (err) {
    console.error("Failed to remove logs", err);
    throw err;
  }
}