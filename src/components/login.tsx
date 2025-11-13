// Login.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth, getCurrentUser } from "../slices/userSlice";
import type { RootState } from "../app/store";

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
            </form>
        </div>
    );
};

// 💅 Inline styles for simplicity
const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f5f5",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "300px",
    },
    title: {
        textAlign: "center",
        marginBottom: "1rem",
    },
    input: {
        padding: "0.5rem",
        margin: "0.5rem 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "1rem",
    },
    button: {
        marginTop: "1rem",
        padding: "0.75rem",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
        textAlign: "center",
    },
};
