import React, { useEffect, useState, useContext } from "react";
import { useFetch } from "../helpers/firestoreFunctions";
import { createChat, deleteChat } from "../helpers/firestoreFunctions";
import { MdDelete } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";

const ChatDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const { chat, isLoading, getChat } = useFetch();
  const [newChat, setNewChat] = useState(chat);
  const [newMessage, setnewMessage] = useState("");
  const d = new Date();

  useEffect(() => {
    setNewChat(chat);
  }, [isLoading, chat]);

  const handleCreate = () => {
    createChat(currentUser.displayName, newMessage, d);
    getChat();
    setnewMessage("");
  };

  const handleDelete = (id) => {
    deleteChat(id);
    getChat();
  };

  if (isLoading) {
    return <div className="text-center display-1">...Loading</div>;
  }
  return (
    <div className="chat-container">
      <h4 className="text-center mt-3 font-weight-bold">Chat Content</h4>
      <div className="">
        {newChat.map((item) => {
          const { displayName, message, id } = item;
          return (
            <div
              key={id}
              className={
                displayName === "Tuba Hayta Şatır"
                  ? "bg-danger text-white woman"
                  : "bg-primary text-white man"
              }
            >
              <div className="message-text">
                <p className="font-weight-bold text-dark">
                  {item.displayName === "Tuba Hayta Şatır" ? "Tuba" : "Uğur"}:
                </p>
                <p>{message}</p>
              </div>

              <MdDelete
                color={
                  item.displayName === "Tuba Hayta Şatır"
                    ? "#0D6EFD"
                    : "#DC3545"
                }
                onClick={() => handleDelete(id)}
                className="icon"
              />
            </div>
          );
        })}
        <div className="d-flex align-items-center gap-2 text-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setnewMessage(e.target.value)}
            className="texter"
          />
          <RiSendPlane2Fill
            color="#0D6EFD"
            onClick={handleCreate}
            className="icon"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
