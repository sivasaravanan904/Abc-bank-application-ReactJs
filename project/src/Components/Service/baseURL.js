// import axios from "axios";

// //export default axios.create({
//  //   baseURL:"http://localhost:2443",
// //headers:{
//    // 'Content-Type':'application/json'
// //}
//     //    }
// //);
// const token = localStorage.getItem('token');
// const api = axios.create({
//     baseURL: "http://localhost:2443/cssapp",
//     headers: {
//       'Content-Type':'application/json',
//       'Access-Control-Allow-Origin':'*'
//               //  'Autorization':`Bearer ${token}`

//     }
//   });
  
//   export default api;




import axios from 'axios';
// import baseURL from './baseUrl'; // Import the baseUrl module

const api = axios.create({
  baseURL: "http://localhost:4040/cssapp", // Use baseURL here
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const api = axios.create({
//     baseURL: "http://localhost:2443/cssapp",
//     headers: {
//       'Content-Type':'application/json',
//       'Access-Control-Allow-Origin':'*'
//               //  'Autorization':`Bearer ${token}`

//     }
//   });
  
  export default api;
