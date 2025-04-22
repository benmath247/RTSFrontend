import { useState, useEffect } from "react";
import axios from "axios";

function useInsiderSentiment(stockSymbol, fromDate, toDate) {
    const [sentimentData, setSentimentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!stockSymbol || !fromDate || !toDate) return;

        const fetchInsiderSentiment = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://finnhub.io/api/v1/stock/insider-sentiment`, {
                    params: {
                        symbol: stockSymbol,
                        from: fromDate,
                        to: toDate,
                        token: "d01tecpr01qt2u30mpkgd01tecpr01qt2u30mpl0", // Replace with your actual API key
                    },
                });

                if (response.data && response.data.data) {
                    setSentimentData(response.data);
                } else {
                    setError("No insider sentiment data available for the given symbol.");
                }
            } catch (err) {
                console.error("Error fetching insider sentiment:", err); // Log the error for debugging
                setError(err.message || "An error occurred while fetching insider sentiment data.");
            } finally {
                setLoading(false);
            }
        };

        fetchInsiderSentiment();
    }, [stockSymbol, fromDate, toDate]);

    return { sentimentData, loading, error };
}

export default useInsiderSentiment;
