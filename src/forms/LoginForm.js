import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "../hooks/useLogin";

const LoginForm = ({ onHide }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { login } = useLogin();

    useEffect(() => {
        if (loginSuccess) {
            onHide();
        }
    }, [loginSuccess, onHide]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async () => {
        await login(formData);

        setLoginSuccess(true);
    };

    return (
        <div>
            <div
                style={{ textAlign: "center", color: "#6c757d", margin: "0.5rem 0" }}
            >
                <span>or</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                <Button
                    onClick={() =>
                        window.location.assign(
                            `${process.env.REACT_APP_BACKEND}/auth/login/google-oauth2/`
                        )
                    }
                    variant="outline-primary"
                >
                    Sign in with Google
                </Button>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        id="login-username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        style={{ borderRadius: "6px", padding: "0.5rem" }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        style={{ borderRadius: "6px", padding: "0.5rem" }}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={handleLoginSubmit}
                >
                    Log In
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;
