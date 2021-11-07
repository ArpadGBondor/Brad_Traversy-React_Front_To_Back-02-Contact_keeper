import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthtContext } from '../../context/auth/authContext';
import { useContactContext } from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
    const { isAuthenticated, logoutUser, user } = useAuthtContext();
    const { clearContacts } = useContactContext();

    const onLogout = () => {
        clearContacts();
        logoutUser();
    };
    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <FontAwesomeIcon icon="sign-out-alt" /> <span className="hide-sm">Logout</span>
                </a>
            </li>
            <li>
                <Link to="/">Home</Link>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <FontAwesomeIcon icon={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'id-card-alt',
};

export default Navbar;
