import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import api from '../Service/baseURL';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconBreadcrumbs from '../IconBreadcrumbs';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { googleLogout } from '@react-oauth/google';


const ProfilePage = () => {
  const [Name, setname] = useState('');
  const [nameerror, setnameerror] = useState('');
  const [dob, setDob] = useState('');
  const [doberror, setDoberror] = useState('');
  const [phoneNo, setPhoneno] = useState('');
  const [phoneNoerror, setPhonenoerror] = useState('');
  const [door_street, setDoorstreet] = useState('');
  const [door_streeterror, setDoorstreeterror] = useState('');
  const [city, setCity] = useState('');
  const [cityerror, setcityerror] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeerror, setpincodeerror] = useState('');
  const [panNo, setPanno] = useState('');
  const [pannoerror, setPannoerror] = useState('');
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [state, setState] = useState('');
  const [stateerror, setstateerror] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  

  localStorage.setItem('name',Name);
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem('token');
    googleLogout();
    navigate('/')
  }

  const token =localStorage.getItem("token");
  const handletoken =() =>{
    if(!token){
      // alert("Session Expired Again Login To User");
      toast.error("Session Expired Again Login To User", { autoClose: 5000 });
    navigate('/')
    }
  }

  // const handleSuccessToast = (message) => {
  //   toast.success(message, { autoClose: 5000 });
  // };

  // const handleErrorToast = (message) => {
  //   toast.error(message, { autoClose: 5000 });
  // };


  useEffect(() => {
    handletoken();
    const cusid = localStorage.getItem('cid');
    setCustomerId(cusid);
    getprofile(cusid);
    console.log("Customerid"+cusid);
    getprofile(cusid);

  }, []);





  const handledoorstreet = (event) => {
    setDoorstreet(event.target.value);
    if (event.target.value !== '') {
      setDoorstreeterror('');
    }
  };

  const handlecity = (event) => {
    const value = event.target.value;
    const cityRegex = /^[A-Za-z]+$/;
    if (cityRegex.test(value) || value === '') {
      setCity(value);
      setcityerror('');
    } else {
      setcityerror('Enter a valid city name');
    }
  };

  const handleemail = (event) => {
    setEmail(event.target.value);

    // Improved email regex with proper domain extension validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(event.target.value)) {
      setemailerror('Enter a valid email address');
    } else {
      // Extract the domain from the email address
      const domain = event.target.value.split('@')[1];

      // Validate domain extension
      const validExtensions = ['com', 'in']; // Add more extensions if needed
      const isValidExtension = validExtensions.includes(domain.split('.')[1]);

      if (!isValidExtension) {
        setemailerror('Enter a valid email address with a proper domain extension');
      } else {
        setemailerror('');
      }
    }
  };

  const handlephoneno = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 10);
    setPhoneno(truncatedValue);
    const phoneRegex = /^[6-9]\d{9}$/; // Exactly 10 digits starting from 6-9

    if (truncatedValue.length === 10 && phoneRegex.test(truncatedValue)) {
      setPhonenoerror('');
    } else {
      setPhonenoerror('Enter a valid phone number');
    }
  };

  const handlepincode = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 6);
    setPincode(truncatedValue);
    const pincodeRegex = /^\d{6}$/; // Exactly six digits

    if (truncatedValue.length === 6 && pincodeRegex.test(truncatedValue)) {
      setpincodeerror('');
    } else {
      setpincodeerror('Enter a valid six-digit pin code');
    }
  };

  

  const Backhandle = () => {
    navigate('/ServiceRequest');
  };


  const getprofile = async (cusid) => {
    try {
      const response = await api.get(`getdetails/${cusid}`);
      setname(response.data.Name);
      // console.log("frfgf+ ", namee);
      setDob(response.data.dob);
      setCity(response.data.city);
      setDoorstreet(response.data.door_street);
      setEmail(response.data.Email);
      setPhoneno(response.data.phoneNo);
      setPincode(response.data.pincode);
      setState(response.data.state);
      setPanno(response.data.panNo);
    } catch (error) {
      console.log('Error fetching profile details:', error);
    }
  };

  const profileupdate = async () => {
    setLoading(true);
    let errorMessage = '';

    if (door_street === '' || email === '' || city === '' || pincode === '' || phoneNo === '') {
      errorMessage += 'Please fill in all the fields\n';
    }

    if (errorMessage !== '' || emailerror !== '' || phoneNoerror !== '' || door_streeterror !== '' || cityerror !== '' || pincodeerror !== '') {
      toast.error('Please fix validation errors before submitting', { autoClose: 5000 });
      // alert('Please fix validation errors before submitting');
      return;
    }

    const updateObj = {    
      customer_id: customerId,
      pincode: pincode,
      city: city,
      door_street: door_street,
      email: email,
      phone_no: phoneNo,
    };

    try {
      const response = await api.put(`update`, updateObj);
      console.log('Update Response:', response);

      if (response.data) {
        if (response.data.success) {
          console.log('Data updated successfully');
          toast.success('Data updated successfully', { autoClose: 5000 });

          // alert('Data updated successfully');

          // Optionally, update the local state with the new data if needed
          if (response.data.updatedData) {
            setPincode(response.data.updatedData.pincode);
            setCity(response.data.updatedData.city);
            setDoorstreet(response.data.updatedData.door_street);
            setEmail(response.data.updatedData.email);
            setPhoneno(response.data.updatedData.phone_no);
          }
        } else {
          console.log('update Successfull', response);
          toast.success('Data updated successfully', { autoClose: 5000 });
          // alert('Data updated Successfully' );
        }
      } else {
        console.log('Invalid response format:', response);
        toast.error('Invalid response format', { autoClose: 5000 });
        // alert('Invalid response format');
      }

    } catch (error) {
      console.log('Failed to update data:', error);
      toast.error('Failed to update data', { autoClose: 5000 });
      // alert('Failed to update data');
    } finally {
      setTimeout(() => {
        setLoading(false);  // Set loading state to false after API call completes
      }, 5000); 
    }
  };

  const asteriskStyle = { color: 'red' };

  return (
    <div>
      <IconBreadcrumbs step1 step2 /> 
      <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop:'-10%' }}onClick={signout} >
        LogOut
      </button>
      
      <div className={`profile-container ${loading ? 'blurred' : ''}`}>
        <h3>
          <b>Welcome {Name}</b>
        </h3>
        <form>
          <div className="div5">
            <label htmlFor="phoneno"><span style={asteriskStyle}>*</span>PhoneNo:</label>
            <input
              type="text"
              id="phoneno"
              name="phoneno"
              placeholder="Enter your phoneno"
              value={phoneNo}
              onChange={handlephoneno}
              required
            />
          </div>
          <span className="error-message" style={{ marginLeft: "50%" }}>{phoneNoerror}</span>
          <div className="div5">
            <label htmlFor="address"><span style={asteriskStyle}>*</span>Door & Street:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={door_street}
              onChange={handledoorstreet}
              required
            />
          </div>
          <span className="error-message" style={{ marginLeft: "50%" }}>{door_streeterror}</span>
          <div className="div5">
            <label htmlFor="city"><span style={asteriskStyle}>*</span>City:</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your city"
              value={city}
              onChange={handlecity}
              required
            />
          </div>
          <span className="error-message" style={{ marginLeft: "50%" }}>{cityerror}</span>
          <div className="div5">
            <label htmlFor="pincode"><span style={asteriskStyle}>*</span>Pin code:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter your pin code"
              value={pincode}
              onChange={handlepincode}
              required
            />
          </div>
          <span className="error-message" style={{ marginLeft: "50%" }}>{pincodeerror}</span>
          <div className="div5">
            <label htmlFor="email"><span style={asteriskStyle}>*</span>E-Mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleemail}
              required
            />
          </div>
          <span className="error-message" style={{ marginLeft: "50%" }}>{emailerror}</span>
          <div className="button-container">
            <button type="button" onClick={profileupdate} disabled={isFormValid}>
              Submit
            </button>
            <button type="button" onClick={Backhandle}>
              Back
            </button>
          </div>
        </form>
      </div>
      {loading && (
        <div className="page-loader">
          <BounceLoader color="#000000" loading={loading} size={100} speedMultiplier={4} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;












