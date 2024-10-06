import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';
import axios from 'axios';
import "./Home.css";

const HomePage = () => {
  const { logout, discordUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDiscordLogin = () => {
    axios.get('http://localhost:3000/discord/auth-url')
      .then(response => {
        window.location.href = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de l\'obtention de l\'URL d\'authentification Discord :', error);
      });
  };

  return (
    <div className='home-page'>
      <h1>AREA 51</h1>
      <div className='api-logins-buttons'>
        {discordUser ? (
          <div>
            <p>Bienvenue, {discordUser.username}#{discordUser.discriminator}</p>
            <button onClick={handleLogout}>Se déconnecter de Discord</button>
          </div>
        ) : (
          <button className='api-login-button' onClick={handleDiscordLogin}>Login with Discord</button>
        )}
        <button className='api-login-button'>Login with Spotify</button>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
