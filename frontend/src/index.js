import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

// See the getElementByID(‘root’) part? That renders the App in place of the #root div we 
// made in index.html. It used to say “This will be the base template” 
render(<App />, document.getElementById('root'));