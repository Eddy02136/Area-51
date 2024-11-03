import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceLogin.css";

const ServiceLogin = ({
  service,
  logoUrl,
  checkConnectionUrl,
  authUrl,
  disconnectUrl,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setIsConnected(false);
          setLoading(false);
          return;
        }

        const response = await axios.get(checkConnectionUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          setIsConnected(true);
        } else if (response.status === 201) {
          setIsConnected(false);
        }
      } catch (error) {
        console.error(
          `Error checking connection for ${service}:`,
          error
        );
        setError(
          `Error checking connection for ${service}`
        );
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, [checkConnectionUrl, service]);

  const handleConnect = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Error no JWT token.");
        return;
      }

      const response = await axios.get(authUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error(`Erreur lors de la connexion à ${service}:`, error);
      setError(`Erreur lors de la connexion à ${service}`);
    }
  };

  const handleDisconnect = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Error no JWT token.");
        return;
      }
  
      await axios.delete(disconnectUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      setIsConnected(false);
    } catch (error) {
      console.error(`Error disconnect ${service}:`, error);
      setError(`Error disconnect ${service}`);
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="service-login">
      <img
        src={logoUrl}
        alt={`${service} logo`}
        style={{ width: "70px", height: "auto", marginBottom: "0" }}
      />
      <h2>{service}</h2>
      {isConnected ? (
        <button
          className="disconnect-service-button"
          onClick={handleDisconnect}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Disconnect
        </button>
      ) : (
        <button
          className="connect-service-button"
          onClick={handleConnect}
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ServiceLogin;
