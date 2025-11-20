import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../slices/user-slice";
import "./auth-components-style.scss";
import { Link } from "react-router";
import type { Dispatch } from "@reduxjs/toolkit";

export function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch: Dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required.");
            return;
        }

        dispatch(createUser({ username, password, email }));
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Create Account</h2>
                {error && <p className="login-error">{error}</p>}
                <input
                    className="login-input"
                    type="text"
                    data-testid="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">
                    Register
                </button>
                               <div className="login-footer">
                    <span>Already have an account? </span>
                    <Link to="/login" className="login-link">
                        Back to login page
                    </Link>
                </div>
            </form>
        </div>
    );
}
