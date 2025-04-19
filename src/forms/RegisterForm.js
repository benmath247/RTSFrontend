import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import useRegisterUser from '../hooks/useRegisterUser';

const RegisterForm = ({ onHide }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirm: '',
        first_name: '',
        last_name: '',
        bio: '',
        birth_date: '',
        profile_picture: null,
        email: '', // Added email field
    });

    const registerUser = useRegisterUser();

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleRegisterSubmit = async () => {
        if (formData.password !== formData.password_confirm) {
            toast.error('Passwords do not match.'); // Replace alert with toast
            return;
        }

        const formattedFormData = {
            ...formData,
            birth_date: formData.birth_date ? formData.birth_date.replace(/-/g, '/') : '',
        };

        try {
            await registerUser(formattedFormData);
            toast.success('Registration successful'); // Replace alert with toast
            onHide(); // Switch to login form
        } catch (error) {
            toast.error('Registration failed: ' + (error.response?.data?.message || 'Unknown error')); // Replace alert with toast
        }
    };

    return (
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
                <Form.Label style={{ fontWeight: '500' }}>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
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
            <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500' }}>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    style={{ borderRadius: '6px', padding: '0.5rem' }}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500' }}>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    style={{ borderRadius: '6px', padding: '0.5rem' }}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500' }}>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    style={{ borderRadius: '6px', padding: '0.5rem' }}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500' }}>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself (max 500 characters)"
                    maxLength="500"
                    style={{ borderRadius: '6px', padding: '0.5rem' }}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500' }}>Birth Date</Form.Label>
                <Form.Control
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    style={{ borderRadius: '6px', padding: '0.5rem' }}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500' }}>Profile Picture</Form.Label>
                <Form.Control
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    onChange={handleInputChange}
                    style={{ borderRadius: '6px', padding: '0.5rem' }}
                />
            </Form.Group>
            <Button
                variant="primary"
                onClick={handleRegisterSubmit}
                style={{
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    fontWeight: '500',
                }}
            >
                Register
            </Button>
        </Form>
    );
};

export default RegisterForm;
