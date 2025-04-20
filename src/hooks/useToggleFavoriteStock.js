import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify'; // Import toast utility

function useToggleFavoriteStock(isFavoriteStock, setIsFavoriteStock, ticker) {
    const { user } = useContext(AuthContext);

    return async () => {
        const url = isFavoriteStock ? '/api/favorite-stocks/delete/' + ticker + '/' : '/api/favorite-stocks/create/';
        const message = isFavoriteStock ? 'Stock successfully removed from favorites!' : 'Stock added to favorites successfully!';
        const method = isFavoriteStock ? 'delete' : 'post'; // Correctly set method as a string

        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1]; // Extract CSRF token from cookies

            await axios({
                method, // Use the dynamic method
                url: process.env.REACT_APP_BACKEND + url,
                data: { stock_symbol: ticker, user: user.id },
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in headers
                },
            }).then(() => {
                setIsFavoriteStock(!isFavoriteStock);
            });

            toast.success(message);
        } catch (error) {
            console.error('Error toggling favorite stock:', error.response?.data || error.message); // Improved error logging
            toast.error('Failed to toggle stock favorite status.'); // Generalized failure toast
        }
    };
}

export default useToggleFavoriteStock;