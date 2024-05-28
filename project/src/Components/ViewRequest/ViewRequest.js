
// import React, { useState, useEffect } from 'react';
// import "./ViewRequest.css";
// import api from '../Service/baseURL';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import { TablePagination } from '@mui/material';
// import IconBreadcrumbs from '../IconBreadcrumbs';


// const ViewRequest = () => {
//   const navigate = useNavigate();
//   const cName = localStorage.getItem('name');
//   const [requestType, setRequestType] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const customerId = localStorage.getItem("cid");
//   const [responseData, setResponseData] = useState([]);
//   const [accountData1, setAccountData1] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

//   const Backoffice = () => {
//     navigate("/ServiceRequest");
//   };

//   const signout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const token = localStorage.getItem("token");
//   const handletoken = () => {
//     if (!token) {
//       alert("Session Expired Again Login To User");
//       navigate('/');
//     }
//   };

//   useEffect(() => {
//     handletoken();
//     getAccountNumbers();
//   }, []);

//   const getAccountNumbers = async () => {
//     try {
//       const response = await api.get(`/accnumbers/${customerId}`);
//       setAccountData1(response.data);
//     } catch (error) {
//       console.error('Error fetching account numbers:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [requestType, currentPage, itemsPerPage, sortConfig]);

//   const fetchData = async () => {
//     if (requestType) {
//       var obj = {
//         service_request_id: +requestType,
//         account_number: +accountNumber,
//       };
//       try {
//         const response = await api.post('/getbyseviceid', obj);
//         setResponseData(response.data);
//       } catch (error) {
//         console.log("Error", error);
//       }
//     }
//   };

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setItemsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedData = [...responseData].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   const formatedate = (date) => {
//     return moment(date).format("DD-MM-YYYY");
//   };

//   const getServiceType = (serviceId) => {
//     switch (serviceId) {
//       case 1:
//         return 'Cheque Book Request';
//       case 2:
//         return 'Credit or Debit Card';
//       case 3:
//         return 'Lost or Stolen Card';
//       default:
//         return 'Unknown Service Type';
//     }
//   };

//   const handleChangeRequestType = (e) => {
//     setRequestType(e.target.value);
//   };

//   return (
//     <div>
//       <IconBreadcrumbs step1 step3 step8/> 
//       <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop: '-10%' }} onClick={signout}>
//         LogOut
//       </button>
      
//       <div className='headinnn'><h2>VIEW REQUEST STATUS</h2></div>
//       <div className="T_Container">
//         <div className="T_header">
//           <h2 className='book123'>Name: {cName}</h2>
//           <div className="T_border">
//             <div>
//               <label className="viewlab" htmlFor="cardType">Account Number:
//                 <select
//                   className='salview'
//                   value={accountNumber}
//                   onChange={(e) => setAccountNumber(e.target.value)}
//                   required
//                 >
//                   <option value='' disabled>Select</option>
//                   {accountData1.map((item) => (
//                     <option key={item.customerId} value={item.accountNumber}>
//                       {item.accountNumber}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <br /><br />
//               <label> Request Type:  </label>
//               <select
//                 name="requestType"
//                 value={requestType}
//                 onChange={handleChangeRequestType}
//               >
//                 <option value="0"  disabled>Select</option>
//                 <option value="1">Cheque Book Request</option>
//                 <option value="2">Credit/DebitCard Request</option>
//                 <option value="3">Lost/StolenCard Request</option>
//               </select>
//             </div><br></br><br></br>
//             <div className="TableContainer">
//               <table className="Table" style={{ textAlign: 'center' }}>
//                 <thead>
//                   <tr className='viewtab'>
//                     <th onClick={() => handleSort('requestdate')}>S.No {sortConfig.key === 'requestdate' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}</th>
//                     <th onClick={() => handleSort('requestdate')} className='reqdate'>Request Date {sortConfig.key === 'requestdate' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}</th>
//                     <th onClick={() => handleSort('responsestatus')}>Response Status {sortConfig.key === 'responsestatus' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}</th>
//                     <th onClick={() => handleSort('responseMessage')} className='res'>Response Message {sortConfig.key === 'responseMessage' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}</th>
//                     <th onClick={() => handleSort('serviceid')}>Request Type {sortConfig.key === 'serviceid' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}</th>
//                     <th onClick={() => handleSort('responseDate')}>Response Date {sortConfig.key === 'responseDate' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}</th>
//                   </tr>
//                 </thead>
//                 <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}>
//                   {sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((cd, index) => (
//                     <tr className='viewclass' key={index}>
//                       <th scope="row">{index + 1 + currentPage * itemsPerPage}</th>
//                       <td>{formatedate(cd.requestdate)}</td>
//                       <td>{cd.responsestatus}</td>
//                       <td>{cd.responseMessage ? cd.responseMessage : '-'}</td>
//                       <td>{getServiceType(cd.serviceid)}</td>
//                       <td>{cd.responseDate ? formatedate(cd.responseDate) : '-'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, 100]}
//               component="div"
//               count={responseData.length}
//               rowsPerPage={itemsPerPage}
//               page={currentPage}
//               onPageChange={handlePageChange}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
            
//           </div>
//           <div className="T_SubmitController" style={{ textAlign: 'center' }}>
//               <button className="T_Submit" onClick={Backoffice}><span>Back</span></button>
//             </div>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default ViewRequest;
import React, { useState, useEffect } from 'react';
import "./ViewRequest.css";
import api from '../Service/baseURL';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { TablePagination } from '@mui/material';
import IconBreadcrumbs from '../IconBreadcrumbs';
import { googleLogout } from '@react-oauth/google';

const ViewRequest = () => {
  const navigate = useNavigate();
  const cName = localStorage.getItem('name');
  const [requestType, setRequestType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const customerId = localStorage.getItem("cid");
  const [responseData, setResponseData] = useState([]);
  const [accountData1, setAccountData1] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const Backoffice = () => {
    navigate("/ServiceRequest");
  };

  const signout = () => {
    localStorage.removeItem('token');
    googleLogout();
    navigate('/');
  };

  const token = localStorage.getItem("token");
  const handletoken = () => {
    if (!token) {
      alert("Session Expired Again Login To User");
      navigate('/');
    }
  };

  useEffect(() => {
    handletoken();
    getAccountNumbers();
  }, []);

  const getAccountNumbers = async () => {
    try {
      const response = await api.get(`/accnumbers/${customerId}`);
      setAccountData1(response.data);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestType, currentPage, itemsPerPage, sortConfig]);

  const fetchData = async () => {
    if (requestType) {
      var obj = {
        service_request_id: +requestType,
        account_number: +accountNumber,
      };
      try {
        const response = await api.post('/getbyseviceid', obj);
        setResponseData(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...responseData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const formatedate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };

  const getServiceType = (serviceId) => {
    switch (serviceId) {
      case 1:
        return 'Cheque Book Request';
      case 2:
        return 'Credit or Debit Card';
      case 3:
        return 'Lost or Stolen Card';
      default:
        return 'Unknown Service Type';
    }
  };

  const handleChangeRequestType = (e) => {
    setRequestType(e.target.value);
  };

  return (
    <div>
      <IconBreadcrumbs step1 step8/> 
      <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop: '-10%' }} onClick={signout}>
        LogOut
      </button>
      
      <div className='headinnn'><h2>VIEW REQUEST STATUS</h2></div>
      <div className="T_Container">
        <div className="T_header">
          <h2 className='book123'>Name: {cName}</h2>
          <div className="T_border">
            <div>
              <label className="viewlab" htmlFor="cardType">Account Number:
                <select
                  className='salview'
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                >
                  <option value='' disabled>Select</option>
                  {accountData1.map((item) => (
                    <option key={item.customerId} value={item.accountNumber}>
                      {item.accountNumber}
                    </option>
                  ))}
                </select>
              </label>
              <br /><br />
              <label> Request Type:  </label>
              <select
                name="requestType"
                value={requestType}
                onChange={handleChangeRequestType}
              >
                <option value="0"  disabled>Select</option>
                <option value="1">Cheque Book Request</option>
                <option value="2">Credit/DebitCard Request</option>
                <option value="3">Lost/StolenCard Request</option>
              </select>
            </div><br></br><br></br>
            <div className="TableContainer">
              <table className="Table" style={{ textAlign: 'center' }}>
                <thead>
                  <tr className='viewtab'>
                    <th onClick={() => handleSort('requestdate')}>
                      S.No {sortConfig.key === 'requestdate' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}
                      {sortConfig.key !== 'requestdate' && <span>&#9650;&#9660;</span>}
                    </th>
                    <th onClick={() => handleSort('requestdate')} className='reqdate'>
                      Request Date {sortConfig.key === 'requestdate' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}
                      {sortConfig.key !== 'requestdate' && <span>&#9650;&#9660;</span>}
                    </th>
                    <th onClick={() => handleSort('responsestatus')}>
                      Response Status {sortConfig.key === 'responsestatus' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}
                      {sortConfig.key !== 'responsestatus' && <span>&#9650;&#9660;</span>}
                    </th>
                    <th onClick={() => handleSort('responseMessage')} className='res'>
                      Response Message {sortConfig.key === 'responseMessage' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}
                      {sortConfig.key !== 'responseMessage' && <span>&#9650;&#9660;</span>}
                    </th>
                    <th onClick={() => handleSort('serviceid')}>
                      Request Type {sortConfig.key === 'serviceid' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}
                      {sortConfig.key !== 'serviceid' && <span>&#9650;&#9660;</span>}
                    </th>
                    <th onClick={() => handleSort('responseDate')}>
                      Response Date {sortConfig.key === 'responseDate' && <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>}
                      {sortConfig.key !== 'responseDate' && <span>&#9650;&#9660;</span>}
                    </th>
                  </tr>
                </thead>
                <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((cd, index) => (
                    <tr className='viewclass' key={index}>
                      <th scope="row">{index + 1 + currentPage * itemsPerPage}</th>
                      <td>{formatedate(cd.requestdate)}</td>
                      <td>{cd.responsestatus}</td>
                      <td>{cd.responseMessage ? cd.responseMessage : '-'}</td>
                      <td>{getServiceType(cd.serviceid)}</td>
                      <td>{cd.responseDate ? formatedate(cd.responseDate) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
             
            </div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={responseData.length}
              rowsPerPage={itemsPerPage}
              page={currentPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
             <div className="T_SubmitController" style={{ textAlign: 'center' }}>
            <button className="T_Submit" onClick={Backoffice}><span>Back</span></button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;


