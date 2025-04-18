import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../providers/AuthProvider';
import NavbarDropdownButton from './NavBarDropdownButton';
import LoginModal from './../modals/LoginModal';

const MainNavBar = () => {
    const { user, loading, handleLoginWithGoogle, handleLogout } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleLoginButtonClick = () => {
        setShow(true);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">RTS Interview</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center">
                        {user && (
                            <>
                                <Nav.Link href="/favorites" className="mx-2">Favorite Stocks</Nav.Link>
                                <Nav.Link href="/profile" className="mx-2">View Profile</Nav.Link>
                                <Nav.Link href="/stock-data" className="mx-2">Search Stocks</Nav.Link>
                            </>
                        )}
                        {loading ? (
                            <Spinner animation="border" role="status" size="sm" className="mx-2">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : user ? (
                            <NavbarDropdownButton user={user} handleLogout={handleLogout} className="mx-2" />
                        ) : (
                            <Nav.Link onClick={handleLoginButtonClick} className="mx-2">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <LoginModal
                show={show}
                onHide={() => setShow(false)}
                handleLoginWithGoogle={handleLoginWithGoogle}
            />
        </Navbar>
    );
};

export default MainNavBar;