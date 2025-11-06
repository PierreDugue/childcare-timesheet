import type { Family } from "../models/models";
import axios from "axios";

// export function useSaveFamilly() {
//   const [resOk, setResOk] = useState(false);
//   const [error, setError] = useState(null);

//   const saveFamily = useCallback(async (data: Family) => {
//     try {
//       console.log("Saving family", data);
//       // Simulate API call
//       //  const res = await axios.post(FAKE_POST_URL, data);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setResOk(true);
//     } catch (err: any) {
//       setError(err);
//     }
//   }, []);

//   return { saveFamily, resOk, error };
// }

const FAMILY_PATH = 'http://127.0.0.1:8000/api/families/'

export async function saveFamilyAPI(data: Family) {
  try {
    console.log("Saving family", data);
    return axios.post(FAMILY_PATH, data);
  } catch (err) {
    console.error("Failed to save family", err);
    throw err;
  }
}

export async function fecthAllFamiliesAPI() {
  try {
    return axios.get(FAMILY_PATH);
  } catch (err) {
    console.error("Failed to fetch families", err);
    throw err;
  }
}

export async function removeFamilyAPI(familyId: string) {
  try {
    return axios.delete(`${FAMILY_PATH}${familyId}/`);
  } catch (err) {
    console.error("Failed to delete families", err);
    throw err;
  }
}

export async function updateFamilyNameAPI(familyId: string, name: string) {
  try {
    return axios.patch(`${FAMILY_PATH}${familyId}/`, { name });
  } catch (err) {
    console.error("Failed to update families", err);
    throw err;
  }
}