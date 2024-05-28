// ServiceMenu.js

import './ServiceMenu.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import IconBreadcrumbs from '../IconBreadcrumbs';
import { googleLogout } from '@react-oauth/google';




const ServiceMenu = () => {
    const navigate = useNavigate();
    const signout = () => {
        localStorage.removeItem('token');
        googleLogout();
        navigate('/')
      }
    
      const token =localStorage.getItem("token");
      const handletoken =() =>{
        if(!token){
        alert("Session Expired Again Login To User");
        navigate('/')
        }
      }

    const back = () => {
        window.location.href = '/ServiceRequest';
    };

    useEffect(() => {
        handletoken();
        }, []);

    return (
        <div className="main">
           <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop:'-15%' }}onClick={signout} >
          LogOut
        </button>
        <IconBreadcrumbs step1 sep2 step3 /> 
            <p className='menu' style={{marginTop:'-8%',backgroundColor:'transparent',fontFamily:"sans-serif",fontSize:"1.5rem",fontWeight:"bold",marginLeft:"550px" }}>SERVICE REQUEST MENU</p>
          
        <div className="service-request-container" >
            <ul>
                <br></br>
                <li><a href='/ChequeBookRequest'>Request a new Cheque book</a></li><br></br>
                <li><a href="/CardRequest">Request a new credit or debit Card</a></li><br></br>
                <li><a href="/LostorStolen">Report Stolen / Lost Card</a></li><br /><br />
            </ul>

            <button className="btn btn-primary" style={{ marginLeft: '-30px',marginTop:'-1%',position:'absolute',marginBottom:'-80px',width:'90px'}} onClick={back}>
                Back
            </button>
        </div>
        </div>
    );
};

export default ServiceMenu;






