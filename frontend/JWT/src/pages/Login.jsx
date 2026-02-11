import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Auto redirect if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 30 }}>
          🌿 Smart Sensor Login
        </h2>

        {/* Floating Email */}
        <div style={styles.inputGroup}>
          <input
            type="email"
            name="email"
            required
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <label
            style={{
              ...styles.label,
              top: formData.email ? "-8px" : "12px",
              fontSize: formData.email ? "12px" : "14px",
              color: formData.email ? "#fff" : "#777",
              background: formData.email
                ? "rgba(0,0,0,0.6)"
                : "transparent",
              padding: formData.email
                ? "0 4px"
                : "0",
              borderRadius: "4px",
            }}
          >
            Email
          </label>
        </div>

        {/* Floating Password */}
        <div style={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <label
            style={{
              ...styles.label,
              top: formData.password
                ? "-8px"
                : "12px",
              fontSize: formData.password
                ? "12px"
                : "14px",
              color: formData.password
                ? "#fff"
                : "#777",
              background: formData.password
                ? "rgba(0,0,0,0.6)"
                : "transparent",
              padding: formData.password
                ? "0 4px"
                : "0",
              borderRadius: "4px",
            }}
          >
            Password
          </label>

          {/* Show/Hide Eye */}
          <span
            style={styles.eye}
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Login Button */}
        <button style={styles.button}>
          Login
        </button>

        {/* Social Buttons */}
        <div style={styles.socialContainer}>
          <button style={styles.google}>
            Google
          </button>

          <button style={styles.github}>
            GitHub
          </button>
        </div>

        {/* Register Link */}
        <p
          style={styles.link}
          onClick={() =>
            navigate("/register")
          }
        >
          Don’t have an account? Register
        </p>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  form: {
    background: "rgba(255,255,255,0.15)",
    padding: "40px",
    borderRadius: "15px",
    backdropFilter: "blur(15px)",
    display: "flex",
    flexDirection: "column",
    width: "320px",
    color: "#fff",
    textAlign: "center",
  },

  inputGroup: {
    position: "relative",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  label: {
    position: "absolute",
    left: "12px",
    top: "12px",
    color: "#777",
    fontSize: "14px",
    pointerEvents: "none",
    transition: "0.3s",
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
  },

  button: {
    padding: "12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  socialContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  google: {
    flex: 1,
    marginRight: "5px",
    padding: "10px",
    background: "#db4437",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  github: {
    flex: 1,
    marginLeft: "5px",
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  link: {
    marginTop: "15px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
