import api from "./axios";

export const getClinicInfo = () => api.get("/admin/clinic");

export const getUsers = () => api.get("/admin/users");

export const createUser = (data) => api.post("/admin/users", data);