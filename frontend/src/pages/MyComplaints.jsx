import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ccms-logo.png";
import "./MyComplaints.css";

function MyComplaints() {

  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);


  // Get student name and complaints
  useEffect(() => {

    const name = localStorage.getItem("studentName");

    setStudentName(name);


    const getComplaints = async () => {

      try {

        const studentId = localStorage.getItem("studentId");

        const response = await fetch(
          `http://localhost:3000/api/complaints/my-complaints?user_id=${studentId}`
        );

        const data = await response.json();

        if (response.ok) {

          setComplaints(data);

        }

      } catch (error) {

        console.log("Error:", error);

      }

      setLoading(false);

    };

    getComplaints();

  }, []);


  // Logout
  const logout = () => {

    navigate("/login");

  };


  return (

    <div className="dashboard">


      {/* Sidebar */}

      <div className="sidebar">
            <div className="sidebar-logo"> 
                <img src={logo} alt="CampusCare Logo" /> 
            </div>
        <h2>CampusCare</h2>

        <p>Complaint Management System</p>


        <button
          onClick={() => navigate("/student-dashboard")}
        >
          Dashboard
        </button>


        <button
          onClick={() => navigate("/my-complaints")}
        >
          My Complaints
        </button>


        <div className="user-section">

          <p>Student</p>

          <button onClick={logout}>
            Logout
          </button>

        </div>

      </div>


      {/* Main Content */}

      <div className="main-content">


        <div className="page-header">

          <div>

            <h1>My Complaints</h1>

            <p>
              Here you can view and track all your complaints.
            </p>

          </div>


          <button
            className="submit-button"
            onClick={() => navigate("/submit-complaint")}
          >
            + Submit a Complaint
          </button>

        </div>


        {/* Complaints */}

        <div className="complaints">


          {loading ? (

            <p>Loading complaints...</p>

          ) : complaints.length === 0 ? (

            <div className="no-complaints">

              <h3>No Complaints Found</h3>

              <p>
                You have not submitted any complaints yet.
              </p>

            </div>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>Complaint</th>

                  <th>Category</th>

                  <th>Priority</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {complaints.map((complaint) => (

                  <tr key={complaint.id}>

                    <td>
                      {complaint.title}
                    </td>

                    <td>
                      {complaint.Category?.name}
                    </td>

                    <td>
                      {complaint.priority}
                    </td>

                    <td>
                      {complaint.status}
                    </td>

                    <td>

                      <button
                        onClick={() =>
                          navigate(`/complaint/${complaint.id}`)
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>

  );

}

export default MyComplaints;
