import React from "react";
import Switch from "react-switch";
import "./DarkModeToggle.css";

const DarkModeToggle = ({ darkMode, onToggle, width, height }) => {
    return (
        <div className="dark-mode-toggle">
            <Switch
                onChange={onToggle}
                checked={darkMode}
                offColor="#919191"
                onColor="#3da0de"
                onHandleColor="#E0E0E0"
                offHandleColor="#E0E0E0"
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={18}
                height={height}
                width={width}
            />
            <span>{darkMode ? "🌙" : "☀️"}</span>
        </div>
    );
};

export default DarkModeToggle;
