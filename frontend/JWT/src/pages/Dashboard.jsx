import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❌");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1>🌄 Welcome to Smart Sensor, Robotics dept. at CDAC</h1>
          <p>Monitoring Nature with Technology</p>

          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "rgba(255,255,255,0.15)",
    padding: "40px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    color: "#fff",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    background: "#ff4d4d",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Dashboard;
