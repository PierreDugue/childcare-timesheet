import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { auth, getCurrentUser } from "../../slices/user-slice";
import type { RootState } from "../../app/store";
import "./auth-components-style.scss";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => getCurrentUser(state));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(auth({ username, password }));
    };

    useEffect(() => {
        if (user.token) {
            navigate("/", { replace: true });
        }
    }, [user.token, navigate]);

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>

                {error && <p className="login-error">{error}</p>}

                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="login-button">
                    Log In
                </button>

                <div className="login-footer">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="login-link">
                        Create one
                    </Link>
                </div>
            </form>
        </div>
    );
}
