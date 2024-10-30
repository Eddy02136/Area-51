import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Background from "./components/background/Background";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoutes";
import HomePage from "./pages/home/Home";
import "./App.css";
import NewAR from "./pages/new-ar/NewAR";
import Profile from "./pages/profile/Profile";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Background />
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/new-ar" element={<NewAR />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
