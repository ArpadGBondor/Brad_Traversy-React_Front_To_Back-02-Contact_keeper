import { createContext, useContext } from 'react';

const ContactContext = createContext();

function useContactContext() {
    const context = useContext(ContactContext);
    if (context === undefined) {
        throw new Error('useContactContext must be used within ContactState');
    }
    return context;
}

export { ContactContext, useContactContext };
