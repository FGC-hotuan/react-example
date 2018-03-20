import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

//import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import store from './store/store';
import {verifyToken} from './services/authService';

//const history = syncHistoryWithStore(hashHistory, store);

// Used to log user in if token is valid
store.dispatch(verifyToken());

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

