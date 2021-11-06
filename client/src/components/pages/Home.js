import React, { useEffect } from 'react';

import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import { useAuthtContext } from '../../context/auth/authContext';

const Home = () => {
    const { loadUser, isAuthenticated } = useAuthtContext();

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [isAuthenticated]);
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
