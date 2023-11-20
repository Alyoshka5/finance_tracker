import React from 'react';
import './App.css';
import TransactionPage from './components/transactions/TransactionPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TransactionPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
