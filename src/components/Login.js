import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    try {
      const rawData = process.env.REACT_APP_USERS_JSON || '[]';
      const data = JSON.parse(rawData);
      setUsersData(data);
      setDebugInfo(`Loaded ${data.length} user(s)`);
    } catch (err) {
      setDebugInfo(`Error parsing user data: ${err.message}`);
      setError('Error loading user data. Please check with the administrator.');
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setError('');
    setDebugInfo(`Attempting login with ID: ${userId}`);

    const user = usersData.find((user) => user.id === userId);
    if (user) {
      setDebugInfo(`Login successful for user: ${user.name}`);
      onLogin(user);
    } else {
      setDebugInfo(`User not found for ID: ${userId}`);
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
      <p className="debug-info">{debugInfo}</p>
    </div>
  );
};

export default Login;