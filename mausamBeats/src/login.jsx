import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Simple dummy check (you can replace with real auth logic)
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // redirect to main app
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    // ... same code as before
  );
};

export default Login;
