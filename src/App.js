import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
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
                <Route path="/" element={<AthletesPage />} />
                <Route path="/athlete/:id" element={<AthleteProfilePage />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
