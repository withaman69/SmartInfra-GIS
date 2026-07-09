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
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;