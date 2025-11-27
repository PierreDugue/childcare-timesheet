import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import type { RootState } from "../../app/store";
import { auth, getCurrentUser } from "../../slices/user-slice";
import "./auth-components-style.scss";
import { Button } from "@mui/material";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state: RootState) =>
    getCurrentUser(state)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(auth({ username, password }));
  };

  useEffect(() => {
    if (currentUser.token) {
      navigate("/", { replace: true });
    }
  }, [currentUser.token, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>

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

        <Button sx={{mt: 1}} variant="outlined" disabled={loading} type="submit" className="login-button">
          Log In {loading ? <HourglassTopIcon /> : ""}
        </Button>

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
