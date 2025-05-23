import { useState, useCallback } from "react";
import axios from "axios";

const useStockData = () => {
  const [stockPriceData, setStockPriceData] = useState(null);
  const [error, setError] = useState("");

  const fetchStockData = useCallback(async (ticker) => {
    if (!ticker) {
      setError("Ticker is required");
      return;
    }
    // get REACT_APP_BACKEND from .env
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND + "/api/stock-price/",
        { params: { ticker } },
      );
      setStockPriceData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch stock data");
    }
  }, []);

  return { stockPriceData, error, fetchStockData, setError };
};

export default useStockData;
