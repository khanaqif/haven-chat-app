import { io } from "socket.io-client";

const socket = io(); // Automatically connects to backend

export default socket;
