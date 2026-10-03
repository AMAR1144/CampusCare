import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ccms-logo.png";
import "./login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();

      console.log(
        "Response:",
        JSON.stringify(data, null, 2)
      );

      console.log(
        "Status:",
        response.status
      );


      if (response.ok) {

        localStorage.setItem(
          "studentId",
          data.user.id
        );

        localStorage.setItem(
          "studentName",
          data.user.name
        );

        navigate("/student-dashboard");

      } else {

        alert(
          data.message ||
          "Invalid Credentials.. Login Failed"
        );

      }

    } catch (error) {

      console.log(
        "Login Error:",
        error
      );

      alert(
        "Unable to connect to the server."
      );

    }

  };


  return (

    <div className="login-container">

      <div className="login-card">

        <div className="brand">

          <div className="sidebar-logo">

            <img
              src={logo}
              alt="CampusCare Logo"
            />

          </div>

          <h2>
            CampusCare
          </h2>

          <p>
            Sign in to your account
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setemail(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          <div className="button-group">

            <button
              type="submit"
              className="btn-submit"
            >
              Login
            </button>


            <button
              type="button"
              className="btn-admin"
              onClick={() =>
                navigate("/admin-login")
              }
            >
              Admin Login
            </button>

          </div>


          <div className="login-footer">

            <h4>
              Don't have a account Register now
            </h4>

            <button
              type="button"
              className="btn-register"
              onClick={() =>
                navigate("/register")
              }
            >
              Register
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default Login;