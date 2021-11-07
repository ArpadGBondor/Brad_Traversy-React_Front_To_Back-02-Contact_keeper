import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'; // use uuidv4()
import { AlertContext } from './alertContext';
import alertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Actions
    // Set Alert
    const setAlert = (msg, type = 'light', timeout = 5000) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id },
        });

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id,
            });
        }, timeout);
    };

    // Set Multiple Alerts
    const setAlerts = (msg, type = 'light', timeout = 5000) => {
        if (Array.isArray(msg)) {
            msg.forEach((m) => setAlert(m, type, timeout));
        } else {
            setAlert(msg, type, timeout);
        }
    };

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
                setAlerts,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
