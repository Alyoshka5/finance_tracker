import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TransactionPage from './components/transactions/TransactionPage';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TransactionPage />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
