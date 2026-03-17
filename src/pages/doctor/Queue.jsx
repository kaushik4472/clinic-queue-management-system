import React, { useEffect, useState } from "react";
import { getDoctorQueue } from "../../api/doctorService";
import { useNavigate } from "react-router-dom";

export default function DoctorQueue() {
  const [queue, setQueue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQueue();
  }, []);

  async function loadQueue() {
    try {
      const res = await getDoctorQueue();
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setQueue(data || []);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="page-container">
      <h2 className="page-title">Doctor Queue (Today)</h2>

      {queue.length === 0 && <div className="empty-state">No patients</div>}

      {queue.map((q) => {
        return (
          <div key={q.id} className="queue-card">
            <h3>Token #{q.tokenNumber}</h3>

            <p>
              <b>Patient:</b> {q.patientName}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status-badge status-${q.status}`}>
                {q.status}
              </span>
            </p>

            <div className="btn-group">
              <button className="btn btn-primary" onClick={() => navigate(`/doctor/prescription/${q.id}`)}>
                Add Prescription
              </button>

              <button className="btn btn-secondary" onClick={() => navigate(`/doctor/report/${q.id}`)}>
                Add Report
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
