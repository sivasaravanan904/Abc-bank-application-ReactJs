import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CardRequest.css';
import api from '../Service/baseURL';
import BounceLoader from 'react-spinners/BounceLoader'; // Import the loading spinner component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconBreadcrumbs from '../IconBreadcrumbs';
import { googleLogout } from '@react-oauth/google';



function CardRequest() {
  const [loading, setLoading] = useState(false); // State to track loading status
  const signout = () => {
    localStorage.removeItem('token');
    googleLogout();
    navigate('/')
  }

  const token =localStorage.getItem("token");
  const handletoken =() =>{
    if(!token){
    toast.error("Session Expired Again Login To User", { autoClose: 5000 });
    // alert("Session Expired Again Login To User");
    navigate('/')
    }
  }

  const navigate = useNavigate();
 
  const [account_number, setAccountNumber] = useState('');
  const [cardType, setCardType] = useState(""); // Store the selected card type
  const[request_message,setrequestMessage]=useState('');
  // const[requestType,setrequestType]=useState('');
  // const[serviceid,setserviceRequestId]=useState('');
  const customerId = localStorage.getItem("cid");
  const [accountData1, setAccountData1] = useState([]); // State for storing account numbers
  // const custname = localStorage.getItem('name');

  const cardTypes = ["Debit", "Credit"]; // Replace with your card types

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // You can perform further actions here, such as submitting the data.
  };

 

  useEffect(() => {
    handletoken();
    getAccountNumbers1(); // Fetch account numbers when the component mounts
  }, []);

  const getAccountNumbers1 = async () => {
    try {
      const response = await api.get(`/accnumbers/${customerId}`); // Use the correct API endpoint
      setAccountData1(response.data);
      console.log('Account Numbers:', response.data);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };
 

  const handleBack = () => {
    navigate('/ServiceMenu');
  };

  const saveCreditData= async () => {
    setLoading(true); // Set loading to true before API call
    var saveObj1 = {
      service_request_id:2,
      account_number:account_number,
      request_message:request_message,
      card_type:cardType,
      // requestType:requestType
    }
    // console.log("123456789"+serviceRequestId);
    console.log("ujghjgf", saveObj1);
    try {
      if(cardType && account_number && request_message ){

     await api.post('/savecardrequest', saveObj1)
        .then(response => {
          console.log("Data saved", response.data);
          toast.success('Request Data sent successfully')
          // alert("Request Data sent successfully")
          // setLoading(false); // Set loading to false after successful API call
          
        })
      }
      else{
        // alert("Please fill the mandatory field");
        toast.error( "Please fill the mandatory field" )
        // setLoading(false); // Set loading to false if form validation fails

      }
      } 
    catch (error) {
      console.log("sorry data not save", error);
      // setLoading(false); // Set loading to false if API call fails
    }finally {
      setTimeout(() => {
        setLoading(false);  // Set loading state to false after API call completes
      },5000);
    }
  }

  const handleclearcard=async()=>{
    await saveCreditData();
    setCardType('');
    setAccountNumber('');
    setrequestMessage('');
    // setrequestType('');
  }
  const asteriskStyle = { color: 'red' }; 
  return (
    <div>
      <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop:'-10%' }}onClick={signout} >
          LogOut
        </button>
        <IconBreadcrumbs step1 step3 step5/> 

      <h1 className="credittit" style={{backgroundColor:'transparent', textAlign:'center',marginTop:'-2%',fontSize:'30px'}}>Card Request</h1>
      
      <div className={`containerStyle ${loading ? 'blurred' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div>
          <label className="labcredit" htmlFor="cardType"><span style={asteriskStyle}>*</span> Account Number:</label>
          <select
            className='salcred'
            value={account_number}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          >
            <option value=''>Select</option>
            {accountData1.map((item) => (
              <option key={item.customerId} value={item.accountNumber}>
                {item.accountNumber}
              </option>
            ))}
            </select>
          </div><br></br><br></br>
          <div>
            <label  className="labcredit1" htmlFor="cardType"><span style={asteriskStyle}>*</span> Card Type:</label>
            <select className="salcred1"
              id="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="">Select a card type</option>
              {cardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div><br></br><br></br>
          <label className='mesgreq'><span style={asteriskStyle}>*</span> RequestMessage:</label>
          <input className='textreqmsg'  value={request_message} onChange={(e) => setrequestMessage(e.target.value)} />
          
        </form>
        <div className="credit"> 
        <button type="submit" onClick={handleclearcard}>Submit</button>
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

export default CardRequest;
