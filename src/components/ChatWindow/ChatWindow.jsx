import React from "react";
import Style from "./ChatWindow.module.css";

const ChatWindow = () => {
  const users = [
    { name: "Priyanshu", message: "Helggfffttttttttttttttttttttttttttttttttttttttttttgrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrftttttttttttttttttttttttttttttlo" },
    { name: "Sharpener", message: "Hii" },
    { name: "Priyanshu", message: "Hello" },
  ];
  return (
    <>
      <div className={Style.container}>
        {users.map((user, index) => (
          <div className={index % 2 == 0 ? Style.evenRow : Style.oddRow}>
            <div style={{padding:"5px"}}>
              <span>{user.name}</span> : <span>{user.message}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatWindow;
