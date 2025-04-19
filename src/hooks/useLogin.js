import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';

const useLogin = () => {
    const { setUser } = useContext(AuthContext);
    const setUserData = (userData) => {
        setUser(userData);
    };
    const login = async (formData) => {
        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            const response = await axios.post(process.env.REACT_APP_BACKEND + '/api/login/', {
                username: formData.username,
                password: formData.password,
            }, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });

            const user = await axios.get(process.env.REACT_APP_BACKEND + '/api/user/', { withCredentials: true });
            console.log(user.data);
            setUserData(user.data);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error);
        }
    };

    return { login };
};

export default useLogin;
