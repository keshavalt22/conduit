import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheet/style.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

window.React1 = require('react');

ReactDOM.render(
    <BrowserRouter>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById("root"));