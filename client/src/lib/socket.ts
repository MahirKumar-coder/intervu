import { io } from "socket.io-client"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const socket = io(API_URL, {
    withCredentials: true,
    autoConnect: true,
    transports: ["websocket"] // Enforce websocket-only to prevent Render rolling deploy 400 session ID errors
})
