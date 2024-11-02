import React from "react";
import "./MarsCircle.css";

const MarsCircle = ({ type, className }) => {

    const pointsConfig = {
        workflow: [
            { top: '50%', left: '96.4%' }, // Middle right
            { top: '50%', left: '-3.4%' }, // Middle left
        ],
        apis: [
            { top: '25%', left: '91.6%' },  // Up right
            { top: '50%', left: '96.5%' }, // Middle right
            { top: '75%', left: '88%' }, // Down right
            { top: '75%', left: '5.4%' },  // Down left
            { top: '50%', left: '-3.5%' }, // Middle left
            { top: '25%', left: '1.5%' }, // Up left
        ],
        default: [
            { top: '50%', left: '96.4%' }, // Middle right
            { top: '50%', left: '-3.4%' }, // Middle left
        ],
    };

    const points = pointsConfig[type] || pointsConfig.default;

    return (
        <div className={`ma-circle ${className}`}>
            {points.map((point, index) => (
                <div
                    key={index}
                    className="ma-glowing-point"
                    style={{
                        position: 'absolute',
                        top: point.top,
                        left: point.left,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'yellow',
                        boxShadow: '0 0 10px yellow',
                    }}
                />
            ))}
            <div className="apis-cards"> EEEE </div>

        </div>
    );
};

export default MarsCircle;
