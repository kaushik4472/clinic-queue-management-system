import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-links">
        {user?.role === "admin" && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/create">Create User</Link>
          </>
        )}

        {user?.role === "doctor" && <Link to="/doctor">Doctor Queue</Link>}

        {user?.role === "receptionist" && (
          <Link to="/reception">Reception Queue</Link>
        )}
        {user?.role === "patient" && (
          <>
            <Link to="/patient/book">Book</Link>
            <Link to="/patient/appointments">My Appointments</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        <span>{user?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
