import "./NewAR.css";
import { useContext, useState, useEffect } from "react";
import { Select } from "antd";
import AuthContext from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewAR = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

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
            console.error(`Error fetching ${url}:`, error);
        }
    };

    useEffect(() => {
        fetchOptions("http://localhost:8080/manage/getAllAction", setActions);
        fetchOptions("http://localhost:8080/manage/getAllReaction", setReactions);
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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) throw new Error("No auth token found.");

            const payload = {
                actionName: selectedAction?.name || "",
                actionApi: selectedAction?.service || "",
                reactionName: selectedReaction?.name || "",
                reactionApi: selectedReaction?.service || "",
                parameters: {
                    ...formParameters.action,
                    ...formParameters.reaction
                },
                schedule: "some_schedule"
            };

            await axios.post("http://localhost:8080/manage/add-action-reaction", payload, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            alert("Action-reaction created successfully");
        } catch (error) {
            console.error("Error creating action-reaction:", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className='new-ar-page'>
            <h1>Create an action reaction</h1>
            <div className="new-ar-container">
                <h2>Choose an action and a reaction</h2>
                <div className="new-ar-form">
                    <form onSubmit={handleCreate}>
                        <div className="new-ar-form-group">
                            <label htmlFor="action">Select an action</label>
                            <Select 
                                options={actions.map(action => ({ value: action.name, label: action.name }))}
                                onChange={handleActionChange}
                            />
                        </div>
                        {Object.keys(actionParameters).map(param => (
                            <div className="new-ar-form-group" key={`action-${param}`}>
                                <label htmlFor={`action-param-${param}`}>{param}</label>
                                <Select 
                                    options={[{ value: 'sample', label: <span>Sample Option</span> }]} 
                                    onChange={value => handleParameterChange(param, value, "action")}
                                />
                            </div>
                        ))}
                        <div className="new-ar-form-group">
                            <label htmlFor="reaction">Select a reaction</label>
                            <Select 
                                options={reactions.map(reaction => ({ value: reaction.name, label: reaction.name }))}
                                onChange={handleReactionChange}
                            />
                        </div>
                        {Object.keys(reactionParameters).map(param => (
                            <div className="new-ar-form-group" key={`reaction-${param}`}>
                                <label htmlFor={`reaction-param-${param}`}>{param}</label>
                                <Select 
                                    options={[{ value: 'sample', label: <span>Sample Option</span> }]} 
                                    onChange={value => handleParameterChange(param, value, "reaction")}
                                />
                            </div>
                        ))}
                        <button className='create-button' type="submit">Create</button>
                    </form>
                </div>
            </div>
            <button className="disconnect-button" onClick={handleLogout}>Disconnect</button>
        </div>
    );
};

export default NewAR;
