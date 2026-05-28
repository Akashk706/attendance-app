import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

console.log("NEW BUILD WORKING");

export default function App() {

  const admin =
    localStorage.getItem("admin");

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            admin
              ? <AdminDashboard />
              : <Navigate to="/admin-login" replace />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}