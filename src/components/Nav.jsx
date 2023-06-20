import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="container mx-auto px-4 py-2 mt-5 sm:mt-20 flex flex-col sm:flex-row items-center justify-around border-b border-black">
      <div className="flex items-center mb-4 sm:mb-0">
        <img src="https://avatars3.githubusercontent.com/u/37439169?s=200&v=4" alt="Logo" className="w-6 sm:w-12 h-6 sm:h-12 mr-2" />
        <h1 className="text-2xl sm:text-4xl ml-2" style={{ fontFamily: 'Lato', color: '#1c2c54' }}>DEV APP</h1>
      </div>
      <div className="flex items-center flex-grow sm:ml-20 mb-4 sm:mb-0">
        <div>
          <Link 
            to="/" 
            className={`ml-4 text-xs sm:text-2xl font-bold ${location.pathname === '/' ? 'active-link' : ''}`}
          >
            HOME
          </Link>
          <Link 
            to="/customers" 
            className={`ml-4 text-xs sm:text-2xl font-bold ${location.pathname === '/customers' ? 'active-link' : ''}`}
          >
            CUSTOMERS
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <img src="https://files.startdeliver.com/accid-aa909493a6679e232a361e2a501179b4/611d57c1d8af8f2671ed9c25fb38331b" alt="Profile Icon" className="w-6 sm:w-8 h-6 sm:h-8 mr-2 rounded-full cursor-pointer" /> 
        <div>
          <p className="font-bold text-sm sm:text-base">John Doe</p>
          <p className="text-xs sm:text-sm text-gray-500">Customer Success Hero</p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
