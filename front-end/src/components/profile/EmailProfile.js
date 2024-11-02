import React, { useState } from "react";
import "./EmailProfile.css";

const EmailProfile = () => {
    const [EmailProfile, setEmailProfil] = useState("e-mail");
    const [isEditing, setIsEditing] = useState(false);

    const handleEmailProfilChange = (e) => {
        setEmailProfil(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Email sauvegardé :", EmailProfile);
    };

    return (
        <div className="email-name-container">
            <label>E-mail :</label>
            {isEditing ? (
                <input
                    type="text"
                    value={EmailProfile}
                    onChange={handleEmailProfilChange}
                />
            ) : (
                <span>{EmailProfile}</span>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </div>
    );
};

export default EmailProfile;
