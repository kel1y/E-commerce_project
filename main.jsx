/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store.js';
import Chat from './views/chat/chat.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Chat />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
