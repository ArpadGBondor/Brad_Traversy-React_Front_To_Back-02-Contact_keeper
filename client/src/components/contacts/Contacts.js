import React, { Fragment } from 'react';
import { useContactContext } from '../../context/contact/contactContext';

import ContactItem from './ContactItem';

const Contacts = () => {
    const { contacts } = useContactContext();

    return (
        <Fragment>
            {contacts.map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
            ))}
        </Fragment>
    );
};

export default Contacts;
