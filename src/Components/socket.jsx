// socket.js
// import io from "socket.io-client";
//  const socket = io("http://localhost:5000");
// export default socket;

import io from "socket.io-client";

// Function to get the stored socket ID or generate a new one
const getStoredSocketId = () => {
  const storedSocketId = localStorage.getItem('socketId');
  if (storedSocketId) {
    return Promise.resolve(storedSocketId);
  } else {
    return new Promise((resolve) => {
      const tempSocket = io("http://localhost:5000");
      tempSocket.on("connect", () => {
        const newSocketId = tempSocket.id;
        tempSocket.disconnect();
        localStorage.setItem('socketId', newSocketId);
        resolve(newSocketId);
      });
    });
  }
};

// Use an async function to handle the promise
const initSocket =  () => {
  const socketId = getStoredSocketId();
  return io("http://localhost:5000", {
    query: {
      socketId: socketId,
    },
  });
};

export default initSocket;
