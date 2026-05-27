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

export default function App() {

  const user =
    localStorage.getItem("user");

  const admin =
    localStorage.getItem("admin");





  return (

    <BrowserRouter>

      <Routes>





        {/* EMPLOYEE LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />





        {/* EMPLOYEE DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user
            ? <Dashboard />
            : <Navigate to="/" />
          }
        />







        {/* ADMIN LOGIN */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />







        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            admin
            ? <AdminDashboard />
            : <Navigate to="/admin-login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}