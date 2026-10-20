import axios from "axios";
import db from "../../db.json";

const getDegrees = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/degrees`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch {
    return db.degrees;
  }
};

export default getDegrees;
