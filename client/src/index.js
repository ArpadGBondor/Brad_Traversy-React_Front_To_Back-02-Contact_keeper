import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faEnvelopeOpen, faIdCardAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faPhone, faEnvelopeOpen, faIdCardAlt);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
