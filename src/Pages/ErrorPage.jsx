import React from 'react';
import { useNavigate } from 'react-router-dom';


const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you're looking for doesn't exist or has been moved. Please check the URL or click the button below to return to the homepage.
        </p>
        <button className="error-button" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
