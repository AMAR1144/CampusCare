import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import ComplaintDetails from "./pages/ComplaintDetails";
import MyComplaints from "./pages/MyComplaints";
import Register from "./pages/register";
import Login from "./pages/login";
import Adminlog from "./pages/admin-login";
import ManageUsers from "./pages/ManageUsers";

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<Adminlog />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/complaint/:id" element={<ComplaintDetails />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/manage-users" element={<ManageUsers />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;