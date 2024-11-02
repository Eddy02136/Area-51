import React, { useState } from "react";
import "./LNameProfile.css";

const LastName = () => {
    const [lastName, setLastName] = useState("Last Name");
    const [isEditing, setIsEditing] = useState(false);

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Nom sauvegardé :", lastName);
    };

    return (
        <div className="last-name-container">
            <label>Last name :</label>
            {isEditing ? (
                <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
            ) : (
                <span>{lastName}</span>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </div>
    );
};

export default LastName;
