import React, { createContext, useEffect, useState } from "react";
import { getUser, logoutUser } from "../utils/api"; // Updated import

export const AuthContext = createContext({
    user: null,
    loading: false,
    error: null,
    handleLoginWithGoogle: () => { },
    handleLogout: () => { },
    setUser: () => { },
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLoginWithGoogle = () => {
        window.location.href = "http://localhost/auth/login/google-oauth2/";
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logoutUser();
            setUser(null);
            setError(null);
            window.location.href = "/";
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                handleLoginWithGoogle,
                handleLogout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
