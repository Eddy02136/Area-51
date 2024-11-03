import React from "react";
import "./MarsCircle.css";
import ServiceLogin from "../../../../../components/service-login/ServiceLogin.js";

const MarsCircle = ({ type, className }) => {
    const pointsConfig = {
        workflow: [
            { top: "50%", left: "96.4%" }, // Middle right
            { top: "50%", left: "-3.4%" }, // Middle left
        ],
        apis: [
            { top: "10%", left: "80.6%" }, // Up right
            { top: "50%", left: "96.5%" }, // Middle right
            { top: "85%", left: "78%" }, // Down right
            { top: "83%", left: "12.4%" }, // Down left
            { top: "50%", left: "-3.5%" }, // Middle left
            { top: "10%", left: "12.5%" }, // Up left
        ],
        default: [
            { top: "50%", left: "96.4%" }, // Middle right
            { top: "50%", left: "-3.4%" }, // Middle left
        ],
    };

    const points = pointsConfig[type] || pointsConfig.default;

    return (
        <div className={`ma-circle ${className}`}>
            {/* {points.map((point, index) => (
                <div
                    key={index}
                    className="ma-glowing-point"
                    style={{
                        position: "absolute",
                        top: point.top,
                        left: point.left,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "yellow",
                        boxShadow: "0 0 10px yellow",
                    }}
                />
            ))} */}
            <div className="spotify-card">
                <ServiceLogin
                    service="Spotify"
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
                    checkConnectionUrl="http://localhost:8080/spotify/check-connection"
                    authUrl="http://localhost:8080/spotify/auth-url"
                    disconnectUrl="http://localhost:8080/spotify/logout"
                />
            </div>
            <div className="discord-card">
                <ServiceLogin
                    className="discord-card"
                    service="Discord"
                    logoUrl="https://cdn.worldvectorlogo.com/logos/discord-4.svg"
                    checkConnectionUrl="http://localhost:8080/discord/check-connection"
                    authUrl="http://localhost:8080/discord/auth-url"
                    disconnectUrl="http://localhost:8080/discord/logout"
                />
            </div>
            <div className="youtube-card">
                <ServiceLogin
                    className="youtube-card"
                    service="Youtube"
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                    checkConnectionUrl="http://localhost:8080/youtube/check-connection"
                    authUrl="http://localhost:8080/youtube/auth-url"
                    disconnectUrl="http://localhost:8080/youtube/logout"
                />
            </div>
            <div className="twitch-card">
                <ServiceLogin
                    className="twitch-card"
                    service="Twitch"
                    logoUrl="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-twitch-square1-512.png"
                    checkConnectionUrl="http://localhost:8080/twitch/check-connection"
                    authUrl="http://localhost:8080/twitch/auth-url"
                    disconnectUrl="http://localhost:8080/twitch/logout"
                />
            </div>
            <div className="github-card">
                <ServiceLogin
                    className="github-card"
                    service="Github"
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                    checkConnectionUrl="http://localhost:8080/github/check-connection"
                    authUrl="http://localhost:8080/github/auth-url"
                    disconnectUrl="http://localhost:8080/github/logout"
                />
            </div>
            <div className="nasa-card">
                <h1 className="nasa-title">NASA</h1>
            </div>
        </div>
    );
};

export default MarsCircle;
