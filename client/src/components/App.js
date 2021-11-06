import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Alerts from './layout/Alerts';
import Home from './pages/Home';
import About from './pages/About';
import Login from './auth/Login';
import Register from './auth/Register';

import ContactState from '../context/contact/ContactState';
import AuthState from '../context/auth/AuthState';
import AlertState from '../context/alert/AlertState';

import './App.css';
const App = () => {
    return (
        <AlertState>
            <AuthState>
                <ContactState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className="container">
                                <Alerts />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </Routes>
                            </div>
                        </Fragment>
                    </Router>
                </ContactState>
            </AuthState>
        </AlertState>
    );
};

export default App;
