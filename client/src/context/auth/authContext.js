import { createContext, useContext } from 'react';

const AuthContext = createContext();

function useAuthtContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthtContext must be used within AuthState');
    }
    return context;
}

export { AuthContext, useAuthtContext };
