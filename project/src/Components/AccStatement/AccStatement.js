// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AccStatement.css";
// import api from '../Service/baseURL';
// import { useParams } from "react-router-dom";
// import moment from 'moment';
// import IconBreadcrumbs from '../IconBreadcrumbs';
// import { TextField } from '@mui/material'; // Import TextField from Material-UI

// const AccStatement = () => {
//     const navigate = useNavigate();
//     const { accountNumber } = useParams();
//     const [responseData, setResponseData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(4);
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]); // State to hold filtered search results

//     const signout = () => {
//         localStorage.removeItem('token');
//         navigate('/')
//     }

//     const token = localStorage.getItem("token");
//     const handletoken = () => {
//         if (!token) {
//             alert("Session Expired Again Login To User");
//             navigate('/')
//         }
//     }

//     useEffect(() => {
//         handletoken();
//         getstatementdetails();
//     }, []);

//     useEffect(() => {
//         // Filter data whenever search query changes
//         const filteredResults = responseData.filter(accno =>
//             Object.values(accno).some(val =>
//                 val.toString().toLowerCase().includes(searchQuery.toLowerCase())
//             )
//         );
//         setSearchResults(filteredResults);
//     }, [responseData, searchQuery]);

//     const getstatementdetails = async () => {
//         await api.get(`/getstatement/${accountNumber}`)
//             .then((response) => {
//                 console.log("Full API response:", response?.data);
//                 setResponseData(response?.data);

//             })
//             .catch((error) => {
//                 console.error("Error fetching account statement:", error);
//             });
//     }

//     const handleBack = () => {
//         navigate("/AccountPage");
//     }

//     const formatedate = (date) => {
//         return moment(date).format("DD-MM-YYYY");
//     }

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     // Render sorting icons
//     const renderSortIcon = (columnKey) => {
//         if (sortConfig.key === columnKey) {
//             return sortConfig.direction === 'ascending' ? '↑' : '↓';
//         }
//         return null;
//     };

//     // Pagination logic
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

//     const nextPage = () => {
//         setCurrentPage((prevPage) => prevPage + 1);
//     };

//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage((prevPage) => prevPage - 1);
//         }
//     };

//     return (
//         <div>
//             <IconBreadcrumbs step1 step3 step7 step9 />
//             <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop: '-10%' }} onClick={signout}>
//                 LogOut
//             </button>
//             <div className="account-statement">
//                 <div className="background">
//                     <h2>Account Statement</h2>
//                 </div>
//                 <p className="statname">Account number: {accountNumber}</p>
//                 {/* Material-UI Search Box */}
//                 <TextField
//                     label="Search"
//                     variant="outlined"
//                     value={searchQuery}
//                     onChange={handleSearch}
//                     style={{ marginBottom: '1rem' }}
//                 />
//                 <table className="tablestate">
//                     <thead>
//                         <tr className="titstat">
//                             <th onClick={() => handleSort('date')}>
//                             TransactionDate {sortConfig.key === 'date' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
//                             {sortConfig.key !== 'date' && <span>&#9650;&#9660;</span>}
//                             </th>
//                             <th onClick={() => handleSort('Description')}>
//                                 Description  {sortConfig.key === 'Description' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
//                                 {sortConfig.key !== 'Description' && <span>&#9650;&#9660;</span>}
//                             </th>
//                             <th onClick={() => handleSort('creditamount')}>
//                                 Credit Amount  {sortConfig.key === 'creditamount' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
//                                 {sortConfig.key !== 'creditamount' && <span>&#9650;&#9660;</span>}
//                             </th>
//                             <th onClick={() => handleSort('Debitamount')}>
//                                 Debit Amount  {sortConfig.key === 'Debitamount' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
//                                 {sortConfig.key !== 'Debitamount' && <span>&#9650;&#9660;</span>}
//                             </th>
//                             <th onClick={() => handleSort('ChequeNo')}>
//                                 Cheque/Ref No  {sortConfig.key === 'ChequeNo' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
//                                {sortConfig.key !== 'ChequeNo' && <span>&#9650;&#9660;</span>}
//                             </th>
//                             <th onClick={() => handleSort('closingBalance')}>
//                                 Closing Balance  {sortConfig.key === 'closingBalance' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
//                                 {sortConfig.key !== 'closingBalance' && <span>&#9650;&#9660;</span>}
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentItems.map((accno, index) => (
//                             <tr className="tablerow" key={index}>
//                                 <td>{formatedate(accno.date)}</td>
//                                 <td>{accno.Description}</td>
//                                 <td>{accno.creditamount}</td>
//                                 <td>{accno.Debitamount}</td>
//                                 <td>{accno.ChequeNo}</td>
//                                 <td>{accno.closingBalance}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <button type="button" className="back-button2" onClick={handleBack}>Back</button>
//             </div>
//         </div>
//     );
// };

// export default AccStatement;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccStatement.css";
import api from '../Service/baseURL';
import { useParams } from "react-router-dom";
import moment from 'moment';
import IconBreadcrumbs from '../IconBreadcrumbs';
import { TextField, TablePagination } from '@mui/material'; // Import TextField and TablePagination from Material-UI
import { googleLogout } from '@react-oauth/google';

const AccStatement = () => {
    const navigate = useNavigate();
    const { accountNumber } = useParams();
    const [responseData, setResponseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]); // State to hold filtered search results

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
        getstatementdetails();
    }, []);

    useEffect(() => {
        // Filter data whenever search query changes
        const filteredResults = responseData.filter(accno =>
            Object.values(accno).some(val =>
                val.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setSearchResults(filteredResults);
    }, [responseData, searchQuery]);

    const getstatementdetails = async () => {
        await api.get(`/getstatement/${accountNumber}`)
            .then((response) => {
                console.log("Full API response:", response?.data);
                setResponseData(response?.data);
            })
            .catch((error) => {
                console.error("Error fetching account statement:", error);
            });
    }

    const handleBack = () => {
        navigate("/AccountPage");
    }

    const formatedate = (date) => {
        return moment(date).format("DD-MM-YYYY");
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    // Calculate index of the first and last items to be displayed
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <IconBreadcrumbs step1 step3 step7 step9 />
            <button className="btn btn-primary" style={{ marginLeft: '90%', marginTop: '-10%' }} onClick={signout}>
                LogOut
            </button>
            <div className="account-statement">
                <div className="background">
                    <h2>Account Statement</h2>
                </div>
                <p className="statname">Account number: {accountNumber}</p>
                {/* Material-UI Search Box */}
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ marginBottom: '1rem' }}
                />
                <div className="table-container1" >
                <table className="tablestate">
                    <thead>
                        <tr className="titstat">
                            <th style={{backgroundColor: 'black',position: 'sticky',top: 0, zIndex: 1, cursor: 'pointer'}}   onClick={() => handleSort('date')}>
                                TransactionDate {sortConfig.key === 'date' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                {sortConfig.key !== 'date' && <span>&#9650;&#9660;</span>}
                            </th>
                            <th style={{backgroundColor: 'black',position: 'sticky',top: 0, zIndex: 1, cursor: 'pointer'}}   onClick={() => handleSort('Description')}>
                                Description  {sortConfig.key === 'Description' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                {sortConfig.key !== 'Description' && <span>&#9650;&#9660;</span>}
                            </th>
                            <th style={{backgroundColor: 'black',position: 'sticky',top: 0, zIndex: 1, cursor: 'pointer'}}   onClick={() => handleSort('creditamount')}>
                                Credit Amount  {sortConfig.key === 'creditamount' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                {sortConfig.key !== 'creditamount' && <span>&#9650;&#9660;</span>}
                            </th>
                            <th style={{backgroundColor: 'black',position: 'sticky',top: 0, zIndex: 1, cursor: 'pointer'}}  onClick={() => handleSort('Debitamount')}>
                                Debit Amount  {sortConfig.key === 'Debitamount' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                {sortConfig.key !== 'Debitamount' && <span>&#9650;&#9660;</span>}
                            </th>
                            <th style={{backgroundColor: 'black',position: 'sticky',top: 0, zIndex: 1, cursor: 'pointer'}}  onClick={() => handleSort('ChequeNo')}>
                                Cheque/Ref No  {sortConfig.key === 'ChequeNo' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                {sortConfig.key !== 'ChequeNo' && <span>&#9650;&#9660;</span>}
                            </th>
                            <th style={{backgroundColor: 'black',position: 'sticky',top: 0, zIndex: 1, cursor: 'pointer'}}  onClick={() => handleSort('closingBalance')}>
                                Closing Balance  {sortConfig.key === 'closingBalance' && <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                {sortConfig.key !== 'closingBalance' && <span>&#9650;&#9660;</span>}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((accno, index) => (
                            <tr className="tablerow" key={index}>
                                <td>{formatedate(accno.date)}</td>
                                <td>{accno.Description}</td>
                                <td>{accno.creditamount}</td>
                                <td>{accno.Debitamount}</td>
                                <td>{accno.ChequeNo}</td>
                                <td>{accno.closingBalance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
           
            </div>

            <div>
                <button type="button" className="back-button2" onClick={handleBack}>Back</button>
            </div>

            <div className="Algin">  
            <TablePagination 
                rowsPerPageOptions={[4, 8, 12, 16]} // Rows per page options
                component="div"
                count={searchResults.length}
                rowsPerPage={itemsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>

           

        </div>
    );
};

export default AccStatement;
