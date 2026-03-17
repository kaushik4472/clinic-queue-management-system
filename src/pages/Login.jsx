import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);
    try {
      await login({ email, password });
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Login failed");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="card login-card">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {err && <div className="error-msg">{err}</div>}
          <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 8 }}>Login</button>
        </form>
      </div>
    </div>
  );
}