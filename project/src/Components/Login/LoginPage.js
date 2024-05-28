import React, { useState,useEffect } from 'react';
import './LoginPage.css';
// import './Loading.css';
import { useNavigate } from 'react-router-dom';
import api from '../Service/baseURL';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [firstAttempt, setFirstAttempt] = useState(true); // Add state for tracking first login attempt
  // const [Loader, setLoader] = useState(false); // State to track loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear token when component is mounted
    localStorage.removeItem('token');
  }, []);

  const payload = {
    userName: userName,
    password: password,
  };

  const navigate = useNavigate();

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z]+$/;
    if (!value) {
      return 'Username is required';
    } else if (!regex.test(value)) {
      return 'Username should contain only characters';
    } else {
      return '';
    }
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!value) {
      return 'Password is required';
    } else if (!passwordRegex.test(value) && !firstAttempt) { // Only validate password if not the first attempt
      return 'Password should have a minimum length of 8 characters, at least one uppercase letter, and one special character';

      // toast.error("Password should have a minimum length of 8 characters, at least one uppercase letter, and one special character");
    } else {
      return '';
    }
  };

  const handleInputChange = (e, validator, setError) => {
    const value = e.target.value;
    const error = validator(value);
    setError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    // Update state to indicate it's not the first login attempt
    setFirstAttempt(false);
  
    const isUsernameValid = !validateUsername(userName);
    const isPasswordValid = !validatePassword(password);
  
    if (!isUsernameValid || !isPasswordValid) {
      setUsernameError(validateUsername(userName));
      setPasswordError(validatePassword(password));
      setLoginError('Username and password are required');
      setLoading(false); // Set loading state to false
      return;
    }
  
    try {
      const response = await api.post('/generate-token', {
        userName,
        password,
      });
  
      if (response.data.message === 'Login Successful') {

        toast.success("Login successful!", { autoClose: 1000 });
        localStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('cid', response.data.customer_id);
        localStorage.setItem('username', userName);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/serviceRequest'; // Change '/dashboard' to the appropriate redirect URL
  
        // Redirect after 5 seconds
        setTimeout(() => {
          navigate('/ServiceRequest');
        }, 1000);
      } else {
        setLoginError('Invalid Username or Invalid Password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An error occurred during login. Please try again.');
      toast.error("Invalid username or password", { autoClose: 1000 });
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Set loading state to false after login attempt
    }
  };
  
  const handleClear = () => {
    setUserName('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    setLoginError('');
    // Reset firstAttempt flag when clearing the form
    setFirstAttempt(true);
  };

  return (
    <div>
      <center>
        <h1 style={{ backgroundColor: 'transparent', marginTop: '1%' }}>
          WELCOME TO SELF-SERVICE
        </h1>
      </center>
      <div className={`wrapper1 ${loading ? 'blurred' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ backgroundColor: 'transparent', marginBottom: '5px', marginTop: '-10px' }}>
            Login
          </h2>  
          <div className="input-box">
            <label>UserName :</label>
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setUsernameError('');
                setLoginError('');
              }}
              onBlur={(e) => handleInputChange(e, validateUsername, setUsernameError)}
              type="text"
              placeholder="UserName"
              required
            />
            {usernameError && <span className="error" style={{ color: 'red' }}>{usernameError}</span>}
          </div>
          <div className="input-box">
            <label>Password :</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
                setLoginError('');
              }}
              onBlur={(e) => handleInputChange(e, validatePassword, setPasswordError)}
              type="password"
              placeholder="Password"
              required
            />
            {passwordError && <span className="error" style={{ color: 'red' }}>{passwordError}</span>}
          </div>

          <div className="login-buttons">
            <button type="submit">Login</button>
            <button
              type="button"
              style={{ marginLeft: '12px' }}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          
          {loginError && <span className="error" style={{ color: 'red' }}>{loginError}</span>}
        </form>
         {/* <GoogleLogin
  onSuccess={credentialResponse => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    navigate('/serviceRequest');
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/> */}
        {loading && (
        <div className="page-loader">
         <BounceLoader color="#000000" loading={loading} size={80} />
        </div>
        
        )}
        
      </div>
    </div>
  );
};

export default LoginPage;






// import React, { useState } from 'react';
// import './LoginPage.css';
// import { useNavigate } from 'react-router-dom';
// import api from '../Service/baseURL';

// const LoginPage = () => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [firstAttempt, setFirstAttempt] = useState(true); // Add state for tracking first login attempt

//   const payload = {
//     userName: userName,
//     password: password,
//   };

//   const navigate = useNavigate();

//   const validateUsername = (value) => {
//     const regex = /^[a-zA-Z]+$/;
//     if (!value) {
//       return 'Username is required';
//     } else if (!regex.test(value)) {
//       return 'Username should contain only characters';
//     } else {
//       return '';
//     }
//   };

//   const validatePassword = (value) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!value) {
//       return 'Password is required';
//     } else if (!passwordRegex.test(value) && !firstAttempt) { // Only validate password if not the first attempt
//       return 'Password should have a minimum length of 8 characters, at least one uppercase letter, and one special character';
//     } else {
//       return '';
//     }
//   };

//   const handleInputChange = (e, validator, setError) => {
//     const value = e.target.value;
//     const error = validator(value);
//     setError(error);
//   };

//   const handleSubmit = async () => {
//     // Update state to indicate it's not the first login attempt
//     setFirstAttempt(false);

//     const isUsernameValid = !validateUsername(userName);
//     const isPasswordValid = !validatePassword(password);

//     if (!isUsernameValid || !isPasswordValid) {
//       setUsernameError(validateUsername(userName));
//       setPasswordError(validatePassword(password));
//       setLoginError('Username and password are required');
//       return;
//     }

//     try {
//       const response = await api.post('/generate-token', {
//         userName,
//         password,
//       });

//       if (response.data.message === 'Login Successful') {
//         alert('Login successful');
//         localStorage.setItem('token', response.data.token);
//         sessionStorage.setItem('user', JSON.stringify(response.data.user));
//         localStorage.setItem('cid', response.data.customer_id);
//         localStorage.setItem('username', userName);
//         localStorage.setItem('token', response.data.token);

//         navigate('/ServiceRequest');
//       } else {
//         setLoginError('Invalid Username or Invalid Password');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setLoginError('An error occurred during login. Please try again.');
//     }
//   };

//   const handleClear = () => {
//     setUserName('');
//     setPassword('');
//     setUsernameError('');
//     setPasswordError('');
//     setLoginError('');
//     // Reset firstAttempt flag when clearing the form
//     setFirstAttempt(true);
//   };

//   return (
//     <div>
//       <center>
//         <h1 style={{ backgroundColor: 'transparent', marginTop: '1%' }}>
//           WELCOME TO SELF-SERVICE
//         </h1>
//       </center>
//       <div className="wrapper1">
//         <form>
//           <h2 style={{ backgroundColor: 'transparent', marginBottom: '5px', marginTop: '-10px' }}>
//             Login
//           </h2>
//           <div className="input-box">
//             <label>UserName :</label>
//             <input
//               value={userName}
//               onChange={(e) => {
//                 setUserName(e.target.value);
//                 setUsernameError('');
//                 setLoginError('');
//               }}
//               onBlur={(e) => handleInputChange(e, validateUsername, setUsernameError)}
//               type="text"
//               placeholder="UserName"
//               required
//             />
//             {usernameError && <span className="error" style={{ color: 'red' }}>{usernameError}</span>}
//           </div>
//           <div className="input-box">
//             <label>Password :</label>
//             <input
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setPasswordError('');
//                 setLoginError('');
//               }}
//               onBlur={(e) => handleInputChange(e, validatePassword, setPasswordError)}
//               type="password"
//               placeholder="Password"
//               required
//             />
//             {passwordError && <span className="error" style={{ color: 'red' }}>{passwordError}</span>}
//           </div>

//           <div className="login-buttons">
//             <button type="button" onClick={handleSubmit}>
//               Login
//             </button>
//             <button
//               type="button"
//               style={{ marginLeft: '12px' }}
//               onClick={handleClear}
//             >
//               Clear
//             </button>
//           </div>
//           {loginError && <span className="error" style={{ color: 'red' }}>{loginError}</span>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;










// import React, { useState } from 'react';
// import './LoginPage.css';
// // import './Loading.css';
// import { useNavigate } from 'react-router-dom';
// import api from '../Service/baseURL';
// import ClockLoader from 'react-spinners/ClockLoader';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginPage = () => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [firstAttempt, setFirstAttempt] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const payload = {
//     userName: userName,
//     password: password,
//   };

//   const navigate = useNavigate();

//   const validateUsername = (value) => {
//     const regex = /^[a-zA-Z]+$/;
//     if (!value) {
//       return 'Username is required';
//     } else if (!regex.test(value)) {
//       return 'Username should contain only characters';
//     } else {
//       return '';
//     }
//   };

//   const validatePassword = (value) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!value) {
//       return 'Password is required';
//     } else if (!passwordRegex.test(value) && !firstAttempt) {
//       return 'Password should have a minimum length of 8 characters, at least one uppercase letter, and one special character';
//     } else {
//       return '';
//     }
//   };

//   const handleInputChange = (e, validator, setError) => {
//     const value = e.target.value;
//     const error = validator(value);
//     setError(error);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setFirstAttempt(false);

//     const isUsernameValid = !validateUsername(userName);
//     const isPasswordValid = !validatePassword(password);

//     if (!isUsernameValid || !isPasswordValid) {
//       setUsernameError(validateUsername(userName));
//       setPasswordError(validatePassword(password));
//       setLoginError('Username and password are required');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await api.post('/generate-token', {
//         userName,
//         password,
//       });

//       if (response.data.message === 'Login Successful') {
//         toast.success("Login successful!", { autoClose: 5000 });
//         localStorage.setItem('token', response.data.token);
//         sessionStorage.setItem('user', JSON.stringify(response.data.user));
//         localStorage.setItem('cid', response.data.customer_id);
//         localStorage.setItem('username', userName);
//         localStorage.setItem('token', response.data.token);

//         setTimeout(() => {
//           navigate('/ServiceRequest');
//         }, 5000);
//       } else {
//         setLoginError('Invalid Username or Invalid Password');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setLoginError('An error occurred during login. Please try again.');
//       toast.error("An error occurred during login. Please try again.");
//     }
//     finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setUserName('');
//     setPassword('');
//     setUsernameError('');
//     setPasswordError('');
//     setLoginError('');
//     setFirstAttempt(true);
//   };

//   return (
//     <div>
//       <center>
//         <h1 style={{ backgroundColor: 'transparent', marginTop: '1%' }}>
//           WELCOME TO SELF-SERVICE
//         </h1>
//       </center>
//       <div className={`wrapper1 ${loading ? 'blurred' : ''}`}>
//         <form onSubmit={handleSubmit}>
//           <h2 style={{ backgroundColor: 'transparent', marginBottom: '5px', marginTop: '-10px' }}>
//             Login 
//           </h2>
//           <div className="input-box">
//             <label>UserName :</label>
//             <input
//               value={userName}
//               onChange={(e) => {
//                 setUserName(e.target.value);
//                 setUsernameError('');
//                 setLoginError('');
//               }}
//               onBlur={(e) => handleInputChange(e, validateUsername, setUsernameError)}
//               type="text"
//               placeholder="UserName"
//               required
//             />
//             {usernameError && <span className="error" style={{ color: 'red' }}>{usernameError}</span>}
//           </div>
//           <div className="input-box">
//             <label>Password :</label>
//             <input
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setPasswordError('');
//                 setLoginError('');
//               }}
//               onBlur={(e) => handleInputChange(e, validatePassword, setPasswordError)}
//               type="password"
//               placeholder="Password"
//               required
//             />
//             {passwordError && <span className="error" style={{ color: 'red' }}>{passwordError}</span>}
//           </div>

//           <div className="login-buttons">
//             <button type="submit">Login</button>
//             <button
//               type="button"
//               style={{ marginLeft: '12px' }}
//               onClick={handleClear}
//             >
//               Clear
//             </button>
//           </div>
//           {loginError && <span className="error" style={{ color: 'red' }}>{loginError}</span>}
//         </form>
//         {loading && (
//         <div className="page-loader">
//           <ClockLoader color="#000000" loading={loading} size={80} />
//         </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;












// import React, { useState } from 'react';
// import './LoginPage.css';
// import { useNavigate } from 'react-router-dom';
// import api from '../Service/baseURL';
// import ClockLoader from 'react-spinners/ClockLoader';
// import { toast } from 'react-toastify'; // Import toast from react-toastify

// import 'react-toastify/dist/ReactToastify.css';

// const LoginPage = () => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [firstAttempt, setFirstAttempt] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const validateUsername = (value) => {
//     const regex = /^[a-zA-Z]+$/;
//     if (!value) {
//       return 'Username is required';
//     } else if (!regex.test(value)) {
//       return 'Username should contain only characters';
//     } else {
//       return '';
//     }
//   };

//   const validatePassword = (value) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!value) {
//       return 'Password is required';
//     } else if (!passwordRegex.test(value) && !firstAttempt) {
//       return 'Password should have a minimum length of 8 characters, at least one uppercase letter, and one special character';
//     } else {
//       return '';
//     }
//   };

//   const handleInputChange = (e, validator, setError) => {
//     const value = e.target.value;
//     const error = validator(value);
//     setError(error);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setFirstAttempt(false);

//     const isUsernameValid = !validateUsername(userName);
//     const isPasswordValid = !validatePassword(password);

//     if (!isUsernameValid || !isPasswordValid) {
//       setUsernameError(validateUsername(userName));
//       setPasswordError(validatePassword(password));
//       setLoginError('Username and password are required');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await api.post('/generate-token', {
//         userName,
//         password,
//       });

//       if (response.data.message === 'Login Successful') {
//         toast.success("Login successful!", { autoClose: 5000 }); // Display success message using toast
//         localStorage.setItem('token', response.data.token);
//         sessionStorage.setItem('user', JSON.stringify(response.data.user));
//         localStorage.setItem('cid', response.data.customer_id);
//         localStorage.setItem('username', userName);
//         navigate('/ServiceRequest');
//       } else {
//         setLoginError('Invalid Username or Invalid Password');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setLoginError('An error occurred during login. Please try again.');
//       toast.error("An error occurred during login. Please try again."); // Display error message using toast
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setUserName('');
//     setPassword('');
//     setUsernameError('');
//     setPasswordError('');
//     setLoginError('');
//     setFirstAttempt(true);
//   };

//   return (
//     <div>
//       <center>
//         <h1 style={{ backgroundColor: 'transparent', marginTop: '1%' }}>
//           WELCOME TO SELF-SERVICE
//         </h1>
//       </center>
//       <div className={`wrapper1 ${loading ? 'blurred' : ''}`}>
//         <form onSubmit={handleSubmit}>
//           <h2 style={{ backgroundColor: 'transparent', marginBottom: '5px', marginTop: '-10px' }}>
//             Login
//           </h2>
//           <div className="input-box">
//             <label>UserName :</label>
//             <input
//               value={userName}
//               onChange={(e) => {
//                 setUserName(e.target.value);
//                 setUsernameError('');
//                 setLoginError('');
//               }}
//               onBlur={(e) => handleInputChange(e, validateUsername, setUsernameError)}
//               type="text"
//               placeholder="UserName"
//               required
//             />
//             {usernameError && <span className="error" style={{ color: 'red' }}>{usernameError}</span>}
//           </div>
//           <div className="input-box">
//             <label>Password :</label>
//             <input
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setPasswordError('');
//                 setLoginError('');
//               }}
//               onBlur={(e) => handleInputChange(e, validatePassword, setPasswordError)}
//               type="password"
//               placeholder="Password"
//               required
//             />
//             {passwordError && <span className="error" style={{ color: 'red' }}>{passwordError}</span>}
//           </div>

//           <div className="login-buttons">
//             <button type="submit">Login</button>
//             <button
//               type="button"
//               style={{ marginLeft: '12px' }}
//               onClick={handleClear}
//             >
//               Clear
//             </button>
//           </div>
//           {loginError && <span className="error" style={{ color: 'red' }}>{loginError}</span>}
//         </form>
//         {loading && (
//         <div className="page-loader">
//           <ClockLoader color="#000000" loading={loading} size={80} speedMultiplier={4}/>
//         </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

