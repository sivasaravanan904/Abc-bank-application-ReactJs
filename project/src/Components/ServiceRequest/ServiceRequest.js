// import './ServiceRequest.css'; 
// import Header from '../Header/Header';  
// import Footer from '../Footer/Footer'; 
// import { useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// // import IconBreadcrumbs from '../Components/IconBreadcrumbs';



// const ServiceRequest = () => {
//   const back = () => {
//     window.location.href = '/';
//   };

//   const navigate = useNavigate();
//   const signout = () => {
//     localStorage.removeItem('token');
//     navigate('/')
//   }

//   const token =localStorage.getItem("token");
//   const handletoken =() =>{
//     if(!token){
//     alert("Session Expired Again Login To User");
//     navigate('/')
//     }
//   }

//   useEffect(() => {
//     handletoken();
//     }, []);

//   return (
//     <div className='btnbtn1'>
//       {/* <IconBreadcrumbs  step1 step2/> */}
//     <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop:'-10%' }}onClick={signout} >
//           LogOut
//         </button>
//       <div className="d-grid gap-2 d-md-flex justify-content-md-end" >
//         <h2 style={{marginLeft:'650px', marginTop:'-1%', marginBottom:'-25px'}}>SERVICE MENU</h2>
//       </div>
//       <center>
//         <div className="menu" >
//           <div className="d-grid gap-2 col-5 mx-auto left-menu" >
//             <a href="/ProfilePage"  className="btn btn-primary" role="button" style={{textDecoration:'none'}}>
//               My Profile
//             </a>
//             <br />
//             <br />
//             <a href="/ServiceMenu" className="btn btn-primary" role="button" style={{textDecoration:'none'}}>
//               Make a Service Request
//             </a>
//             <br />
//             <br />
//             <a href="/AccountPage" className="btn btn-primary" role="button" style={{textDecoration:'none'}}>
//               View Account Statement
//             </a>
//             <br />
//             <br />
//             <a href="/ViewRequest" className="btn btn-primary" role="button" style={{textDecoration:'none'}}>
//               View Request Status
//             </a>
//           </div>
//         </div>
//       </center>
//       <div>
//         <center>
//           <br />
//           <button className="btn btn-primary" style={{ marginLeft: '25px',marginTop:'22%',marginBottom:'-550px' }} onClick={back}>
//             Back
//           </button>
//         </center>
//       </div>
     
//     </div>
//   );
// };

// export default ServiceRequest;



import './ServiceRequest.css'; 
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
 import IconBreadcrumbs from '../IconBreadcrumbs';
 import { googleLogout } from '@react-oauth/google';


 // Assuming IconBreadcrumbs is defined here

const ServiceRequest = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  };

  const signout = () => {
    localStorage.removeItem('token');
    googleLogout();
    navigate('/');
  };

  const token = localStorage.getItem('token');
  const handleToken = () => {
    if (!token) {
      alert('Session Expired. Please login again.');
      navigate('/');
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <div className='btnbtn1'>
              <IconBreadcrumbs step1 /> 
      <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop: '-10%' }} onClick={signout}>
        LogOut
      </button>
     
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <h2 style={{ marginLeft: '650px', marginTop: '-1%', marginBottom: '-25px' }}>SERVICE MENU</h2>
      </div>
      
      <center>
        <div className="menu">

          <div className="d-grid gap-2 col-5 mx-auto left-menu">
            
            <a href="/ProfilePage" className="btn btn-primary" role="button" style={{ textDecoration: 'none' }}>
              My Profile
            </a>
            <br />
            <br />
            <a href="/ServiceMenu" className="btn btn-primary" role="button" style={{ textDecoration: 'none' }}>
              Make a Service Request
            </a>
            <br />
            <br />
            <a href="/AccountPage" className="btn btn-primary" role="button" style={{ textDecoration: 'none' }}>
              View Account Statement
            </a>
            <br />
            <br />
            <a href="/ViewRequest" className="btn btn-primary" role="button" style={{ textDecoration: 'none' }}>
              View Request Status
            </a>
          </div>
        </div>
      </center>
      <div>
        <center>
          <br />
          <button className="btn btn-primary" style={{ marginLeft: '20px', marginTop: '22%', marginBottom: '-550px',width:'80px' }} onClick={back}>
            Back
          </button>
        </center>
        
      </div>

    </div>
  );
};

export default ServiceRequest;
