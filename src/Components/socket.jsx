// socket.js
import io from "socket.io-client";

const socket = io(process.env.VERCEL_URL);

export default socket;
