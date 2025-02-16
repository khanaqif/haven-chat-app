import { useAppStore } from "../store";
import { SOCKET_HOST } from "../utils/constants";
import { HOST } from "../utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(SOCKET_HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      /* edit */
      const handleRecieveMessage = (message) => {
        const {
          /* selectedChatData, setSelectedChatType  */ selectedChatData:
            currentChatData,
          selectedChatType: currentChatType,
          addMessage,
        } = useAppStore.getState();

        /*   if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id) */

        if (
          currentChatType !== undefined &&
          (currentChatData._id === message.sender._id ||
            currentChatData._id === message.recipient._id)
        ) {
          console.log("Recieved message", message);
          addMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleRecieveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
