import axios from 'axios';

export const fetchUserData = async () => {
    const response = await axios.get(process.env.REACT_APP_BACKEND + '/api/user/');
    return response.data;
};

export const updateUserProfile = async (formData) => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
        if (formData[key]) {
            data.append(key, formData[key]);
        }
    });

    const response = await axios.patch(process.env.REACT_APP_BACKEND + '/api/user/edit/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};
