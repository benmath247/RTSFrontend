import axios from 'axios';

const useRegisterUser = () => {
    const registerUser = async (formData) => {


        const response = await axios.post('http://localhost/api/user/create/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    };

    return registerUser;
};

export default useRegisterUser;
