import { useState, useEffect } from 'react';
import axios from 'axios';

const useEarningsSurprises = (symbol, limit = 4) => {
    const [earningsData, setEarningsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol) return;

        const fetchEarnings = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://finnhub.io/api/v1/stock/earnings`, {
                    params: {
                        symbol,
                        limit,
                        token: 'd01tecpr01qt2u30mpkgd01tecpr01qt2u30mpl0', // Replace with your actual API key
                    },
                });

                if (response.data && response.data.length > 0) {
                    setEarningsData(response.data);
                } else {
                    setError('No earnings data available for the given symbol.');
                }
            } catch (err) {
                console.error('Error fetching earnings:', err); // Log the error for debugging
                setError(err.message || 'An error occurred while fetching earnings data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEarnings();
    }, [symbol, limit]);

    return { earningsData, loading, error };
};

export default useEarningsSurprises;
