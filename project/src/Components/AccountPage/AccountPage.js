import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../Service/baseURL';
import "./AccountPage.css";
import { TablePagination, TextField } from '@mui/material'; 
import IconBreadcrumbs from '../IconBreadcrumbs';
import { googleLogout } from '@react-oauth/google';

function AccountPage() {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const customerId = localStorage.getItem("cid");
  const custname = localStorage.getItem('name');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const signout = () => {
    localStorage.removeItem('token');
    googleLogout();
    navigate('/')
  }

  const token = localStorage.getItem("token");
  const handletoken = () => {
    if (!token) {
      alert("Session Expired Again Login To User");
      navigate('/')
    }
  }

  useEffect(() => {
    handletoken();
    getAccountDetails();
  }, []);

  useEffect(() => {
    // Filter data whenever search query changes
    const filteredResults = responseData.filter(cd =>
      Object.values(cd).some(val =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredResults);
  }, [responseData, searchQuery]);

  const getAccountDetails = async () => {
    if (customerId) {
      try {
        const response = await api.get(`/accdetails/${customerId}`);
        setResponseData(response.data);
      } catch (error) {
        console.log("Something's wrong with the API request", error);
      }
    } else {
      console.log("No Customer with this id found");
    }
  };

  const handleAccountStatement = (accountNumber) => {
    navigate(`/accStatement/${accountNumber}`)
  };

  const handleBack = () => {
    navigate("/ServiceRequest");
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

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <IconBreadcrumbs step1 step7/>

      <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop: '-10%' }} onClick={signout}>
        LogOut
      </button>
      <p className='title1'>My ACCOUNTS</p>
      <br/>

      <div className="centered-container">
        <div className="my-account-container">
          <div className="my-Accounts" >
           
          </div>
          <h4 className="accountname">Welcome:{custname}</h4>

          {/* Search box */}
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />

          <div className="table-container" >
            <table className="tableaccount" style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr className="titaccount">
                  <th style={{ backgroundColor: 'black', position: 'sticky', top: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => handleSort('accountNumber')}>
                    Account Number {sortConfig.key === 'accountNumber' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                    {sortConfig.key !== 'accountNumber' && <span>&#9650;&#9660;</span>}
                  </th>
                  <th style={{ backgroundColor: 'black', position: 'sticky', top: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => handleSort('accountType')}>
                    Account Type {sortConfig.key === 'accountType' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                    {sortConfig.key !== 'accountType' && <span>&#9650;&#9660;</span>}
                  </th>
                  <th style={{ backgroundColor: 'black', position: 'sticky', top: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => handleSort('accountBalance')}>
                    Account Balance {sortConfig.key === 'accountBalance' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                    {sortConfig.key !== 'accountBalance' && <span>&#9650;&#9660;</span>}
                  </th>
                  <th style={{ backgroundColor: 'black',textDecorationColor:'black', position: 'sticky', top: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => handleSort('branchName')}>
                    Branch Name {sortConfig.key === 'branchName' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                    {sortConfig.key !== 'branchName' && <span>&#9650;&#9660;</span>}
                  </th>
                  <th style={{ backgroundColor: 'black', position: 'sticky', top: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => handleSort('Ifsccode')}>
                    IFSC Code {sortConfig.key === 'Ifsccode' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                    {sortConfig.key !== 'Ifsccode' && <span>&#9650;&#9660;</span>}

                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((cd, index) => (
                  <tr key={index} className="tdclass" >
                    <td>
                      <button
                        type="button"
                        className="account-link"
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleAccountStatement(cd.accountNumber)}
                      >
                        {cd.accountNumber}
                      </button>
                    </td>
                    <td>{cd.accountType}</td>
                    <td>{cd.accountBalance}</td>
                    <td>{cd.branchName}</td>
                    <td>{cd.Ifsccode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TablePagination 
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredData.length} // Use filteredData length for pagination count
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       <div style={{ marginTop: '-70px' }}>
        <button type="button" className="back-button1" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
