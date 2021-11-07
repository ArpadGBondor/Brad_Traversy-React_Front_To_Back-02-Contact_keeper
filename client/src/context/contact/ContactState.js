import React, { useReducer } from 'react';
import axios from 'axios';
import { ContactContext } from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_ERRORS,
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Actions
    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
        }
    };

    // Clear Contacts
    const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
            return true;
        } catch (error) {
            if (!error.response) {
                dispatch({ type: CONTACT_ERROR, payload: error.message });
            } else if (!error.response.data.msg) {
                // Validation Errors
                dispatch({ type: CONTACT_ERROR, payload: error.response.data.errors.map((e) => e.msg) });
            } else {
                //
                dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
            }
            return false;
        }
    };
    // Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
            return true;
        } catch (error) {
            if (!error.response) {
                dispatch({ type: CONTACT_ERROR, payload: error.message });
            } else if (!error.response.data.msg) {
                // Validation Errors
                dispatch({ type: CONTACT_ERROR, payload: error.response.data.errors.map((e) => e.msg) });
            } else {
                //
                dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
            }
            return false;
        }
    };
    // Delete Contact
    const deleteContact = async (_id) => {
        try {
            await axios.delete(`/api/contacts/${_id}`);
            dispatch({ type: DELETE_CONTACT, payload: _id });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
        }
    };
    // Set Current Contact
    const setCurrentContact = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    // Clear Current Contact
    const clearCurrentContact = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    // Clear Filter
    const clearFilter = () => dispatch({ type: CLEAR_FILTER });
    // Clear Error
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                clearContacts,
                addContact,
                deleteContact,
                setCurrentContact,
                clearCurrentContact,
                updateContact,
                filterContacts,
                clearFilter,
                clearErrors,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
