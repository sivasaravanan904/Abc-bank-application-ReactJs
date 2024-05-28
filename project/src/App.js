import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import ProfilePage from './Components/Profile/ProfilePage';
import ServiceRequest from './Components/ServiceRequest/ServiceRequest';
import AccountStatement from './Components/AccStatement/AccStatement';
import ServiceMenu from './Components/ServiceMenu/ServiceMenu';
import AccountPage from './Components/AccountPage/AccountPage';
import ChequeBookRequest from './Components/CheckbookRequest/CheckbookRequest';
import LostorStolen from './Components/LostorStolen/LostorStolen';
import CardRequest from './Components/CardRequest/CardRequest';
import ViewRequest from './Components/ViewRequest/ViewRequest';


function App() {
  return (
    <>
        <div className='container'>
          <Header />
          <Router>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/serviceRequest' element={<ServiceRequest />} />
              <Route path='/profilePage' element={<ProfilePage />} />
              <Route path='/accStatement/:accountNumber' element={<AccountStatement />} />
              <Route path='/ServiceMenu' element={<ServiceMenu />} />
              <Route path='/AccountPage' element={<AccountPage />} />
              <Route path='/ChequeBookRequest' element={<ChequeBookRequest />} />
              <Route path='/LostorStolen' element={<LostorStolen />} />
              <Route path='/CardRequest' element={<CardRequest />} />
              <Route path='/ViewRequest' element={<ViewRequest />} />
            </Routes>
          </Router>
          <Footer />
        </div>
    </>
  );
}

export default App;
