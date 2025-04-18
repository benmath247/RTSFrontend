import React, { useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import ProfileForm from '../forms/ProfileForm';

const Profile = () => {
    const { user, loading, error } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        bio: '',
        birth_date: '',
        profile_picture: null,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                username: user.username || '',
                bio: user.bio || '',
                birth_date: user.birth_date || '',
                profile_picture: user.profile_picture || "https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280w/products/677/22372/42_1K__76704.1633021257.jpg?c=1",
            });
        }
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return null;

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };


    const handleSubmit = (updatedData) => {
        console.log("Submitting updated profile data:", updatedData);
        // TODO: Send updatedData to the backend via an API call
        setIsEditing(false);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2>Profile</h2>
                                <FaEdit
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleEditToggle}
                                />
                            </div>

                            <ProfileForm
                                formData={formData}
                                setFormData={setFormData}
                                isEditing={isEditing}
                                onSubmit={handleSubmit}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;