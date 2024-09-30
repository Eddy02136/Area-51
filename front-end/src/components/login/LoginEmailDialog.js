import React, { useState } from "react";
import "./LoginEmailDialog.css";

const LoginEmailDialog = ({ onCancel }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            console.log("Email:", email);
            console.log("Password", password);
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                console.log("token:", data.token);

            } else {
                console.error("Login failed:", response.statusText);
            }

        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="login-email-dialog">
            <div className="login-email-dialog-container">
                <h2>Login with Email</h2>
                <div className="login-email-dialog-inputs">
                    <div className="login-email-dialog-inputs-container">
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login-email-buttons-container">
                        <button
                            className="login-email-dialog-button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button className="login-email-dialog-button">
                            Forgot password
                        </button>
                        <button
                            className="login-email-dialog-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginEmailDialog;
