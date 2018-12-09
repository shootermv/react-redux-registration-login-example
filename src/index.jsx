import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
// configureFakeBackend();
/*import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');*/

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);