import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
function MainLayout() {
     const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          width: "220px",
          padding: "20px",
          borderRight:
            "1px solid #ddd",
        }}
      >
        <h2>SmartInfra</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/assets">
            Assets
          </Link>

          <Link to="/map">
            GIS Map
          </Link>

          <Link to="/create-asset">
            Create Asset
          </Link>
          <Link to="/nearby-assets">
  Nearby Assets
</Link>
         <button
  onClick={() => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  }}
>
  Logout
</button>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;