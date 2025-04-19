import axios from 'axios';

const useEditProfile = () => {

    const editProfile = async (formData) => {
        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            const response = await axios.put(process.env.REACT_APP_BACKEND + '/api/user/edit/', formData, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                return { errors: error.response.data };
            }
            throw new Error(error.response?.data?.message || error);
        }
    };

    return { editProfile };
};

export default useEditProfile;
