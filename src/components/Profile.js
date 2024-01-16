import React, { useContext, useState } from 'react';
import Header from './Header';
import { AuthContext } from '../AuthContext.js';

function Profile() {
  const [firstName, setFirstName] = useState('');
  const { token } = useContext(AuthContext);

  const fetchName = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/fetch-name', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstName);
      } else {
        alert('Info fetching failed!');
      }
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };
  fetchName();
  return (
    <div>
      <Header />
      <h1>Hi, {firstName}!</h1>
    </div>
  );
}

export default Profile;
