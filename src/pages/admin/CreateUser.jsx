import React, { useState } from "react";
import { createUser } from "../../api/adminService";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "receptionist",
    phone: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createUser(form);

      alert("User Created Successfully");
    } catch (err) {
      console.error(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Create User</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              placeholder="Phone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={form.role}
              onChange={
                (e) => setForm({ ...form, role: e.target.value })
              }
            >
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
