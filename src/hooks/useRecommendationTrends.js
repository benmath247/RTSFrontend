import { useState, useEffect } from 'react';
import axios from 'axios';

const useRecommendationTrends = (symbol) => {
    const [recommendationData, setRecommendationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!symbol) return;

        const fetchRecommendations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://finnhub.io/api/v1/stock/recommendation`, {
                    params: {
                        symbol,
                        token: 'd01tecpr01qt2u30mpkgd01tecpr01qt2u30mpl0', // Replace with your actual API key
                    },
                });

                if (response.data && response.data.length > 0) {
                    setRecommendationData(response.data);
                } else {
                    setError('No recommendation data available for the given symbol.');
                }
            } catch (err) {
                console.error('Error fetching recommendation trends:', err); // Log the error for debugging
                setError(err.message || 'An error occurred while fetching recommendation data.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [symbol]);

    return { recommendationData, loading, error };
};

export default useRecommendationTrends;
