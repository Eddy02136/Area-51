import React, { useState, useEffect } from "react";
import { Select, Input, message } from "antd";
import axios from "axios";
import "./NeptuneCircle.css";

const { Option } = Select;

const NeptuneCircle = ({ type, className }) => {
    const [actions, setActions] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [actionParameters, setActionParameters] = useState({});
    const [reactionParameters, setReactionParameters] = useState({});
    const [formParameters, setFormParameters] = useState({});

    const fetchOptions = async (url, setter) => {
        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) throw new Error("No auth token found.");

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            setter(response.data);
        } catch (error) {
            message.error(`Error fetching data from ${url}`);
        }
    };

    useEffect(() => {
        fetchOptions("http://localhost:3000/manage/getAllAction", setActions);
        fetchOptions("http://localhost:3000/manage/getAllReaction", setReactions);
    }, []);

    const handleActionChange = (value) => {
        const action = actions.find(a => a.name === value);
        setSelectedAction(action);
        setActionParameters(action.parameters || {});
    };

    const handleReactionChange = (value) => {
        const reaction = reactions.find(r => r.name === value);
        setSelectedReaction(reaction);
        setReactionParameters(reaction.parameters || {});
    };

    const handleParameterChange = (parameterName, value, type) => {
        setFormParameters(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [parameterName]: value
            }
        }));
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleCreate = async () => {
        if (!selectedAction || !selectedReaction) {
            message.error("Please select both an action and a reaction.");
            return;
        }

        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) throw new Error("No auth token found.");

            const payload = {
                actionName: selectedAction.name,
                actionApi: selectedAction.service,
                reactionName: selectedReaction.name,
                reactionApi: selectedReaction.service,
                parameters: {
                    ...formParameters.action,
                    ...formParameters.reaction
                },
                schedule: "some_schedule"
            };

            await axios.post("http://localhost:3000/manage/add-action-reaction", payload, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            message.success("Action-reaction created successfully!");
        } catch (error) {
            message.error("Failed to create action-reaction.");
        }
    };

    const pointsConfig = {
        workflow: [
            { top: '50%', left: '96.4%' },
            { top: '50%', left: '-3.4%' },
        ],
        apis: [
            { top: '25%', left: '91.6%' },
            { top: '50%', left: '96.5%' },
            { top: '75%', left: '88%' },
            { top: '75%', left: '5.4%' },
            { top: '50%', left: '-3.5%' },
            { top: '25%', left: '1.5%' },
        ],
        default: [
            { top: '50%', left: '96.4%' },
            { top: '50%', left: '-3.4%' },
        ],
    };

    const points = pointsConfig[type] || pointsConfig.default;

    return (
        <div className={`ne-circle ${className}`}>
            <div className="ne-chose-action">
                <h1>Select an action</h1>
                <div className="ne-chose-action-container">
                    <Select
                        options={actions.map(action => ({ value: action.name, label: action.description }))}
                        onChange={handleActionChange}
                        placeholder="Choose an action"
                        style={{ width: "100%" }}
                    />
                    {Object.keys(actionParameters).map(param => (
                        <div className="ne-action-param" key={`action-${param}`}>
                            <label>{capitalizeFirstLetter(param)}</label>
                            {selectedAction?.name === "getIssPos" && param === "city" ? (
                                <Select
                                    value={formParameters.action?.[param] || ''}
                                    onChange={value => handleParameterChange(param, value, "action")}
                                    style={{ width: "100%" }}
                                >
                                    <Option value="Toulouse">Toulouse</Option>
                                    <Option value="Paris">Paris</Option>
                                    <Option value="New-York">New-York</Option>
                                    <Option value="Tokyo">Tokyo</Option>
                                    <Option value="London">London</Option>
                                </Select>
                            ) : (
                                <Input
                                    value={formParameters.action?.[param] || ''}
                                    onChange={e => handleParameterChange(param, e.target.value, "action")}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="ne-chose-reaction">
                <h1>Select a reaction</h1>
                <div className="ne-chose-reaction-container">
                    <Select
                        options={reactions.map(reaction => ({ value: reaction.name, label: reaction.description }))}
                        onChange={handleReactionChange}
                        placeholder="Choose a reaction"
                        style={{ width: "100%" }}
                    />
                    {Object.keys(reactionParameters).map(param => (
                        <div className="ne-reaction-param" key={`reaction-${param}`}>
                            <label>{capitalizeFirstLetter(param)}</label>
                            <Input
                                value={formParameters.reaction?.[param] || ''}
                                onChange={e => handleParameterChange(param, e.target.value, "reaction")}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="ne-create-button-container">
                <button className="ne-create-button" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
};

export default NeptuneCircle;
