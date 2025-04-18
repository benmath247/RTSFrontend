import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import useLogin from '../hooks/useLogin'; // Import the custom hook

const LoginForm = ({ onHide, handleLoginWithGoogle }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useLogin(); // Use the custom hook

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async () => {
        try {
            const message = await login(formData); // Call the hook's login function
            alert(message); // Display the response message
            onHide();
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    const handleForgotPassword = () => {
        alert('Forgot password clicked'); // Replace with actual logic
    };

    return (
        <div>
            <Button
                onClick={handleLoginWithGoogle}
                style={{ width: "100%" }}
            >
                Sign in with Google
            </Button>
            <div style={{ textAlign: 'center', color: '#6c757d', margin: '0.5rem 0' }}>or</div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '500' }}>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        style={{ borderRadius: '6px', padding: '0.5rem' }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '500' }}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        style={{ borderRadius: '6px', padding: '0.5rem' }}
                    />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="primary"
                        onClick={handleLoginSubmit}
                        style={{
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            fontWeight: '500',
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="link"
                        onClick={handleForgotPassword}
                        style={{
                            color: '#007bff',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                        }}
                    >
                        Forgot Password?
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
