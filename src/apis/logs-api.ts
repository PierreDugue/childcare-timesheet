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

export async function saveFamily(data: Family) {
  try {
    console.log("Saving family", data);
    // Simulate API call
    // await axios.post("/family", data);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios.post("https://jsonplaceholder.typicode.com/posts", data);
  } catch (err) {
    console.error("Failed to save family", err);
    throw err;
  }
}
