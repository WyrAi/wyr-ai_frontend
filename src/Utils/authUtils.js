// import initSocket from "../Components/socket";

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const deleteToken = async () => {
  // const socket = initSocket();
  // const storedSocketId = localStorage.getItem("socketId");
  // socket.emit("remove", storedSocketId);
  localStorage.removeItem("token");
  // localStorage.removeItem("socketId");
  return true;
};
