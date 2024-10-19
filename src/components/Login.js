import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(process.env.REACT_APP_USERS_JSON || '[]');
      setUsersData(data);
    } catch (err) {
      console.error('Error parsing user data:', err);
      setError('Error loading user data. Please try again later.');
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = usersData.find((user) => user.id === userId);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid User ID. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="login">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter your User ID"
        disabled={isLoading}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;