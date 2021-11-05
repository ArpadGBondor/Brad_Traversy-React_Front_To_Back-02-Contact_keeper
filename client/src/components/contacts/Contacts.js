import React, { Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useContactContext } from '../../context/contact/contactContext';

import ContactItem from './ContactItem';

const Contacts = () => {
    const { contacts, filtered } = useContactContext();

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            <TransitionGroup>
                {(filtered || contacts).map((contact) => (
                    <CSSTransition key={contact.id} timeout={1000} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;
