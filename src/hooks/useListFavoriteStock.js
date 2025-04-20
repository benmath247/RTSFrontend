import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export default function useListFavoriteStock() {
    const { user } = useContext(AuthContext);
    return async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND + '/api/favorite-stocks/',
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error listing favorite stocks:', error);
        }
    };
}
