import React, { useState } from 'react';
import usersData from './users.json'; // Import the JSON file
import './Login.css';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');

  const handleLogin = () => {
    const user = usersData.find((user) => user.id === userId);
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid User ID.');
    }
  };

  return (
    <div className="login">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter your User ID"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;