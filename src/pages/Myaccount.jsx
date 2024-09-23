import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import './Myaccount.css';

const Myaccount = () => {
  const { user, isAuthenticated } = useAuth;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('/api/userdata', {
            headers: {
              Authorization: `Bearer ${user.token}`, // Ensure you're sending the correct token
            },
          });
          console.log('User info fetched:', response.data); // Debugging: log the fetched data
          setUserInfo(response.data); // Set the userInfo with API data
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div className="myaccount">Please log in to access your account.</div>;
  }

  return (
    <div className="myaccount">
      <div className="account-box">
        {userInfo ? ( // Only show when userInfo is fetched
          <>
            <h1>Welcome, {userInfo.name || 'User'}</h1> {/* Fallback to 'User' if name is missing */}
            <h2>Your Information:</h2>
            <table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>{userInfo.email || 'N/A'}</td> {/* Fallback to 'N/A' if email is missing */}
                </tr>
                {/* Add more rows for additional user info if needed */}
              </tbody>
            </table>
          </>
        ) : (
          <p>Loading user information...</p> // Show this while fetching
        )}
      </div>
    </div>
  );
};

export default Myaccount;
