import axios from 'axios';

const useEditProfile = () => {

    const editProfile = async (formData) => {
        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            const headers = {
                'X-CSRFToken': csrfToken,
            };

            // Set Content-Type only if formData contains a file
            if (formData.profile_picture instanceof File) {
                headers['Content-Type'] = 'multipart/form-data';
            }

            const response = await axios.put(process.env.REACT_APP_BACKEND + '/api/user/edit/', formData, {
                withCredentials: true,
                headers,
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
