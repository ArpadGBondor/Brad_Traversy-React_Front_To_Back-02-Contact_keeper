import React from 'react';
import { useAlertContext } from '../../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alerts = () => {
    const { alerts } = useAlertContext();
    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <FontAwesomeIcon icon="info-circle" /> {alert.msg}
            </div>
        ))
    );
};

export default Alerts;
