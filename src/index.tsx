import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

export const creatorCache = new Map(); // Cache to store creator details

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
