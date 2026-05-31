import React, { useState } from 'react';
import './App.css';
import ProductList from './Components/ProductList';
import AboutUs from './Components/AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleStartClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Greenery Meets Serenity</p>
            <button className="get-started-btn" onClick={handleStartClick}>
              Get Started
            </button>
          </div>
          <div className="about-section-landing">
            <AboutUs />
          </div>
        </div>
      ) : (
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
