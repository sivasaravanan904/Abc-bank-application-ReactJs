import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckbookRequest.css';
import api from '../Service/baseURL';
import { useParams } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconBreadcrumbs from '../IconBreadcrumbs';
import { googleLogout } from '@react-oauth/google';


const ChequeBookRequest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [accountNumber, setAccountNumber] = useState('');
  const [no_of_cheque_leaves, setChequeLeaves] = useState('');
  const customerId = localStorage.getItem("cid");
  const [accountData, setAccountData] = useState([]); 
  const [request_message,setrequestMessage]=useState('');
  const checkbook = ["20", "50", "100"];

  const signout = () => {
    localStorage.removeItem('token');
    googleLogout();
    navigate('/')
  }

  const token =localStorage.getItem("token");
  const handletoken =() =>{
    if(!token){
      toast.error("Session Expired Again Login To User", );
      navigate('/')
    }
  }

  useEffect(() => {
    handletoken();
    getAccountNumbers(); // Fetch account numbers when the component mounts
  }, []);

  const getAccountNumbers = async () => {
    try {
      const response = await api.get(`/accnumbers/${customerId}`);
      setAccountData(response.data);
      console.log('Account Numbers:', response);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };

  const handleBack = () => {
    navigate('/ServiceMenu');
  };

  const saveChequeData = async () => {
    var saveObj = {
      service_request_id: 1,
      accountNumber: accountNumber,
      request_message: request_message,
      no_of_cheque_leaves: no_of_cheque_leaves
    };
    try {
      if (no_of_cheque_leaves && accountNumber && request_message) {
        setLoading(true); // Show loader when data saving starts
        await api.post('/postcardrequest', saveObj)
          .then(response => {
            console.log("Data saved", response.data);
            toast.success('Request Data sent successfully', { autoClose: 5000 });
          });
      } else {
        setLoading(false);
        toast.error('Mandatory fields are empty');
      }
    }
    catch (error) {
      console.log("Sorry, data not saved", error);
      setLoading(false);
      toast.error('Failed to submit request');
    }
  };
  
  const handlesubcheque = async () => {
    setLoading(true); // Show loader when request submission starts
    try {
      await saveChequeData();
  
      // Loader and form reset after 5 seconds
      setTimeout(() => {
        setLoading(false);
        setChequeLeaves('');
        setAccountNumber('');
        setrequestMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error submitting request:', error);
      setLoading(false);
      toast.error('Failed to submit request');
    }
  };

  const asteriskStyle = { color: 'red' };

  return (
    <div>
      <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop:'-10%' }} onClick={signout}>
        LogOut
      </button>
      <IconBreadcrumbs step1 step3 step4/> 
      <h1 className='book'>Cheque Book Request</h1>
     
      <div className={`containerStylecheque ${loading ? 'blurred' : ''}`}>
        <form className='car'>
          <div>
            <label className='chequelab'>
              <span style={asteriskStyle}>*</span> Account Number:
              <select
                className='salcheque'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              >
              
                <option value=''>Select</option>
                {Array.isArray(accountData) && accountData.map((item) => (
                  <option key={item.customerId} value={item.customerId}>
                    {item.accountNumber}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br /><br /><br/> 
          <div>
            <label className='chequelab1'>
              <span style={asteriskStyle}>*</span> Number of cheque leaves:
            </label>
            <select
              className='sal1cheque'
              id="noofcheck"
              value={no_of_cheque_leaves}
              onChange={(e) => setChequeLeaves(e.target.value)}
            >
              <option value="">Select a Cheque leaves</option>
              {checkbook.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div><br />
          <label className='request'> <span style={asteriskStyle}>*</span>RequestMessage:</label>
          <div>
            <input className='textreqcheque' type='Textarea' name='text' value={request_message} onChange={(e) => setrequestMessage(e.target.value)} />
          </div>
          <div className='sub'>
            <button type="submit" className="button-56" role="button" onClick={handlesubcheque}>
              Submit
            </button>
            <button
              className="button-56"
              role="button"
              onClick={handleBack}
              type="button">
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

export default ChequeBookRequest;






