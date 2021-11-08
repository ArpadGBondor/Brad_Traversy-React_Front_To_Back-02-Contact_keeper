import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthtContext } from '../../context/auth/authContext';
import { useAlertContext } from '../../context/alert/alertContext';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { loginUser, isAuthenticated, error, clearErrors } = useAuthtContext();
    const { setAlerts } = useAlertContext();

    const { email, password } = user;

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
        if (email === '' || password === '') {
            setAlerts('Please enter all fields.', 'danger');
        } else {
            loginUser({
                email,
                password,
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
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
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
};

export default Login;
