import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto'

// var basename = (process.env.NODE_ENV === 'production') ? '/oc4' : '/'
var basename = '/'

ReactDOM.render((
    <BrowserRouter basename={basename}>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
