import { io } from "socket.io-client";

const socket = io("https://chatapp-backend-g96h.onrender.com", {
  autoConnect: false,
});

export default socket;