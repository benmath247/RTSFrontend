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
            const response = await axios.post('http://localhost/api/login/', {
                username: formData.username,
                password: formData.password,
            }, {
                withCredentials: true,
            });

            const user = await axios.get('http://localhost/api/user/', { withCredentials: true });
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
