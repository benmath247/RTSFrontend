import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import LoginModal from '../components/modals/LoginModal';
import { toast } from "react-toastify";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [initialForm, setInitialForm] = useState('login');

    const handleLoginClick = () => {
        setInitialForm('login');
        setShowLoginModal(true);
    };

    const handleRegisterClick = () => {
        setInitialForm('register');
        setShowLoginModal(true);
    };

    const handleCloseModal = () => setShowLoginModal(false);

    return (
        <Container className='mt-4'>
            <h1>Welcome, RTS Labs!</h1>
            <p>I hope you enjoy the application!</p>
            {user ? (
                <>You are logged in</>
            ) : (
                <p>
                    Please <a onClick={handleLoginClick}><u>login</u></a> or <a onClick={handleRegisterClick}><u>register</u></a> to see more.
                </p>
            )}
            <LoginModal show={showLoginModal} onHide={handleCloseModal} initialForm={initialForm} />
        </Container>
    );
};

export default HomePage;