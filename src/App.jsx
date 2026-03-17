import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import ReceptionQueue from "./pages/receptionist/ReceptionQueue";
import DoctorQueue from "./pages/doctor/Queue";
import AddPrescription from "./pages/doctor/AddPrescription";
import AddReport from "./pages/doctor/AddReport";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import CreateUser from "./pages/admin/CreateUser";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import AppointmentDetails from "./pages/patient/AppointmentDetails";
import { Navigate } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  if (user.role === "admin") return <Navigate to="/admin" />;
  if (user.role === "doctor") return <Navigate to="/doctor" />;
  if (user.role === "receptionist") return <Navigate to="/reception" />;
  if (user.role === "patient") return <Navigate to="/patient/appointments" />;

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Role-based home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reception"
            element={
              <ProtectedRoute>
                <ReceptionQueue />
              </ProtectedRoute>
            }
          />

          {/* Doctor */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute>
                <DoctorQueue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/prescription/:id"
            element={
              <ProtectedRoute>
                <AddPrescription />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/report/:id"
            element={
              <ProtectedRoute>
                <AddReport />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/book"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/appointments"
            element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/appointment/:id"
            element={
              <ProtectedRoute>
                <AppointmentDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
