import axios from "axios";

export const getUser = async () => {

    return await axios.get(process.env.REACT_APP_BACKEND + "/api/user/", {
        withCredentials: true,
    });
};

export const logoutUser = async () => {
    const getCsrfToken = () => {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="))
            ?.split("=")[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    };

    const csrfToken = getCsrfToken();
    return await axios.post(
        process.env.REACT_APP_BACKEND + "/api/logout/",
        {},
        {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );
};
