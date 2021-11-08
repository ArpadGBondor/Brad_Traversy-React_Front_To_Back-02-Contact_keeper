import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthtContext } from '../../context/auth/authContext';
import { useAlertContext } from '../../context/alert/alertContext';

const Register = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const { registerUser, error, clearErrors, isAuthenticated } = useAuthtContext();
    const { setAlerts } = useAlertContext();
    const { name, email, password, password2 } = user;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            if (error === 'No token, authorization denied.') {
                setAlerts('Please sign in or sign up.', 'lignt');
            } else {
                setAlerts(error, 'danger');
            }
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlerts('Please enter all fields.', 'danger');
        } else if (password !== password2) {
            setAlerts('Passwords do not match.', 'danger');
        } else {
            registerUser({
                name,
                email,
                password,
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
};

export default Register;
