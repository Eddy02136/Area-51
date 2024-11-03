import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProfileDialog from "./UpdateProfileDialog";
import "./LNameProfile.css";

const LastNameProfile = () => {
    const [lastName, setLastName] = useState("");
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const fetchUserInfo = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) return;

            const response = await axios.get("http://localhost:3000/users/infos", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            setLastName(response.data.lastname);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div className="last-name-container">
            <h1>Last Name:</h1>
            <h2>{lastName}</h2>
            <button className="last-edit-button" onClick={() => setIsDialogVisible(true)}>
                Edit
            </button>
            <UpdateProfileDialog
                visible={isDialogVisible}
                onClose={() => {
                    setIsDialogVisible(false);
                    fetchUserInfo();
                }}
                fieldToUpdate="lastname"
            />
        </div>
    );
};

export default LastNameProfile;
