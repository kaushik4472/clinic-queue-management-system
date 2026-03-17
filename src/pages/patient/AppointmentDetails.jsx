import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentDetails } from "../../api/patientService";

export default function AppointmentDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDetails();
  }, []);

  async function loadDetails() {
    try {
      const res = await getAppointmentDetails(id);
      setData(res.data);
      console.log("Appointment Details:", res.data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <h2 className="page-title">Appointment Details</h2>

      <div className="card">
        <p>
          <b>Status:</b>{" "}
          <span className={`status-badge status-${data.status}`}>{data.status}</span>
        </p>

        <hr />

        <div className="section">
          <h3>Prescription</h3>
          {data.prescription ? (
            <>
              <p><b>Medicines:</b></p>
              <ul>
                {data.prescription.medicines?.map((m, index) => (
                  <li key={index}>
                    {m.name} — {m.dosage} — {m.duration}
                  </li>
                ))}
              </ul>

              <p style={{ marginTop: 8 }}><b>Notes:</b> {data.prescription.notes}</p>
            </>
          ) : (
            <p>No prescription yet</p>
          )}
        </div>

        <hr />

        <div className="section">
          <h3>Report</h3>
          {data.report ? (
            <>
              <p><b>Diagnosis:</b> {data.report.diagnosis}</p>
              <p><b>Test:</b> {data.report.testRecommended}</p>
              <p><b>Remarks:</b> {data.report.remarks}</p>
            </>
          ) : (
            <p>No report yet</p>
          )}
        </div>
      </div>
    </div>
  );
}