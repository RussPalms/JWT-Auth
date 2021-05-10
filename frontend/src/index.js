import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';

// See the getElementByID(‘root’) part? That renders the App in place of the #root div we 
// made in index.html. It used to say “This will be the base template” 
render ((
    <BrowserRouter>
        <App />
    </BrowserRouter>
),
    document.getElementById("root")
);