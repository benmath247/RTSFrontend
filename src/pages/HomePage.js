import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoginModal from "../components/modals/LoginModal";
import { toast } from "react-toastify";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [initialForm, setInitialForm] = useState("login");

    const handleLoginClick = () => {
        setInitialForm("login");
        setShowLoginModal(true);
    };

    const handleRegisterClick = () => {
        setInitialForm("register");
        setShowLoginModal(true);
    };

    const handleCloseModal = () => setShowLoginModal(false);

    return (
        <Container className="mt-4">
            <h1>Welcome, RTS Labs!</h1>
            <p>I hope you enjoy the application!</p>
            {user ? (
                <section>

                    <h2>You are logged in</h2>
                    <p>You can:</p>
                    <ul>
                        <li>View and edit your <a href="/profile">profile</a></li>
                        <li><a href="/stocks">Search for stocks.</a></li>
                        <li>Star your favorite ones to see them in the <a href="/favorites">favorites</a> page. </li>
                        <li>Click into each favorite to see more details, recent news, and stock analysts recommendations.</li>

                    </ul>
                </section>
            ) : (
                <p>
                    Please{" "}
                    <a onClick={handleLoginClick}>
                        <u>login</u>
                    </a>{" "}
                    or{" "}
                    <a onClick={handleRegisterClick}>
                        <u>register</u>
                    </a>{" "}
                    to see more.
                </p>
            )}
            <LoginModal
                show={showLoginModal}
                onHide={handleCloseModal}
                initialForm={initialForm}
            />
        </Container>
    );
};

export default HomePage;
