import React, { useEffect, useState, useContext } from "react";
import { getUsers } from "../../api/adminService";
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    receptionists: 0
  });

  useEffect(() => {
    loadCounts();
  }, []);

  async function loadCounts() {
    try {
      const res = await getUsers();
      const users = res.data;
      console.log("User:", user);
      const doctors = users.filter(u => u.role === "doctor").length;
      const patients = users.filter(u => u.role === "patient").length;
      const receptionists = users.filter(u => u.role === "receptionist").length;

      setCounts({ doctors, patients, receptionists });

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Clinic Dashboard</h2>

      <div className="card">
        <div className="clinic-header">
          <h3>{user?.clinicName}</h3>
          <p><b>Code:</b> {user?.clinicCode}</p>
        </div>

        <hr />

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-value">{counts.doctors}</div>
            <div className="stat-label">Doctors</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{counts.patients}</div>
            <div className="stat-label">Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{counts.receptionists}</div>
            <div className="stat-label">Receptionists</div>
          </div>
        </div>
      </div>
    </div>
  );
}