import React, { useEffect } from 'react';
import { useAuthtContext } from '../../context/auth/authContext';

const About = () => {
    const { loadUser, isAuthenticated } = useAuthtContext();
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [isAuthenticated]);
    return (
        <div>
            <h1>About</h1>
            <p className="my-1">This is a fullstack React App for keeping contacts</p>
            <p className="bg-dark p">
                <strong>Version: </strong>1.0.0
            </p>
        </div>
    );
};

export default About;
