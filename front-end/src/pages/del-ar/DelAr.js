import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./DelAr.css";

const DelAr = () => {
    const [actionReactions, setActionReactions] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
                console.error("Error fetching action-reactions:", error);
            }
        };

        fetchActionReactions();
    }, []);

    const handleDelete = async () => {
        if (!selectedId) {
            alert("Please select an action-reaction to delete.");
            return;
        }

        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) throw new Error("No auth token found.");

            await axios.delete(`http://localhost:8080/manage/delete-action-reaction/${selectedId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            alert("Action-reaction deleted successfully");
            setActionReactions(prev => prev.filter(ar => ar._id !== selectedId));
            setSelectedId(null);
        } catch (error) {
            console.error("Error deleting action-reaction:", error);
        }
    };

    return (
        <div className="action-reaction-list-page">
            <h1>Manage Action-Reactions</h1>
            <div className="action-reaction-list-container">
                <label htmlFor="actionReactionSelect">Select an action-reaction by ID</label>
                <Select
                    id="actionReactionSelect"
                    style={{ width: 300 }}
                    placeholder="Select an action-reaction ID"
                    options={actionReactions.map(ar => ({ value: ar._id, label: ar._id }))}
                    onChange={value => setSelectedId(value)}
                />
                <Button
                    className="delete-button"
                    type="primary"
                    danger
                    onClick={handleDelete}
                    disabled={!selectedId}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default DelAr;
