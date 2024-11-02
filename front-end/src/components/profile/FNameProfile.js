import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProfileDialog from "./UpdateProfileDialog";
import "./FNameProfile.css";

const FirstNameProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    useEffect(() => {
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
                setFirstName(response.data.firstname);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="first-name-container">
            <h1>First Name:</h1>
            <h2>{firstName}</h2>
            <button className="first-edit-button" onClick={() => setIsDialogVisible(true)}>
                Edit
            </button>
            <UpdateProfileDialog
                visible={isDialogVisible}
                onClose={() => setIsDialogVisible(false)}
                fieldToUpdate="firstname"
            />
        </div>
    );
};

export default FirstNameProfile;
