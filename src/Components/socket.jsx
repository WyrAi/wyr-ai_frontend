// // socket.js
// // import io from "socket.io-client";
// //  const socket = io("http://localhost:5000");
// // export default socket;

import io from "socket.io-client";
const getStoredSocketId = () => {
  const storedSocketId = localStorage.getItem('socketId');
  if (storedSocketId) {
    return Promise.resolve(storedSocketId);
  } else {
    return new Promise((resolve) => {
      const tempSocket = io(import.meta.env.VITE_BASE_URL);
      tempSocket.on("connect", () => {
        const newSocketId = tempSocket.id;
        tempSocket.disconnect();
        
        resolve(newSocketId);
      });
    });
  }
};


const initSocket =  () => {
  const socketId = getStoredSocketId();
  return io(import.meta.env.VITE_BASE_URL, {
    query: {
      socketId: socketId,
    },
  });
};

export default initSocket;
