import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useContactContext } from '../../context/contact/contactContext';
import { useAuthtContext } from '../../context/auth/authContext';

import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const { contacts, filtered, getContacts, loading } = useContactContext();
    const { isAuthenticated } = useAuthtContext();

    useEffect(() => {
        if (isAuthenticated) {
            getContacts();
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);

    if (!loading && contacts !== null && contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            {contacts === null || loading ? (
                <Spinner />
            ) : (
                <TransitionGroup>
                    {(filtered || contacts).map((contact) => (
                        <CSSTransition key={contact._id} timeout={1000} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </Fragment>
    );
};

export default Contacts;

// Tried to get rid of the Warning in the browser, but it didn't work:
// https://stackoverflow.com/questions/69871245/finddomnode-is-deprecated-in-strictmode-warning-react-transition-group-reac

// Try using this package instead of react-transition-group
// npm i framer-motion

// const TransitionItem = ({ contact, ...props }) => {
//     const ref = useRef(null); // Had to use this ref to go around a warning
//     return (
//         <CSSTransition nodeRef={ref} timeout={1000} classNames="item" {...props}>
//             <div ref={ref}>
//                 <ContactItem contact={contact} />
//             </div>
//         </CSSTransition>
//     );
// };

// return (
//     <Fragment>
//         {contacts === null || loading ? (
//             <Spinner />
//         ) : (
//             <TransitionGroup>
//                 {(filtered || contacts).map((contact) => (
//                     <TransitionItem key={contact._id} contact={contact} />
//                 ))}
//             </TransitionGroup>
//         )}
//     </Fragment>
// );
