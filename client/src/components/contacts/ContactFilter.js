import React, { useEffect, useRef } from 'react';
import { useContactContext } from '../../context/contact/contactContext';

const ContactFilter = () => {
    const { filtered, filterContacts, clearFilter } = useContactContext();
    const text = useRef('');

    useEffect(() => {
        if (!filtered) {
            text.current.value = '';
        }
    }, [filtered]);
    const onChange = (e) => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    );
};

export default ContactFilter;
