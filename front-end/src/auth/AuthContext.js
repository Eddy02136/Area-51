import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [discordAccessToken, setDiscordAccessToken] = useState(null);
  const [discordUser, setDiscordUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }

    const discordToken = localStorage.getItem('discordAccessToken');
    if (discordToken) {
      setDiscordAccessToken(discordToken);
      const user = JSON.parse(localStorage.getItem('discordUser'));
      if (user) {
        setDiscordUser(user);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    localStorage.removeItem('discordAccessToken');
    localStorage.removeItem('discordUser');
    setDiscordAccessToken(null);
    setDiscordUser(null);
  };

  const saveDiscordAccessToken = (token) => {
    localStorage.setItem('discordAccessToken', token);
    setDiscordAccessToken(token);
  };

  const saveDiscordUser = (user) => {
    localStorage.setItem('discordUser', JSON.stringify(user));
    setDiscordUser(user);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      discordAccessToken,
      discordUser,
      setDiscordAccessToken: saveDiscordAccessToken,
      setDiscordUser: saveDiscordUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
