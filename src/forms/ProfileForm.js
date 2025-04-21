import React from "react";
import { Form, Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import useEditProfile from "../hooks/useEditProfile";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const ProfileForm = ({ formData, setFormData, isEditing, onSubmit }) => {
    const { editProfile } = useEditProfile();
    const { user } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "birth_date") {
            formattedValue = value; // Keep the value as is for input compatibility
        }

        setFormData({ ...formData, [name]: formattedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData };

        if (updatedFormData.birth_date) {
            updatedFormData.birth_date = updatedFormData.birth_date.split("-").join("/");
        }

        if (updatedFormData.birth_date === "") {
            delete updatedFormData.birth_date;
        }

        if (!(updatedFormData.profile_picture instanceof File)) {
            delete updatedFormData.profile_picture;
        }

        try {
            const result = await editProfile(updatedFormData);
            if (result.errors) {
                toast.error(result.errors);
            } else {
                onSubmit(updatedFormData);
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    function getProfilePicture() {
        const pic =
            formData.profile_picture instanceof File
                ? URL.createObjectURL(formData.profile_picture)
                : formData.profile_picture;

        if (!pic) {
            if (!user.profilePic) {
                return "https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280w/products/677/22372/42_1K__76704.1633021257.jpg?c=1"
            }
            return user.profile_picture;
        }
        return pic;
    }

    const profilePic = getProfilePicture()

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center mb-3 position-relative">
                    <Image
                        src={profilePic}
                        roundedCircle
                        alt="Profile Picture"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    {isEditing && (
                        <>
                            <input
                                type="file"
                                id="profilePictureInput"
                                style={{ display: "none" }}
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
                                    bottom: "-10px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    padding: "5px 15px",
                                    fontSize: "14px",
                                    borderRadius: "20px",
                                }}
                                onClick={() =>
                                    document.getElementById("profilePictureInput").click()
                                }
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
                            value={formData.birth_date ? formData.birth_date.split("/").join("-") : ""}
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
                                setFormData({ ...formData });
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
