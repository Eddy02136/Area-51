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

        setIsConnected(response.data.connected);
      } catch (error) {
        console.error(
          `Erreur lors de la vérification de la connexion pour ${service}:`,
          error
        );
        setError(
          `Erreur lors de la vérification de la connexion pour ${service}`
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
        console.error("Erreur : jeton JWT manquant.");
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
        console.error("Erreur : jeton JWT manquant.");
        return;
      }

      await axios.post(
        disconnectUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsConnected(false);
    } catch (error) {
      console.error(`Erreur lors de la déconnexion de ${service}:`, error);
      setError(`Erreur lors de la déconnexion de ${service}`);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="service-login">
      <img
        src={logoUrl}
        alt={`${service} logo`}
        style={{ width: "70px", height: "70px" }}
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
