import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import UpdateProfileDialog from "../../components/profile/UpdateProfileDialog";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setIsConnected(false);
          setLoading(false);
          return;
        }
        setIsConnected(true);
      } catch (error) {
        console.error("Error checking connection:", error);
        setError("Error checking connection");
      }
    };

    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError("No auth token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8080/users/infos", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Error fetching user info");
      } finally {
        setLoading(false);
      }
    };

    checkConnection().then(() => {
      if (isConnected) {
        fetchUserInfo();
      } else {
        setLoading(false);
      }
    });
  }, [isConnected]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-container">
        <h2>Here are your profile informations, you can edit them.</h2>
        <h3>Email: {userInfo.email}</h3>
        <h3>First Name: {userInfo.firstname}</h3>
        <h3>Last Name: {userInfo.lastname}</h3>
        <button
          className="update-profile-button"
          onClick={() => setIsDialogVisible(true)}
        >
          Change informations
        </button>
      </div>
      <UpdateProfileDialog
        visible={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
      />
    </div>
  );
};

export default Profile;
