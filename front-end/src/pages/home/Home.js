import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import axios from "axios";
import "./Home.css";

const HomePage = () => {
  const {
    logout,
    discordUser,
    spotifyUser,
    setSpotifyAccessToken,
    setSpotifyUser,
    setDiscordAccessToken,
    setDiscordUser,
    isAuthenticated,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDiscordLogin = () => {
    axios
      .get("http://localhost:3001/discord/auth-url")
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'obtention de l'URL d'authentification Discord :",
          error
        );
      });
  };

  const handleDiscordLogout = () => {
    localStorage.removeItem("discordAccessToken");
    localStorage.removeItem("discordUser");
    setDiscordAccessToken(null);
    setDiscordUser(null);
  };

  const handleSpotifyLogin = () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("Erreur : jeton JWT manquant.");
      return;
    }

    axios
      .get("http://localhost:3000/spotify/auth-url", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'obtention de l'URL d'authentification Spotify :",
          error
        );
      });
  };

  const handleSpotifyLogout = () => {
    localStorage.removeItem("spotifyAccessToken");
    localStorage.removeItem("spotifyUser");
    setSpotifyAccessToken(null);
    setSpotifyUser(null);
  };

  return (
    <div className="home-page">
      <h1>AREA 51</h1>
      <div className="api-logins-buttons">
        {discordUser ? (
          <div>
            <p>
              Bienvenue, {discordUser.username}#{discordUser.discriminator}
            </p>
            <button onClick={handleDiscordLogout}>
              Se déconnecter de Discord
            </button>
          </div>
        ) : (
          <button className="api-login-button" onClick={handleDiscordLogin}>
            Login with Discord
          </button>
        )}

        {spotifyUser ? (
          <div>
            <p>Bienvenue, {spotifyUser.display_name}</p>
            <button onClick={handleSpotifyLogout}>
              Se déconnecter de Spotify
            </button>
          </div>
        ) : (
          <button className="api-login-button" onClick={handleSpotifyLogin}>
            Login with Spotify
          </button>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
