import React, { useState } from 'react';
import { Form, Button, Image, Toast } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Import toast
import useEditProfile from '../hooks/useEditProfile';

const ProfileForm = ({ formData, setFormData, isEditing, onSubmit }) => {
    const { editProfile } = useEditProfile();

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

        // Remove profile_picture if it's not a file
        if (!(updatedFormData.profile_picture instanceof File)) {
            delete updatedFormData.profile_picture;
        }

        try {
            const result = await editProfile(updatedFormData);
            if (result.errors) {
                toast.error(result.errors); // Show toast on error
            } else {
                onSubmit(updatedFormData);
                toast.success("Profile updated successfully!"); // Show success toast
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            {/* {errors && (
                <div className="alert alert-danger">
                    {Object.entries(errors).map(([field, messages]) => (
                        <div key={field}>
                            <strong>{field}:</strong> {messages.join(', ')}
                        </div>
                    ))}
                </div>
            )} */}
            <Form onSubmit={handleSubmit}>

                <div className="d-flex justify-content-center mb-3 position-relative">
                    <Image
                        src={formData.profile_picture instanceof File ? URL.createObjectURL(formData.profile_picture) : formData.profile_picture}
                        roundedCircle
                        alt="Profile Picture"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    {isEditing && (
                        <>
                            <input
                                type="file"
                                id="profilePictureInput"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setFormData({ ...formData, profile_picture: file });
                                    }
                                }}
                            />
                            <Button
                                variant="secondary"
                                className="position-absolute"
                                style={{
                                    bottom: '-10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '5px 15px',
                                    fontSize: '14px',
                                    borderRadius: '20px',
                                }}
                                onClick={() => document.getElementById('profilePictureInput').click()}
                            >
                                Upload Photo
                            </Button>
                        </>
                    )}
                </div>
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
                    <div className="d-flex justify-content-between">
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setFormData({ ...formData }); // Reset form data if needed
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
};

export default ProfileForm;
