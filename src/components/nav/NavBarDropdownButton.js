import React from 'react';
import { NavDropdown, Image } from 'react-bootstrap';

const NavbarDropdownButton = ({ user, handleLogout }) => {
    return (
        <NavDropdown
            title={
                <>
                    <Image
                        src={user.profile_picture ? user.profile_picture : 'https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280w/products/677/22372/42_1K__76704.1633021257.jpg?c=1'}
                        roundedCircle
                        width="30"
                        height="30"
                        className="me-2"
                    />
                    {user.username}
                </>
            }
            id="basic-nav-dropdown"
            align="end"
        >
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
    );
};

export default NavbarDropdownButton;