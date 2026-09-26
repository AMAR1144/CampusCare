import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/ccms-logo.png";
import "./admin-login.css";
function Adminlog(){
  const navigate=useNavigate();
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/api/auth/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    console.log("Response:", data);
    console.log("Status:", response.status);

    if (response.ok) {

      localStorage.setItem("adminId", data.admin.id);

      navigate("/admin-dashboard");

    } else {

      alert(data.message || "Admin login failed");

    }

  } catch (error) {

    console.log("Admin Login Error:", error);
    alert("Unable to connect to the server.");

  }
};

return(
    <div className="ADMIN-login-container">
    <div className="admin-card">
    
    <div className="brand">
      <div className="sidebar-logo"> 
                <img src={logo} alt="CampusCare Logo" /> 
              </div>
      <h2>CampusCare</h2>
      <p className="admin-badge">Admin Portal</p>
    </div>

    <form onSubmit={handleSubmit} className="admin-form">
      
      <div className="form-group">
        <label htmlFor="email">Admin Email</label>
        <input type="email" id="email" name="email" placeholder="admin@campuscare.com" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter admin password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      </div>


      <div className="button-group">
        <button type="submit" className="btn-submit">Login</button>
        <button type="button" className="btn-back" onClick={() => navigate("/login")}>Back</button>
      </div>

    </form>
    </div>
  </div>
)};
export default Adminlog;