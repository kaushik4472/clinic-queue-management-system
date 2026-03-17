import React, { useEffect, useState } from "react";
import { getMyAppointments } from "../../api/patientService";
import { useNavigate } from "react-router-dom";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const res = await getMyAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="page-container">
      <h2 className="page-title">My Appointments</h2>

      {appointments.length === 0 && (
        <div className="empty-state">No appointments yet</div>
      )}

      {appointments.map((a) => (
        <div key={a.id} className="appointment-item">
          <div className="appointment-info">
            <span><b>Date:</b> {a.appointmentDate}</span>
            <span><b>Time:</b> {a.timeSlot}</span>
            <span>
              <b>Status:</b>{" "}
              <span className={`status-badge status-${a.status}`}>{a.status}</span>
            </span>
          </div>
          <button className="btn btn-secondary" onClick={() => nav(`/patient/appointment/${a.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
