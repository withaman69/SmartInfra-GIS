import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import AppLoader from "./components/AppLoader";

function App() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return <AppRoutes />;
}

export default App;