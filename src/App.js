import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AthletesPage from "./pages/AthletesPage";
import AthleteProfilePage from "./pages/AthleteProfilePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        <Route
          path="/*"
          element={
            <PrivateRoute auth={auth}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/athletes" element={<AthletesPage />} />
                <Route path="/athlete/:id" element={<AthleteProfilePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
