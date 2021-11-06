import { createContext, useContext } from 'react';

const AlertContext = createContext();

function useAlertContext() {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlertContext must be used within AlertState');
    }
    return context;
}

export { AlertContext, useAlertContext };
