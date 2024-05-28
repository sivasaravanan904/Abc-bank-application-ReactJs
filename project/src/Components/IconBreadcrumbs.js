import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import BuildIcon from '@mui/icons-material/Build';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCardIcon from '@mui/icons-material/AddCard';
import BlockIcon from '@mui/icons-material/Block';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import HomeIcon from '@mui/icons-material/Home';

const IconBreadcrumbs = ({ step1, step2, step3, step4, step5, step6, step7, step8, step9}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link 
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        <b>Login</b>
      </Link>


      {step1 && (
      <Link 
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/serviceRequest"
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
       <b>Service menu</b>  
      </Link>
      )}


    {step2 && (
        <Link
        underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
           href="/profilePage" 
        >
          <AccountCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          My Profile
        </Link>
      )}


        {step3 && (
        <Link
        underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
          href="/ServiceMenu"
        >
          <BuildIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Service Request menu
        </Link>
        )}


{step4 && (
        <Link
        underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
          href="/ChequeBookRequest"
        >
          <CheckCircleOutlineIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Check Book Request
        </Link>
        )}


{step5 && (
        <Link
        underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
          href="/CardRequest"
        >
          <AddCardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Card Request
        </Link>
        )}


{step6 && (
        <Link
        underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
          href="/LostorStolen"
        >
          <BlockIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          LostorStolen
        </Link>
        )}


{step7 && (
        <Link
        underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
          href="/AccountPage"
        >
          <AccountBalanceIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          My Account
        </Link>
        )}


{step8 && (
        <Link
        underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
          href="/ViewRequest"
        >
          <VisibilityIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          View Request
        </Link>
        )}

{step9 && (
  <Link
  underline="hover"
    sx={{ display: 'flex', alignItems: 'center' }}
    color="text.primary"
    href="/accStatement/:accountNumber"
  >
    <AccountBalanceWalletIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    Account Statement
  </Link>
  )}
</Breadcrumbs>
  );
};

export default IconBreadcrumbs;


