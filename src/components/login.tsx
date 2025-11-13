// Login.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { auth, getCurrentUser } from "../slices/userSlice";
import type { RootState } from "../app/store";
import { styles } from "./auth-components-style";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => getCurrentUser(state))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(auth({ username: username, password: password }))
    };

    useEffect(() => {
        if (user.token) {
            navigate("/", { replace: true });
        }
    }, [user.token, navigate]);

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" style={styles.button}>
                    Log In
                </button>
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <span>Don't have an account? </span>
                    <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
                        Create one
                    </Link>
                </div>
            </form>
        </div>
    );
};
