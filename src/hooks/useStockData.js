import { useState } from 'react';
import axios from 'axios';

const useStockData = () => {
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');

    const fetchStockData = async (ticker) => {
        if (!ticker) {
            setError('Ticker is required');
            return;
        }

        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND + '/api/stock-data/', { params: { ticker } });
            setStockData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch stock data');
        }
    };

    return { stockData, error, fetchStockData, setError };
};

export default useStockData;
