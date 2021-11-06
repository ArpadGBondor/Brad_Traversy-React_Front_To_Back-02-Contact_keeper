import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import { useAuthtContext } from '../../context/auth/authContext';

const Home = () => {
    const { loadUser, isAuthenticated } = useAuthtContext();
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
        if (!isAuthenticated) {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
