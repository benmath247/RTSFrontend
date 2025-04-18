import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider'; // Updated import
import LoginModal from '../components/modals/LoginModal'; // Import the LoginModal component

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [showLoginModal, setShowLoginModal] = useState(false); // State for modal visibility

    const handleLoginClick = () => setShowLoginModal(true);
    const handleCloseModal = () => setShowLoginModal(false);

    return (
        <Container className='mt-4'>
            <h1>Welcome, RTS Labs!</h1>
            <p>I hope you enjoy the application!</p>
            {user ? (
                <>You are logged in</>
            ) : (
                <p>
                    Please <a onClick={handleLoginClick}><u>login</u></a> to see more.
                </p>
            )}
            <LoginModal show={showLoginModal} onHide={handleCloseModal} /> {/* Render LoginModal */}
        </Container>
    );
};

export default HomePage;