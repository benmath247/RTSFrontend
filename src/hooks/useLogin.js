import axios from 'axios';

const useLogin = () => {
    const login = async (formData) => {
        try {
            const response = await axios.post('http://localhost/api/login/', {
                username: formData.username,
                password: formData.password,
            });
            return response.data.message;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Unknown error');
        }
    };

    return { login };
};

export default useLogin;
