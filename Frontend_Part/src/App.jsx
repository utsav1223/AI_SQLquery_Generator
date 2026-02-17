import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetWithOTP from "./pages/ResetWithOTP";

import ProtectedRoute from "./components/ProtectedRoute";
import ResetRouteGuard from "./components/ResetRouteGuard";
import PublicRoute from "./components/PublicRoute";

import DashboardLayout from "./components/layout/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Generate from "./pages/dashboard/Generate";
import History from "./pages/dashboard/History";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

import Schema from "./pages/dashboard/Schema";
import Pricing from "./pages/dashboard/Pricing";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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
          path="/reset-with-otp"
          element={
            <ResetRouteGuard>
              <ResetWithOTP />
            </ResetRouteGuard>
          }
        />

        {/* Dashboard Section */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="generate" element={<Generate />} />
          <Route path="schema" element={<Schema />} />
          <Route path="history" element={<History />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
