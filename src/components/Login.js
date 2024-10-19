import React, { useState } from 'react';
import './Login.css';

// Parse users from the environment variable
const usersData = JSON.parse(process.env.REACT_APP_USERS_JSON);

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
