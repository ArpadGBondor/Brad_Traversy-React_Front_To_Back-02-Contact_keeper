import React, { Fragment } from 'react';
import { useContactContext } from '../../context/contact/contactContext';

import ContactItem from './ContactItem';

const Contacts = () => {
    const { contacts, filtered } = useContactContext();

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            {(filtered || contacts).map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
            ))}
        </Fragment>
    );
};

export default Contacts;
