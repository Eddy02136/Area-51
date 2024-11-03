import React from "react";
import "./EarthCircle.css";
import FirstNameProfile from "../../../../../components/profile/FNameProfile";
import LastNameProfile from "../../../../../components/profile/LNameProfile";
import EmailProfile from "../../../../../components/profile/EmailProfile";

const EarthCircle = ({ type, className }) => {
    const pointsConfig = {
        workflow: [
            { top: "50%", left: "96.4%" }, // Middle right
            { top: "50%", left: "-3.4%" }, // Middle left
        ],
        apis: [
            { top: "50%", left: "96.5%" }, // Middle right
            { top: "75%", left: "5.4%" }, // Down left
            { top: "25%", left: "1.5%" }, // Up left
        ],
        default: [
            { top: "50%", left: "96.4%" }, // Middle right
            { top: "50%", left: "-3.4%" }, // Middle left
        ],
    };

    const points = pointsConfig[type] || pointsConfig.default;

    return (
        <div className={`ea-circle ${className}`}>
            {points.map((point, index) => (
                <div
                    key={index}
                    className="ea-glowing-point"
                    style={{
                        position: "absolute",
                        top: point.top,
                        left: point.left,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "rgb(0, 17, 255)",
                        boxShadow: "0 0 10px rgb(0, 17, 255)",
                    }}
                />
            ))}
            <div className="FName">
                <FirstNameProfile />
            </div>
            <div className="LName">
                <LastNameProfile />
            </div>
            <div className="EmailP">
                <EmailProfile />
            </div>
        </div>
    );
};

export default EarthCircle;
