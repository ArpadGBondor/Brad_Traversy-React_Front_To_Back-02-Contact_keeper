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

const contactReducer = (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false,
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                current: null,
                filtered: null,
                error: null,
                loading: true,
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false,
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((c) => (c._id === action.payload._id ? action.payload : c)),
                current: null,
                loading: false,
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((c) => c._id !== action.payload),
                loading: false,
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter((c) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return c.name.match(regex) || c.email.match(regex);
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export default contactReducer;
