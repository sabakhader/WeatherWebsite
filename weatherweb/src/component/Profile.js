import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';

const apiKey = "1b56f07543mshcaecd24d22689cdp1345aajsnace1b40043f1";

const ProfilePage = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend based on userId
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {userData ? (
        <>
          <h1>Welcome, {userData.username}!</h1>
          <WeatherWidget location={userData.location} />
          {/* Add other user-related information or components here */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
