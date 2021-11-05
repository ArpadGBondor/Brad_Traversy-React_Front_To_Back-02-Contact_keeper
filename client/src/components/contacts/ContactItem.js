import React from 'react';
import PropTypes from 'prop-types';
import { useContactContext } from '../../context/contact/contactContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactItem = ({ contact }) => {
    const { id, name, email, phone, type } = contact;
    const { deleteContact, setCurrentContact, clearCurrentContact } = useContactContext();

    const onDelete = () => {
        clearCurrentContact();
        deleteContact(id);
    };
    const onEdit = () => setCurrentContact(contact);
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={`badge ${type === 'professional' ? 'badge-success' : 'badge-primary'}`}
                >{`${type.charAt(0).toUpperCase()}${type.slice(1)}`}</span>
            </h3>
            <ul className="list">
                {email && (
                    <li>
                        <FontAwesomeIcon icon="envelope-open" /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <FontAwesomeIcon icon="phone" /> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>
                    Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem;
