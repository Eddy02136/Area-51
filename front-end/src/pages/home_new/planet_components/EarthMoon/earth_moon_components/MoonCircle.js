import React, { useState, useEffect } from "react";
import { Select, Input, Button, message } from "antd";
import axios from "axios";
import "./MoonCircle.css";

const parameterDisplayNames = {
    streamerName: "Name of the streamer",
    musicName: "Name of the music",
    playlistName: "Name of the playlist",
    videoUrl: "URL of the video",
};

const MoonCircle = ({ className }) => {
    const [actionReactions, setActionReactions] = useState([]);
    const [selectedAR, setSelectedAR] = useState(null);
    const [formParameters, setFormParameters] = useState({});

    const fetchActionReactions = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) throw new Error("No auth token found.");

            const response = await axios.get("http://localhost:8080/manage/get-action-reaction", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            setActionReactions(response.data);
        } catch (error) {
            message.error("Error fetching action-reactions.");
        }
    };

    useEffect(() => {
        fetchActionReactions();
    }, []);

    const handleSelectChange = (id) => {
        const selected = actionReactions.find(ar => ar._id === id);
        setSelectedAR(selected);
        setFormParameters(selected?.parameters || {});
    };

    const handleParameterChange = (param, value) => {
        setFormParameters(prev => ({
            ...prev,
            [param]: value
        }));
    };

    const handleDelete = async () => {
        if (!selectedAR) {
            message.error("Please select an action-reaction to delete.");
            return;
        }

        try {
            const authToken = localStorage.getItem("authToken");
            await axios.delete(`http://localhost:8080/manage/delete-action-reaction/${selectedAR._id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            message.success("Action-reaction deleted successfully.");
            setSelectedAR(null);
            fetchActionReactions();
        } catch (error) {
            message.error("Error deleting action-reaction.");
        }
    };

    const handleUpdate = async () => {
        if (!selectedAR) {
            message.error("Please select an action-reaction to update.");
            return;
        }

        try {
            const authToken = localStorage.getItem("authToken");
            const payload = {
                areaName: selectedAR.areaName,
                actionName: selectedAR.actionName,
                actionApi: selectedAR.actionApi,
                reactionName: selectedAR.reactionName,
                reactionApi: selectedAR.reactionApi,
                parameters: formParameters,
                schedule: selectedAR.schedule || "some_schedule"
            };

            await axios.put(`http://localhost:8080/manage/update-action-reaction/${selectedAR._id}`, payload, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            message.success("Action-reaction updated successfully.");
            fetchActionReactions();
        } catch (error) {
            message.error("Error updating action-reaction.");
        }
    };

    const getDisplayName = (param) => {
        return parameterDisplayNames[param] || param;
    };

    return (
        <div className={`me-circle ${className}`}>
            <div className="me-select-ar">
                <h1>Select an AREA</h1>
                <Select
                    options={actionReactions.map(ar => ({ value: ar._id, label: ar.areaName }))}
                    onChange={handleSelectChange}
                    placeholder="Choose an AREA by name"
                    style={{ width: "100%" }}
                />
                <Button className="me-delete-button" onClick={handleDelete}>Delete</Button>
            </div>
            {selectedAR && (
                <div className="me-edit-ar">
                    <h1>Edit AREA</h1>
                    <div className="me-parameters">
                        {Object.keys(selectedAR.parameters).map(param => (
                            <div key={`action-param-${param}`}>
                                <label>{getDisplayName(param)}</label>
                                <Input
                                    value={formParameters[param] || ""}
                                    onChange={(e) => handleParameterChange(param, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <Button className="me-update-button" onClick={handleUpdate}>Update</Button>
                </div>
            )}
        </div>
    );
};

export default MoonCircle;
