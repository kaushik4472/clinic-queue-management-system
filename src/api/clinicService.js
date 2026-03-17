import api from "./axios";

export async function listClinics(params = {}) {
  const res = await api.get("/clinics", { params });
  return res.data;
}


export async function callNextPatient(clinicId) {
  const res = await api.post(`/clinics/${clinicId}/queues/next`);
  return res.data;
}


export async function getClinicQueues(clinicId) {
  return api.get(`/clinics/${clinicId}/queues`);
}