import api from "./axios";

export const getQueueByDate = (date) => {
  return api.get(`/queue?date=${date}`);
};

export const updateQueueStatus = (id, status) => {
  return api.patch(`/queue/${id}`, { status });
};