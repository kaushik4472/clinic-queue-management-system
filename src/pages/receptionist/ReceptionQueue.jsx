import React, { useEffect, useState } from "react";
import { getQueue, updateQueueStatus } from "../../api/receptionService";

export default function ReceptionQueue() {
  const [date, setDate] = useState("");
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (!date) return;

    loadQueue(date);

    const interval = setInterval(() => {
      loadQueue(date);
    }, 100000);

    return () => clearInterval(interval);
  }, [date]);

  async function loadQueue(selectedDate) {
    try {
      setLoading(true);
      const res = await getQueue(selectedDate);

      const data = Array.isArray(res.data) ? res.data : res.data.data;

      setQueue(data || []);
      console.log("Queue data:", data);
    } catch (err) {
      console.error(err);
      setQueue([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await updateQueueStatus(id, status);
      loadQueue(date);
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Reception Queue</h2>

      <div className="date-filter">
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            loadQueue(e.target.value);
          }}
        />
      </div>

      {loading && <div className="loading">Loading...</div>}

      {!loading && queue.length === 0 && (
        <div className="empty-state">No patients in queue for this date.</div>
      )}

      {queue.map((q) => {
        const patientName = q.appointment?.patient?.name || "N/A";
        const timeSlot = q.appointment?.timeSlot || "N/A";
        const date = q.appointment?.appointmentDate
          ? new Date(q.appointment.appointmentDate).toLocaleDateString()
          : "N/A";

        return (
          <div key={q.id} className="queue-card">
            <h3>Token #{q.tokenNumber}</h3>

            <p>
              <b>Patient:</b> {patientName}
            </p>

            <p>
              <b>Date:</b> {date}
            </p>

            <p>
              <b>Time:</b> {timeSlot}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status-badge status-${q.status}`}>
                {q.status}
              </span>
            </p>

            <div className="btn-group">
              <button
                className="btn btn-primary"
                disabled={q.status !== "waiting"}
                onClick={() => handleStatusChange(q.id, "in-progress")}
              >
                Start
              </button>

              <button
                className="btn btn-secondary"
                disabled={q.status !== "in_progress"}
                onClick={() => handleStatusChange(q.id, "done")}
              >
                Complete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
