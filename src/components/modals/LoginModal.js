import React, { useState } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import LoginForm from '../../forms/LoginForm';
import RegisterForm from '../../forms/RegisterForm';

const LoginModal = ({ show, onHide, handleLoginWithGoogle }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Modal show={show} onHide={onHide} centered style={{ padding: '1rem' }}>
            <Modal.Header>
                <Modal.Title style={{ color: '#212529', fontWeight: 'bold' }}>Sign Up or Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center mb-4">
                    <ButtonGroup>
                        <Button
                            variant={isLogin ? 'primary' : 'outline-primary'}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </Button>
                        <Button
                            variant={!isLogin ? 'primary' : 'outline-primary'}
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </Button>
                    </ButtonGroup>
                </div>
                {isLogin ? (
                    <LoginForm onHide={onHide} handleLoginWithGoogle={handleLoginWithGoogle} />
                ) : (
                    <RegisterForm onHide={onHide} />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
