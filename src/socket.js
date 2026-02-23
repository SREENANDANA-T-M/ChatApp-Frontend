import { io } from "socket.io-client";

const socket = io("https://chatapp-backend-1-1k9p.onrender.com", {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;