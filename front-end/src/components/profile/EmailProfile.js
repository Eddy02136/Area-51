import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProfileDialog from "./UpdateProfileDialog";
import "./EmailProfile.css";

const EmailProfile = () => {
    const [email, setEmail] = useState("");
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
            setEmail(response.data.email);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div className="email-name-container">
            <h1>Email:</h1>
            <h2>{email}</h2>
            <button className="email-edit-button" onClick={() => setIsDialogVisible(true)}>
                Edit
            </button>
            <UpdateProfileDialog
                visible={isDialogVisible}
                onClose={() => {
                    setIsDialogVisible(false);
                    fetchUserInfo();
                }}
                fieldToUpdate="email"
            />
        </div>
    );
};

export default EmailProfile;
