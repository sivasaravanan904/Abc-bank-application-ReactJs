import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './LostorStolen.css';
import baseURL from '../Service/baseURL';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconBreadcrumbs from '../IconBreadcrumbs';
import { googleLogout } from '@react-oauth/google';

const LostorStolen = () => {
  const navigate = useNavigate();

  const [stolenDate, setStolenDate] = useState('');
  const customerId = localStorage.getItem('cid');
  const [requestMessage, setRequestMessage] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountData2, setAccountData2] = useState([]);
  const [card_type, setCardType] = useState('');
  const [card_number, setCardNumber] = useState('');
  const [existingRequestError, setExistingRequestError] = useState('');
  const cardTypes = ["Debit", "Credit"];
  const [loading, setLoading] = useState(false);

  
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setDate(maxDate.getDate() - 1);
  const minDate = new Date(currentDate);
  minDate.setDate(minDate.getDate() - 7);

  const minDateString = minDate.toISOString().split('T')[0];
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleDateChange = (event) => {
    const selected = event.target.value;

    if (selected >= minDateString && selected <= maxDateString) {
      setStolenDate(selected);
    } else {
      toast.error('You can only select dates from today up to 1 week ago.')
      // alert('You can only select dates from today up to 1 week ago.');
    }
  };

  useEffect(() => {
    handletoken();
    getAccountNumbers2();
  }, []);

  const getAccountNumbers2 = async () => {
    try {
      const response = await baseURL.get(`/fetchAcc/${customerId}`);
      setAccountData2(response.data);
      console.log('Account Numbers:', response.data);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };

  const signout = () => {
    localStorage.removeItem('token');
    googleLogout();
    navigate('/')
  }

  const token =localStorage.getItem("token");
  const handletoken =() =>{
    if(!token){
      toast.error("Session Expired Again Login To User");
    // alert("Session Expired Again Login To User");
    navigate('/')
    }
  }

  const handleBack = () => {
    navigate('/ServiceMenu');
  };

  const savestolenData = async () => {
    try {
      if (accountNumber && card_type && stolenDate && requestMessage) {
        // Check if a request already exists for the selected account number on the given date
        const existingRequest = accountData2.find(
          (item) => item.customer_id === accountNumber && formatDate(item.lost_stolen_date) === stolenDate
        );

        if (existingRequest) {
          setExistingRequestError('A request for this account number has already been raised on this date.');
          return; // Stop further processing if a request already exists
        }

        var saveObj3 = {
          "lost_stolen_date": stolenDate,
          "service_request_id": 3,
          "account_number": accountNumber,
          "request_message": requestMessage,
          "card_type": card_type,
          "card_number": card_number
        };

        await baseURL.post('/savelost', saveObj3)
          .then(response => {
            console.log("Data saved", response.data);
            toast.success("Your Request Has Been Sent Successfully!");
            // alert("Request Data sent successfully");
            // Clear the input fields only if the request was successful
            setStolenDate('');
            setAccountNumber('');
            setRequestMessage('');
            setCardType('');
            setCardNumber('');
            setExistingRequestError('');
          });
      } else {
        toast.error("Please fill in all required details.");
        // alert("Please fill in the mandatory fields");
      }
    } catch (error) {
      console.log("Sorry, data not saved", error);
    }
  };

  const handlesubstolen = async () => {
    setLoading(true);
    try {
      // Check if a request already exists for the selected account number on the given date
      const formattedStolenDate = formatDate(stolenDate);
      const existingRequest = accountData2.find(
        (item) => item.accountNumber === accountNumber && formatDate(item.lost_stolen_date) === formattedStolenDate
      );

      if (existingRequest) {
        setExistingRequestError('A request for this account number has already been raised on this date.');
        return; // Stop further processing if a request already exists
      }

      await savestolenData();

      setStolenDate('');
      setAccountNumber('');
      setRequestMessage('');
      setCardType('');
      setCardNumber('');
      setExistingRequestError(''); // Clear existing request error after successful submission
    } catch (error) {
      console.log("Sorry, data not saved", error);
    }finally {
      setTimeout(() => {
        setLoading(false);  // Set loading state to false after API call completes
      }, 5000); 
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const asteriskStyle = { color: 'red' };

  return (
    <div>
      <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop: '-10%' }} onClick={signout}>
        LogOut
      </button>
      <IconBreadcrumbs step1 step3 step6/> 
      <div>
      <h1 className="stoltit" style={{marginTop:'-2%'}}>Lost / Stolen Card Request</h1>
      </div>
      <div className={`containerStylestolen ${loading ? 'blurred' : ''}`}>
        <form>
          <div className='row'>
            <label className="labstol" style={{ marginTop: '-1%', position: 'relative' }}>
              <span style={asteriskStyle}>*</span>
              Account Number:
              
            </label>
            <select
                className='salstol'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              >
                <option value=''>Select</option>
                {accountData2.map((item) => (
                  <option key={item.customer_id} value={item.customer_id}>
                    {item.accountnumber}
                  </option>
                ))}
              </select>
            {existingRequestError && <span className="error" style={{ color: 'red' }}>{existingRequestError}</span>}
          </div>

          <div className='row'>
            <label className="labstol1" htmlFor="cardType"><span style={asteriskStyle}>*</span> Card Type:</label>
            <select
              className="salstol1"
              id="cardType"
              value={card_type}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value=""><span style={asteriskStyle}></span> Select a card type</option>
              {cardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className='row'>
            <label className="labstol2" htmlFor="lostStolenOn" style={{ marginTop: '100px', position: 'relative' }}><span style={asteriskStyle}>*</span> Lost / Stolen Date:</label>
            <input
              className="salstol2"
              type="date"
              id="lostStolenOn"
              value={stolenDate}
              max={maxDateString}
              min={minDateString}
              onChange={handleDateChange}
            />
          </div>
          <div className='row'>
            <label className='labstol3'><span style={asteriskStyle}>*</span>  Card Number:</label>
            <input
              className='salstol3'
              type='text'
              name='text'
              value={card_number}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className='row'>
            <label className='labstol4'><span style={asteriskStyle}>*</span> Request Message:</label>
            <input className='salstol3' type='text' name='text' value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} />
          </div>
        </form>

        <div className="stol">
          <button
            type="button"
            onClick={() => {
              if (!existingRequestError) {
                handlesubstolen();
              }
            }}
          >
            Submit
          </button>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>
      {loading && (
        <div className="page-loader">
          <BounceLoader color="#000000" loading={loading} size={100} speedMultiplier={4} />
        </div>
      )}
    </div>
  );
}

export default LostorStolen;