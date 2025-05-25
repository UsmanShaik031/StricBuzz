import React from 'react';
import './TopHeader.css'; // Install with: npm install react-icons

const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="back-icon">
        {/* <IoArrowBack size={24} color="#fff" /> */}
              <h1 className="main-title">Go ahead and set up your account</h1>
      </div>

       <p  className="subtitle">Weleome to Street Premier League, Login to enjoy the StricBuzz Experience... </p>
      <p className="subtitle"></p>
    </div>
  );
};

export default TopHeader;
