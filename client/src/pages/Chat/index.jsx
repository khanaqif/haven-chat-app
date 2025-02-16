import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ContactsContainer from "./components/contacts-container"; //client\src\pages\Chat\components\contacts-container\index.jsx

import ChatContainer from "./components/chat-container"; //client\src\pages\Chat\components\chat-container\index.jsx
import EmptyChatContainer from "./components/empty-chat-container"; //client\src\pages\Chat\components\empty-chat-container\index.jsx

const Chat = () => {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
