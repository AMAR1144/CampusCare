import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubmitComplaint.css";

function SubmitComplaint() {

  const navigate = useNavigate();

  const [complaint, setComplaint] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`
      );

      const data = await response.json();
      setCategories(data);
    };

    getCategories();

  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const studentId = localStorage.getItem("studentId");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/complaints`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          user_id: studentId,
          category_id: category,
          title: complaint,
          description: description,
          priority: priority
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      alert("Complaint submitted successfully!");

      navigate("/student-dashboard");

    } else {

      alert("Failed to submit complaint");

    }
  };


  return (

    <div className="submit-page">

      <div className="submit-box">

        <h1>Submit a Complaint</h1>

        <p>Enter the details of your complaint below.</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Complaint Title</label>

            <input
              type="text"
              placeholder="Enter complaint title"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
            />

          </div>


          <div className="form-group">

            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (

                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>

              ))}

            </select>

          </div>


          <div className="form-group">

            <label>Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >

              <option value="">Select Priority</option>

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>Description</label>

            <textarea
              placeholder="Describe your complaint"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              required
            ></textarea>

          </div>


          <div className="button-group">

            <button
              type="submit"
              className="submit-btn"
            >
              Submit Complaint
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/student-dashboard")}
            >
              Back
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default SubmitComplaint;