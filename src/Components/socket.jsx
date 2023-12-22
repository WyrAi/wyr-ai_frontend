// socket.js
import io from "socket.io-client";

const socket = io(import.meta.env.VERCEL_URL);


export default socket;
