import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from '../types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return { ...state, contacts: [...state.contacts, action.payload] };
        case DELETE_CONTACT:
            return { ...state, contacts: state.contacts.filter((c) => c.id !== action.payload) };
        case SET_CURRENT:
            return { ...state, current: action.payload };
        case CLEAR_CURRENT:
            return { ...state, current: null };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((c) => (c.id === action.payload.id ? action.payload : c)),
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

        default:
            return state;
    }
};

export default contactReducer;
