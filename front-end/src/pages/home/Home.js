import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import axios from "axios";
import "./Home.css";

const HomePage = () => {
  const {
    logout,
    spotifyUser,
    setSpotifyAccessToken,
    setSpotifyUser,
    isAuthenticated,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState("New-York");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSpotifyLogin = () => {
    const authToken = localStorage.getItem("authToken");
    console.log("authToken", authToken);

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
        window.location.href = response.data.url;
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("Erreur : jeton JWT manquant.");
      navigate("/login");
      return;
    }

    const data = {
      action: "iss_get_pos",
      reaction: "spotify_play_music",
      parameters: {
        city: selectedCity,
        trackId: "7qiZfU4dY1lWllzX7mPBI3",
      },
    };

    axios
      .post("http://localhost:3000/manage/add-action-reaction", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Action-Réaction ajoutée avec succès :", response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout de l'Action-Réaction :",
          error.response?.data || error.message
        );
      });
  };

  return (
    <div className="home-page">
      <h1>AREA 51</h1>
      <div className="home-page-container">
        <div className="api-logins-buttons">
          {spotifyUser ? (
            <div>
              <p>Bienvenue, {spotifyUser.display_name}</p>
              <button onClick={handleSpotifyLogout}>
                Disconnect Spotify
              </button>
            </div>
          ) : (
            <button className="home-page-spotify-button" onClick={handleSpotifyLogin}>
              Login with Spotify
            </button>
          )}
        </div>

        <div className="action-reaction-form">
          <h2>Créer une Action-Réaction</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="city">Chose a city :</label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="Paris">Paris</option>
              <option value="Tokyo">Tokyo</option>
              <option value="New-York">New-York</option>
              <option value="Londres">Londres</option>
            </select>

            <button type="submit" className="home-page-button">Submit</button>
          </form>
          <p>When the ISS passes 200km from the chosen city, Shape of you by Ed Sheeran will be launched on Spotify.</p>
        </div>

        <button onClick={handleLogout} className="home-page-button">Logout</button>
      </div>
    </div>
  );
};

export default HomePage;