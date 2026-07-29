import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import AppLoader from "./components/AppLoader";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("smartinfra-loader");

    if (!hasVisited) {
      setLoading(true);

      const timer = setTimeout(() => {
        localStorage.setItem("smartinfra-loader", "true");
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return <AppRoutes />;
}

export default App;