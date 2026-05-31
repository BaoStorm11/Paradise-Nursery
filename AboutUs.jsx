import React from 'react';
import './AboutUs.css'; // Nếu bạn muốn thêm CSS riêng

function AboutUs() {
  return (
    <div className="about-us-container">
      <h2 className="about-us-heading">About Us</h2>
      <p className="about-us-description">
        Welcome to Paradise Nursery, where green dreams come true! We are passionate about bringing nature closer to your living spaces. 
      </p>
      <p className="about-us-content">
        Our mission is to provide a wide variety of high-quality houseplants, ranging from air-purifying wonders to aromatic delights, ensuring every plant lover finds their perfect green companion. Our team of experts carefully selects and nurtures each plant to guarantee it thrives in its new home.
      </p>
      <p className="about-us-policy">
        Whether you are an experienced gardener or just starting your green journey, we are here to support you every step of the way. Explore our collection and experience the joy of bringing paradise into your home.
      </p>
    </div>
  );
}

export default AboutUs;
