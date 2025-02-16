import { useAppStore } from "../../../../../../store";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import Message from "../../../../../../../../server/models/MessagesModal";
import { apiClient } from "../../../../../../lib/api-client";
import {
  FETCH_ALL_MESSAGES_ROUTE,
  HOST,
  MESSAGE_TYPES,
} from "@/utils/constants"; //client\src\utils\constants.js
const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatData,
    selectedChatType,
    userInfo,
    setSelectedChatMessages,
    selectedChatMessages,
  } = useAppStore();

  /* copied */
  const messageEndRef = useRef(null);
  useEffect(() => {
    /* copied */






    
    const getMessages = async () => {
      const response = await apiClient.post(
        FETCH_ALL_MESSAGES_ROUTE,
        {
          id: selectedChatData._id,
        },
        { withCredentials: true }
      );

      if (response.data.messages) {
        setSelectedChatMessages(response.data.messages);
      }
    };

    /* copied */
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
      /*  else if (selectedChatType === "channel") getChannelMessages(); */
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  /*   if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]); */

  /* copied */
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);
  /*  let lastDate = useRef(null); */

  /* change  */
  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index} className="">
          {showDate && (
            <div className="text-center text-xs text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}

          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  /* seeing sent messages from one contact to other  */

  const renderDMMessages = (message) => {
    return (
      <div
        className={`message ${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}>
        {message.messageType === MESSAGE_TYPES.TEXT && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50   "
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
            {message.content}
          </div>
        )}

        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex-1 overflow-y-auto 
  scroll-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      {/*  <div ref={scrollRef} /> */}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
