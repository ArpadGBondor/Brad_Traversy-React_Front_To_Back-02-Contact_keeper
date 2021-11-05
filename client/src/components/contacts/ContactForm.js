import React, { useState, useEffect } from 'react';
import { useContactContext } from '../../context/contact/contactContext';

const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    });
    const { name, email, phone, type } = contact;
    const { current, addContact, clearCurrentContact, updateContact } = useContactContext();

    useEffect(() => {
        if (current) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal',
            });
        }
    }, [current]);

    const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        if (current) {
            updateContact(contact);
        } else {
            addContact(contact);
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal',
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} />{' '}
            Personal{' '}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
                onChange={onChange}
            />{' '}
            Professional{' '}
            <div>
                <input
                    type="submit"
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className="btn btn-primary btn-block"
                />
            </div>
            {current && (
                <div>
                    <input
                        type="button"
                        value="Clear"
                        className="btn btn-light btn-block"
                        onClick={clearCurrentContact}
                    />
                </div>
            )}
        </form>
    );
};

export default ContactForm;
