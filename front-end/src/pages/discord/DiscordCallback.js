import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';
import axios from 'axios';

const DiscordCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setDiscordAccessToken, setDiscordUser } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      axios.get(`http://localhost:3000/discord/callback?code=${code}`)
        .then(response => {
          const accessToken = response.data.accessToken;
          setDiscordAccessToken(accessToken);

          axios.get('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(userResponse => {
            const user = userResponse.data;
            setDiscordUser(user);
            navigate('/');
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur :', error);
            navigate('/');
          });
        })
        .catch(error => {
          console.error('Erreur lors de l\'échange du code :', error);
          navigate('/');
        });
    } else {
      console.error('Aucun paramètre "code" trouvé dans l\'URL');
      navigate('/');
    }
  }, [location.search, navigate, setDiscordAccessToken, setDiscordUser]);

  return (
    <div>
      <p>Connexion avec Discord en cours...</p>
    </div>
  );
};

export default DiscordCallback;
