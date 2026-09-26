import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ccms-logo.png";
import "./register.css";
function Register(){
  const navigate=useNavigate();
    const[username, setUsername]=useState("");
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[phone, setPhone]=useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username,
            email: email,
            password: password,
            phone: phone
        })
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
        navigate("/login");
    }
    else{
      {alert("Registration Failled \n Try again!")};
    }
};
    return(
            <div className="register-container">
    <div className="register-card">
      

      <div className="brand">
        <div className="sidebar-logo"> 
          <img src={logo} alt="CampusCare Logo" /> 
        </div>
        <h2>CampusCare</h2>
        <p>Create an account to get started</p>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-submit">Submit</button>
          <button type="button" className="btn-back"  onClick={() => navigate("/login")}>Back</button>
        </div>

      </form>

    </div>
  </div>

    );
}
export default Register;