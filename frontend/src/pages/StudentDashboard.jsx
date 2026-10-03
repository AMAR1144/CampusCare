import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import logo from "../assets/ccms-logo.png";

function StudentDashboard() {

  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);


  // Get complaints from backend
  useEffect(() => {

    const getComplaints = async () => {

      try {

        const studentId =
          localStorage.getItem("studentId");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/complaints/my-complaints?user_id=${studentId}`
        );

        const data = await response.json();

        console.log(
          "Complaints received:",
          JSON.stringify(data, null, 2)
        );

        if (response.ok) {

          setComplaints(data);

        }

      } catch (error) {

        console.log(
          "Error:",
          error
        );

      }

      setLoading(false);

    };


    getComplaints();


    const name =
      localStorage.getItem("studentName");

    setStudentName(name);

  }, []);


  // Calculate numbers
  const total = complaints.length;

  const pending = complaints.filter(
    (complaint) =>
      complaint.status === "Pending"
  ).length;

  const resolved = complaints.filter(
    (complaint) =>
      complaint.status === "Resolved"
  ).length;


  // Logout
  const logout = () => {

    navigate("/login");

  };


  return (

    <div className="dashboard">


      {/* Sidebar */}

      <div className="sidebar">

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
          Complaint Management System
        </p>


        <button
          onClick={() =>
            navigate("/student-dashboard")
          }
        >
          Dashboard
        </button>


        <button
          onClick={() =>
            navigate("/my-complaints")
          }
        >
          My Complaints
        </button>


        <div className="user-section">

          <p>
            Student
          </p>


          <button onClick={logout}>
            Logout
          </button>

        </div>

      </div>


      {/* Main Content */}

      <div className="main-content">

        <h1>
          Welcome, {studentName}
        </h1>


        <p>
          Here's an overview of your complaints.
        </p>


        {/* Cards */}

        <div className="cards">


          <div className="card">

            <h3>
              Total Complaints
            </h3>

            <h2>
              {total}
            </h2>

          </div>


          <div className="card">

            <h3>
              Pending
            </h3>

            <h2>
              {pending}
            </h2>

          </div>


          <div className="card">

            <h3>
              Resolved
            </h3>

            <h2>
              {resolved}
            </h2>

          </div>


        </div>


        {/* Submit Complaint */}

        <button
          className="submit-button"
          onClick={() =>
            navigate("/submit-complaint")
          }
        >
          + Submit a Complaint
        </button>


        {/* Complaints */}

        <div className="complaints">

          <h2>
            Recent Complaints
          </h2>


          {loading ? (

            <p>
              Loading complaints...
            </p>

          ) : complaints.length === 0 ? (

            <p>
              No complaints found.
            </p>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>
                    Complaint
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Priority
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {complaints
                  .slice(0, 4)
                  .map((complaint) => (

                    <tr key={complaint.id}>

                      <td>
                        {complaint.title}
                      </td>


                      <td>
                        {complaint.Category?.name}
                      </td>


                      <td>

                        <span
                          className={`priority-badge ${complaint.priority?.toLowerCase()}`}
                        >
                          {complaint.priority}
                        </span>

                      </td>


                      <td>

                        <span
                          className={`status-badge ${
                            complaint.status
                              ?.toLowerCase()
                              .replace(" ", "-")
                          }`}
                        >
                          {complaint.status}
                        </span>

                      </td>


                      <td>

                        <button
                          onClick={() =>
                            navigate(
                              `/complaint/${complaint.id}`
                            )
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

export default StudentDashboard;