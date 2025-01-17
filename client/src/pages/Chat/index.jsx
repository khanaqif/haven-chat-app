import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/* import ContactsContainer from "@/contacts-container";
import EmptyChatContainer from "@/empty-chat-container";
import ChatContainer from "@/chat-container";
 */
const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      {/*   <ContactsContainer />
      <EmptyChatContainer />
      <ChatContainer /> */}
      chat
    </div>
  );
};

export default Chat;
