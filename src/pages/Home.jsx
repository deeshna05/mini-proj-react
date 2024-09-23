
import React from 'react';
import './Home.css'; // Ensure this path is correct
import background4 from '../components/Assets/background4.jpg'; // Adjust the path to your image

const Home = () => {
  return (
    <div className="home-container">
      <img src={background4} alt="Homepage" className="home-image" />
      <div className="home-text">
        <h1>Welcome to Disease Detect</h1>
        <p>Your go-to tool for identifying diseases and recommending medication based on symptoms.</p>
      </div>
    </div>
  );
};

export default Home;
