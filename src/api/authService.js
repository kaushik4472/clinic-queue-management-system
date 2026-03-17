import api from "./axios";

export async function login({ email, password }) {
  try {
    const res = await api.post("/auth/login", {
      email: email,
      password: password
    });

    return res.data;
  } catch (err) {
    console.log("Login error:", err.response?.data);
    throw err;
  }
}

export async function getProfile() {
  const res = await api.get("/auth/me");
  return res.data;
}