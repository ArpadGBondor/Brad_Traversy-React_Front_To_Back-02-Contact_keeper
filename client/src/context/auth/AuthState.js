import React, { useReducer } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Actions
    // Load User
    const loadUser = async () => {
        // load token into global headers
        setAuthToken(localStorage.token);

        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.msg,
            });
        }
    };
    // Register User
    const registerUser = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            loadUser();
        } catch (error) {
            if (!error.response) {
                dispatch({ type: REGISTER_FAIL, payload: error.message });
            } else if (!error.response.data.msg) {
                // Validation Errors
                dispatch({ type: REGISTER_FAIL, payload: error.response.data.errors.map((e) => e.msg) });
            } else {
                dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
            }
        }
    };
    // Login User
    const loginUser = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            loadUser();
        } catch (error) {
            if (!error.response) {
                dispatch({ type: LOGIN_FAIL, payload: error.message });
            } else if (!error.response.data.msg) {
                // Validation Errors
                dispatch({ type: LOGIN_FAIL, payload: error.response.data.errors.map((e) => e.msg) });
            } else {
                dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
            }
        }
    };
    // Logout User
    const logoutUser = () => dispatch({ type: LOGOUT });
    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                loadUser,
                registerUser,
                loginUser,
                logoutUser,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
