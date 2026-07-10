import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function LoginPage() {
   const navigate = useNavigate();
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

    localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

console.log("Login Successful");

navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginPage;