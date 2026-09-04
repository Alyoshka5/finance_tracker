import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TransactionPage from './components/transactions/TransactionPage';
import AccountPage from './components/accounts/AccountPage';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import RequireAuth from './components/authentication/RequireAuth';
import PersistLogin from './components/authentication/PersistLogin';
import ModalContainer from './components/ModalContainer';
import PageContainer from './components/PageContainer';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route element={<PageContainer />}>
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />} >
                <Route element={<ModalContainer />}>
                  <Route path='/' element={<Navigate to='/transactions' replace />} />
                  <Route path='/transactions' element={
                      <TransactionPage />
                  } />
                  <Route path='/accounts' element={
                      <AccountPage />
                  } />
                  <Route path='*' element={<Navigate to='/transactions' replace />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
