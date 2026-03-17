import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addPrescription } from "../../api/doctorService";

export default function AddPrescription() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      medicines: [
        {
          name: medicineName,
          dosage: dosage,
          duration: duration,
        },
      ],
      notes: notes,
    };

    try {
      await addPrescription(id, data);
      alert("Prescription added");
      navigate("/doctor");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error adding prescription");
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Add Prescription</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Medicine Name</label>
            <input
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Dosage</label>
            <input
              placeholder="Dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
