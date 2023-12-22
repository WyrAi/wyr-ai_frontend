// socket.js
// import io from "socket.io-client";
//  const socket = io("http://localhost:5000");
// export default socket;

import io from "socket.io-client";

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


const initSocket =  () => {
  const socketId = getStoredSocketId();
  return io("http://localhost:5000", {
    query: {
      socketId: socketId,
    },
  });
};

export default initSocket;
