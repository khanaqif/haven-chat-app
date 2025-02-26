import { useAppStore } from "../store";
import { SOCKET_HOST } from "../utils/constants";
import { HOST } from "../utils/constants";
import React, { createContext, useContext, useEffect, useRef } from "react";
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
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        const {
          selectedChatData: currentChatData,
          selectedChatType: currentChatType,
          addMessage,
          addContactInDMContacts,
        } = useAppStore.getState();

        if (
          currentChatType !== undefined &&
          (currentChatData._id === message.sender._id ||
            currentChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        addContactInDMContacts(message);
      };

      const handleReceiveChannelMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelLists,
        } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
        }
        addChannelInChannelLists(message);
      };

      const addNewChannel = (channel) => {
        const { addChannel } = useAppStore.getState();
        addChannel(channel);
      };

      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);
      socket.current.on("new-channel-added", addNewChannel);

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

/* 
import { useAppStore } from "../store";
import { SOCKET_HOST } from "../utils/constants";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo } = useAppStore();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userInfo && !socket.current) {
      socket.current = io(SOCKET_HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
        setIsConnected(true);
      });

      socket.current.on("disconnect", () => {
        console.log("Disconnected from socket server");
        setIsConnected(false);
      });

      const handleReceiveMessage = (message) => {
        const {
          selectedChatData: currentChatData,
          selectedChatType: currentChatType,
          addMessage,
          addContactInDMContacts,
        } = useAppStore.getState();

        if (
          currentChatType !== undefined &&
          (currentChatData._id === message.sender._id ||
            currentChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        addContactInDMContacts(message);
      };

      const handleReceiveChannelMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelLists,
        } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
        }
        addChannelInChannelLists(message);
      };

      const addNewChannel = (channel) => {
        const { addChannel } = useAppStore.getState();
        addChannel(channel);
      };

      // Register event listeners
      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("recieve-channel-message", handleReceiveChannelMessage);
      socket.current.on("new-channel-added", addNewChannel);

      return () => {
        if (socket.current) {
          socket.current.disconnect();
          socket.current = null;
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket: socket.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
 */
