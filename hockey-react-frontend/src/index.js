/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * index.js
 * React application entry point.
 * Mounts the App component into the root DOM element.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
