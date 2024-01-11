import React from 'react';
import ReactDOM from 'react-dom/client';

// Change file name only here if function which is import is App. 
import App from "./todo List/Todo.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)