import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [discordUser, setDiscordUser] = useState(null);
  const [discordAccessToken, setDiscordAccessToken] = useState(null);
  const [spotifyUser, setSpotifyUser] = useState(null);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }

    const spotifyToken = localStorage.getItem('spotifyAccessToken');
    if (spotifyToken) {
      setSpotifyAccessToken(spotifyToken);
      const user = JSON.parse(localStorage.getItem('spotifyUser'));
      if (user) {
        setSpotifyUser(user);
      }
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

    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyUser');
    setSpotifyAccessToken(null);
    setSpotifyUser(null);

    localStorage.removeItem('discordAccessToken');
    localStorage.removeItem('discordUser');
    setDiscordAccessToken(null);
    setDiscordUser(null);
  };

  const saveSpotifyAccessToken = (token) => {
    localStorage.setItem('spotifyAccessToken', token);
    setSpotifyAccessToken(token);
  };

  const saveSpotifyUser = (user) => {
    localStorage.setItem('spotifyUser', JSON.stringify(user));
    setSpotifyUser(user);
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
      discordUser,
      discordAccessToken,
      setDiscordAccessToken: saveDiscordAccessToken,
      setDiscordUser: saveDiscordUser,
      spotifyUser,
      spotifyAccessToken,
      setSpotifyAccessToken: saveSpotifyAccessToken,
      setSpotifyUser: saveSpotifyUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
