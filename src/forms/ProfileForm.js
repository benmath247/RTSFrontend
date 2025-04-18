import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useEditProfile from '../hooks/useEditProfile';

const ProfileForm = ({ formData, setFormData, isEditing, onSubmit }) => {
    const { editProfile } = useEditProfile();
    const [errors, setErrors] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData };
        if (updatedFormData.birth_date === "") {
            delete updatedFormData.birth_date;
        }
        try {
            const result = await editProfile(updatedFormData);
            if (result.errors) {
                setErrors(result.errors);
            } else {
                setErrors(null);
                onSubmit(updatedFormData);
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <>
            {errors && (
                <div className="alert alert-danger">
                    {Object.entries(errors).map(([field, messages]) => (
                        <div key={field}>
                            <strong>{field}:</strong> {messages.join(', ')}
                        </div>
                    ))}
                </div>
            )}
            <Form onSubmit={handleSubmit}>
                <fieldset disabled={!isEditing}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </fieldset>
                {isEditing && (
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                )}
            </Form>
        </>
    );
};

export default ProfileForm;
