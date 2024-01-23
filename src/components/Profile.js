import React, { useContext, useState } from 'react';
import Header from './Header';
import FetchInfo from '../utils/FetchInfo.js';
import { AuthContext } from '../AuthContext.js';

function Profile() {
  const { token } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');

  const fetchData = async () => {
    try {
      const data = await FetchInfo(token);
      setFirstName(data.userInfo.first_name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
  return (
    <div>
      <Header />
      <h1>Hi, {firstName}!</h1>
    </div>
  );
}

export default Profile;
