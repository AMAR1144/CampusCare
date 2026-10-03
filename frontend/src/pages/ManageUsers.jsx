import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css";
import logo from "../assets/ccms-logo.png";

function ManageUsers() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);


  // FETCH USERS
  const fetchUsers = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users"
        );
      }

      console.log("Users:", data);

      setUsers(data);

    } catch (error) {

      console.error(
        "Fetch users error:",
        error
      );

      alert(
        "Unable to connect to backend server."
      );

    } finally {

      setLoading(false);

    }

  };


  // LOAD USERS
  useEffect(() => {

    fetchUsers();

  }, []);


  // CLEAR FORM
  const clearForm = () => {

    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setEditingUser(null);

  };


  // ADD USER
  const handleAddUser = () => {

    clearForm();

    setShowForm(true);

  };


  // EDIT USER
  const handleEditUser = (user) => {

    setEditingUser(user);

    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone || "");
    setPassword("");

    setShowForm(true);

  };


  // CREATE / UPDATE USER
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let url =
        `${import.meta.env.VITE_API_URL}/api/users`;

      let method = "POST";


      if (editingUser) {

        url =
          `${import.meta.env.VITE_API_URL}/api/users/${editingUser.id}`;

        method = "PUT";

      }


      const response = await fetch(
        url,
        {

          method: method,

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            password
          })

        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Operation failed"
        );

        return;

      }


      alert(
        editingUser
          ? "User updated successfully"
          : "User created successfully"
      );


      setShowForm(false);

      clearForm();

      fetchUsers();

    } catch (error) {

      console.error(
        "Save user error:",
        error
      );

      alert(
        "Unable to connect to backend server."
      );

    }

  };


  // DELETE USER
  const handleDeleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );


    if (!confirmDelete) {

      return;

    }


    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Failed to delete user"
        );

        return;

      }


      alert(
        "User deleted successfully"
      );

      fetchUsers();

    } catch (error) {

      console.error(
        "Delete user error:",
        error
      );

      alert(
        "Unable to connect to backend server."
      );

    }

  };


  // SEARCH USERS
  const filteredUsers = users.filter((user) => {

    const searchText =
      search.toLowerCase();


    return (

      user.name
        ?.toLowerCase()
        .includes(searchText) ||

      user.email
        ?.toLowerCase()
        .includes(searchText) ||

      user.phone
        ?.toLowerCase()
        .includes(searchText)

    );

  });


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("adminId");

    navigate("/login");

  };


  return (

    <div className="dashboard-container">


      {/* SIDEBAR */}

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


        <nav className="nav-menu">

          <button
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            Dashboard
          </button>


          <button
            className="active"
            onClick={() =>
              navigate("/manage-users")
            }
          >
            Manage Users
          </button>

        </nav>


        {/* SIDEBAR FOOTER */}

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


      {/* MAIN CONTENT */}

      <main className="main-content">


        <header className="main-header">

          <div>

            <h1>
              Manage Users
            </h1>

            <p>
              Manage CampusCare student accounts.
            </p>

          </div>

        </header>


        {/* USERS CARD */}

        <div className="table-card">


          <div className="users-header">

            <h2>
              Users List
            </h2>


            <button
              className="add-user-btn"
              onClick={handleAddUser}
            >
              + Add User
            </button>

          </div>


          {/* SEARCH */}

          <div className="filter-bar">

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* USERS TABLE */}

          {loading ? (

            <p className="message">
              Loading users...
            </p>

          ) : (

            <table className="complaint-table">

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredUsers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center"
                      }}
                    >
                      No users found.
                    </td>

                  </tr>

                ) : (

                  filteredUsers.map((user) => (

                    <tr key={user.id}>

                      <td>
                        {user.id}
                      </td>

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.phone || "-"}
                      </td>

                      <td className="user-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEditUser(user)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteUser(
                              user.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>


        {/* ADD / EDIT MODAL */}

        {showForm && (

          <div className="modal-overlay">

            <div className="user-modal">


              <h2>

                {editingUser
                  ? "Edit User"
                  : "Add New User"}

              </h2>


              <form
                onSubmit={handleSubmit}
              >


                <div className="form-group">

                  <label>
                    Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Phone
                  </label>

                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                  />

                </div>


                <div className="form-group">

                  <label>

                    {editingUser
                      ? "New Password"
                      : "Password"}

                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required={!editingUser}
                  />

                </div>


                <div className="modal-buttons">

                  <button
                    type="submit"
                    className="save-btn"
                  >

                    {editingUser
                      ? "Update User"
                      : "Create User"}

                  </button>


                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {

                      setShowForm(false);

                      clearForm();

                    }}
                  >
                    Cancel
                  </button>

                </div>


              </form>

            </div>

          </div>

        )}

      </main>

    </div>

  );

}

export default ManageUsers;