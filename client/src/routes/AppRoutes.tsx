import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AssetsPage from "../pages/AssetsPage";
import MapPage from "../pages/MapPage";
import CreateAssetPage from "../pages/CreateAssetPage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AssetDetailsPage from "../pages/AssetDetailsPage";
import EditAssetPage from "../pages/EditAssetPage";
import NearbyAssetsPage from "../pages/NearbyAssetsPage";
import RegisterPage from "../pages/RegisterPage";
import TicketsPage from "../pages/TicketsPage";
import TicketDashboardPage
from "../pages/TicketDashboardPage";
import LandingPage from "../pages/LandingPage";
import UsersPage from "../pages/UsersPage";
import AuditLogsPage from "../pages/AuditLogsPage";
import NotificationsPage
from "../pages/NotificationsPage";
import TicketAnalyticsPage
from "../pages/TicketAnalyticsPage";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/"
  element={<LandingPage />}
/>

<Route
  path="/login"
  element={<LoginPage />}
/>
<Route
  path="/login"
  element={<LoginPage />}
/>
        <Route
  element={<MainLayout />}
>
  
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
<Route
  path="/users"
  element={<UsersPage />}
/>
<Route
  path="/audit-logs"
  element={<AuditLogsPage />}
/>
  <Route
    path="/assets"
    element={
      <ProtectedRoute>
        <AssetsPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/map"
    element={
      <ProtectedRoute>
        <MapPage />
      </ProtectedRoute>
    }
  />
  <Route
  path="/assets/:id"
  element={<AssetDetailsPage />}
/>
<Route
  path="/notifications"
  element={<NotificationsPage />}
/>
  <Route
    path="/create-asset"
    element={
      <ProtectedRoute>
        <CreateAssetPage />
      </ProtectedRoute>
    }
  />
  <Route
  path="/edit-asset/:id"
  element={
    <ProtectedRoute>
      <EditAssetPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/nearby-assets"
  element={<NearbyAssetsPage />}
/>
</Route>
<Route
  path="/tickets"
  element={
    <ProtectedRoute>
      <TicketsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/register"
  element={<RegisterPage />}
/>
<Route
  path="/ticket-dashboard"
  element={
    <ProtectedRoute>
      <TicketDashboardPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/ticket-analytics"
  element={<TicketAnalyticsPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;