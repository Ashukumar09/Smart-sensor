import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartoonBg from "../assets/cartoon-bg.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // 🔐 REGISTER SUBMIT FUNCTION
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      console.log("API Response:", data);

      if (res.ok) {
        alert("Registered Successfully 🎉");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.form}
        onSubmit={handleSubmit}
      >
        <h2 style={styles.title}>
          🧸 Cartoon Register
        </h2>

        {/* Name */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="name"
            required
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <label
            style={{
              ...styles.label,
              top: formData.name
                ? "-8px"
                : "12px",
            }}
          >
            Name 🧸
          </label>
        </div>

        {/* Email */}
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
              top: formData.email
                ? "-8px"
                : "12px",
            }}
          >
            Email 📧
          </label>
        </div>

        {/* Password */}
        <div style={styles.inputGroup}>
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
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
            }}
          >
            Password 🔒
          </label>
        </div>

        {/* Confirm Password */}
        <div style={styles.inputGroup}>
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            required
            placeholder=" "
            value={
              formData.confirmPassword
            }
            onChange={handleChange}
            style={styles.input}
          />

          <label
            style={{
              ...styles.label,
              top:
                formData.confirmPassword
                  ? "-8px"
                  : "12px",
            }}
          >
            Confirm Password 🔐
          </label>

          {/* Show / Hide Eye */}
          <span
            style={styles.eye}
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword
              ? "🙈"
              : "👁️"}
          </span>
        </div>

        {/* Button */}
        <button style={styles.button}>
          Register
        </button>

        {/* Login Link */}
        <p
          style={styles.link}
          onClick={() => navigate("/")}
        >
          Already have account? Login
        </p>
      </form>
    </div>
  );
};

export default Register;


// ============================
// 🎨 STYLES
// ============================
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${cartoonBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  form: {
    background: "rgba(255,255,255,0.25)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(18px)",
    display: "flex",
    flexDirection: "column",
    width: "340px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  },

  title: {
    marginBottom: "25px",
  },

  inputGroup: {
    position: "relative",
    marginBottom: "22px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    background: "rgba(255,255,255,0.9)",
    color: "#333",
  },

  label: {
    position: "absolute",
    left: "12px",
    top: "12px",
    fontSize: "13px",
    color: "#fff",
    background: "rgba(0,0,0,0.5)",
    padding: "0 6px",
    borderRadius: "4px",
    transition: "0.3s",
    pointerEvents: "none",
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
  },

  button: {
    padding: "12px",
    background:
      "linear-gradient(45deg,#ff7eb3,#ff758c)",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },

  link: {
    marginTop: "15px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
