import axios from "axios";
import db from "../../db.json";

const getJobs = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/jobs`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch {
    return db.jobs;
  }
};

export default getJobs;
