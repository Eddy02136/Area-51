import React from "react";
import "./NeptuneCircle.css";

const NeptuneCircle = ({ type, className }) => {

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
        <div className={`ne-circle ${className}`}>
            {/* {points.map((point, index) => (
                <div
                    key={index}
                    className="ne-glowing-point"
                    style={{
                        position: 'absolute',
                        top: point.top,
                        left: point.left,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(0, 255, 242)',
                        boxShadow: '0 0 10px rgb(0, 255, 242)',
                    }}
                />
            ))} */}
        </div>
    );
};

export default NeptuneCircle;
