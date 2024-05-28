import React from 'react';
import './Header.css';
import LoginLogo from './LoginLogo.png';

export const Header = () => {

  
  return (
    <div>
<header>
  <div className='btnbtn1'>
    <h1 id="header" align="center" style={{color:'whitesmoke'}}>
      ABC BANK
      <img src={LoginLogo} alt="Logo"></img>
    </h1>
  </div>
</header>
  </div>
  )
}

export default Header;



// import React from 'react';
// // import IconBreadcrumbs from '.IconBreadcrumbs';
// // import IconBreadcrumbs from './IconBreadcrumbs'; // Import IconBreadcrumbs component
// import IconBreadcrumbs from '../IconBreadcrumbs';
// import LoginLogo from './LoginLogo.png';
// import './Header.css';

// export const Header = () => {
//   return (
//     <div>
//       <header>
//         <div className="header-container">
//           <div className="logo">
//             <h1 id="header" align="center" style={{ color: 'whitesmoke' }}>
//               ABC BANK
//               <img src={LoginLogo} alt="Logo" />
//             </h1>
//           </div>
//           <div className="breadcrumbs-container">
//             <IconBreadcrumbs /> {/* Place IconBreadcrumbs component here */}
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;

