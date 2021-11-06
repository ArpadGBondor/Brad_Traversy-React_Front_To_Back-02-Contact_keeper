import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthtContext } from '../../context/auth/authContext';

const AuthCheck = ({ redirect, element }) => {
    const { isAuthenticated, loading } = useAuthtContext();
    return !isAuthenticated && !loading ? <Navigate to={redirect} /> : element;
};

export default AuthCheck;
