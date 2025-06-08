import React from 'react';
import './TopHeader.css'; // Install with: npm install react-icons

const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="back-icon">
        {/* <IoArrowBack size={24} color="#fff" /> */}
              <h1 className="main-title">StricBuzz</h1>
      </div>

       <p  className="subtitle">Weleome to StricBuzz, Login to enjoy the Stric Premier League Experience... </p>
      <p className="subtitle"></p>
    </div>
  );
};

export default TopHeader;
