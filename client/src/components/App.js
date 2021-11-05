import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';

import ContactState from '../context/contact/ContactState';

import './App.css';
const App = () => {
    return (
        <ContactState>
            <Router>
                <Fragment>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </div>
                </Fragment>
            </Router>
        </ContactState>
    );
};

export default App;