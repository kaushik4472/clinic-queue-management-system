import api from "./axios";

export const getDoctorQueue = () => {
  return api.get("/doctor/queue");
};

export const addPrescription = (appointmentId, data) => {
  return api.post(`/prescriptions/${appointmentId}`, data);
};

export const addReport = (appointmentId, data) => {
  return api.post(`/reports/${appointmentId}`, data);
};