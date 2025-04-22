import { useState, useEffect } from "react";
import axios from "axios";

const useInsiderTransactions = (symbol, from, to, limit = 100) => {
    const [transactionsData, setTransactionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol) return;

        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://finnhub.io/api/v1/stock/insider-transactions`, {
                    params: {
                        symbol,
                        from,
                        to,
                        limit,
                        token: "d01tecpr01qt2u30mpkgd01tecpr01qt2u30mpl0", // Replace with your actual API key
                    },
                });

                if (response.data && response.data.data) {
                    setTransactionsData(response.data.data);
                } else {
                    setError("No insider transactions data available for the given symbol.");
                }
            } catch (err) {
                console.error("Error fetching insider transactions:", err);
                setError(err.message || "An error occurred while fetching insider transactions data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [symbol, from, to, limit]);

    return { transactionsData, loading, error };
};

export default useInsiderTransactions;
