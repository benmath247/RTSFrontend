import axios from "axios";
import { toast } from "react-toastify";

const fetchStockProfile = async (ticker) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND + "/api/stock-profile/",
      { params: { ticker } }, // Correctly send ticker as a parameter
    );
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.error || "Failed to fetch stock data");
    return null;
  }
};

export default fetchStockProfile;
