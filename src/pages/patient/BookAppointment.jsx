import React, { useState } from "react";
import { bookAppointment } from "../../api/patientService";

export default function BookAppointment() {
  const [form, setForm] = useState({
    appointmentDate: "",
    timeSlot: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(form);

      await bookAppointment(form);

      alert("Appointment booked successfully");
    } catch (err) {
      console.log(err.response?.data);
      alert("Error booking");
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Book Appointment</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              required
              onChange={(e) =>
                setForm({ ...form, appointmentDate: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              required
              onChange={(e) => {
                const time = e.target.value;

                const [hour, min] = time.split(":");
                const endMin = String(Number(min) + 15).padStart(2, "0");

                const slot = `${hour}:${min}-${hour}:${endMin}`;

                setForm({ ...form, timeSlot: slot });
              }}
            />
          </div>

          <button className="btn btn-primary" type="submit">Book</button>
        </form>
      </div>
    </div>
  );
}
