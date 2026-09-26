import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ccms-logo.png";

function AdminDashboard() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All Status");

  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [priorityFilter, setPriorityFilter] = useState("All Priorities");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);

const updateStatus = async (complaintId, newStatus) => {

  try {

    const response = await fetch(
      `http://localhost:3000/api/complaints/${complaintId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update status");
      return;
    }

    // Update the complaint in the frontend
    setComplaints((previousComplaints) =>
      previousComplaints.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: newStatus
            }
          : complaint
      )
    );

  } catch (error) {

    console.error("Status update error:", error);

    alert("Unable to connect to backend server.");

  }

};

  useEffect(() => {

    fetchComplaints();
    fetchCategories();

  }, []);


  // Get all complaints
  const fetchComplaints = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:3000/api/complaints"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }

      const data = await response.json();

      console.log("Complaints:", data);

      setComplaints(data);

    } catch (err) {

      console.error(err);

      setError("Unable to connect to backend server.");

    } finally {

      setLoading(false);

    }

  };


  // Get all categories
  const fetchCategories = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/api/categories"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      console.log("Categories:", data);

      setCategories(data);

    } catch (err) {

      console.error("Category Error:", err);

    }

  };


  // Filter complaints
  const filteredComplaints = complaints.filter((item) => {

    const searchText = search.toLowerCase();

    const matchesSearch = 
    item.title?.toLowerCase().includes(searchText) || 
    item.User?.name?.toLowerCase().includes(searchText) || 
    item.Category?.name?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All Status" ||
      item.status === statusFilter;


    const matchesCategory = 
    categoryFilter === "All Categories" || 
    item.Category?.name === categoryFilter;


    const matchesPriority =
      priorityFilter === "All Priorities" ||
      item.priority === priorityFilter;


    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesPriority
    );

  });


  // Clear all filters
  const clearFilters = () => {

    setSearch("");

    setStatusFilter("All Status");

    setCategoryFilter("All Categories");

    setPriorityFilter("All Priorities");

  };


  // Format date
  const formatDate = (dateString) => {

    if (!dateString) return "-";

    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  };


  // Logout
  const logout = () => {

    localStorage.removeItem("adminId");

    navigate("/login");

  };


  return (

    <div className="dashboard-container">

      {/* Sidebar */}

      <div className="sidebar">

        <div className="sidebar-logo">
          <img src={logo} alt="CampusCare Logo" />
        </div>

        <h2>CampusCare</h2>

        <p>Complaint Management System</p>


        <nav className="nav-menu">

          <button
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </button>
          <button onClick={() => navigate("/manage-users")}>
            Manage Users
          </button>
        </nav>
        <div className="sidebar-footer">

          <div className="user-profile">

            <div className="avatar">
              AD
            </div>

            <div>

              <strong>
                Administrator
              </strong>

              <p>
                System Admin
              </p>

            </div>

          </div>


          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* Main Content */}

      <main className="main-content">

        <header className="main-header">

          <div>
            <h1>
              Admin Dashboard
            </h1>
            <p>
              Manage and monitor campus complaints.
            </p>
          </div>



        </header>


        {/* Metrics */}

        <div className="metrics-grid">

          <div className="card">

            <h3>
              Total Complaints
            </h3>

            <p>
              {complaints.length}
            </p>

          </div>


          <div className="card">

            <h3>
              Pending
            </h3>

            <p>
              {
                complaints.filter(
                  (c) => c.status === "Pending"
                ).length
              }
            </p>

          </div>


          <div className="card">

            <h3>
              In Progress
            </h3>

            <p>
              {
                complaints.filter(
                  (c) => c.status === "In Progress"
                ).length
              }
            </p>

          </div>


          <div className="card">

            <h3>
              Resolved
            </h3>

            <p>
              {
                complaints.filter(
                  (c) => c.status === "Resolved"
                ).length
              }
            </p>

          </div>

        </div>


        {/* Complaints Table */}

        <div className="table-card">

          <h2>
            Complaints List
          </h2>


          {/* Filter Bar */}

          <div className="filter-bar">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />


            {/* Status */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option>
                All Status
              </option>

              <option>
                Pending
              </option>

              <option>
                In Progress
              </option>

              <option>
                Resolved
              </option>

              <option>
                Rejected
              </option>

            </select>


            {/* Category */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >

              <option value="All Categories">
                All Categories
              </option>

              {categories.map((cat) => (

                <option
                  key={cat.id}
                  value={cat.name}
                >
                  {cat.name}
                </option>

              ))}

            </select>


            {/* Priority */}

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >

              <option>
                All Priorities
              </option>

              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>

            </select>


            <button
              onClick={clearFilters}
            >
              Clear
            </button>

          </div>


          {/* Table */}

          <table className="complaint-table">

            <thead>

              <tr>

                <th>
                  Title
                </th>

                <th>
                  Student
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

              {loading && (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center"
                    }}
                  >
                    Loading complaints...
                  </td>

                </tr>

              )}


              {!loading && error && (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      color: "red"
                    }}
                  >
                    {error}
                  </td>

                </tr>

              )}


              {!loading &&
                !error &&
                filteredComplaints.length === 0 && (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center"
                      }}
                    >
                      No complaints found.
                    </td>

                  </tr>

                )}


              {!loading &&
                !error &&
                filteredComplaints.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.title}
                    </td>

                    <td>
                      {item.User?.name || "-"}
                    </td>

                    <td>
                      {item.Category?.name || "-"}
                    </td>

                    <td>
                      {item.priority}
                    </td>
<td>
  <select
    value={item.status}
    onChange={(e) =>
      updateStatus(item.id, e.target.value)
    }
    className={`status-select ${item.status
      ?.toLowerCase()
      .replace(" ", "-")}`}
  >
    <option value="Pending">
      Pending
    </option>

    <option value="In Progress">
      In Progress
    </option>

    <option value="Resolved">
      Resolved
    </option>

    <option value="Rejected">
      Rejected
    </option>
  </select>
</td>

                    <td>

                      <button
                        className="btn-view"
                        onClick={() => navigate(`/complaint/${item.id}?from=admin`)}
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;
