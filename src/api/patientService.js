import api from "./axios";

export const bookAppointment = (data) => {
  return api.post("/appointments", data);
};

export const getMyAppointments = () => {
  return api.get("/appointments/my");
};

export const getAppointmentDetails = (id) => {
  return api.get(`/appointments/${id}`);
};

export const getMyPrescriptions = () => {
  return api.get("/prescriptions/my");
};

export const getMyReports = () => {
  return api.get("/reports/my");
};