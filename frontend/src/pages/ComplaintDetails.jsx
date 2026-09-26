import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./ComplaintDetails.css";

function ComplaintDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams] = useSearchParams(); 
  const from = searchParams.get("from");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getComplaint = async () => {

      try {

        const response = await fetch(
          `http://localhost:3000/api/complaints/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setComplaint(data);
        } else {
          alert("Complaint not found");
        }

      } catch (error) {

        console.log("Error:", error);
        alert("Failed to load complaint");

      }

      setLoading(false);
    };

    getComplaint();

  }, [id]);


  if (loading) {
    return <p>Loading complaint...</p>;
  }


  if (!complaint) {
    return <p>Complaint not found.</p>;
  }


  return (

    <div className="complaint-details-page">

      <div className="complaint-details-box">

        <h1>Complaint Details</h1>


        <div className="detail">

          <label>Complaint Title</label>
          <p>{complaint.title}</p>

        </div>


        <div className="detail">

          <label>Category</label>
          <p>{complaint.Category?.name}</p>

        </div>


        <div className="detail">

          <label>Priority</label>
          <p>{complaint.priority}</p>

        </div>


        <div className="detail">

          <label>Status</label>
          <p>{complaint.status}</p>

        </div>


        <div className="detail">

          <label>Description</label>
          <p>{complaint.description}</p>

        </div>



<button
  onClick={() =>
    navigate(from === "admin" ? "/admin-dashboard" : "/student-dashboard")
  }
>
  Back to Dashboard
</button>


      </div>

    </div>

  );
}

export default ComplaintDetails;
