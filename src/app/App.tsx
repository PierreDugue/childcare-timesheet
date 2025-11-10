import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { DetailLogs } from "../pages/detail-logs";
import { Settings } from "../pages/settings";
import { TimeLog } from "../pages/time-log";
import { auth } from "../slices/userSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(auth({ username: 'admin', password: 'admin123' }))
    dispatch(auth({ username: 'pilou', password: 'pilou' }))
  // }, [])
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimeLog />} />
        <Route path="/log" element={<Navigate to="/" replace />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/details/:familyId" element={<DetailLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
