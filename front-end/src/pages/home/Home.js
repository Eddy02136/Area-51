import ServiceLogin from "../../components/service-login/ServiceLogin";
import "./Home.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Home</h1>
      <div className="home-auth-login">
        <ServiceLogin 
          service="Spotify"
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
          checkConnectionUrl="http://localhost:3000/spotify/check-connection"
          authUrl="http://localhost:3000/spotify/auth-url"
          disconnectUrl="http://localhost:3000/spotify/logout"
        />
        <ServiceLogin
          service="Discord"
          logoUrl="https://cdn.worldvectorlogo.com/logos/discord-4.svg"
          checkConnectionUrl="http://localhost:3000/discord/check-connection"
          authUrl="http://localhost:3000/discord/auth-url"
          disconnectUrl="http://localhost:3000/discord/logout"
        />
        <ServiceLogin
          service="Youtube"
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
          checkConnectionUrl="http://localhost:3000/youtube/check-connection"
          authUrl="http://localhost:3000/youtube/auth-url"
          disconnectUrl="http://localhost:3000/youtube/logout"
        />
      </div>
      <div className="home-auth-login">
        <ServiceLogin 
          service="Twitch"
          logoUrl="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-twitch-square1-512.png"
          checkConnectionUrl="http://localhost:3000/twitch/check-connection"
          authUrl="http://localhost:3000/twitch/auth-url"
          disconnectUrl="http://localhost:3000/twitch/logout"
        />
        <ServiceLogin
          service="Github"
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
          checkConnectionUrl="http://localhost:3000/github/check-connection"
          authUrl="http://localhost:3000/github/auth-url"
          disconnectUrl="http://localhost:3000/github/logout"
        />
      </div>
    </div>
  );
};

export default HomePage;
