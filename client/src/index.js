import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import { TransactionProvider } from './context/TransactionProvider';
import { ModalProvider } from './context/ModalProvider';
import StyleProvider from './context/StyleProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <StyleProvider>
      <AuthProvider>
        <TransactionProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </TransactionProvider>
      </AuthProvider>
    </StyleProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
