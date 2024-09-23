import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Description from './pages/Description';
import Hospitals from './pages/Hospitals';
import LoginSignup from './pages/LoginSignup';
import Myaccount from './pages/Myaccount'; // This now serves as the dashboard
import Symptoms from './pages/Symptoms';
import Chatbot from './Chatbot';  // Import the Chatbot component
import './Chatbot.css';  // Import Chatbot CSS

const App = () => {
  const [details, setDetails] = useState({});

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/description" element={<Description details={details} />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/myaccount" element={<Myaccount />} /> {/* This is your dashboard */}
            <Route path="/symptoms" element={<Symptoms setDetails={setDetails} />} />
          </Routes>
          <Chatbot /> {/* Add the chatbot component */}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
