import axios from 'axios';

const useEditProfile = () => {

    const editProfile = async (formData) => {
        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            const response = await axios.put('http://localhost/api/user/edit/', {
                ...formData
            }, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
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
