import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import axios from "axios";

const SpotifyCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSpotifyAccessToken, setSpotifyUser } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("Erreur : jeton JWT manquant.");
        navigate("/login");
        return;
      }

      axios
        .get(`http://localhost:3000/spotify/access-token?code=${code}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const accessToken = response.data.access_token;
          setSpotifyAccessToken(accessToken);

          axios
            .get("https://api.spotify.com/v1/me", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((profileResponse) => {
              setSpotifyUser(profileResponse.data);
              navigate("/");
            })
            .catch((profileError) => {
              console.error(
                "Erreur lors de la récupération du profil utilisateur Spotify :",
                profileError
              );
              navigate("/");
            });
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'obtention du jeton d'accès Spotify :",
            error
          );
          navigate("/");
        });
    } else {
      console.error("Aucun code trouvé dans les paramètres de l'URL");
      navigate("/");
    }
  }, [location.search, setSpotifyAccessToken, setSpotifyUser, navigate]);

  return <div>Chargement...</div>;
};

export default SpotifyCallback;
