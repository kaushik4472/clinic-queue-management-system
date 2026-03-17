import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addReport } from "../../api/doctorService";

export default function AddReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [diagnosis, setDiagnosis] = useState("");
  const [testRecommended, setTestRecommended] = useState("");
  const [remarks, setRemarks] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      diagnosis,
      testRecommended,
      remarks,
    };

    try {
      await addReport(id, data);
      alert("Report added successfully");
      navigate("/doctor");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error adding report");
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Add Report</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Diagnosis</label>
            <input
              type="text"
              placeholder="Diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Test Recommended</label>
            <input
              type="text"
              placeholder="Test Recommended"
              value={testRecommended}
              onChange={(e) => setTestRecommended(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Remarks</label>
            <textarea
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">Save Report</button>
        </form>
      </div>
    </div>
  );
}