import { useState, useEffect } from 'react';
import axios from 'axios';

const useCompanyNews = (symbol) => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(symbol)

    useEffect(() => {
        if (!symbol) return;

        const fetchNews = async () => {
            setLoading(true);
            setError(null);

            const today = new Date();
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(today.getFullYear() - 1);

            const formatDate = (date) => date.toISOString().split('T')[0];

            const from = formatDate(oneYearAgo);
            const to = formatDate(today);

            try {
                const response = await axios.get(`https://finnhub.io/api/v1/company-news`, {
                    params: {
                        symbol,
                        from,
                        to,
                        token: 'd01tecpr01qt2u30mpkgd01tecpr01qt2u30mpl0', // Replace with your actual API key
                    },
                });

                if (response.data && response.data.length > 0) {
                    setNewsData(response.data);
                } else {
                    setError('No news data available for the given symbol.');
                }
            } catch (err) {
                console.error('Error fetching news:', err); // Log the error for debugging
                setError(err.message || 'An error occurred while fetching news data.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [symbol]);

    return { newsData, loading, error };
};

export default useCompanyNews;
