import React, { useState } from "react";
import "./FNameProfile.css";

const FirstName = () => {
    const [firstName, setFirstName] = useState("First Name");
    const [isEditing, setIsEditing] = useState(false);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Prénom sauvegardé :", firstName);
    };

    return (
        <div className="first-name-container">
            <label>First name :</label>
            {isEditing ? (
                <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
            ) : (
                <span>{firstName}</span>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </div>
    );
};

export default FirstName;
