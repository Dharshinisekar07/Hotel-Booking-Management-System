import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchAllRooms        = ()      => API.get("/rooms");
export const fetchAvailableRooms  = ()      => API.get("/rooms/available");
export const fetchRoomById        = (id)    => API.get(`/rooms/${id}`);
export const addRoom              = (data)  => API.post("/rooms", data);
export const createBooking        = (data)  => API.post("/bookings", data);
export const fetchMyBookings      = (email) => API.get(`/bookings/guest?email=${email}`);
export const cancelBooking        = (id)    => API.put(`/bookings/${id}/cancel`);
export const fetchAllBookings     = ()      => API.get("/bookings");